"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Building,
  ArrowLeft,
  Quote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import GradientBackground from "@/components/shared/GradientBackground";
import ProjectThumbnail from "@/components/shared/ProjectThumbnail";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function AnimatedMetricCard({
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

    // Extract numeric part for animation
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
            const formatted = numVal >= 100 ? Math.round(v).toLocaleString() : v.toFixed(numVal % 1 !== 0 ? 1 : 0);
            setDisplayValue(`${prefix}${formatted}${suffix}`);
          },
        });
        return () => controls.stop();
      }
    }

    // Non-numeric values show immediately
    setDisplayValue(value);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="text-center p-8 h-full">
        <div className="text-h2 font-bold font-cairo gradient-text mb-3">
          {displayValue}
        </div>
        <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
          {metric}
        </h3>
        <p className="text-sm text-text-secondary font-tajawal">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}

function GalleryPlaceholder({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  const gradients = [
    "from-primary/30 via-accent/20 to-secondary/30",
    "from-accent/30 via-primary/20 to-secondary/30",
    "from-secondary/30 via-accent/20 to-primary/30",
  ];

  const patterns = [
    // Dashboard mockup
    <svg key="0" viewBox="0 0 400 250" className="w-full h-full opacity-40">
      <rect x="20" y="20" width="360" height="30" rx="6" fill="currentColor" opacity="0.3" />
      <rect x="20" y="70" width="170" height="100" rx="8" fill="currentColor" opacity="0.2" />
      <rect x="210" y="70" width="170" height="100" rx="8" fill="currentColor" opacity="0.2" />
      <rect x="20" y="190" width="360" height="40" rx="8" fill="currentColor" opacity="0.15" />
      <circle cx="50" cy="120" r="20" fill="currentColor" opacity="0.25" />
      <rect x="240" y="90" width="110" height="10" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="240" y="110" width="80" height="10" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="240" y="130" width="120" height="10" rx="3" fill="currentColor" opacity="0.25" />
    </svg>,
    // Mobile mockup
    <svg key="1" viewBox="0 0 400 250" className="w-full h-full opacity-40">
      <rect x="140" y="10" width="120" height="230" rx="16" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="150" y="40" width="100" height="15" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="150" y="65" width="100" height="60" rx="8" fill="currentColor" opacity="0.15" />
      <rect x="150" y="135" width="100" height="10" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="150" y="155" width="70" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="150" y="180" width="100" height="30" rx="6" fill="currentColor" opacity="0.2" />
      <circle cx="200" cy="228" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>,
    // Chart mockup
    <svg key="2" viewBox="0 0 400 250" className="w-full h-full opacity-40">
      <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="40" y1="150" x2="360" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.1" strokeDasharray="4" />
      <line x1="40" y1="100" x2="360" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.1" strokeDasharray="4" />
      <rect x="60" y="120" width="40" height="80" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="120" y="80" width="40" height="120" rx="4" fill="currentColor" opacity="0.3" />
      <rect x="180" y="140" width="40" height="60" rx="4" fill="currentColor" opacity="0.2" />
      <rect x="240" y="60" width="40" height="140" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="300" y="100" width="40" height="100" rx="4" fill="currentColor" opacity="0.28" />
      <text x="200" y="30" textAnchor="middle" fill="currentColor" fontSize="14" opacity="0.3" fontFamily="sans-serif">Analytics</text>
    </svg>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-border aspect-video",
        "bg-gradient-to-br",
        gradients[index % 3]
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center text-primary">
        {patterns[index % 3]}
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
        <p className="text-sm text-text-secondary font-tajawal">
          {index === 0 && "واجهة المستخدم الرئيسية"}
          {index === 1 && "تصميم الموبايل"}
          {index === 2 && "لوحة التحكم والتحليلات"}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GradientBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm font-tajawal text-text-secondary">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <ChevronLeft className="w-4 h-4" />
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-primary transition-colors"
                >
                  أعمالنا
                </Link>
              </li>
              <li>
                <ChevronLeft className="w-4 h-4" />
              </li>
              <li className="text-primary font-medium">{project.title}</li>
            </ol>
          </motion.nav>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              variant={
                project.category === "mobile"
                  ? "accent"
                  : project.category === "systems"
                  ? "secondary"
                  : "primary"
              }
            >
              {project.categoryLabel}
            </Badge>

            <h1 className="text-h1 font-bold font-cairo gradient-text mt-4 mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary font-tajawal leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-text-secondary font-tajawal">
                <Building className="w-5 h-5 text-primary" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-tajawal">
                <Calendar className="w-5 h-5 text-accent" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-tajawal">
                <Clock className="w-5 h-5 text-secondary" />
                <span>{project.duration}</span>
              </div>
              <Badge variant="secondary">{project.industry}</Badge>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="mt-12 max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <ProjectThumbnail
              category={project.category}
              title={project.title}
              size="lg"
              className="shadow-2xl shadow-primary/10"
            />
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Problem Section */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <SectionHeading
                title="التحدي"
                subtitle="المشكلة اللي كان العميل بيواجهها"
              />
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-r-4 border-r-error/50">
                <p className="text-text-secondary text-lg font-tajawal leading-loose">
                  {project.problem}
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-surface/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <SectionHeading
                title="الحل"
                subtitle="إزاي ساعدنا العميل يتغلب على التحدي"
              />
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-r-4 border-r-success/50">
                <p className="text-text-secondary text-lg font-tajawal leading-loose">
                  {project.solution}
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Results Section */}
      <section className="section-padding">
        <Container>
          <motion.div {...fadeInUp}>
            <SectionHeading
              title="النتائج"
              subtitle="أرقام حقيقية تثبت نجاح المشروع"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {project.results.map((result, i) => (
              <AnimatedMetricCard
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

      {/* Tech Stack */}
      <section className="section-padding bg-surface/50">
        <Container>
          <motion.div {...fadeInUp}>
            <SectionHeading
              title="التقنيات المستخدمة"
              subtitle="الأدوات والتقنيات اللي استخدمناها في المشروع"
            />
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Badge
                  variant={
                    i % 3 === 0
                      ? "primary"
                      : i % 3 === 1
                      ? "accent"
                      : "secondary"
                  }
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <Container>
          <motion.div {...fadeInUp}>
            <SectionHeading
              title="معرض الصور"
              subtitle="لقطات من واجهات المشروع"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[0, 1, 2].map((index) => (
              <GalleryPlaceholder
                key={index}
                index={index}
                title={project.title}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="section-padding bg-surface/50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-10 relative overflow-hidden">
                  {/* Decorative Quote */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-24 h-24 text-primary" />
                  </div>

                  <div className="relative z-10">
                    <blockquote className="text-xl sm:text-2xl text-text-primary font-tajawal leading-loose mb-8">
                      &ldquo;{project.testimonial.text}&rdquo;
                    </blockquote>

                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                        <span className="text-white font-bold font-cairo text-lg">
                          {project.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-text-primary font-bold font-cairo text-lg">
                          {project.testimonial.author}
                        </p>
                        <p className="text-text-secondary font-tajawal text-sm">
                          {project.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-primary via-accent to-secondary" />
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <GradientBackground />
        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-bold font-cairo gradient-text mb-6">
              عندك مشروع مشابه؟
            </h2>
            <p className="text-text-secondary text-lg font-tajawal mb-4 leading-relaxed">
              تواصل معنا وخلينا نحقق لك نفس النتائج الاستثنائية
            </p>
            <p className="text-accent font-semibold font-tajawal mb-8">
              استشارة مجانية + عرض سعر مخصص
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                تواصل معنا
              </Button>
              <Button href="/portfolio" size="lg" variant="ghost">
                <ArrowLeft className="w-5 h-5 ml-2" />
                كل الأعمال
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-h2 font-bold font-cairo gradient-text mb-4">
        {title}
      </h2>
      <p className="text-text-secondary text-lg font-tajawal max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
