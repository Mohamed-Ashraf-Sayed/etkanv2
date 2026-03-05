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
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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
}

// --- Analyzing Animation ---
function AnalyzingAnimation({ t }: { t: ReturnType<typeof useTranslations> }) {
  const steps = [
    { icon: Lightbulb, delay: 0 },
    { icon: Code2, delay: 0.3 },
    { icon: Layers, delay: 0.6 },
    { icon: Cpu, delay: 0.9 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      {/* Animated circles */}
      <div className="relative w-32 h-32 mb-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const angle = (i * 90 - 45) * (Math.PI / 180);
          const radius = 48;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={i}
              className="absolute w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center"
              style={{ left: `calc(50% + ${x}px - 20px)`, top: `calc(50% + ${y}px - 20px)` }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: step.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-5 h-5 text-[var(--color-accent)]" />
            </motion.div>
          );
        })}

        {/* Center spinner */}
        <motion.div
          className="absolute inset-0 m-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/70 flex items-center justify-center shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      <motion.h3
        className="text-xl font-bold font-cairo text-[var(--color-text-primary)] mb-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {t("analyzing")}
      </motion.h3>
      <p className="text-sm text-[var(--color-text-muted)] font-cairo">
        {t("analyzingDesc")}
      </p>
    </motion.div>
  );
}

// --- Timeline Phase Card ---
function PhaseCard({
  phase,
  index,
  total,
}: {
  phase: { name: string; duration: string; tasks: string[] };
  index: number;
  total: number;
}) {
  const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];
  const color = colors[index % colors.length];

  return (
    <motion.div variants={fadeUp} className="relative">
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-8 start-full w-full h-0.5 bg-gradient-to-l from-transparent" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
      )}

      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: color }} />

        {/* Phase number */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3 mt-1"
          style={{ backgroundColor: color }}
        >
          {index + 1}
        </div>

        <h4 className="font-bold font-cairo text-[var(--color-text-primary)] mb-1">
          {phase.name}
        </h4>
        <p className="text-xs font-cairo mb-3 flex items-center gap-1" style={{ color }}>
          <Clock className="w-3 h-3" />
          {phase.duration}
        </p>

        <ul className="space-y-1.5">
          {phase.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-cairo">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color }} />
              <span>{task}</span>
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
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Project Header */}
      <motion.div variants={fadeUp} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-bold font-cairo mb-4">
          <Sparkles className="w-4 h-4" />
          {t("resultTitle")}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-cairo text-[var(--color-text-primary)] mb-3">
          {projectName}
        </h2>
        <p className="text-[var(--color-text-muted)] font-cairo max-w-xl mx-auto">
          {scope.summary}
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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
            <div
              key={i}
              className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-4 text-center hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}12` }}
              >
                <Icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-cairo mb-1">
                {metric.label}
              </div>
              <div className="font-bold font-cairo text-[var(--color-text-primary)] text-sm">
                {metric.value}
              </div>
              {metric.sub && (
                <div className="text-[10px] text-[var(--color-text-muted)]">{metric.sub}</div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Phases Timeline */}
      <motion.div variants={fadeUp} className="mb-10">
        <h3 className="text-lg font-bold font-cairo text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[var(--color-accent)]" />
          {t("phases")}
        </h3>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {scope.phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} total={scope.phases.length} />
          ))}
        </motion.div>
      </motion.div>

      {/* Tech Stack + Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Tech Stack */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6"
        >
          <h3 className="font-bold font-cairo text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            {t("techStack")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {scope.techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1.5 rounded-lg bg-blue-500/8 text-blue-600 dark:text-blue-400 text-sm font-medium font-cairo border border-blue-500/15"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={fadeUp}
          className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6"
        >
          <h3 className="font-bold font-cairo text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            {t("features")}
          </h3>
          <ul className="space-y-2.5">
            {scope.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] font-cairo"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Risks */}
      {scope.risks.length > 0 && (
        <motion.div
          variants={fadeUp}
          className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5 mb-8"
        >
          <h3 className="font-bold font-cairo text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4" />
            {t("risks")}
          </h3>
          <ul className="space-y-1.5">
            {scope.risks.map((risk, i) => (
              <li key={i} className="text-sm text-amber-700/70 dark:text-amber-300/70 font-cairo flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0 mt-2" />
                {risk}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.p variants={fadeUp} className="text-xs text-center text-[var(--color-text-muted)] font-cairo mb-8">
        * {t("disclaimer")}
      </motion.p>
    </motion.div>
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
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden section-navy">
        <div className="absolute inset-0">
          <div className="absolute top-10 start-20 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 end-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Input Section */}
      <section className="relative section-padding">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Input Card */}
            <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                  placeholder={t("placeholder")}
                  rows={4}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-4 text-[var(--color-text-primary)] font-cairo text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-all placeholder:text-[var(--color-text-muted)]"
                  dir="auto"
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-cairo mt-3"
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-cairo font-bold text-sm shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-background)] text-[var(--color-text-secondary)] font-cairo font-bold text-sm border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t("tryAgain")}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Quick examples */}
              {!scope && !isLoading && (
                <div className="px-6 md:px-8 pb-6 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs text-[var(--color-text-muted)] font-cairo mb-3">
                    {t("examples")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[t("example1"), t("example2"), t("example3"), t("example4")].map(
                      (example, i) => (
                        <button
                          key={i}
                          onClick={() => handleExample(example)}
                          className="px-3 py-1.5 rounded-lg bg-[var(--color-background)] text-xs text-[var(--color-text-muted)] font-cairo hover:bg-[var(--color-border)] hover:text-[var(--color-text-secondary)] transition-all border border-transparent hover:border-[var(--color-border)]"
                        >
                          {example}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Loading / Results */}
            <div ref={resultRef} className="mt-10">
              <AnimatePresence mode="wait">
                {isLoading && <AnalyzingAnimation key="loading" t={t} />}
                {scope && !isLoading && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResultsView scope={scope} t={t} locale={locale} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      {scope && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative section-padding section-navy overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
          </div>
          <Container className="relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h2 className="text-h2 font-bold font-cairo text-white mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-white/50 font-cairo mb-8">{t("ctaSub")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/booking" variant="gold" className="gap-2">
                  {t("bookConsultation")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="outline-light">
                  {t("contactUs")}
                </Button>
              </div>
            </div>
          </Container>
        </motion.section>
      )}
    </>
  );
}
