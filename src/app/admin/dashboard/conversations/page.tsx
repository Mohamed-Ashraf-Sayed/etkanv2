"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  MessageCircle,
  RefreshCw,
  User,
  Bot,
  Shield,
  Clock,
  ChevronRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Bell,
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "admin";
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  clientNumber: number;
  isAdminMode: boolean;
  lastActivity: number;
  messageCount: number;
  messages: Message[];
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${Math.floor(hours / 24)} يوم`;
}

function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("admin-sound") !== "false";
  });

  useEffect(() => {
    // Create audio element with a simple notification beep using Web Audio API
    audioRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Nk42CdW5xfIeOkIV4bGx0gIyRj4J1bG13g42Rj4N2bm15hI2SkIR3b296hI6SkIV5cHB7hY+Tkod7cnJ9ho+UlIl+dXR/iJCUlIqAd3aAiZGVlYuCeXiBi5KWlouEe3qCjJOXmIyGfXyEjZSYmI6IfX6Fj5WZmY+Kf4CGkJaamp+RgoKIkZebnKCSg4OKkpibnqKUhYWLk5menqOWh4eMlZqfoKSYiYiOl5yhoquamouQmZ2ipKudn4ySm5+jpqygoI6Tnp+mqK6jpZGWoKKoq7GmppOYoaSprLKpqJWbpKaqrrSrrJedpqisr7atr5mfqKqusrmwtJyiq62ws7q0tZ6lra+ztby3uKGnr7G1uL67u6SpsrO3ur+9vaersrW5vMHAv7CutrW8v8TDw7OwtLi+wsbFxbWytrrBxcnIx7e0uLzDx8rKybi2ur7Fy83Myr25vcHHz9HQ0L+8wMTK0tTU0sG+wsfN1NfW1cPBxcnP1tjY18TDx8vR2Nra2cbFyczT2tvc28jHy87V3N3e3crJzNDX3t/g38zLztLZ4OHh4c7N0NTb4ePj4tDP0tbe5OXl5NLR1Njf5efn5tTT1tre5+np6NbV2Nzh6Orr6tjX2t7j6+3t7Nra3eDl7O7u7tzb3uLn7vDw7t7d4OTp8PL07+Df4ufs8fP18eHg5Ons8vT29OPi5urt9Pb39eXk6Ozu9fj59+fm6e3x9/r7+enp6+/z+Pv8+uvr7fH1+vz9/O3s7/P3+/3+/u/u8fX5/f///vHw8/f7"
    );
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-sound", String(soundEnabled));
  }, [soundEnabled]);

  const playSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  return { soundEnabled, setSoundEnabled, playSound };
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevConvsRef = useRef<Map<string, number>>(new Map());
  const { soundEnabled, setSoundEnabled, playSound } = useNotificationSound();
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default");

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const requestNotifPermission = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      setNotifPermission(perm);
    }
  };

  const sendBrowserNotification = useCallback((title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
      new Notification(title, {
        body,
        icon: "/images/logo.webp",
        tag: "etqan-chat",
      });
    }
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/admin/conversations");
      if (res.ok) {
        const data = await res.json();
        checkNewMessages(data);
        setConversations(data);
        if (selected) {
          const updated = data.find(
            (c: Conversation) => c.id === selected.id
          );
          if (updated) setSelected(updated);
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  // Check for new messages and trigger notifications
  const checkNewMessages = useCallback((newConvs: Conversation[]) => {
    const prevMap = prevConvsRef.current;
    let hasNew = false;
    let newMsgConv = "";

    for (const conv of newConvs) {
      const prevCount = prevMap.get(conv.id) || 0;
      if (prevCount > 0 && conv.messageCount > prevCount) {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (lastMsg && lastMsg.role === "user") {
          hasNew = true;
          newMsgConv = `عميل #${conv.clientNumber}`;
        }
      }
    }

    // Also check for new conversations
    for (const conv of newConvs) {
      if (!prevMap.has(conv.id) && prevMap.size > 0) {
        hasNew = true;
        newMsgConv = `عميل جديد #${conv.clientNumber}`;
      }
    }

    if (hasNew) {
      playSound();
      sendBrowserNotification("رسالة جديدة — إتقان", `${newMsgConv} بعت رسالة جديدة`);
    }

    // Update the map
    const newMap = new Map<string, number>();
    for (const conv of newConvs) {
      newMap.set(conv.id, conv.messageCount);
    }
    prevConvsRef.current = newMap;
  }, [playSound, sendBrowserNotification]);

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 text-accent animate-spin" />
      </div>
    );
  }

  // Detail view
  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-white/50 hover:text-white font-cairo text-sm mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          رجوع للمحادثات
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-cairo text-white">
                عميل #{selected.clientNumber}
              </h2>
              <p className="text-xs text-white/40 font-cairo">
                {selected.messageCount} رسالة • {timeAgo(selected.lastActivity)}
                {selected.isAdminMode && (
                  <span className="mr-2 text-green-400">• يدار بواسطة الأدمن</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-4 space-y-3">
            {selected.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-accent/20 text-accent rounded-br-sm"
                      : msg.role === "admin"
                        ? "bg-green-500/20 text-green-300 rounded-bl-sm"
                        : "bg-white/10 text-white/80 rounded-bl-sm"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.role === "user" ? (
                      <User className="w-3 h-3 opacity-50" />
                    ) : msg.role === "admin" ? (
                      <Shield className="w-3 h-3 opacity-50" />
                    ) : (
                      <Bot className="w-3 h-3 opacity-50" />
                    )}
                    <span className="text-[10px] opacity-40 font-cairo">
                      {msg.role === "user"
                        ? "العميل"
                        : msg.role === "admin"
                          ? "الأدمن"
                          : "AI"}
                    </span>
                    <span className="text-[10px] opacity-30 font-cairo">
                      {new Date(msg.timestamp).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-cairo whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-cairo">المحادثات النشطة</h1>
        <div className="flex items-center gap-2">
          {/* Browser notification permission */}
          {notifPermission !== "granted" && (
            <button
              onClick={requestNotifPermission}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-sm text-blue-400 font-cairo transition-colors cursor-pointer border border-blue-500/20"
              title="تفعيل إشعارات المتصفح"
            >
              <Bell className="w-4 h-4" />
              تفعيل الإشعارات
            </button>
          )}
          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-cairo transition-colors cursor-pointer border ${
              soundEnabled
                ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
            }`}
            title={soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          {/* Refresh */}
          <button
            onClick={() => {
              setLoading(true);
              fetchConversations();
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/60 font-cairo transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-400/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-lg font-bold font-cairo text-white mb-2">
              لا توجد محادثات نشطة
            </h2>
            <p className="text-white/40 font-cairo text-sm max-w-md">
              المحادثات بتظهر هنا لما عميل يبدأ محادثة من الشات بوت على الموقع.
              المحادثات محفوظة لمدة 24 ساعة.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const isActive = Date.now() - conv.lastActivity < 30 * 60 * 1000;

            return (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className="w-full bg-[#0B1F3F] border border-white/10 hover:border-accent/30 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 cursor-pointer text-right"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0B1F3F]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-cairo text-white text-sm">
                        عميل #{conv.clientNumber}
                      </span>
                      {conv.isAdminMode && (
                        <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-cairo">
                          أدمن
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-white/30">
                      <Clock className="w-3 h-3" />
                      <span className="text-[11px] font-cairo">
                        {timeAgo(conv.lastActivity)}
                      </span>
                    </div>
                  </div>
                  {lastMsg && (
                    <p className="text-xs text-white/40 font-cairo truncate">
                      {lastMsg.role === "user"
                        ? "العميل: "
                        : lastMsg.role === "admin"
                          ? "الأدمن: "
                          : "AI: "}
                      {lastMsg.content}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/20 font-cairo">
                      {conv.messageCount} رسالة
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-white/20 shrink-0 rtl:rotate-180" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
