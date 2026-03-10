"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  error?: string;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Returns 0 (Sun) - 6 (Sat)
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPicker({
  selectedDate,
  onSelectDate,
  error,
}: CalendarPickerProps) {
  const locale = useLocale();
  const dateLocale = locale === "en" ? "en-US" : "ar-EG";

  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(dateLocale, { weekday: "short" }),
    [dateLocale]
  );
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(dateLocale, { month: "long", year: "numeric" }),
    [dateLocale]
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Generate day names (Sun-Sat)
  const dayNames = useMemo(() => {
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, 7 + i);
      names.push(dayFormatter.format(d));
    }
    return names;
  }, [dayFormatter]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const canGoPrev = year > today.getFullYear() || month > today.getMonth();

  const isDisabled = (day: number) => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    // Disable past, Friday (5), Saturday (6)
    return date < today || dayOfWeek === 5 || dayOfWeek === 6;
  };

  const isToday = (day: number) => {
    return isSameDay(new Date(year, month, day), today);
  };

  const isSelected = (day: number) => {
    return selectedDate ? isSameDay(new Date(year, month, day), selectedDate) : false;
  };

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Fill rest to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div
        className={`rounded-2xl border p-5 ${
          error ? "border-red-400" : "border-border"
        } bg-surface`}
      >
        {/* Header: month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </button>

          <span className="text-sm font-bold font-cairo text-text-primary">
            {monthFormatter.format(currentMonth)}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center hover:bg-accent/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Day names header */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((name, i) => (
            <div
              key={i}
              className="text-center text-xs font-cairo text-text-muted py-2"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} />;
            }

            const disabled = isDisabled(day);
            const selected = isSelected(day);
            const todayMark = isToday(day);

            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => onSelectDate(new Date(year, month, day))}
                className={`
                  relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-cairo transition-all duration-200
                  ${
                    selected
                      ? "bg-accent text-navy font-bold shadow-sm"
                      : disabled
                      ? "text-text-muted/40 cursor-not-allowed"
                      : "text-text-primary hover:bg-accent/10"
                  }
                  ${todayMark && !selected ? "border-2 border-accent font-semibold" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-cairo mt-2">{error}</p>
      )}
    </div>
  );
}
