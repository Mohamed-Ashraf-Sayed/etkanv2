"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Building,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/data/projects";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

/* ── Animated Result Card ── */
function ResultCard({
  metric,
  value,
  description,
  index,
}: {
  metric: string;
  value: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/[\d,.]+/);
    if (numericMatch) {
      const numStr = numericMatch[0].replace(/,/g, "");
      const numVal = parseFloat(numStr);
      const prefix = value.substring(0, value.indexOf(numericMatch[0]));
      const suffix = value.substring(
        value.indexOf(numericMatch[0]) + numericMatch[0].length
      );

      if (!isNaN(numVal) && numVal > 0) {
        const controls = animate(0, numVal, {
          duration: 2,
          ease: "easeOut",
          onUpdate(v) {
            const formatted =
              numVal >= 100
                ? Math.round(v).toLocaleString()
                : v.toFixed(numVal % 1 !== 0 ? 1 : 0);
            setDisplayValue(`${prefix}${formatted}${suffix}`);
          },
        });
        return () => controls.stop();
      }
    }
    setDisplayValue(value);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-black font-cairo text-accent mb-2 leading-none">
        {displayValue}
      </div>
      <h3 className="text-sm font-bold font-cairo text-white mb-1">
        {metric}
      </h3>
      <p className="text-xs text-white/50 font-cairo">{description}</p>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-navy overflow-hidden">
        {/* Subtle decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10 pt-32 lg:pt-40 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm font-cairo text-white/50">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent transition-colors duration-200"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <ChevronLeft className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-accent transition-colors duration-200"
                >
                  أعمالنا
                </Link>
              </li>
              <li>
                <ChevronLeft className="w-3.5 h-3.5" />
              </li>
              <li className="text-accent">{project.title}</li>
            </ol>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Title & Description */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <Badge variant="gold">{project.categoryLabel}</Badge>

              <h1 className="text-display font-bold font-cairo text-white mt-5 mb-6">
                {project.title}
              </h1>

              <div className="w-16 h-0.5 bg-accent mb-6" />

              <p className="text-lg text-white/65 font-cairo leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </motion.div>

            {/* Right: Project Info Card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-6 lg:p-8">
                <h3 className="text-sm font-bold font-cairo text-accent mb-6 uppercase tracking-wider">
                  تفاصيل المشروع
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-cairo">
                        العميل
                      </p>
                      <p className="text-sm text-white font-cairo font-medium">
                        {project.client}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-cairo">
                        المجال
                      </p>
                      <p className="text-sm text-white font-cairo font-medium">
                        {project.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-cairo">السنة</p>
                      <p className="text-sm text-white font-cairo font-medium">
                        {project.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-cairo">المدة</p>
                      <p className="text-sm text-white font-cairo font-medium">
                        {project.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack inside card */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-white/40 font-cairo mb-3">
                    التقنيات
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 font-cairo"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA inside card */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button
                    href="/contact"
                    variant="gold"
                    size="md"
                    className="w-full"
                  >
                    عندك مشروع مشابه؟
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════ RESULTS BAR ═══════════════ */}
      <section className="bg-navy border-t border-white/10">
        <Container className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {project.results.map((result, i) => (
              <ResultCard
                key={i}
                metric={result.metric}
                value={result.value}
                description={result.description}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ PROBLEM & SOLUTION ═══════════════ */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Problem */}
            <motion.div {...fadeIn}>
              <div className="rounded-2xl bg-surface border border-border p-8 lg:p-10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-lg font-bold">!</span>
                  </div>
                  <h2 className="text-h3 font-bold font-cairo text-text-primary">
                    التحدي
                  </h2>
                </div>
                <p className="text-text-secondary font-cairo leading-loose">
                  {project.problem}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              {...fadeIn}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <div className="rounded-2xl bg-surface border border-border p-8 lg:p-10 h-full border-t-2 border-t-accent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-h3 font-bold font-cairo text-text-primary">
                    الحل
                  </h2>
                </div>
                <p className="text-text-secondary font-cairo leading-loose">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="section-padding section-alt">
        <Container>
          <motion.div {...fadeIn} className="text-center mb-12">
            <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
            <h2 className="text-h2 font-bold font-cairo text-text-primary">
              لقطات من المشروع
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                label: "واجهة المستخدم الرئيسية",
                svg: (
                  <svg
                    viewBox="0 0 400 250"
                    className="w-full h-full opacity-30"
                  >
                    <rect
                      x="20"
                      y="20"
                      width="360"
                      height="30"
                      rx="6"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="20"
                      y="70"
                      width="170"
                      height="100"
                      rx="8"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <rect
                      x="210"
                      y="70"
                      width="170"
                      height="100"
                      rx="8"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <rect
                      x="20"
                      y="190"
                      width="360"
                      height="40"
                      rx="8"
                      fill="currentColor"
                      opacity="0.15"
                    />
                  </svg>
                ),
              },
              {
                label: "تصميم الموبايل",
                svg: (
                  <svg
                    viewBox="0 0 400 250"
                    className="w-full h-full opacity-30"
                  >
                    <rect
                      x="140"
                      y="10"
                      width="120"
                      height="230"
                      rx="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <rect
                      x="150"
                      y="40"
                      width="100"
                      height="15"
                      rx="4"
                      fill="currentColor"
                      opacity="0.25"
                    />
                    <rect
                      x="150"
                      y="65"
                      width="100"
                      height="60"
                      rx="8"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <rect
                      x="150"
                      y="135"
                      width="100"
                      height="10"
                      rx="3"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <rect
                      x="150"
                      y="180"
                      width="100"
                      height="30"
                      rx="6"
                      fill="currentColor"
                      opacity="0.2"
                    />
                  </svg>
                ),
              },
              {
                label: "لوحة التحكم والتحليلات",
                svg: (
                  <svg
                    viewBox="0 0 400 250"
                    className="w-full h-full opacity-30"
                  >
                    <line
                      x1="40"
                      y1="200"
                      x2="360"
                      y2="200"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                    <rect
                      x="60"
                      y="120"
                      width="40"
                      height="80"
                      rx="4"
                      fill="currentColor"
                      opacity="0.25"
                    />
                    <rect
                      x="120"
                      y="80"
                      width="40"
                      height="120"
                      rx="4"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="180"
                      y="140"
                      width="40"
                      height="60"
                      rx="4"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <rect
                      x="240"
                      y="60"
                      width="40"
                      height="140"
                      rx="4"
                      fill="currentColor"
                      opacity="0.35"
                    />
                    <rect
                      x="300"
                      y="100"
                      width="40"
                      height="100"
                      rx="4"
                      fill="currentColor"
                      opacity="0.28"
                    />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="relative rounded-2xl overflow-hidden border border-border aspect-video bg-surface group hover:border-accent/30 transition-all duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center text-text-muted p-8">
                  {item.svg}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-sm text-text-secondary font-cairo font-medium">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>


      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-navy">
        <Container className="py-16 lg:py-20">
          <motion.div className="text-center max-w-2xl mx-auto" {...fadeIn}>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-4">
              عندك مشروع مشابه؟
            </h2>
            <p className="text-white/60 font-cairo mb-3 leading-relaxed">
              تواصل معنا وخلينا نحقق لك نفس النتائج الاستثنائية
            </p>
            <p className="text-accent text-sm font-semibold font-cairo mb-8">
              استشارة مجانية + عرض سعر مخصص
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg" variant="gold">
                تواصل معنا
              </Button>
              <Button
                href="/portfolio"
                size="lg"
                variant="ghost"
                className="text-white/70 hover:text-accent"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                كل الأعمال
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
