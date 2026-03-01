"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  FileText,
  ChevronLeft,
  Phone,
  MessageCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConsultationTab from "@/components/booking/ConsultationTab";
import QuoteTab from "@/components/booking/QuoteTab";

const tabs = [
  { id: "consultation", label: "حجز موعد استشارة", icon: Calendar },
  { id: "quote", label: "طلب عرض سعر", icon: FileText },
];

export default function BookingPageContent() {
  const [activeTab, setActiveTab] = useState("consultation");

  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="section-navy pt-32 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm font-cairo text-white/50">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <ChevronLeft className="w-3.5 h-3.5" />
              </li>
              <li className="text-accent">حجز موعد</li>
            </ol>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="max-w-3xl"
          >
            <Badge variant="gold">احجز الآن</Badge>

            <h1 className="text-display font-bold font-cairo text-white mt-5 mb-5">
              احجز موعد أو اطلب عرض سعر
            </h1>

            <div className="w-16 h-0.5 bg-accent mb-5" />

            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              احجز استشارة مجانية مع فريقنا أو اطلب عرض سعر مخصص لمشروعك —
              هنرد عليك في أسرع وقت.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ═══ Tabs Content ═══ */}
      <section className="section-padding section-alt">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Tab Bar */}
            <div className="flex items-center gap-3 mb-10 justify-center flex-wrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold font-cairo transition-all duration-300 border
                      ${
                        isActive
                          ? "bg-accent text-navy border-accent shadow-sm"
                          : "bg-transparent text-text-secondary border-border hover:border-accent/30"
                      }
                    `}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {tab.label}
                  </button>
                );
              })}
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
                <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 lg:p-10">
                  {activeTab === "consultation" && <ConsultationTab />}
                  {activeTab === "quote" && <QuoteTab />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* ═══ Bottom CTA ═══ */}
      <section className="section-navy">
        <Container className="py-16 lg:py-20">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-4">
              لسه عندك أسئلة؟
            </h2>
            <p className="text-white/60 font-cairo mb-8 leading-relaxed">
              تواصل معنا مباشرة عبر الواتساب أو اتصل بينا
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="gold"
                size="lg"
                href="https://wa.me/201234567890"
              >
                <MessageCircle className="w-5 h-5" />
                واتساب
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="tel:+201234567890"
                className="text-white/70 hover:text-accent border border-white/10"
              >
                <Phone className="w-5 h-5" />
                اتصل بنا
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
