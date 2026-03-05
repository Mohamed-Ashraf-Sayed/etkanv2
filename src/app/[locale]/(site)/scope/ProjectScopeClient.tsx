"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  RotateCcw,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Zap,
  Cpu,
  Lightbulb,
  Code2,
  Target,
  TrendingUp,
  Shield,
  Rocket,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface WordPressOption {
  recommended: boolean;
  estimatedWeeks: number;
  budgetRange: { min: number; max: number; currency: string };
  techStack: string[];
  pros: string[];
  cons: string[];
  description: string;
}

interface ProjectScope {
  projectName: string;
  projectNameEn: string;
  type: string;
  phases: { name: string; duration: string; tasks: string[] }[];
  techStack: string[];
  estimatedWeeks: number;
  budgetRange: { min: number; max: number; currency: string };
  teamSize: number;
  features: string[];
  risks: string[];
  summary: string;
  canBeWordPress?: boolean;
  wordPressOption?: WordPressOption | null;
}

// --- Analyzing Animation ---
function AnalyzingAnimation({ t }: { t: ReturnType<typeof useTranslations> }) {
  const icons = [
    { icon: Lightbulb, color: "#F59E0B", label: "Analyzing" },
    { icon: Code2, color: "#3B82F6", label: "Planning" },
    { icon: Layers, color: "#8B5CF6", label: "Structuring" },
    { icon: Cpu, color: "#10B981", label: "Estimating" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-24"
    >
      <div className="relative w-40 h-40 mb-10">
        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-accent)]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-3 rounded-full border border-[var(--color-accent)]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting icons */}
        {icons.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className="absolute w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: `${item.color}15`,
                border: `1px solid ${item.color}25`,
                left: "50%",
                top: "50%",
                marginLeft: -22,
                marginTop: -22,
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 58,
                  Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 58,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 58,
                  Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 58,
                ],
                scale: [1, 1.15, 1],
              }}
              transition={{
                x: { duration: 4, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Icon className="w-5 h-5" style={{ color: item.color }} />
            </motion.div>
          );
        })}

        {/* Center pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/70 flex items-center justify-center shadow-xl shadow-[var(--color-accent)]/25"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        </div>
      </div>

      <motion.h3
        className="text-xl font-bold font-cairo text-[var(--color-text-primary)] mb-2"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {t("analyzing")}
      </motion.h3>
      <p className="text-sm text-[var(--color-text-muted)] font-cairo">
        {t("analyzingDesc")}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[var(--color-accent)]"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- Phase Timeline Card ---
function PhaseCard({
  phase,
  index,
}: {
  phase: { name: string; duration: string; tasks: string[] };
  index: number;
}) {
  const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="relative bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 hover:border-[var(--color-accent)]/20 transition-all duration-300 h-full overflow-hidden">
        {/* Top accent bar */}
        <div
          className="absolute top-0 inset-x-0 h-1 transition-all duration-300 group-hover:h-1.5"
          style={{ backgroundColor: color }}
        />

        {/* Phase number badge */}
        <div className="flex items-center gap-3 mb-4 mt-1">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: color }}
          >
            {index + 1}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold font-cairo text-[var(--color-text-primary)] text-sm leading-tight">
              {phase.name}
            </h4>
            <p className="text-xs font-cairo flex items-center gap-1 mt-0.5" style={{ color }}>
              <Clock className="w-3 h-3" />
              {phase.duration}
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          {phase.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color }} />
              <span className="leading-relaxed">{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// --- Results View ---
function ResultsView({
  scope,
  t,
  locale,
}: {
  scope: ProjectScope;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const isRTL = locale === "ar";
  const projectName = isRTL ? scope.projectName : scope.projectNameEn;
  const formatNumber = (n: number) => n.toLocaleString(isRTL ? "ar-EG" : "en-US");

  return (
    <>
      {/* Results Header - Navy section */}
      <section className="relative py-16 section-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 end-20 w-80 h-80 bg-[var(--color-accent)]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 start-10 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        </div>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <Container className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-bold font-cairo mb-6">
                <Sparkles className="w-4 h-4" />
                {t("resultTitle")}
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-h2 font-bold font-cairo text-white mb-4">
              {projectName}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 font-cairo max-w-2xl mx-auto leading-relaxed mb-10">
              {scope.summary}
            </motion.p>

            {/* Metric Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  label: t("timeline"),
                  value: `${scope.estimatedWeeks} ${t("weeks")}`,
                  color: "#3B82F6",
                },
                {
                  icon: DollarSign,
                  label: t("budget"),
                  value: `${formatNumber(scope.budgetRange.min)} - ${formatNumber(scope.budgetRange.max)}`,
                  sub: scope.budgetRange.currency,
                  color: "#10B981",
                },
                {
                  icon: Users,
                  label: t("team"),
                  value: `${scope.teamSize} ${t("members")}`,
                  color: "#8B5CF6",
                },
                {
                  icon: Layers,
                  label: t("features"),
                  value: `${scope.features.length}`,
                  color: "#F59E0B",
                },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="group relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 text-center hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 backdrop-blur-sm"
                  >
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: metric.color }} />
                    </div>
                    <div className="text-xs text-white/40 font-cairo mb-1.5">
                      {metric.label}
                    </div>
                    <div className="font-bold font-cairo text-white text-lg">
                      {metric.value}
                    </div>
                    {metric.sub && (
                      <div className="text-[11px] text-white/30 font-cairo mt-0.5">{metric.sub}</div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* WordPress Comparison */}
      {scope.canBeWordPress && scope.wordPressOption && (
        <>
          <div className="section-divider" />
          <section className="relative section-padding">
            <Container>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.div variants={fadeUp} className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-bold font-cairo mb-4">
                    <Layers className="w-4 h-4" />
                    {t("wpCompareTitle")}
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] font-cairo max-w-xl mx-auto">
                    {t("wpCompareDesc")}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Custom Development Card */}
                  <motion.div
                    variants={fadeUp}
                    className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-blue-500 via-purple-500 to-blue-600" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-bold font-cairo text-[var(--color-text-primary)]">
                              {t("wpCustomTitle")}
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)] font-cairo">{t("wpCustomSub")}</p>
                          </div>
                        </div>
                        {!scope.wordPressOption.recommended && (
                          <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold font-cairo border border-[var(--color-accent)]/20">
                            {t("wpRecommended")}
                          </span>
                        )}
                      </div>

                      {/* Custom metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-3 text-center">
                          <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                          <div className="text-xs text-[var(--color-text-muted)] font-cairo">{t("timeline")}</div>
                          <div className="font-bold font-cairo text-[var(--color-text-primary)] text-sm">
                            {scope.estimatedWeeks} {t("weeks")}
                          </div>
                        </div>
                        <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-3 text-center">
                          <DollarSign className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                          <div className="text-xs text-[var(--color-text-muted)] font-cairo">{t("budget")}</div>
                          <div className="font-bold font-cairo text-[var(--color-text-primary)] text-sm">
                            {formatNumber(scope.budgetRange.min)} - {formatNumber(scope.budgetRange.max)}
                          </div>
                          <div className="text-[10px] text-[var(--color-text-muted)]">{scope.budgetRange.currency}</div>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {scope.techStack.slice(0, 5).map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-500/8 text-blue-600 dark:text-blue-400 text-xs font-medium font-cairo border border-blue-500/10">
                            {tech}
                          </span>
                        ))}
                        {scope.techStack.length > 5 && (
                          <span className="px-2.5 py-1 rounded-lg bg-blue-500/5 text-blue-400 text-xs font-cairo">
                            +{scope.techStack.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Pros */}
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                          <span>{t("wpCustomPro1")}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                          <span>{t("wpCustomPro2")}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                          <span>{t("wpCustomPro3")}</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* WordPress Card */}
                  <motion.div
                    variants={fadeUp}
                    className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-[#21759b] via-[#21759b] to-[#464646]" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#21759b]/10 flex items-center justify-center">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#21759b">
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.33.31-2.588.86-3.706L8.38 19.728A8.555 8.555 0 013.443 12zm8.557 8.557c-.883 0-1.733-.14-2.53-.399l2.686-7.804 2.752 7.542a.802.802 0 00.06.116 8.532 8.532 0 01-2.968.545zm1.218-12.555c.54-.027 1.025-.084 1.025-.084.483-.057.426-.765-.057-.738 0 0-1.453.114-2.39.114-.882 0-2.362-.114-2.362-.114-.483-.027-.54.71-.057.738 0 0 .458.057.94.084l1.396 3.826-1.963 5.885L7.21 9.002c.54-.028 1.025-.085 1.025-.085.483-.057.426-.765-.057-.738 0 0-1.452.114-2.39.114-.168 0-.365-.004-.573-.013A8.53 8.53 0 0112 3.443c2.39 0 4.57.98 6.13 2.562-.04-.002-.077-.008-.118-.008-.882 0-1.508.768-1.508 1.594 0 .738.426 1.365.882 2.103.342.597.74 1.365.74 2.474 0 .768-.295 1.66-.683 2.904l-.895 2.99-3.24-9.632zm3.543 12.293l2.707-7.825c.506-1.264.674-2.275.674-3.175 0-.326-.022-.629-.06-.91A8.536 8.536 0 0120.557 12a8.55 8.55 0 01-3.796 7.295z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold font-cairo text-[var(--color-text-primary)]">
                              {t("wpWordPressTitle")}
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)] font-cairo">{t("wpWordPressSub")}</p>
                          </div>
                        </div>
                        {scope.wordPressOption.recommended && (
                          <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold font-cairo border border-[var(--color-accent)]/20">
                            {t("wpRecommended")}
                          </span>
                        )}
                      </div>

                      {/* WP metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="rounded-xl bg-[#21759b]/5 border border-[#21759b]/10 p-3 text-center">
                          <Clock className="w-4 h-4 text-[#21759b] mx-auto mb-1" />
                          <div className="text-xs text-[var(--color-text-muted)] font-cairo">{t("timeline")}</div>
                          <div className="font-bold font-cairo text-[var(--color-text-primary)] text-sm">
                            {scope.wordPressOption.estimatedWeeks} {t("weeks")}
                          </div>
                        </div>
                        <div className="rounded-xl bg-[#21759b]/5 border border-[#21759b]/10 p-3 text-center">
                          <DollarSign className="w-4 h-4 text-[#21759b] mx-auto mb-1" />
                          <div className="text-xs text-[var(--color-text-muted)] font-cairo">{t("budget")}</div>
                          <div className="font-bold font-cairo text-[var(--color-text-primary)] text-sm">
                            {formatNumber(scope.wordPressOption.budgetRange.min)} - {formatNumber(scope.wordPressOption.budgetRange.max)}
                          </div>
                          <div className="text-[10px] text-[var(--color-text-muted)]">{scope.wordPressOption.budgetRange.currency}</div>
                        </div>
                      </div>

                      {/* WP Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {scope.wordPressOption.techStack.map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-[#21759b]/8 text-[#21759b] dark:text-[#5aafc5] text-xs font-medium font-cairo border border-[#21759b]/10">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Pros */}
                      <ul className="space-y-2 mb-4">
                        {scope.wordPressOption.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Cons */}
                      <ul className="space-y-2">
                        {scope.wordPressOption.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] font-cairo">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>

                      {/* WP Description */}
                      <p className="text-xs text-[var(--color-text-muted)] font-cairo mt-4 p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                        {scope.wordPressOption.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>
          </section>
        </>
      )}

      <div className="section-divider" />

      {/* Phases Timeline */}
      <section className="relative section-padding">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-cairo text-[var(--color-text-primary)]">
                  {t("phases")}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] font-cairo">
                  {scope.phases.length} {t("phasesCount")}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
              {scope.phases.map((phase, i) => (
                <PhaseCard key={i} phase={phase} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Tech Stack + Features */}
      <section className="relative section-padding section-alt">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Tech Stack */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all duration-300"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-blue-500 group-hover:h-1.5 transition-all duration-300" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold font-cairo text-[var(--color-text-primary)]">
                    {t("techStack")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scope.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="px-3.5 py-2 rounded-xl bg-blue-500/8 text-blue-600 dark:text-blue-400 text-sm font-semibold font-cairo border border-blue-500/12 hover:bg-blue-500/15 hover:border-blue-500/25 transition-all duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all duration-300"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 group-hover:h-1.5 transition-all duration-300" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold font-cairo text-[var(--color-text-primary)]">
                    {t("features")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {scope.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] font-cairo"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Risks */}
      {scope.risks.length > 0 && (
        <>
          <div className="section-divider" />
          <section className="relative section-padding">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold font-cairo text-[var(--color-text-primary)]">
                      {t("risks")}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6">
                    <ul className="space-y-3">
                      {scope.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-cairo text-amber-700/80 dark:text-amber-300/80">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-center text-[var(--color-text-muted)] font-cairo mt-6">
                    * {t("disclaimer")}
                  </p>
                </div>
              </motion.div>
            </Container>
          </section>
        </>
      )}

      <div className="section-divider" />

      {/* CTA Section */}
      <section className="relative section-padding section-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-h2 font-bold font-cairo text-white mb-4">
              {t("ctaTitle")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 font-cairo mb-8 leading-relaxed">
              {t("ctaSub")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Button href="/booking" variant="gold" className="gap-2">
                {t("bookConsultation")}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/contact" variant="outline-light">
                {t("contactUs")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

// --- Main Component ---
export default function ProjectScopeClient() {
  const t = useTranslations("scope");
  const locale = useLocale();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scope, setScope] = useState<ProjectScope | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (description.trim().length < 10) {
      setError(t("errorShort"));
      return;
    }

    setError("");
    setIsLoading(true);
    setScope(null);

    try {
      const res = await fetch("/api/scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, locale }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setScope(data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch {
      setError(t("errorGeneral"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScope(null);
    setDescription("");
    setError("");
  };

  const handleExample = (text: string) => {
    setDescription(text);
    setScope(null);
    setError("");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden section-navy">
        <div className="absolute inset-0">
          <div className="absolute top-20 start-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 end-10 w-96 h-96 bg-[var(--color-accent)]/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: t("title") }]} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <div className="mb-6">
                <Badge variant="gold">
                  <Sparkles className="w-4 h-4 inline-block me-1.5 -mt-0.5" />
                  {t("badge")}
                </Badge>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-h1 font-bold font-cairo text-white mb-4">
              {t("title")}
            </motion.h1>
            <motion.div variants={fadeUp} className="gold-line mb-6" />
            <motion.p variants={fadeUp} className="text-lg text-white/60 font-cairo max-w-2xl leading-relaxed">
              {t("subtitle")}
            </motion.p>

            {/* Mini features in hero */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-8">
              {[
                { icon: Target, label: t("heroFeature1") },
                { icon: Cpu, label: t("heroFeature2") },
                { icon: Zap, label: t("heroFeature3") },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <span className="text-sm text-white/40 font-cairo">{item.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Input Section - Dark gradient background like tech radar */}
      <section className="relative py-16 bg-gradient-to-b from-[var(--color-navy)] via-[#0d2347] to-[var(--color-navy)]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Input Card */}
            <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-l from-[var(--color-accent)] via-purple-500 to-blue-500" />

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-bold font-cairo text-white text-sm">{t("inputTitle")}</h3>
                    <p className="text-xs text-white/40 font-cairo">{t("inputSub")}</p>
                  </div>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                  placeholder={t("placeholder")}
                  rows={4}
                  disabled={isLoading}
                  className="w-full bg-white/[0.04] rounded-xl border border-white/[0.08] p-4 text-white font-cairo text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/40 transition-all placeholder:text-white/20 disabled:opacity-50"
                  dir="auto"
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-cairo mt-3"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {!scope ? (
                    <motion.button
                      onClick={handleAnalyze}
                      disabled={isLoading || description.trim().length < 5}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[var(--color-accent)] text-white font-cairo font-bold text-sm shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/35 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Sparkles className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {isLoading ? t("analyzing") : t("analyze")}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleReset}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/[0.06] text-white/70 font-cairo font-bold text-sm border border-white/[0.1] hover:bg-white/[0.1] hover:text-white transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t("tryAgain")}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Quick examples */}
              {!scope && !isLoading && (
                <div className="px-6 md:px-8 pb-6 border-t border-white/[0.05] pt-5">
                  <p className="text-xs text-white/25 font-cairo mb-3">
                    {t("examples")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[t("example1"), t("example2"), t("example3"), t("example4")].map(
                      (example, i) => (
                        <button
                          key={i}
                          onClick={() => handleExample(example)}
                          className="px-3.5 py-2 rounded-xl bg-white/[0.03] text-xs text-white/35 font-cairo hover:bg-white/[0.07] hover:text-white/60 transition-all border border-white/[0.05] hover:border-white/[0.1]"
                        >
                          {example}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Loading Animation */}
            <AnimatePresence mode="wait">
              {isLoading && <AnalyzingAnimation key="loading" t={t} />}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Results */}
      <div ref={resultRef}>
        <AnimatePresence mode="wait">
          {scope && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ResultsView scope={scope} t={t} locale={locale} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Default CTA when no results */}
      {!scope && !isLoading && (
        <>
          <div className="section-divider" />
          <section className="relative section-padding section-navy overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
            </div>
            <Container className="relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center max-w-2xl mx-auto"
              >
                <motion.div variants={fadeUp}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-h2 font-bold font-cairo text-white mb-4">
                  {t("ctaTitle")}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/50 font-cairo mb-8 leading-relaxed">
                  {t("ctaSub")}
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                  <Button href="/booking" variant="gold" className="gap-2">
                    {t("bookConsultation")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button href="/contact" variant="outline-light">
                    {t("contactUs")}
                  </Button>
                </motion.div>
              </motion.div>
            </Container>
          </section>
        </>
      )}
    </>
  );
}
