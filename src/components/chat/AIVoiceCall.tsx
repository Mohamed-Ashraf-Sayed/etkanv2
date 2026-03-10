"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff, Bot } from "lucide-react";

type CallState = "idle" | "ringing" | "active" | "ended";
type VoiceState = "idle" | "listening" | "processing" | "speaking";

// Handle function calls from OpenAI Realtime API
async function handleFunctionCall(
  name: string,
  args: Record<string, string>
): Promise<string> {
  try {
    switch (name) {
      case "check_available_slots": {
        const res = await fetch(
          `/api/appointments?date=${encodeURIComponent(args.date)}`
        );
        const data = await res.json();
        if (!res.ok) return JSON.stringify({ error: data.error });
        return JSON.stringify(data);
      }
      case "book_appointment": {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: args.date,
            timeSlot: args.time_slot_id,
            name: args.name,
            phone: args.phone,
            service: args.service,
          }),
        });
        const data = await res.json();
        if (!res.ok) return JSON.stringify({ error: data.error });
        return JSON.stringify(data);
      }
      default:
        return JSON.stringify({ error: "Unknown function" });
    }
  } catch (err) {
    console.error("Function call error:", err);
    return JSON.stringify({ error: "Failed to process request" });
  }
}

export default function AIVoiceCall() {
  const t = useTranslations("voiceCall");
  const locale = useLocale();

  const [callState, setCallState] = useState<CallState>("idle");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioTrackRef = useRef<MediaStreamTrack | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesRef = useRef<{ role: string; content: string }[]>([]);
  const isSpeakingRef = useRef(false);
  const isMutedRef = useRef(false);
  const isFirstResponseRef = useRef(true);
  const isMobileRef = useRef(false);
  const durationRef = useRef(0);

  // Track pending function calls by call_id
  const pendingFnCallsRef = useRef<
    Map<string, { name: string; arguments: string }>
  >(new Map());

  useEffect(() => {
    isMobileRef.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  const isSupported =
    typeof window !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    !!window.RTCPeerConnection;

  // ------- DataChannel Message Handler -------
  const handleDCMessage = useCallback((event: MessageEvent) => {
    const msg = JSON.parse(event.data);

    switch (msg.type) {
      case "response.created":
        // Model is about to speak — mute mic on mobile to prevent echo
        isSpeakingRef.current = true;
        if (audioTrackRef.current && isMobileRef.current && !isMutedRef.current) {
          audioTrackRef.current.enabled = false;
        }
        break;

      case "response.audio_transcript.delta":
        setVoiceState("speaking");
        setCurrentText((prev) => prev + (msg.delta || ""));
        break;

      case "response.audio_transcript.done":
        if (msg.transcript) {
          messagesRef.current.push({ role: "assistant", content: msg.transcript });
        }
        break;

      case "input_audio_buffer.speech_started":
        isSpeakingRef.current = false;
        setVoiceState("listening");
        setCurrentText("");
        break;

      case "input_audio_buffer.speech_stopped":
        setVoiceState("processing");
        break;

      case "conversation.item.input_audio_transcription.completed":
        if (msg.transcript) {
          messagesRef.current.push({ role: "user", content: msg.transcript });
        }
        break;

      // ---- Function calling events ----
      case "response.function_call_arguments.delta": {
        // Accumulate function call arguments
        const callId = msg.call_id;
        if (callId) {
          const existing = pendingFnCallsRef.current.get(callId);
          if (existing) {
            existing.arguments += msg.delta || "";
          } else {
            pendingFnCallsRef.current.set(callId, {
              name: msg.name || "",
              arguments: msg.delta || "",
            });
          }
        }
        break;
      }

      case "response.function_call_arguments.done": {
        // Function call is complete — execute it and send result back
        const callId = msg.call_id;
        const fnName = msg.name;
        const fnArgs = msg.arguments;

        if (callId && fnName && dcRef.current?.readyState === "open") {
          setVoiceState("processing");

          let parsedArgs: Record<string, string> = {};
          try {
            parsedArgs = JSON.parse(fnArgs);
          } catch {
            parsedArgs = {};
          }

          handleFunctionCall(fnName, parsedArgs).then((result) => {
            if (dcRef.current?.readyState === "open") {
              // Send function output back to the model
              dcRef.current.send(
                JSON.stringify({
                  type: "conversation.item.create",
                  item: {
                    type: "function_call_output",
                    call_id: callId,
                    output: result,
                  },
                })
              );

              // Ask model to continue responding with the function result
              dcRef.current.send(
                JSON.stringify({
                  type: "response.create",
                })
              );
            }
          });

          // Clean up pending call
          pendingFnCallsRef.current.delete(callId);
        }
        break;
      }

      case "response.done":
        isSpeakingRef.current = false;
        setVoiceState("idle");
        // Re-enable mic after echo dissipates (only if user hasn't manually muted)
        setTimeout(() => {
          if (audioTrackRef.current && !isSpeakingRef.current && !isMutedRef.current) {
            audioTrackRef.current.enabled = true;
          }
        }, 400);
        // After first response, relax VAD for natural conversation
        if (isFirstResponseRef.current && dcRef.current?.readyState === "open") {
          isFirstResponseRef.current = false;
          dcRef.current.send(
            JSON.stringify({
              type: "session.update",
              session: {
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.6,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 500,
                },
              },
            })
          );
        }
        break;

      case "error":
        console.error("Realtime error:", msg.error);
        break;
    }
  }, []);

  // ------- Call Controls -------
  const startCall = async () => {
    setCallState("ringing");
    setDuration(0);
    setCurrentText("");
    setErrorMsg("");
    messagesRef.current = [];
    pendingFnCallsRef.current.clear();
    isFirstResponseRef.current = true;

    try {
      // 1. Get ephemeral token
      const tokenRes = await fetch("/api/realtime/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      if (!tokenRes.ok) throw new Error("Failed to get token");
      const { token } = await tokenRes.json();
      if (!token) throw new Error("No token received");

      // 2. Get microphone (must be in user gesture context for iOS)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;
      audioTrackRef.current = stream.getAudioTracks()[0];

      // 3. Create RTCPeerConnection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Add mic track to peer connection
      pc.addTrack(audioTrackRef.current, stream);

      // Set up remote audio playback
      const audioEl = new Audio();
      audioEl.autoplay = true;
      remoteAudioRef.current = audioEl;

      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
        audioEl.play().catch(() => {});
      };

      // 4. Create DataChannel for events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.addEventListener("open", () => {
        setCallState("active");
        setVoiceState("listening");

        // Send initial greeting
        const greetingsAr = [
          "أهلاً! أنا سارة من إتقان. نورتنا والله! ممكن أعرف اسم حضرتك؟",
          "أهلاً بيك! معاك سارة من إتقان. تشرفنا إنك كلمتنا — ممكن أعرف اسم حضرتك؟",
          "أهلاً وسهلاً! أنا سارة من إتقان، بنساعد الناس تحوّل أفكارها لمشاريع حقيقية. اسم حضرتك إيه؟",
        ];
        const greetingsEn = [
          "Hey! I'm Sara from Etqan. So glad you reached out! What's your name?",
          "Hi! Sara from Etqan here — we help businesses build amazing digital products. Who am I speaking with?",
          "Hello! I'm Sara from Etqan. Thanks for calling — may I know your name?",
        ];
        const greetings = locale === "ar" ? greetingsAr : greetingsEn;
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];

        dc.send(
          JSON.stringify({
            type: "response.create",
            response: {
              modalities: ["text", "audio"],
              instructions: `Say exactly this and nothing else: "${greeting}"`,
            },
          })
        );
      });

      dc.addEventListener("message", handleDCMessage);

      // 5. SDP exchange with OpenAI
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-realtime-1.5",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) throw new Error("SDP exchange failed");
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (err) {
      console.error("Failed to start call:", err);
      const errMsg = err instanceof Error ? err.message : "Connection failed";
      if (
        errMsg.includes("Permission") ||
        errMsg.includes("NotAllowed") ||
        errMsg.includes("denied")
      ) {
        setErrorMsg(
          locale === "ar"
            ? "من فضلك اسمح بالوصول للميكروفون"
            : "Please allow microphone access"
        );
      } else {
        setErrorMsg(errMsg);
      }
      // Clean up on error
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      audioTrackRef.current = null;
      pcRef.current?.close();
      pcRef.current = null;
      setCallState("ended");
      setTimeout(() => {
        setCallState("idle");
        setErrorMsg("");
      }, 3000);
    }
  };

  const endCall = useCallback(() => {
    // Close peer connection (also closes data channel)
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    dcRef.current = null;

    // Stop microphone
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    audioTrackRef.current = null;

    // Stop remote audio
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
      remoteAudioRef.current = null;
    }

    // Clear pending function calls
    pendingFnCallsRef.current.clear();

    setVoiceState("idle");
    setCallState("ended");
    setCurrentText("");

    // Send summary to Telegram
    if (messagesRef.current.length >= 2) {
      fetch("/api/voice-chat/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesRef.current,
          duration: durationRef.current,
        }),
      }).catch(() => {});
    }

    setTimeout(() => {
      setCallState("idle");
      setDuration(0);
    }, 2000);
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      isMutedRef.current = newMuted;
      if (audioTrackRef.current) {
        audioTrackRef.current.enabled = !newMuted;
      }
      return newMuted;
    });
  };

  // ------- Call Timer -------
  useEffect(() => {
    if (callState === "active") {
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pcRef.current?.close();
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <>
      {/* Floating Call Button */}
      <AnimatePresence>
        {callState === "idle" && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={startCall}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:bg-emerald-400 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t("startCall")}
            title={t("startCall")}
          >
            <Phone className="w-5 h-5" />
            <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Screen */}
      <AnimatePresence>
        {callState !== "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-gradient-to-b from-navy via-navy to-[#0a0f1a] flex flex-col items-center justify-between py-safe"
          >
            {/* Top section */}
            <div className="flex flex-col items-center pt-16 sm:pt-20">
              <p className="text-white/40 text-sm font-cairo mb-6">
                {callState === "ringing"
                  ? t("ringing")
                  : callState === "ended"
                    ? t("callEnded")
                    : t("activeCall")}
              </p>

              {/* Avatar */}
              <div className="relative mb-6">
                {(voiceState === "speaking" || callState === "ringing") && (
                  <>
                    <motion.span
                      className="absolute inset-[-12px] rounded-full border-2 border-accent/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                      className="absolute inset-[-6px] rounded-full border-2 border-accent/30"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 0.1, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                  </>
                )}

                {voiceState === "listening" && (
                  <>
                    <motion.span
                      className="absolute inset-[-12px] rounded-full border-2 border-emerald-400/30"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.span
                      className="absolute inset-[-6px] rounded-full border-2 border-emerald-400/40"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0.1, 0.8],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                  </>
                )}

                <div
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    voiceState === "speaking"
                      ? "bg-accent/20"
                      : voiceState === "listening"
                        ? "bg-emerald-500/20"
                        : "bg-white/10"
                  }`}
                >
                  <Bot
                    className={`w-14 h-14 transition-colors duration-500 ${
                      voiceState === "speaking"
                        ? "text-accent"
                        : voiceState === "listening"
                          ? "text-emerald-400"
                          : "text-white/60"
                    }`}
                  />
                </div>
              </div>

              <h2 className="text-white text-xl font-cairo font-bold mb-1">
                {t("assistantName")}
              </h2>
              <p className="text-white/40 text-sm font-cairo">
                {t("companyName")}
              </p>

              {callState === "active" && (
                <p className="text-accent text-lg font-mono mt-4">
                  {formatDuration(duration)}
                </p>
              )}
            </div>

            {/* Voice state + subtitles */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-md w-full">
              {voiceState === "speaking" && (
                <div className="flex items-end gap-1 h-10 mb-4">
                  {[3, 5, 2, 6, 4, 3, 5, 2, 4, 3].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-1 bg-accent/70 rounded-full"
                      animate={{
                        height: [`${h * 4}px`, `${h * 8}px`, `${h * 4}px`],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}

              {voiceState === "listening" && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400/80 text-sm font-cairo">
                    {t("listening")}
                  </span>
                </div>
              )}

              {voiceState === "processing" && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-accent/60 text-sm font-cairo">
                    {t("thinking")}
                  </span>
                </div>
              )}

              {currentText && callState === "active" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={currentText.substring(0, 30)}
                  className="text-white/60 text-sm font-cairo text-center leading-relaxed max-h-24 overflow-y-auto"
                >
                  {currentText}
                </motion.p>
              )}
            </div>

            {/* Bottom controls */}
            <div className="pb-12 sm:pb-16 flex items-center gap-6">
              {callState === "active" && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                      isMuted
                        ? "bg-white/20 text-red-400"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                    aria-label={isMuted ? t("unmute") : t("mute")}
                  >
                    {isMuted ? (
                      <MicOff className="w-6 h-6" />
                    ) : (
                      <Mic className="w-6 h-6" />
                    )}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-400 transition-colors"
                    aria-label={t("endCall")}
                  >
                    <PhoneOff className="w-7 h-7" />
                  </motion.button>
                </>
              )}

              {callState === "ringing" && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={endCall}
                  className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30"
                  aria-label={t("endCall")}
                >
                  <PhoneOff className="w-7 h-7" />
                </motion.button>
              )}

              {callState === "ended" && (
                <div className="flex flex-col items-center gap-2">
                  {errorMsg && (
                    <p className="text-red-400 text-sm font-cairo">{errorMsg}</p>
                  )}
                  <p className="text-white/30 text-sm font-cairo">
                    {formatDuration(duration)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
