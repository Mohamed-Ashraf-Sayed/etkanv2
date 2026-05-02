"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { getStats } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

const companiesAr = [
  { name: "تقنية المستقبل", logo: "/images/logos/logo-1.svg" },
  { name: "الخليج للتجارة", logo: "/images/logos/logo-2.svg" },
  { name: "المتحدة للصناعات", logo: "/images/logos/logo-3.svg" },
  { name: "نيو ميديا", logo: "/images/logos/logo-4.svg" },
  { name: "الأمان المالي", logo: "/images/logos/logo-5.svg" },
  { name: "سمارت سولوشنز", logo: "/images/logos/logo-6.svg" },
  { name: "البناء الحديث", logo: "/images/logos/logo-7.svg" },
  { name: "الرواد للأعمال", logo: "/images/logos/logo-8.svg" },
];

const companiesEn = [
  { name: "Future Tech", logo: "/images/logos/logo-1.svg" },
  { name: "Gulf Trading", logo: "/images/logos/logo-2.svg" },
  { name: "United Industries", logo: "/images/logos/logo-3.svg" },
  { name: "New Media", logo: "/images/logos/logo-4.svg" },
  { name: "Al-Aman Finance", logo: "/images/logos/logo-5.svg" },
  { name: "Smart Solutions", logo: "/images/logos/logo-6.svg" },
  { name: "Modern Construction", logo: "/images/logos/logo-7.svg" },
  { name: "Al-Rowad Business", logo: "/images/logos/logo-8.svg" },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
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

export default function TrustSection() {
  const t = useTranslations("trust");
  const locale = useLocale();
  const statsData = getStats(locale);
  const companies = locale === "en" ? companiesEn : companiesAr;

  return (
    <section className="section-padding section-alt">
      <Container>
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Stats counters */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {statsData.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <div className="group relative rounded-xl p-[1px] bg-gradient-to-b from-border via-border/40 to-transparent hover:from-accent/50 hover:via-accent/15 hover:to-transparent transition-all duration-500">
                <div className="rounded-xl bg-surface p-5 h-full text-center hover:bg-surface-light transition-colors duration-500">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    icon={stat.icon}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="gold-line mx-auto mb-10" />

        {/* Company logos label */}
        <p className="text-center text-base md:text-lg text-text-secondary font-cairo font-semibold mb-10 tracking-wide">
          {t("clientsLabel")}
        </p>

        {/* Company logos slider */}
        <div className="relative h-[80px] w-full overflow-hidden">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={48}
          >
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-surface shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 shrink-0"
                />
                <span className="font-cairo font-semibold text-sm text-text-secondary whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </Container>
    </section>
  );
}
