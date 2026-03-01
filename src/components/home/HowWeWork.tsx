"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

/* ── Step Illustrations ── */

function DiscoveryIllustration() {
  return (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Documents */}
      <rect x="20" y="16" width="48" height="58" rx="5" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
      <rect x="28" y="28" width="28" height="4" rx="1.5" fill="currentColor" fillOpacity="0.12" />
      <rect x="28" y="36" width="32" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="28" y="43" width="24" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="28" y="50" width="30" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="28" y="57" width="20" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
      {/* Checklist marks */}
      <rect x="28" y="28" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="28" y="36" width="4" height="3" rx="1" fill="currentColor" fillOpacity="0.1" />
      <rect x="28" y="43" width="4" height="3" rx="1" fill="currentColor" fillOpacity="0.1" />
      {/* Magnifying glass */}
      <circle cx="95" cy="42" r="20" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="95" cy="42" r="12" fill="currentColor" fillOpacity="0.06" />
      <line x1="110" y1="56" x2="122" y2="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" strokeLinecap="round" />
      {/* Sparkle dots */}
      <circle cx="88" cy="36" r="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="100" cy="34" r="1" fill="currentColor" fillOpacity="0.15" />
      <circle cx="94" cy="48" r="1.2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function DesignIllustration() {
  return (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Blueprint/wireframe grid */}
      <rect x="16" y="12" width="108" height="66" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
      {/* Grid lines */}
      <line x1="16" y1="30" x2="124" y2="30" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="16" y1="50" x2="124" y2="50" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="52" y1="12" x2="52" y2="78" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="88" y1="12" x2="88" y2="78" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      {/* Layout blocks */}
      <rect x="22" y="16" width="26" height="10" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="56" y="16" width="62" height="10" rx="2" fill="currentColor" fillOpacity="0.06" />
      {/* Content placeholders */}
      <rect x="22" y="34" width="26" height="12" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="56" y="34" width="26" height="12" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="92" y="34" width="26" height="12" rx="3" fill="currentColor" fillOpacity="0.08" />
      {/* Bottom blocks */}
      <rect x="22" y="54" width="62" height="18" rx="3" fill="currentColor" fillOpacity="0.06" />
      <rect x="92" y="54" width="26" height="18" rx="3" fill="currentColor" fillOpacity="0.06" />
      {/* Pencil */}
      <line x1="102" y1="58" x2="112" y2="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="102" cy="58" r="2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function DevelopIllustration() {
  return (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Terminal window */}
      <rect x="14" y="10" width="112" height="70" rx="7" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
      {/* Title bar */}
      <rect x="14" y="10" width="112" height="16" rx="7" fill="currentColor" fillOpacity="0.04" />
      <circle cx="27" cy="18" r="2.5" fill="#ef4444" fillOpacity="0.35" />
      <circle cx="36" cy="18" r="2.5" fill="#f59e0b" fillOpacity="0.35" />
      <circle cx="45" cy="18" r="2.5" fill="#22c55e" fillOpacity="0.35" />
      {/* Code lines */}
      <rect x="24" y="34" width="10" height="4" rx="1" fill="#2563eb" fillOpacity="0.25" />
      <rect x="38" y="34" width="22" height="4" rx="1" fill="#f59e0b" fillOpacity="0.2" />
      <rect x="64" y="34" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.08" />
      <rect x="30" y="42" width="14" height="4" rx="1" fill="#7c3aed" fillOpacity="0.2" />
      <rect x="48" y="42" width="30" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="30" y="50" width="20" height="4" rx="1" fill="#22c55e" fillOpacity="0.2" />
      <rect x="54" y="50" width="24" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="82" y="50" width="12" height="4" rx="1" fill="#2563eb" fillOpacity="0.15" />
      <rect x="30" y="58" width="26" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="60" y="58" width="18" height="4" rx="1" fill="#f59e0b" fillOpacity="0.15" />
      <rect x="24" y="66" width="8" height="4" rx="1" fill="#2563eb" fillOpacity="0.2" />
      {/* Cursor blink */}
      <rect x="36" y="66" width="2" height="4" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      {/* Bracket decorations */}
      <text x="96" y="44" fontSize="14" fill="currentColor" fillOpacity="0.1" fontFamily="monospace">{"{"}</text>
      <text x="96" y="62" fontSize="14" fill="currentColor" fillOpacity="0.1" fontFamily="monospace">{"}"}</text>
    </svg>
  );
}

