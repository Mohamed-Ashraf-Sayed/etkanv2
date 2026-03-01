"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import CalendarPicker from "./CalendarPicker";
import TimeSlotPicker from "./TimeSlotPicker";
import BookingSuccessState from "./BookingSuccessState";
import { consultationServices, timeSlots } from "@/data/booking";

type FormData = {
  date: Date;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  notes?: string;
};

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ConsultationTab() {
  const t = useTranslations("consultation");
  const tc = useTranslations("common");

  const schema = z.object({
    date: z.date({ error: t("errorDate") }),
    timeSlot: z.string().min(1, t("errorTime")),
    name: z.string().min(3, t("errorName")),
    email: z.string().email(t("errorEmail")),
    phone: z.string().min(8, t("errorPhone")),
    serviceType: z.string().min(1, t("errorService")),
    notes: z.string().optional(),
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSnapshot, setFormSnapshot] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const slot = timeSlots.find((s) => s.id === data.timeSlot);
      const service = consultationServices.find((s) => s.value === data.serviceType);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consultation",
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
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
      {/* Calendar + Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold font-cairo text-text-primary mb-2">
            {t("selectDate")}
          </label>
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
        </div>

        <div>
          <label className="block text-sm font-semibold font-cairo text-text-primary mb-2">
            {t("selectTime")}
          </label>
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
      </div>

      {/* Client Info */}
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
          placeholder="+20 123 456 7890"
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

      {/* Submit */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t("submitting")}</span>
          </>
        ) : (
          t("submit")
        )}
      </Button>

      {error && (
        <p className="text-red-500 text-sm font-cairo text-center mt-4">{error}</p>
      )}
    </form>
  );
}
