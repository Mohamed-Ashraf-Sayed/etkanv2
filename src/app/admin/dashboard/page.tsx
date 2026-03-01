"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  weekBookings: number;
  activeChats: number;
  recentBookings: Array<{
    id: string;
    type: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/40 font-cairo">جاري التحميل...</div>
      </div>
    );
  }

  const statCards = [
    {
      label: "إجمالي الحجوزات",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10",
    },
    {
      label: "في الانتظار",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      label: "هذا الأسبوع",
      value: stats.weekBookings,
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "محادثات نشطة",
      value: stats.activeChats,
      icon: MessageCircle,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  const statusLabels: Record<string, { text: string; color: string }> = {
    pending: { text: "في الانتظار", color: "bg-orange-400/20 text-orange-400" },
    confirmed: { text: "مؤكد", color: "bg-green-400/20 text-green-400" },
    cancelled: { text: "ملغي", color: "bg-red-400/20 text-red-400" },
    completed: { text: "مكتمل", color: "bg-blue-400/20 text-blue-400" },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-cairo mb-8">لوحة التحكم</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white font-cairo">
                {card.value}
              </p>
              <p className="text-sm text-white/50 font-cairo mt-1">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold font-cairo mb-4">آخر الحجوزات</h2>

        {stats.recentBookings.length === 0 ? (
          <p className="text-white/40 font-cairo text-center py-8">
            لا يوجد حجوزات حتى الآن
          </p>
        ) : (
          <div className="space-y-3">
            {stats.recentBookings.map((booking) => {
              const status = statusLabels[booking.status] || statusLabels.pending;
              return (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                >
                  <div>
                    <p className="font-medium font-cairo text-white">
                      {booking.name}
                    </p>
                    <p className="text-sm text-white/40 font-cairo">
                      {booking.type === "consultation"
                        ? "حجز استشارة"
                        : "طلب عرض سعر"}{" "}
                      — {new Date(booking.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-cairo font-medium ${status.color}`}
                  >
                    {status.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
