"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface Booking {
  id: string;
  type: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  date?: string;
  timeSlot?: string;
  serviceType?: string;
  notes?: string;
  services?: string;
  features?: string;
  budget?: string;
  timeline?: string;
  company?: string;
  description?: string;
  createdAt: string;
}

const statusOptions = [
  { value: "pending", label: "في الانتظار", color: "bg-orange-400/20 text-orange-400" },
  { value: "confirmed", label: "مؤكد", color: "bg-green-400/20 text-green-400" },
  { value: "completed", label: "مكتمل", color: "bg-blue-400/20 text-blue-400" },
  { value: "cancelled", label: "ملغي", color: "bg-red-400/20 text-red-400" },
];

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetch(`/api/admin/bookings?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        const b = data.bookings?.find((b: Booking) => b.id === id);
        if (b) setBooking(b);
      });
  }, [id]);

  const updateStatus = async (status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBooking((prev) => (prev ? { ...prev, status } : null));
  };

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-64 text-white/40 font-cairo">
        جاري التحميل...
      </div>
    );
  }

  const fields = [
    { label: "الاسم", value: booking.name },
    { label: "الإيميل", value: booking.email },
    { label: "الهاتف", value: booking.phone },
    ...(booking.type === "consultation"
      ? [
          { label: "التاريخ", value: booking.date },
          { label: "الوقت", value: booking.timeSlot },
          { label: "نوع الخدمة", value: booking.serviceType },
          { label: "ملاحظات", value: booking.notes },
        ]
      : [
          { label: "الشركة", value: booking.company },
          { label: "الخدمات", value: booking.services ? JSON.parse(booking.services).join("، ") : null },
          { label: "الميزات", value: booking.features ? JSON.parse(booking.features).join("، ") : null },
          { label: "الميزانية", value: booking.budget },
          { label: "الجدول الزمني", value: booking.timeline },
          { label: "وصف المشروع", value: booking.description },
        ]),
  ].filter((f) => f.value);

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-cairo mb-6 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        رجوع
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-cairo">{booking.name}</h1>
          <p className="text-white/40 text-sm font-cairo">
            {booking.type === "consultation" ? "حجز استشارة" : "طلب عرض سعر"} —{" "}
            {new Date(booking.createdAt).toLocaleDateString("ar-EG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              className={`px-4 py-2 rounded-xl text-xs font-cairo font-medium transition-all ${
                booking.status === opt.value
                  ? `${opt.color} border border-current`
                  : "bg-white/5 text-white/40 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-xs text-[#D4AF37] font-cairo font-medium mb-1">
                {field.label}
              </p>
              <p className="text-white font-cairo text-sm">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
