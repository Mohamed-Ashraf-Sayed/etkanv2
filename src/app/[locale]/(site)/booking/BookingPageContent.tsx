"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  Phone,
  MessageCircle,
  Sparkles,
  Clock,
  Shield,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultationTab from "@/components/booking/ConsultationTab";
import QuoteTab from "@/components/booking/QuoteTab";

export default function BookingPageContent() {
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "quote" ? "quote" : "consultation"
  );

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "quote" || t === "consultation") setActiveTab(t);
  }, [searchParams]);

  const tabs = [
    { id: "consultation", label: t("tabConsultation"), icon: Calendar },
    { id: "quote", label: t("tabQuote"), icon: FileText },
  ];

  return (
    <>
      {/* Hero */}
      <section className="section-navy pt-32 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative z-10">
          <Breadcrumb items={[{ label: t("heading") }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="gold">{t("badge")}</Badge>

            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              {t("heading")}
            </h1>

            <div className="gold-line mx-auto mb-5" />

            <p className="text-lg text-white/50 font-cairo leading-relaxed max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: Sparkles, label: t("trustFree") },
                { icon: Clock, label: t("trustFast") },
                { icon: Shield, label: t("trustSecure") },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08]"
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-white/50 font-cairo">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tabs Content */}
      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Tab Bar - pill style */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center rounded-full border border-border bg-surface p-1.5 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold font-cairo transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-accent text-navy shadow-sm"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
              >
                <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xl shadow-navy/5">
                  {activeTab === "consultation" && <ConsultationTab />}
                  {activeTab === "quote" && <QuoteTab />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="section-navy">
        <Container className="py-16 lg:py-20">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-4">
              {t("questionsTitle")}
            </h2>
            <p className="text-white/50 font-cairo mb-8 leading-relaxed">
              {t("questionsSub")}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="gold"
                size="lg"
                href="https://wa.me/201094807674"
              >
                <MessageCircle className="w-5 h-5" />
                {t("whatsapp")}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="tel:+201094807674"
                className="text-white/70 hover:text-accent border border-white/10"
              >
                <Phone className="w-5 h-5" />
                {t("callUs")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
