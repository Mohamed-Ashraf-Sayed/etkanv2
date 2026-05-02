"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  CalendarDays,
  Clock,
  User,
  Send,
  Video,
  CheckCircle2,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import CalendarPicker from "./CalendarPicker";
import TimeSlotPicker from "./TimeSlotPicker";
import BookingSuccessState from "./BookingSuccessState";
import { getConsultationServices, getTimeSlots } from "@/lib/data";

type FormData = {
  date: Date;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  notes?: string;
};

export default function ConsultationTab() {
  const t = useTranslations("consultation");
  const tc = useTranslations("common");
  const locale = useLocale();
  const consultationServices = getConsultationServices(locale);
  const timeSlots = getTimeSlots(locale);
  const dateLocale = locale === "en" ? "en-US" : "ar-EG";
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const schema = z.object({
    date: z.date({ error: t("errorDate") }),
    timeSlot: z.string().min(1, t("errorTime")),
    name: z.string().min(3, t("errorName")),
    email: z.string().email(t("errorEmail")),
    phone: z.string().min(8, t("errorPhone")),
    serviceType: z.string().min(1, t("errorService")),
    notes: z.string().optional(),
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSnapshot, setFormSnapshot] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      notes: "",
    },
  });

  const selectedDate = watch("date");
  const selectedSlot = watch("timeSlot");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const slot = timeSlots.find((s) => s.id === data.timeSlot);
      const service = consultationServices.find(
        (s) => s.value === data.serviceType
      );
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consultation",
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date.toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          timeSlot: slot?.label || data.timeSlot,
          serviceType: service?.label || data.serviceType,
          notes: data.notes || "",
        }),
      });
      if (!res.ok) throw new Error("API error");
      setFormSnapshot(data);
      setSubmitted(true);
    } catch {
      setError(tc("error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setFormSnapshot(null);
    setStep(1);
  };

  const goToStep2 = async () => {
    const valid = await trigger(["date", "timeSlot"]);
    if (valid) setStep(2);
  };

  if (submitted && formSnapshot) {
    const slot = timeSlots.find((s) => s.id === formSnapshot.timeSlot);
    const service = consultationServices.find(
      (s) => s.value === formSnapshot.serviceType
    );
    return (
      <BookingSuccessState
        title={t("successTitle")}
        subtitle={t("successSub")}
        details={[
          {
            label: t("dateLabel"),
            value: dateFormatter.format(formSnapshot.date),
          },
          { label: t("timeLabel"), value: slot?.label || "" },
          { label: t("serviceLabel"), value: service?.label || "" },
          { label: t("nameLabel"), value: formSnapshot.name },
        ]}
        onReset={handleReset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => s === 1 && setStep(1)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-cairo transition-all duration-300 ${
                step === s
                  ? "bg-accent text-navy shadow-sm"
                  : step > s
                  ? "bg-accent/20 text-accent"
                  : "bg-surface-light text-text-muted"
              }`}
            >
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            <span
              className={`text-sm font-cairo font-semibold hidden sm:block ${
                step === s ? "text-text-primary" : "text-text-muted"
              }`}
            >
              {s === 1 ? t("selectDate") : t("fullName")}
            </span>
          </button>
        ))}
      </div>

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Meeting Info Banner */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15 mb-6">
            <div className="flex items-center gap-2 text-sm font-cairo text-text-secondary">
              <Video className="w-4 h-4 text-accent" />
              {t("videoCall")}
            </div>
            <div className="flex items-center gap-2 text-sm font-cairo text-text-secondary">
              <Clock className="w-4 h-4 text-accent" />
              {t("duration")}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CalendarPicker
                  selectedDate={field.value || null}
                  onSelectDate={field.onChange}
                  error={errors.date?.message}
                />
              )}
            />
            <Controller
              name="timeSlot"
              control={control}
              render={({ field }) => (
                <TimeSlotPicker
                  selectedSlot={field.value || null}
                  onSelectSlot={field.onChange}
                  error={errors.timeSlot?.message}
                />
              )}
            />
          </div>

          {/* Selected summary */}
          {selectedDate && selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-5 p-3 rounded-xl bg-accent/5 border border-accent/20 text-sm font-cairo text-accent"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {dateFormatter.format(selectedDate)} —{" "}
                {timeSlots.find((s) => s.id === selectedSlot)?.label}
              </span>
            </motion.div>
          )}

          <div className="mt-6">
            <Button
              type="button"
              variant="gold"
              size="lg"
              className="w-full gap-2"
              onClick={goToStep2}
            >
              {t("next")}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Personal Info */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Input
              label={t("fullName")}
              {...register("name")}
              error={errors.name?.message}
              placeholder={t("namePlaceholder")}
            />
            <Input
              label={t("email")}
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="example@mail.com"
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Input
              label={t("phone")}
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="+20 109 480 7674"
              dir="ltr"
            />
            <Select
              label={t("serviceType")}
              options={consultationServices}
              {...register("serviceType")}
              error={errors.serviceType?.message}
            />
          </div>

          <div className="mb-8">
            <Textarea
              label={t("notes")}
              {...register("notes")}
              placeholder={t("notesPlaceholder")}
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              {t("back")}
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="flex-[2] gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t("submitting")}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("submit")}
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-cairo text-center mt-4">
              {error}
            </p>
          )}
        </motion.div>
      )}
    </form>
  );
}
