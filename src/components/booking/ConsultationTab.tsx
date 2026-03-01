"use client";

import { useState } from "react";
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

const schema = z.object({
  date: z.date({ error: "اختر تاريخ الموعد" }),
  timeSlot: z.string().min(1, "اختر وقت الموعد"),
  name: z.string().min(3, "الاسم يجب أن يكون ٣ أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  serviceType: z.string().min(1, "اختر نوع الخدمة"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ConsultationTab() {
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

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormSnapshot(data);
    setSubmitting(false);
    setSubmitted(true);
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
        title="تم حجز الموعد بنجاح!"
        subtitle="هنتواصل معاك قبل الموعد للتأكيد"
        details={[
          {
            label: "التاريخ",
            value: dateFormatter.format(formSnapshot.date),
          },
          { label: "الوقت", value: slot?.label || "" },
          { label: "الخدمة", value: service?.label || "" },
          { label: "الاسم", value: formSnapshot.name },
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
            اختر التاريخ
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
            اختر الوقت
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
          label="الاسم الكامل"
          {...register("name")}
          error={errors.name?.message}
          placeholder="محمد أحمد"
        />
        <Input
          label="البريد الإلكتروني"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="example@mail.com"
          dir="ltr"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Input
          label="رقم الهاتف"
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="+20 123 456 7890"
          dir="ltr"
        />
        <Select
          label="نوع الخدمة"
          options={consultationServices}
          {...register("serviceType")}
          error={errors.serviceType?.message}
        />
      </div>

      <div className="mb-8">
        <Textarea
          label="ملاحظات إضافية (اختياري)"
          {...register("notes")}
          placeholder="اكتب أي تفاصيل إضافية عن اللي محتاجه..."
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
            <span>جاري الحجز...</span>
          </>
        ) : (
          "تأكيد الحجز"
        )}
      </Button>
    </form>
  );
}
