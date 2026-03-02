"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Headset } from "lucide-react";
import { getChatbotConfig } from "@/lib/data";
import { useRouter } from "@/i18n/navigation";

interface Message {
  role: "user" | "assistant" | "admin";
  content: string;
}

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function renderTextSegment(text: string, keyPrefix: string) {
  // Handle phone numbers — make them LTR and clickable
  const phoneRegex = /(\+?\d[\d\s-]{7,}\d)/g;
  const phoneParts = text.split(phoneRegex);
  if (phoneParts.length > 1) {
    return phoneParts.map((seg, k) => {
      if (phoneRegex.test(seg)) {
        phoneRegex.lastIndex = 0; // reset regex
        const cleanNum = seg.replace(/[\s-]/g, "");
        return (
          <a
            key={`${keyPrefix}-ph-${k}`}
            href={`https://wa.me/${cleanNum.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="inline-block text-accent hover:text-accent-light underline underline-offset-2 font-bold transition-colors"
          >
            {seg}
          </a>
        );
      }
      return <span key={`${keyPrefix}-ph-${k}`}>{seg}</span>;
    });
  }
  return text;
}

function renderMessageContent(content: string, onNavigate: (path: string) => void) {
  // Parse markdown links [text](/path) and render as clickable buttons
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, text, href] = linkMatch;
      return (
        <button
          key={i}
          onClick={() => onNavigate(href)}
          className="inline-flex items-center gap-1 text-accent hover:text-accent-light underline underline-offset-2 font-bold transition-colors"
        >
          {text}
        </button>
      );
    }
    // Bold text **text**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    if (boldParts.length > 1) {
      return boldParts.map((bp, j) => {
        const boldMatch = bp.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) return <strong key={`${i}-${j}`}>{boldMatch[1]}</strong>;
        return <span key={`${i}-${j}`}>{renderTextSegment(bp, `${i}-${j}`)}</span>;
      });
    }
    return <span key={i}>{renderTextSegment(part, `${i}`)}</span>;
  });
}

export default function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const router = useRouter();
  const { welcomeMessage: WELCOME_MESSAGE, suggestedQuestions: SUGGESTED_QUESTIONS } = getChatbotConfig(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("etqan-chat-messages");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("etqan-chat-messages");
      const msgs = saved ? JSON.parse(saved) : [];
      return msgs.length === 0;
    } catch { return true; }
  });
  const [conversationId] = useState(() => {
    if (typeof window === "undefined") return generateId();
    try {
      const saved = localStorage.getItem("etqan-chat-convId");
      if (saved) return saved;
      const newId = generateId();
      localStorage.setItem("etqan-chat-convId", newId);
      return newId;
    } catch { return generateId(); }
  });
  const [isAdminMode, setIsAdminMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("etqan-chat-admin") === "true";
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persist messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("etqan-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Persist admin mode
  useEffect(() => {
    localStorage.setItem("etqan-chat-admin", String(isAdminMode));
  }, [isAdminMode]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Poll for admin messages
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `/api/chat/poll?conversationId=${conversationId}`
        );
        const data = await res.json();

        if (data.isAdminMode) {
          setIsAdminMode(true);
        }

        if (data.messages && data.messages.length > 0) {
          setMessages((prev) => [
            ...prev,
            ...data.messages.map((content: string) => ({
              role: "admin" as const,
              content,
            })),
          ]);
        }
      } catch {
        // Ignore polling errors
      }
    };

    pollIntervalRef.current = setInterval(poll, 3000);
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [isOpen, messages.length, conversationId]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setShowSuggestions(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // In admin mode, just send and wait for admin reply via polling
    if (isAdminMode) {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          locale,
          messages: newMessages
            .filter((m) => m.role !== "admin")
            .map((m) => ({
              role: m.role === "admin" ? "assistant" : m.role,
              content: m.content,
            })),
        }),
      });
      return;
    }

    // AI mode: stream response
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          locale,
          messages: newMessages
            .filter((m) => m.role !== "admin")
            .map((m) => ({
              role: m.role === "admin" ? "assistant" : m.role,
              content: m.content,
            })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });
        const current = accumulated;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: current,
          };
          return updated;
        });
      }

      // If response was empty, remove the empty assistant message
      if (!accumulated.trim()) {
        setMessages((prev) => prev.filter((_, i) => i !== prev.length - 1));
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: t("error"),
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };

  const renderMessageIcon = (role: "assistant" | "admin") => {
    if (role === "admin") {
      return (
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
          <Headset className="w-4 h-4 text-emerald-500" />
        </div>
      );
    }
    return (
      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
        <Bot className="w-4 h-4 text-accent" />
      </div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-navy flex items-center justify-center shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? t("closeChat") : t("openChat")}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && messages.length === 0 && (
          <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl shadow-navy/20 border border-border flex flex-col bg-background"
          >
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                {isAdminMode ? (
                  <Headset className="w-5 h-5 text-accent" />
                ) : (
                  <Bot className="w-5 h-5 text-accent" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-cairo font-bold text-sm">
                  {isAdminMode ? t("adminTitle") : t("aiTitle")}
                </h3>
                <p className="text-white/50 text-xs font-cairo">
                  {isStreaming
                    ? t("typing")
                    : isAdminMode
                      ? t("adminStatus")
                      : t("onlineStatus")}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {/* Welcome */}
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-surface border border-border rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm font-cairo text-text-primary leading-relaxed">
                    {WELCOME_MESSAGE}
                  </p>
                </div>
              </div>

              {/* Suggested Questions */}
              {showSuggestions && messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pr-10">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs font-cairo px-3 py-2 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-colors duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg, i) => {
                // Skip empty assistant message while streaming — typing indicator handles it
                if (msg.role === "assistant" && !msg.content && isStreaming && i === messages.length - 1) {
                  return null;
                }
                return (
                  <div
                    key={i}
                    className={`flex gap-2.5 items-start ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {(msg.role === "assistant" || msg.role === "admin") &&
                      renderMessageIcon(msg.role)}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-accent/10 border border-accent/20 rounded-tl-sm"
                          : msg.role === "admin"
                            ? "bg-emerald-500/5 border border-emerald-500/20 rounded-tr-sm"
                            : "bg-surface border border-border rounded-tr-sm"
                      }`}
                    >
                      {msg.role === "admin" && (
                        <span className="text-[10px] font-cairo text-emerald-500 font-bold block mb-1">
                          {t("adminBadge")}
                        </span>
                      )}
                      <p className="text-sm font-cairo text-text-primary leading-relaxed whitespace-pre-wrap">
                        {msg.role === "user"
                          ? msg.content
                          : renderMessageContent(msg.content, (path) => {
                              router.push(path);
                              setIsOpen(false);
                            })}
                        {msg.role === "assistant" &&
                          i === messages.length - 1 &&
                          isStreaming && (
                            <span className="inline-block w-1.5 h-4 bg-accent/60 rounded-full ml-1 animate-pulse align-middle" />
                          )}
                      </p>
                    </motion.div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isStreaming &&
                messages.length > 0 &&
                messages[messages.length - 1].content === "" && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                    <div className="bg-surface border border-border rounded-2xl rounded-tr-sm px-4 py-3">
                      <div className="flex gap-1.5 items-center h-5">
                        <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 shrink-0 bg-background">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  rows={1}
                  disabled={isStreaming}
                  className="flex-1 resize-none bg-surface border border-border rounded-xl px-4 py-2.5 text-sm font-cairo text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isStreaming}
                  className="w-10 h-10 rounded-xl bg-accent text-navy flex items-center justify-center shrink-0 hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${locale === "ar" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
