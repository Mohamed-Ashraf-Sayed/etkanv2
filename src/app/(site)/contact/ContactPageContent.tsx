"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Send,
  Building2,
  Clock,
  Headphones,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Breadcrumb from "@/components/shared/Breadcrumb";

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// --- Hero Illustration ---
function ContactIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Background shape */}
      <rect
        x="40"
        y="20"
        width="320"
        height="280"
        rx="24"
        fill="url(#contactBg)"
        opacity="0.15"
      />

      {/* Chat window */}
      <rect
        x="60"
        y="50"
        width="200"
        height="180"
        rx="16"
        style={{ fill: "var(--color-surface)" }}
        stroke="#2563eb"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* Chat header */}
      <rect
        x="60"
        y="50"
        width="200"
        height="40"
        rx="16"
        style={{ fill: "var(--color-surface-light)" }}
      />
      <rect x="60" y="74" width="200" height="16" style={{ fill: "var(--color-surface-light)" }} />
      {/* Header dots */}
      <circle cx="80" cy="70" r="4" fill="#ef4444" opacity="0.7" />
      <circle cx="94" cy="70" r="4" fill="#f59e0b" opacity="0.7" />
      <circle cx="108" cy="70" r="4" fill="#22c55e" opacity="0.7" />
      {/* Header title */}
      <rect
        x="170"
        y="64"
        width="70"
        height="12"
        rx="6"
        style={{ fill: "var(--color-text-muted)" }}
        opacity="0.5"
      />

      {/* Message bubble - received */}
      <rect
        x="75"
        y="102"
        width="120"
        height="32"
        rx="12"
        style={{ fill: "var(--color-surface-light)" }}
      />
      <rect
        x="85"
        y="112"
        width="80"
        height="6"
        rx="3"
        style={{ fill: "var(--color-text-muted)" }}
        opacity="0.6"
      />
      <rect
        x="85"
        y="122"
        width="50"
        height="4"
        rx="2"
        style={{ fill: "var(--color-text-muted)" }}
        opacity="0.4"
      />

      {/* Message bubble - sent */}
      <rect
        x="125"
        y="145"
        width="120"
        height="32"
        rx="12"
        fill="#2563eb"
        opacity="0.3"
      />
      <rect
        x="135"
        y="155"
        width="90"
        height="6"
        rx="3"
        fill="#60a5fa"
        opacity="0.6"
      />
      <rect
        x="135"
        y="165"
        width="60"
        height="4"
        rx="2"
        fill="#60a5fa"
        opacity="0.4"
      />

      {/* Message input */}
      <rect
        x="72"
        y="192"
        width="176"
        height="28"
        rx="14"
        style={{ fill: "var(--color-surface-light)", stroke: "var(--color-surface-lighter)" }}
        strokeWidth="1"
      />
      <circle cx="228" cy="206" r="10" fill="#2563eb" opacity="0.6" />
      <path
        d="M225 206L230 206M228 203L228 209"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Envelope floating */}
      <g>
        <rect
          x="280"
          y="60"
          width="80"
          height="56"
          rx="8"
          style={{ fill: "var(--color-surface-light)" }}
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <path
          d="M280 68L320 92L360 68"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M280 116L305 96"
          stroke="#f59e0b"
          strokeWidth="1"
          opacity="0.3"
        />
        <path
          d="M360 116L335 96"
          stroke="#f59e0b"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>

      {/* Phone floating */}
      <rect
        x="290"
        y="140"
        width="56"
        height="90"
        rx="10"
        style={{ fill: "var(--color-surface-light)" }}
        stroke="#7c3aed"
        strokeWidth="1.5"
      />
      <rect
        x="296"
        y="154"
        width="44"
        height="60"
        rx="4"
        style={{ fill: "var(--color-surface)" }}
      />
      <rect
        x="310"
        y="145"
        width="16"
        height="4"
        rx="2"
        style={{ fill: "var(--color-surface-lighter)" }}
      />
      {/* Phone call icon */}
      <circle
        cx="318"
        cy="178"
        r="12"
        fill="#22c55e"
        opacity="0.2"
      />
      <path
        d="M312 172C312 172 314 174 314 178C314 182 312 184 312 184"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M324 172C324 172 322 174 322 178C322 182 324 184 324 184"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="318" cy="178" r="3" fill="#22c55e" opacity="0.6" />

      {/* Location pin */}
      <g>
        <path
          d="M100 260C100 248 108 240 118 240C128 240 136 248 136 260C136 272 118 290 118 290C118 290 100 272 100 260Z"
          fill="#2563eb"
          opacity="0.2"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <circle
          cx="118"
          cy="258"
          r="6"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
      </g>

      {/* Connecting dots */}
      <circle cx="270" cy="100" r="3" fill="#2563eb" opacity="0.4" />
      <circle cx="275" cy="180" r="2" fill="#7c3aed" opacity="0.3" />
      <circle cx="160" cy="250" r="2.5" fill="#f59e0b" opacity="0.3" />

      {/* Dashed connection lines */}
      <path
        d="M260 100L280 88"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.3"
      />
      <path
        d="M260 180L290 175"
        stroke="#7c3aed"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.3"
      />

      <defs>
        <linearGradient
          id="contactBg"
          x1="40"
          y1="20"
          x2="360"
          y2="300"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// --- Schema & Data ---
const contactSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  serviceType: z.string().min(1, "اختر نوع الخدمة"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  { value: "web", label: "تطوير مواقع وتطبيقات ويب" },
  { value: "mobile", label: "تطوير تطبيقات الموبايل" },
  { value: "crm", label: "أنظمة CRM" },
  { value: "erp", label: "أنظمة ERP" },
  { value: "networks", label: "شبكات وبنية تحتية" },
  { value: "support", label: "دعم فني" },
  { value: "other", label: "أخرى" },
];

const offices = [
  {
    country: "مصر",
    city: "القاهرة",
    address: "مدينة نصر، شارع مصطفى النحاس، برج الياسمين، الدور 5",
    icon: Building2,
    gradient: "from-primary to-accent",
  },
  {
    country: "السعودية",
    city: "الرياض",
    address: "حي العليا، طريق الملك فهد، برج الفيصلية، الدور 12",
    icon: Building2,
    gradient: "from-secondary to-primary",
  },
];

const contactMethods = [
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@devixtech.com",
    href: "mailto:info@devixtech.com",
    gradient: "from-primary to-blue-400",
    dir: "ltr" as const,
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: "+20 123 456 7890",
    href: "tel:+201234567890",
    gradient: "from-accent to-orange-400",
    dir: "ltr" as const,
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "الأحد - الخميس، 9 ص - 6 م",
    href: null,
    gradient: "from-secondary to-purple-400",
    dir: "rtl" as const,
  },
];

