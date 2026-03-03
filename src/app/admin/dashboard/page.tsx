"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  TrendingUp,
  Eye,
  Users,
  BarChart3,
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

interface Visitor {
  ip: string;
  sessionId: string;
  pages: number;
  lastPath: string;
  device: string;
  firstSeen: string;
  lastSeen: string;
}

interface VisitorStats {
  today: { views: number; unique: number };
  week: { views: number; unique: number };
  month: { views: number; unique: number };
  topPages: Array<{ path: string; views: number }>;
  dailyViews: Array<{ date: string; count: number }>;
  recentVisitors: Visitor[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [visitors, setVisitors] = useState<VisitorStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
    fetch("/api/admin/visitors")
      .then((r) => r.json())
      .then(setVisitors)
      .catch(() => {});
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

      {/* Visitor Stats */}
      {visitors && (
        <div className="mb-8">
          <h2 className="text-lg font-bold font-cairo mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
            إحصائيات الزوار
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-purple-400/10">
                  <Eye className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs text-white/40 font-cairo">اليوم</span>
              </div>
              <p className="text-2xl font-bold text-white font-cairo">{visitors.today.views}</p>
              <p className="text-xs text-white/40 font-cairo mt-1">
                <Users className="w-3 h-3 inline ml-1" />
                {visitors.today.unique} زائر فريد
              </p>
            </div>
            <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-400/10">
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-xs text-white/40 font-cairo">هذا الأسبوع</span>
              </div>
              <p className="text-2xl font-bold text-white font-cairo">{visitors.week.views}</p>
              <p className="text-xs text-white/40 font-cairo mt-1">
                <Users className="w-3 h-3 inline ml-1" />
                {visitors.week.unique} زائر فريد
              </p>
            </div>
            <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-400/10">
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs text-white/40 font-cairo">هذا الشهر</span>
              </div>
              <p className="text-2xl font-bold text-white font-cairo">{visitors.month.views}</p>
              <p className="text-xs text-white/40 font-cairo mt-1">
                <Users className="w-3 h-3 inline ml-1" />
                {visitors.month.unique} زائر فريد
              </p>
            </div>
          </div>

          {/* Daily Chart (simple bar) */}
          {visitors.dailyViews.length > 0 && (
            <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5 mb-4">
              <h3 className="text-sm font-bold font-cairo text-white/60 mb-4">الزيارات اليومية (آخر 7 أيام)</h3>
              <div className="flex items-end gap-2 h-32">
                {visitors.dailyViews.map((day) => {
                  const max = Math.max(...visitors.dailyViews.map((d) => d.count), 1);
                  const height = (day.count / max) * 100;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/40 font-cairo">{day.count}</span>
                      <div
                        className="w-full bg-[#D4AF37]/30 rounded-t-lg min-h-[4px] transition-all"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] text-white/30 font-cairo">
                        {new Date(day.date).toLocaleDateString("ar-EG", { weekday: "short" })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Top Pages + Recent Visitors side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {visitors.topPages.length > 0 && (
              <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5">
                <h3 className="text-sm font-bold font-cairo text-white/60 mb-3">أكثر الصفحات زيارة</h3>
                <div className="space-y-2">
                  {visitors.topPages.map((pg, i) => {
                    const max = visitors.topPages[0].views;
                    const width = (pg.views / max) * 100;
                    return (
                      <div key={pg.path} className="flex items-center gap-3">
                        <span className="text-xs text-white/30 font-cairo w-5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white/70 font-cairo truncate" dir="ltr">{pg.path}</span>
                            <span className="text-xs text-white/40 font-cairo mr-2">{pg.views}</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5">
                            <div className="bg-[#D4AF37]/50 h-1.5 rounded-full" style={{ width: `${width}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Device breakdown from visitors */}
            {visitors.recentVisitors && visitors.recentVisitors.length > 0 && (
              <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-5">
                <h3 className="text-sm font-bold font-cairo text-white/60 mb-3">الأجهزة المستخدمة</h3>
                <div className="space-y-2">
                  {Object.entries(
                    visitors.recentVisitors.reduce((acc: Record<string, number>, v) => {
                      acc[v.device] = (acc[v.device] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .map(([device, count]) => {
                      const total = visitors.recentVisitors.length;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={device} className="flex items-center gap-3">
                          <span className="text-xs text-white/70 font-cairo w-28">{device}</span>
                          <div className="flex-1">
                            <div className="w-full bg-white/5 rounded-full h-2">
                              <div className="bg-purple-400/60 h-2 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-white/40 font-cairo w-12 text-left" dir="ltr">{pct}%</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Recent Visitors Table */}
          {visitors.recentVisitors && visitors.recentVisitors.length > 0 && (
            <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <h3 className="text-sm font-bold font-cairo text-white/60">آخر الزوار (هذا الأسبوع)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">IP</th>
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">الجهاز</th>
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">الصفحات</th>
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">آخر صفحة</th>
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">أول زيارة</th>
                      <th className="px-4 py-3 text-right text-[11px] font-cairo font-medium text-white/40">آخر نشاط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.recentVisitors.map((v, i) => {
                      const isOnline = Date.now() - new Date(v.lastSeen).getTime() < 5 * 60 * 1000;
                      return (
                        <tr key={`${v.sessionId}-${i}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {isOnline && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />}
                              <span className="text-xs text-white/70 font-mono" dir="ltr">{v.ip}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/50 font-cairo">{v.device}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-cairo">{v.pages}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/50 font-cairo truncate max-w-[150px]" dir="ltr">{v.lastPath}</td>
                          <td className="px-4 py-3 text-xs text-white/40 font-cairo">
                            {new Date(v.firstSeen).toLocaleString("ar-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="px-4 py-3 text-xs text-white/40 font-cairo">
                            {new Date(v.lastSeen).toLocaleString("ar-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

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