function LaunchIllustration() {
  return (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Dashboard background */}
      <rect x="30" y="20" width="80" height="55" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
      {/* Upward chart */}
      <polyline
        points="40,62 52,56 64,50 76,38 88,30 100,24"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Area under chart */}
      <polygon
        points="40,62 52,56 64,50 76,38 88,30 100,24 100,68 40,68"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Chart dots */}
      <circle cx="52" cy="56" r="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="76" cy="38" r="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="100" cy="24" r="2.5" fill="currentColor" fillOpacity="0.25" />
      {/* Rocket */}
      <g transform="translate(100,18) rotate(45)">
        <ellipse cx="0" cy="0" rx="5" ry="8" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="0" cy="6" rx="3" ry="3" fill="#f59e0b" fillOpacity="0.2" />
      </g>
      {/* Sparkle stars */}
      <circle cx="112" cy="14" r="1.2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="118" cy="22" r="0.8" fill="currentColor" fillOpacity="0.15" />
      <circle cx="108" cy="10" r="0.6" fill="currentColor" fillOpacity="0.12" />
      {/* Success checkmark */}
      <circle cx="44" cy="38" r="8" fill="#22c55e" fillOpacity="0.08" stroke="#22c55e" strokeOpacity="0.15" strokeWidth="0.8" />
      <polyline points="40,38 43,41 49,35" fill="none" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */

const steps = [
  {
    num: "01",
    title: "اكتشاف وتحليل",
    desc: "نفهم احتياجاتك وأهدافك بعمق ونحلل متطلبات المشروع",
    icon: Search,
    Illustration: DiscoveryIllustration,
    gradient: "from-primary/15 to-primary/5",
  },
  {
    num: "02",
    title: "تصميم وتخطيط",
    desc: "نصمم الحل الأمثل ونضع خطة تنفيذ واضحة ومفصلة",
    icon: PenTool,
    Illustration: DesignIllustration,
    gradient: "from-secondary/15 to-secondary/5",
  },
  {
    num: "03",
    title: "تطوير وبناء",
    desc: "نبني الحل بأحدث التقنيات مع مراجعات واختبارات مستمرة",
    icon: Code2,
    Illustration: DevelopIllustration,
    gradient: "from-accent/15 to-accent/5",
  },
  {
    num: "04",
    title: "إطلاق ودعم",
    desc: "نطلق المشروع ونقدم دعم مستمر لضمان النجاح",
    icon: Rocket,
    Illustration: LaunchIllustration,
    gradient: "from-primary/12 to-accent/8",
  },
];

/* ── Animation variants ── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Connector Arrow (between desktop cards) ── */

function StepConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center absolute top-[72px] -left-[18px] z-20">
      <div className="w-7 h-7 rounded-full bg-surface border border-border/60 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary-light rotate-180">
          <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ── Component ── */

export default function HowWeWork() {
  return (
    <section className="section-padding relative section-gradient-1">
      <div className="noise-overlay absolute inset-0" />

      <Container className="relative z-10">
        <SectionTitle
          title="كيف نعمل"
          subtitle="منهجية واضحة لضمان نجاح مشروعك"
        />

        {/* Desktop layout */}
        <motion.div
          className="hidden lg:grid grid-cols-4 gap-0 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={stepVariants}
                className="relative px-3"
              >
                {/* Connector arrow (not on first item) */}
                {index > 0 && <StepConnector />}

                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-premium rounded-2xl overflow-hidden h-full flex flex-col"
                >
                  {/* Visual header with illustration */}
                  <div className={`relative h-36 bg-gradient-to-b ${step.gradient} flex items-end justify-center overflow-hidden`}>
                    {/* Large faded step number */}
                    <div className="absolute top-2 right-4 text-5xl font-black font-cairo text-text-primary/[0.06] select-none">
                      {step.num}
                    </div>
                    {/* Illustration */}
                    <div className="w-full h-full text-primary-light p-1">
                      <step.Illustration />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-light" />
                      </div>
                      <h3 className="text-lg font-bold font-cairo text-text-primary">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile/Tablet: Vertical timeline */}
        <motion.div
          className="lg:hidden relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical gradient line */}
          <div
            className="absolute top-0 bottom-0 right-[31px] w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(37,99,235,0.5), rgba(245,158,11,0.3), rgba(124,58,237,0.5))",
            }}
          />

          <div className="flex flex-col gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={stepVariants}
                  className="flex gap-5 items-start"
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0">
                    <div className="w-[64px] h-[64px] rounded-2xl p-[2px] bg-gradient-to-br from-primary via-accent to-secondary">
                      <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center">
                        <span className="text-lg font-bold font-cairo gradient-text">
                          {step.num}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 card-premium rounded-xl overflow-hidden">
                    {/* Small illustration header */}
                    <div className={`h-20 bg-gradient-to-b ${step.gradient} overflow-hidden`}>
                      <div className="w-full h-full text-primary-light p-1">
                        <step.Illustration />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary-light" />
                        <h3 className="text-base font-bold font-cairo text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
