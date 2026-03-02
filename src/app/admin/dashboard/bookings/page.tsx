"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Filter } from "lucide-react";

interface Booking {
  id: string;
  type: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  serviceType?: string;
  budget?: string;
}

const statusLabels: Record<string, { text: string; color: string }> = {
  pending: { text: "في الانتظار", color: "bg-orange-400/20 text-orange-400" },
  confirmed: { text: "مؤكد", color: "bg-green-400/20 text-green-400" },
  cancelled: { text: "ملغي", color: "bg-red-400/20 text-red-400" },
  completed: { text: "مكتمل", color: "bg-blue-400/20 text-blue-400" },
};

const filters = [
  { value: "", label: "الكل" },
  { value: "pending", label: "في الانتظار" },
  { value: "confirmed", label: "مؤكد" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set("status", statusFilter);

    const res = await fetch(`/api/admin/bookings?${params}`);
    const data = await res.json();
    setBookings(data.bookings);
    setTotal(data.total);
    setPages(data.pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchBookings();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold font-cairo">
          الحجوزات ({total})
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-white/50" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setStatusFilter(f.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-cairo font-medium transition-all border ${
                statusFilter === f.value
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30"
                  : "bg-white/10 text-white/70 border-white/10 hover:text-white hover:bg-white/15"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/40 font-cairo">
            جاري التحميل...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-white/40 font-cairo">
            لا يوجد حجوزات
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  الاسم
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  النوع
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  التاريخ
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const status = statusLabels[b.status] || statusLabels.pending;
                return (
                  <tr
                    key={b.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium font-cairo text-white text-sm">
                        {b.name}
                      </p>
                      <p className="text-xs text-white/40 font-cairo">
                        {b.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-cairo text-white/60">
                      {b.type === "consultation"
                        ? "استشارة"
                        : "عرض سعر"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-cairo font-medium border border-white/10 cursor-pointer appearance-auto ${status.color}`}
                        style={{ backgroundColor: "rgba(11, 31, 63, 0.8)" }}
                      >
                        <option value="pending">في الانتظار</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40 font-cairo">
                      {new Date(b.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/dashboard/bookings/${b.id}`}
                        className="text-[#D4AF37] hover:text-[#e0c04a] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-white/10">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-cairo ${
                  page === i + 1
                    ? "bg-[#D4AF37] text-[#0B1F3F] font-bold"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
