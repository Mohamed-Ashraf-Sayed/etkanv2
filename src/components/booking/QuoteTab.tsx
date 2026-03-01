"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Database,
  Server,
  Wrench,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Edit3,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import StepIndicator from "./StepIndicator";
import BookingSuccessState from "./BookingSuccessState";
import {
  quoteServiceFeatures,
  budgetRanges,
  timelineOptions,
} from "@/data/booking";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Database,
  Server,
  Wrench,
};

const schema = z.object({
  serviceCategories: z.array(z.string()).min(1, "اختر خدمة واحدة على الأقل"),
  features: z.array(z.string()).min(1, "اختر ميزة واحدة على الأقل"),
  budgetRange: z.string().min(1, "اختر نطاق الميزانية"),
  timeline: z.string().min(1, "اختر الجدول الزمني"),
  name: z.string().min(3, "الاسم يجب أن يكون ٣ أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  companyName: z.string().optional(),
  projectDescription: z.string().min(20, "وصف المشروع يجب أن يكون ٢٠ حرف على الأقل"),
});

type FormData = z.infer<typeof schema>;

const steps = [
  { label: "الخدمات" },
  { label: "الميزانية" },
  { label: "البيانات" },
  { label: "مراجعة" },
];

// Step validation field groups
const stepFields: (keyof FormData)[][] = [
  ["serviceCategories", "features"],
  ["budgetRange", "timeline"],
  ["name", "email", "phone", "projectDescription"],
  [],
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function QuoteTab() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceCategories: [],
      features: [],
      budgetRange: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      companyName: "",
      projectDescription: "",
    },
  });

  const selectedCategories = watch("serviceCategories");
  const selectedFeatures = watch("features");
  const selectedBudget = watch("budgetRange");
  const selectedTimeline = watch("timeline");

  const toggleCategory = (cat: string) => {
    const current = [...selectedCategories];
    const idx = current.indexOf(cat);
    if (idx > -1) {
      current.splice(idx, 1);
      // Remove features of this category
      const catFeatures = quoteServiceFeatures[cat]?.features.map((f) => f.id) || [];
      setValue(
        "features",
        selectedFeatures.filter((f) => !catFeatures.includes(f))
      );
    } else {
      current.push(cat);
    }
    setValue("serviceCategories", current);
  };

  const toggleFeature = (featureId: string) => {
    const current = [...selectedFeatures];
    const idx = current.indexOf(featureId);
    if (idx > -1) current.splice(idx, 1);
    else current.push(featureId);
    setValue("features", current);
  };

  const goNext = async () => {
    const fields = stepFields[step];
    if (fields.length > 0) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const goToStep = (s: number) => {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(0);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <BookingSuccessState
        title="تم إرسال طلب عرض السعر!"
        subtitle="هنراجع طلبك ونرد عليك خلال ٢٤ ساعة"
        onReset={handleReset}
      />
    );
  }

  // Get visible features based on selected categories
  const visibleFeatures = selectedCategories.flatMap(
    (cat) => quoteServiceFeatures[cat]?.features || []
  );

  return (
    <div>
      <StepIndicator steps={steps} currentStep={step} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* ─── Step 1: Services ─── */}
            {step === 0 && (
              <div>
                <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                  اختر الخدمات المطلوبة
                </h3>
                <p className="text-sm text-text-secondary font-cairo mb-6">
                  يمكنك اختيار أكثر من خدمة
                </p>

                {/* Service category cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {Object.entries(quoteServiceFeatures).map(([key, group]) => {
                    const Icon = iconMap[group.icon] || Globe;
                    const isActive = selectedCategories.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleCategory(key)}
                        className={`
                          flex items-center gap-3 p-4 rounded-xl border text-right transition-all duration-200
                          ${
                            isActive
                              ? "bg-accent/10 border-accent text-accent"
                              : "border-border bg-surface hover:border-accent/30 text-text-secondary"
                          }
                        `}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? "bg-accent/20" : "bg-surface-light"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-cairo font-semibold text-sm">
                          {group.category}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {errors.serviceCategories && (
                  <p className="text-red-500 text-xs font-cairo mb-4">
                    {errors.serviceCategories.message}
                  </p>
                )}

                {/* Feature checkboxes */}
                {visibleFeatures.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold font-cairo text-text-primary mb-3">
                      اختر الميزات المحددة
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {visibleFeatures.map((f) => {
                        const isActive = selectedFeatures.includes(f.id);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => toggleFeature(f.id)}
                            className={`
                              px-3.5 py-2 rounded-lg text-sm font-cairo border transition-all duration-200
                              ${
                                isActive
                                  ? "bg-accent/10 border-accent text-accent font-semibold"
                                  : "border-border text-text-secondary hover:border-accent/30"
                              }
                            `}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.features && (
                      <p className="text-red-500 text-xs font-cairo mt-2">
                        {errors.features.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ─── Step 2: Budget & Timeline ─── */}
            {step === 1 && (
              <div>
                {/* Budget */}
                <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                  الميزانية المتوقعة
                </h3>
                <p className="text-sm text-text-secondary font-cairo mb-5">
                  اختر النطاق الأقرب لميزانيتك
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() => setValue("budgetRange", range.value)}
                      className={`
                        p-4 rounded-xl border text-sm font-cairo font-medium text-right transition-all duration-200
                        ${
                          selectedBudget === range.value
                            ? "bg-accent/10 border-accent text-accent font-bold"
                            : "border-border text-text-secondary hover:border-accent/30 bg-surface"
                        }
                      `}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                {errors.budgetRange && (
                  <p className="text-red-500 text-xs font-cairo mb-4">
                    {errors.budgetRange.message}
                  </p>
                )}

                {/* Timeline */}
                <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                  الجدول الزمني
                </h3>
                <p className="text-sm text-text-secondary font-cairo mb-5">
                  امتى محتاج المشروع يكون جاهز؟
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timelineOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("timeline", opt.value)}
                      className={`
                        p-4 rounded-xl border text-sm font-cairo font-medium text-right transition-all duration-200
                        ${
                          selectedTimeline === opt.value
                            ? "bg-accent/10 border-accent text-accent font-bold"
                            : "border-border text-text-secondary hover:border-accent/30 bg-surface"
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.timeline && (
                  <p className="text-red-500 text-xs font-cairo mt-2">
                    {errors.timeline.message}
                  </p>
                )}
              </div>
            )}

            {/* ─── Step 3: Client Info ─── */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold font-cairo text-text-primary mb-5">
                  بياناتك
                </h3>

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
                  <Input
                    label="اسم الشركة (اختياري)"
                    {...register("companyName")}
                    placeholder="اسم الشركة"
                  />
                </div>

                <Textarea
                  label="وصف المشروع"
                  {...register("projectDescription")}
                  error={errors.projectDescription?.message}
                  placeholder="اوصف لنا مشروعك والنتيجة اللي عايز توصل ليها..."
                  rows={4}
                />
              </div>
            )}

            {/* ─── Step 4: Review ─── */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold font-cairo text-text-primary mb-5">
                  مراجعة الطلب
                </h3>

                {/* Services */}
                <ReviewSection
                  title="الخدمات المطلوبة"
                  onEdit={() => goToStep(0)}
                >
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-cairo font-semibold border border-accent/20"
                      >
                        {quoteServiceFeatures[cat]?.category}
                      </span>
                    ))}
                  </div>
                  {selectedFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedFeatures.map((fId) => {
                        const feature = Object.values(quoteServiceFeatures)
                          .flatMap((g) => g.features)
                          .find((f) => f.id === fId);
                        return (
                          <span
                            key={fId}
                            className="px-2 py-0.5 rounded bg-surface-light text-text-secondary text-xs font-cairo"
                          >
                            {feature?.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </ReviewSection>

                {/* Budget & Timeline */}
                <ReviewSection
                  title="الميزانية والجدول الزمني"
                  onEdit={() => goToStep(1)}
                >
                  <p className="text-sm text-text-secondary font-cairo">
                    <span className="font-semibold text-text-primary">الميزانية:</span>{" "}
                    {budgetRanges.find((b) => b.value === selectedBudget)?.label}
                  </p>
                  <p className="text-sm text-text-secondary font-cairo mt-1">
                    <span className="font-semibold text-text-primary">المدة:</span>{" "}
                    {timelineOptions.find((t) => t.value === selectedTimeline)?.label}
                  </p>
                </ReviewSection>

                {/* Client Info */}
                <ReviewSection
                  title="بياناتك"
                  onEdit={() => goToStep(2)}
                >
                  <p className="text-sm text-text-secondary font-cairo">
                    {watch("name")} — {watch("email")} — {watch("phone")}
                  </p>
                  {watch("companyName") && (
                    <p className="text-sm text-text-muted font-cairo mt-1">
                      {watch("companyName")}
                    </p>
                  )}
                  <p className="text-sm text-text-secondary font-cairo mt-2 leading-relaxed">
                    {watch("projectDescription")}
                  </p>
                </ReviewSection>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-sm font-cairo font-semibold text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button type="button" variant="gold" onClick={goNext}>
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                "تأكيد وإرسال"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ── Review Section helper ── */
function ReviewSection({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold font-cairo text-text-primary">
          {title}
        </h4>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-accent font-cairo font-semibold hover:underline"
        >
          <Edit3 className="w-3.5 h-3.5" />
          تعديل
        </button>
      </div>
      {children}
    </div>
  );
}
