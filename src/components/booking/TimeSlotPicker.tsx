"use client";

import { useTranslations, useLocale } from "next-intl";
import { Clock } from "lucide-react";
import { getTimeSlots } from "@/lib/data";

interface TimeSlotPickerProps {
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
  error?: string;
}

export default function TimeSlotPicker({
  selectedSlot,
  onSelectSlot,
  error,
}: TimeSlotPickerProps) {
  const t = useTranslations("consultation");
  const locale = useLocale();
  const timeSlots = getTimeSlots(locale);
  const morningSlots = timeSlots.filter((s) => s.period === "morning");
  const afternoonSlots = timeSlots.filter((s) => s.period === "afternoon");

  return (
    <div>
      <div
        className={`rounded-2xl border p-5 ${
          error ? "border-red-400" : "border-border"
        } bg-surface`}
      >
        {/* Morning */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold font-cairo text-text-primary">
              {t("morning")}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {morningSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelectSlot(slot.id)}
                className={`
                  px-3 py-2.5 rounded-xl text-sm font-cairo font-medium border transition-all duration-200
                  ${
                    selectedSlot === slot.id
                      ? "bg-accent/10 border-accent text-accent font-bold"
                      : "border-border text-text-secondary hover:border-accent/30 hover:bg-accent/5"
                  }
                `}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-5" />

        {/* Afternoon */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold font-cairo text-text-primary">
              {t("evening")}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {afternoonSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelectSlot(slot.id)}
                className={`
                  px-3 py-2.5 rounded-xl text-sm font-cairo font-medium border transition-all duration-200
                  ${
                    selectedSlot === slot.id
                      ? "bg-accent/10 border-accent text-accent font-bold"
                      : "border-border text-text-secondary hover:border-accent/30 hover:bg-accent/5"
                  }
                `}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-cairo mt-2">{error}</p>
      )}
    </div>
  );
}
