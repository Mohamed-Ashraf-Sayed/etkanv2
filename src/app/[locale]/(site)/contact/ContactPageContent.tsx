"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import Badge from "@/components/ui/Badge";
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// --- Schema ---
const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  serviceType: z.string().min(1),
  message: z.string().min(10),
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

// --- Main Component ---
export default function ContactPageContent() {
  const t = useTranslations("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const offices = [
    {
      country: t("egypt"),
      city: t("cairo"),
      address: t("cairoAddress"),
      icon: Building2,
    },
    {
      country: t("saudi"),
      city: t("riyadh"),
      address: t("riyadhAddress"),
      icon: Building2,
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: t("emailContact"),
      value: "info@devixtech.com",
      href: "mailto:info@devixtech.com",
      dir: "ltr" as const,
    },
    {
      icon: Phone,
      label: t("phoneContact"),
      value: "+20 123 456 7890",
      href: "tel:+201234567890",
      dir: "ltr" as const,
    },
    {
      icon: Clock,
      label: t("workingHours"),
      value: t("workingHoursValue"),
      href: null,
      dir: "rtl" as const,
    },
  ];

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
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden section-navy">
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: t("title") }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Badge variant="gold">{t("badge")}</Badge>

              <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
                {t("title")}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-cairo leading-relaxed mb-8">
                {t("subtitle")}
              </p>

              {/* Quick Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={method.label}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      <method.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-cairo">
                        {method.label}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-white font-cairo font-semibold text-sm hover:text-accent transition-colors"
                          dir={method.dir}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span
                          className="text-white font-cairo font-semibold text-sm"
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

            {/* Simple visual block instead of complex SVG illustration */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="hidden lg:flex flex-col gap-4"
            >
              <div className="rounded-xl p-6 bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-white font-cairo font-bold">{t("quickResponse")}</p>
                    <p className="text-white/60 text-sm font-cairo">{t("quickResponseSub")}</p>
                  </div>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-white font-cairo font-bold">{t("continuousSupport")}</p>
                    <p className="text-white/60 text-sm font-cairo">{t("continuousSupportSub")}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-5 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-black font-cairo text-accent mb-1">24h</div>
                  <div className="text-xs text-white/60 font-cairo">{t("avgResponseTime")}</div>
                </div>
                <div className="rounded-xl p-5 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-black font-cairo text-accent mb-1">98%</div>
                  <div className="text-xs text-white/60 font-cairo">{t("clientSatisfaction")}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Form + Info Section */}
      <section className="section-padding section-alt">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form - Right side (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="card p-0 overflow-hidden">
                {/* Form header - navy with gold accent */}
                <div className="bg-navy py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Send className="w-4 h-4 text-accent" />
                    </div>
                    <h2 className="text-xl font-bold font-cairo text-white">
                      {t("formTitle")}
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
                          className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6"
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
                          {t("successTitle")}
                        </h3>
                        <p className="text-text-secondary font-cairo mb-6">
                          {t("successSub")}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          {t("sendAnother")}
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
                            label={t("nameLabel")}
                            placeholder={t("namePlaceholder")}
                            error={errors.name ? t("errorName") : undefined}
                            {...register("name")}
                          />
                          <Input
                            label={t("emailLabel")}
                            type="email"
                            placeholder="example@email.com"
                            error={errors.email ? t("errorEmail") : undefined}
                            dir="ltr"
                            className="text-left"
                            {...register("email")}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Input
                            label={t("phoneLabel")}
                            type="tel"
                            placeholder="+20 XXX XXX XXXX"
                            error={errors.phone ? t("errorPhone") : undefined}
                            dir="ltr"
                            className="text-left"
                            {...register("phone")}
                          />
                          <Select
                            label={t("serviceLabel")}
                            options={serviceOptions}
                            error={errors.serviceType ? t("errorService") : undefined}
                            {...register("serviceType")}
                          />
                        </div>

                        <Textarea
                          label={t("messageLabel")}
                          placeholder={t("messagePlaceholder")}
                          rows={5}
                          error={errors.message ? t("errorMessage") : undefined}
                          {...register("message")}
                        />

                        <Button
                          type="submit"
                          variant="gold"
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
                              {t("submitting")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-5 h-5" />
                              {t("submit")}
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
                      {t("whatsapp")}
                    </p>
                    <p className="text-text-secondary text-sm font-cairo">
                      {t("whatsappSub")}
                    </p>
                  </div>
                </a>
              </motion.div>

              {/* Office Addresses */}
              {offices.map((office) => (
                <motion.div
                  key={office.country}
                  variants={fadeUp}
                  className="card p-0 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-text-primary font-cairo font-bold text-base mb-1">
                          {office.city === t("cairo") ? t("officeCairo") : t("officeRiyadh")}
                        </p>
                        <p className="text-text-secondary text-sm font-cairo leading-relaxed">
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
                <div className="relative h-56 bg-navy-light">
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(var(--color-border) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Decorative roads */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />

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
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-navy" />
                    </div>
                    <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                      <span className="text-xs text-white font-cairo font-semibold">
                        {t("cairo")}
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
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-navy" />
                    </div>
                    <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                      <span className="text-xs text-white font-cairo font-semibold">
                        {t("riyadh")}
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
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      opacity="0.3"
                    />
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
            className="rounded-3xl overflow-hidden section-navy"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-8 py-14 sm:px-14 text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-h2 font-bold font-cairo text-white mb-4">
                {t("readyCta")}
              </h2>
              <p className="text-white/80 font-cairo text-lg max-w-2xl mx-auto mb-8">
                {t("readyCtaSub")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="gold">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    {t("freeConsultation")}
                  </Button>
                </a>
                <a href="tel:+201234567890">
                  <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                    <Phone className="w-5 h-5 ml-2" />
                    {t("callUsButton")}
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
