"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HowWeWork() {
  const t = useTranslations("howWeWork");

  const steps = [
    { num: "01", title: t("step1"), desc: t("step1Desc") },
    { num: "02", title: t("step2"), desc: t("step2Desc") },
    { num: "03", title: t("step3"), desc: t("step3Desc") },
    { num: "04", title: t("step4"), desc: t("step4Desc") },
  ];

  return (
    <section className="section-navy section-padding relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/[0.03] rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          light
        />

        {/* Desktop: editorial timeline layout */}
        <motion.div
          className="hidden lg:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-4 gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                variants={stepVariants}
                className="relative group"
              >
                <div className="px-6 py-8">
                  {/* Large editorial step number */}
                  <div className="mb-6">
                    <span className="text-7xl font-black font-cairo text-accent/20 group-hover:text-accent/40 transition-colors duration-500 select-none leading-none block">
                      {step.num}
                    </span>
                  </div>

                  {/* Gold dot marker */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-accent/30" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-cairo text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm font-cairo leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile/Tablet: vertical timeline */}
        <motion.div
          className="lg:hidden flex flex-col gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              variants={stepVariants}
              className="relative flex gap-5 group"
            >
              {/* Timeline spine */}
              <div className="flex flex-col items-center shrink-0">
                {/* Gold dot */}
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(212,175,55,0.4)] mt-2" />
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className="w-[1px] flex-1 bg-white/10 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                {/* Step number */}
                <span className="text-5xl font-black font-cairo text-accent/20 select-none leading-none block mb-3">
                  {step.num}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold font-cairo text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm font-cairo leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
