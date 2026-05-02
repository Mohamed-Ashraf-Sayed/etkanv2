"use client";

import { motion } from "framer-motion";
import { Search, Compass, Code2, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { useTranslations } from "next-intl";

const stepIcons = [Search, Compass, Code2, Rocket];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
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
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/[0.03] rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} light />

        {/* Desktop: connected cards */}
        <motion.div
          className="hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connecting line */}
          <div className="relative">
            <div className="absolute top-12 start-[calc(12.5%)] end-[calc(12.5%)] h-px bg-gradient-to-l from-accent/10 via-accent/30 to-accent/10 hidden lg:block" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <motion.div
                    key={step.num}
                    variants={cardVariants}
                    className="group relative"
                  >
                    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8 backdrop-blur-sm hover:bg-white/[0.06] hover:border-accent/30 transition-all duration-500 h-full">
                      {/* Icon + Number row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-4xl font-black font-cairo text-white/[0.06] group-hover:text-white/[0.12] transition-colors duration-500 select-none">
                          {step.num}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold font-cairo text-white mb-3 group-hover:text-accent transition-colors duration-500">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-sm font-cairo leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      {/* Progress bar */}
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={{ width: 0 }}
                          whileInView={{
                            width: "100%",
                          }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.3 + 0.5,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <motion.div
          className="md:hidden flex flex-col gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={step.num}
                variants={cardVariants}
                className="relative flex gap-5 group"
              >
                {/* Timeline spine */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-[1px] flex-1 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent mt-3" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-bold font-cairo text-white">
                      {step.title}
                    </h3>
                    <span className="text-xs text-accent/40 font-cairo font-bold">
                      /{step.num}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm font-cairo leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
