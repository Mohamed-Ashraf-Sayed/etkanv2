"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Building,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";
import Image from "next/image";
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

/* ── Lightbox ── */
function ImageLightbox({
  images,
  startIdx,
  onClose,
}: {
  images: string[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 left-5 p-2.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 right-6 text-white/50 text-sm font-cairo z-10">
        {idx + 1} / {images.length}
      </div>

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white/70 hover:bg-accent/20 hover:text-accent transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white/70 hover:bg-accent/20 hover:text-accent transition-all z-10 rotate-180"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-[90vw] max-w-6xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Image ${idx + 1}`}
          fill
          className="object-contain rounded-lg"
          unoptimized
        />
      </motion.div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-black/50 backdrop-blur-sm">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className={`relative w-14 h-9 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                i === idx
                  ? "border-accent scale-110 shadow-lg shadow-accent/20"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── Main Component ── */
export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const t = useTranslations("projectDetail");
  const tn = useTranslations("nav");
  const tp = useTranslations("portfolio");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const allImages = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...(project.images || []),
  ];

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
                  {tn("home")}
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
                  {tp("title")}
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
                  {t("details")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-cairo">
                        {t("client")}
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
                        {t("industry")}
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
                      <p className="text-xs text-white/40 font-cairo">{t("year")}</p>
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
                      <p className="text-xs text-white/40 font-cairo">{t("duration")}</p>
                      <p className="text-sm text-white font-cairo font-medium">
                        {project.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack inside card */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-white/40 font-cairo mb-3">
                    {t("technologies")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => {
                      const colors = [
                        "bg-accent/10 text-accent border-accent/20",
                        "bg-blue-400/10 text-blue-300 border-blue-400/20",
                        "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
                        "bg-purple-400/10 text-purple-300 border-purple-400/20",
                      ];
                      return (
                        <span
                          key={tech}
                          className={`text-[11px] px-2.5 py-1 rounded-md border font-cairo ${colors[idx % colors.length]}`}
                        >
                          {tech}
                        </span>
                      );
                    })}
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
                    {t("similarProject")}
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
                    {t("challenge")}
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
                    {t("solution")}
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
      {allImages.length > 0 && (
        <section className="section-padding section-alt overflow-hidden">
          <Container>
            <motion.div {...fadeIn} className="text-center mb-14">
              <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
              <h2 className="text-h2 font-bold font-cairo text-text-primary">
                {t("gallery")}
              </h2>
            </motion.div>

            {/* Premium Bento Grid */}
            <div className="max-w-6xl mx-auto">
              {allImages.length === 1 ? (
                /* Single image — hero style */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden border border-border aspect-video bg-surface group hover:border-accent/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-accent/5"
                  onClick={() => setLightboxIdx(0)}
                >
                  <Image
                    src={allImages[0]}
                    alt={`${project.title} - 1`}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    unoptimized
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-lg text-xs font-cairo opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t("gallery")}
                  </div>
                </motion.div>
              ) : allImages.length === 2 ? (
                /* Two images — side by side */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {allImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative rounded-2xl overflow-hidden border border-border aspect-video bg-surface group hover:border-accent/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-accent/5"
                      onClick={() => setLightboxIdx(i)}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        unoptimized
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* 3+ images — Bento grid */
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[220px]">
                  {allImages.map((img, i) => {
                    // Bento pattern: first image is large (2x2), rest fill in
                    const spanClass =
                      i === 0
                        ? "col-span-2 row-span-2"
                        : allImages.length <= 3 && i === allImages.length - 1
                        ? "col-span-2"
                        : "";

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.08,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className={`relative rounded-2xl overflow-hidden border border-border bg-surface group hover:border-accent/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-accent/5 ${spanClass}`}
                        onClick={() => setLightboxIdx(i)}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                          unoptimized
                          loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        {/* Expand icon on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <ImageLightbox
            images={allImages}
            startIdx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>


      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-navy">
        <Container className="py-16 lg:py-20">
          <motion.div className="text-center max-w-2xl mx-auto" {...fadeIn}>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/60 font-cairo mb-3 leading-relaxed">
              {t("ctaSub")}
            </p>
            <p className="text-accent text-sm font-semibold font-cairo mb-8">
              {t("ctaOffer")}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg" variant="gold">
                {t("ctaButton")}
              </Button>
              <Button
                href="/portfolio"
                size="lg"
                variant="ghost"
                className="text-white/70 hover:text-accent"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                {t("ctaAll")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