// --- Main Component ---
export default function ContactPageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Hero Section - Split Layout */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "تواصل معنا" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Headphones className="w-4 h-4 text-primary-light" />
                <span className="text-sm text-primary-light font-cairo font-semibold">
                  نحب نسمع منك
                </span>
              </motion.div>

              <h1 className="text-h1 font-bold font-cairo gradient-text mb-6">
                تواصل معنا
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-tajawal leading-relaxed mb-8">
                عندك مشروع جديد أو استفسار؟ فريقنا جاهز يساعدك.
                <br />
                تواصل معنا وخلينا نبدأ رحلة النجاح سوا.
              </p>

              {/* Quick Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={method.label}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-tajawal">
                        {method.label}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-text-primary font-cairo font-semibold text-sm hover:text-primary-light transition-colors"
                          dir={method.dir}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span
                          className="text-text-primary font-cairo font-semibold text-sm"
                          dir={method.dir}
                        >
                          {method.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="hidden lg:block"
            >
              <ContactIllustration />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Form + Info Section */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form - Right side (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-premium p-0 overflow-hidden">
                {/* Form header with gradient */}
                <div className="relative h-16 bg-gradient-to-l from-primary via-blue-500 to-secondary overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="relative h-full flex items-center px-8 gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl font-bold font-cairo text-white">
                      أرسل لنا رسالة
                    </h2>
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        className="flex flex-col items-center justify-center py-16 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center mb-6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.2,
                          }}
                        >
                          <CheckCircle2 className="w-10 h-10 text-success" />
                        </motion.div>
                        <h3 className="text-2xl font-bold font-cairo text-text-primary mb-3">
                          تم إرسال رسالتك بنجاح!
                        </h3>
                        <p className="text-text-secondary font-tajawal mb-6">
                          شكراً لتواصلك معنا. فريقنا هيتواصل معاك في أقرب وقت.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          إرسال رسالة أخرى
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Input
                            label="الاسم"
                            placeholder="أدخل اسمك الكامل"
                            error={errors.name?.message}
                            {...register("name")}
                          />
                          <Input
                            label="البريد الإلكتروني"
                            type="email"
                            placeholder="example@email.com"
                            error={errors.email?.message}
                            dir="ltr"
                            className="text-left"
                            {...register("email")}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Input
                            label="رقم الهاتف"
                            type="tel"
                            placeholder="+20 XXX XXX XXXX"
                            error={errors.phone?.message}
                            dir="ltr"
                            className="text-left"
                            {...register("phone")}
                          />
                          <Select
                            label="نوع الخدمة"
                            options={serviceOptions}
                            error={errors.serviceType?.message}
                            {...register("serviceType")}
                          />
                        </div>

                        <Textarea
                          label="الرسالة"
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          error={errors.message?.message}
                          {...register("message")}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.span
                                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              جاري الإرسال...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-5 h-5" />
                              أرسل رسالتك
                            </span>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Left side (2 cols) */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* WhatsApp CTA */}
              <motion.div variants={fadeUp}>
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-text-primary font-cairo font-bold text-base">
                      تواصل عبر واتساب
                    </p>
                    <p className="text-text-secondary text-sm font-tajawal">
                      رد فوري خلال دقائق
                    </p>
                  </div>
                </a>
              </motion.div>

              {/* Office Addresses */}
              {offices.map((office) => (
                <motion.div
                  key={office.country}
                  variants={fadeUp}
                  className="card-premium p-0 overflow-hidden"
                >
                  <div
                    className={`h-1.5 bg-gradient-to-l ${office.gradient}`}
                  />
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${office.gradient} flex items-center justify-center shrink-0 opacity-80`}
                      >
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-text-primary font-cairo font-bold text-base mb-1">
                          مكتب {office.city}
                        </p>
                        <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Mock */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <div className="relative h-56 bg-gradient-to-br from-surface-light via-surface to-surface-light">
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Decorative roads */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

                  {/* Cairo pin */}
                  <motion.div
                    className="absolute top-1/3 right-1/4 flex flex-col items-center"
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-surface/90 backdrop-blur-sm border border-border">
                      <span className="text-xs text-text-primary font-cairo font-semibold">
                        القاهرة
                      </span>
                    </div>
                  </motion.div>

                  {/* Riyadh pin */}
                  <motion.div
                    className="absolute top-1/2 left-1/3 flex flex-col items-center"
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-surface/90 backdrop-blur-sm border border-border">
                      <span className="text-xs text-text-primary font-cairo font-semibold">
                        الرياض
                      </span>
                    </div>
                  </motion.div>

                  {/* Dashed connection line */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="75%"
                      y1="33%"
                      x2="33%"
                      y2="50%"
                      stroke="url(#mapLineGradient)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      opacity="0.4"
                    />
                    <defs>
                      <linearGradient
                        id="mapLineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm">
        <Container>
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 60%)",
              }}
            />
            <div className="relative px-8 py-14 sm:px-14 text-center">
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4">
                مستعد تبدأ مشروعك؟
              </h2>
              <p className="text-text-secondary font-tajawal text-lg max-w-2xl mx-auto mb-8">
                فريقنا جاهز يساعدك تحول فكرتك لواقع. احجز استشارة مجانية دلوقتي.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    احجز استشارة مجانية
                  </Button>
                </a>
                <a href="tel:+201234567890">
                  <Button variant="outline" size="lg">
                    <Phone className="w-5 h-5 ml-2" />
                    اتصل بنا
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
