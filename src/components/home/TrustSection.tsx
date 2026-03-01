"use client";

import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { stats } from "@/data/team";

const companies = [
  { name: "تقنية المستقبل", shape: "hexagon" },
  { name: "الخليج للتجارة", shape: "circle" },
  { name: "المتحدة للصناعات", shape: "square" },
  { name: "نيو ميديا", shape: "diamond" },
  { name: "الأمان المالي", shape: "hexagon" },
  { name: "سمارت سولوشنز", shape: "circle" },
  { name: "البناء الحديث", shape: "square" },
  { name: "الرواد للأعمال", shape: "diamond" },
];

function LogoShape({ shape }: { shape: string }) {
  switch (shape) {
    case "hexagon":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2L25.5 8.5V19.5L14 26L2.5 19.5V8.5L14 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      );
    case "circle":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle
            cx="14"
            cy="14"
            r="11"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      );
    case "square":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect
            x="4"
            y="4"
            width="20"
            height="20"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect
            x="14"
            y="3"
            width="15.5"
            height="15.5"
            rx="3"
            transform="rotate(45 14 3)"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function TrustSection() {
  return (
    <section className="section-padding relative section-gradient-2">
      <div className="noise-overlay absolute inset-0" />

      <Container className="relative z-10">
        {/* Heading */}
        <h2 className="text-h2 font-bold font-cairo text-center mb-4">
          <span className="text-text-primary">أكثر من </span>
          <span className="gradient-text">75 شركة</span>
          <span className="text-text-primary"> وثقت بنا</span>
        </h2>

        {/* Subtitle */}
        <p className="text-text-secondary text-lg font-tajawal text-center max-w-2xl mx-auto mb-12">
          نفتخر بثقة عملائنا ونعمل باستمرار لنكون شريكهم التقني الأول
        </p>

        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-premium rounded-2xl p-6 text-center"
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>

        {/* Company logos label */}
        <p className="text-center text-sm text-text-muted font-tajawal mb-8">
          عملاء وثقوا بنا
        </p>

        {/* Company logos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl border border-border/50 bg-surface/30 opacity-50 hover:opacity-100 hover:border-primary/20 transition-all duration-300"
            >
              <span className="text-text-muted">
                <LogoShape shape={company.shape} />
              </span>
              <span className="font-cairo font-semibold text-sm text-text-secondary">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
