"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import InitialsAvatar from "@/components/shared/InitialsAvatar";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { getStats } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

const companiesAr = [
  { name: "عرب فيوتشر المحدودة" },
  { name: "شركة مسار" },
  { name: "مسارات" },
  { name: "جينيسيس للتعدين" },
  { name: "Art Vision" },
  { name: "القيروانة للمقاولات" },
  { name: "الصالح للقدرات التعليمية" },
  { name: "فواصل الجوف" },
  { name: "ميدة التأسيسية" },
  { name: "Klinicon" },
];

const companiesEn = [
  { name: "Arab Future Ltd" },
  { name: "Masar Company" },
  { name: "Masarat" },
  { name: "Genesis Mining" },
  { name: "Art Vision" },
  { name: "Al-Qayrawana Contracting" },
  { name: "Al-Saleh Educational" },
  { name: "Fawasil Aljouf" },
  { name: "Mida United" },
  { name: "Klinicon" },
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
                <InitialsAvatar
                  name={company.name}
                  className="h-9 w-9"
                  textClassName="text-xs"
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
