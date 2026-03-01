"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  Users,
  Shield,
  Clock,
  HeadphonesIcon,
  BadgeDollarSign,
  MapPin,
  Wrench,
  ArrowLeft,
  Quote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import AvatarPlaceholder from "@/components/shared/AvatarPlaceholder";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { team, milestones, stats, values } from "@/data/team";

/* ── Icons ── */
const valueIcons = [Lightbulb, Target, Users, Shield];

const whyUsIcons = [Wrench, Target, Clock, HeadphonesIcon, BadgeDollarSign, MapPin];

/* ── Animation Variants ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ══════════════════════════════════════ */
/*                COMPONENT               */
/* ══════════════════════════════════════ */

export default function AboutPageContent() {
  const t = useTranslations("about");

  const whyUsReasons = [
    { title: t("whyUs1"), description: t("whyUs1Desc"), icon: whyUsIcons[0] },
    { title: t("whyUs2"), description: t("whyUs2Desc"), icon: whyUsIcons[1] },
    { title: t("whyUs3"), description: t("whyUs3Desc"), icon: whyUsIcons[2] },
    { title: t("whyUs4"), description: t("whyUs4Desc"), icon: whyUsIcons[3] },
    { title: t("whyUs5"), description: t("whyUs5Desc"), icon: whyUsIcons[4] },
    { title: t("whyUs6"), description: t("whyUs6Desc"), icon: whyUsIcons[5] },
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 overflow-hidden section-navy">
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: t("title") }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">
            {/* Text side */}
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Badge variant="gold">{t("badge")}</Badge>
              <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
                {t("heroTitle1")}
                <br />
                <span className="text-accent">{t("heroTitle2")}</span>
              </h1>
              <p className="text-lg text-white/80 font-cairo leading-relaxed max-w-xl">
                {t("heroDesc")}
              </p>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                {[
                  { num: "200+", label: t("project") },
                  { num: "75+", label: t("client") },
                  { num: "6+", label: t("yearsLabel") },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black font-cairo text-accent">{s.num}</div>
                    <div className="text-xs text-white/60 font-cairo">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats side (replaces complex illustration) */}
            <motion.div
              className="hidden lg:flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="rounded-xl p-6 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-black font-cairo text-accent mb-1">+200</div>
                  <div className="text-sm text-white/70 font-cairo">{t("successfulProject")}</div>
                </div>
                <div className="rounded-xl p-6 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-black font-cairo text-accent mb-1">+30</div>
                  <div className="text-sm text-white/70 font-cairo">{t("specializedEngineer")}</div>
                </div>
                <div className="rounded-xl p-6 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-black font-cairo text-accent mb-1">+75</div>
                  <div className="text-sm text-white/70 font-cairo">{t("satisfiedClient")}</div>
                </div>
                <div className="rounded-xl p-6 text-center bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-black font-cairo text-accent mb-1">6+</div>
                  <div className="text-sm text-white/70 font-cairo">{t("yearsExperience")}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Story + Vision/Mission ── */}
      <section className="section-padding section-alt">
        <Container>
          <SectionTitle title={t("storyTitle")} subtitle={t("storySub")} />

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Story card */}
            <motion.div
              className="card rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <Quote className="w-6 h-6 text-accent" />
                </div>
                <p className="text-text-secondary text-lg leading-relaxed font-cairo">
                  {t("storyText")}
                </p>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card rounded-2xl overflow-hidden h-full"
              >
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-cairo text-text-primary">
                      {t("vision")}
                    </h3>
                  </div>
                  <p className="text-text-secondary font-cairo leading-relaxed">
                    {t("visionText")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card rounded-2xl overflow-hidden h-full"
              >
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-cairo text-text-primary">
                      {t("mission")}
                    </h3>
                  </div>
                  <p className="text-text-secondary font-cairo leading-relaxed">
                    {t("missionText")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Stats Banner ── */}
      <section className="relative section-padding-sm overflow-hidden section-navy">
        <Container className="relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Values Section ── */}
      <section className="section-padding section-alt">
        <Container>
          <SectionTitle title={t("valuesTitle")} subtitle={t("valuesSub")} />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card rounded-2xl overflow-hidden h-full"
                >
                  <div className="p-5 text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── Team Section ── */}
      <section className="section-padding">
        <Container>
          <SectionTitle
            title={t("teamTitle")}
            subtitle={t("teamSub")}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card rounded-2xl overflow-hidden h-full"
              >
                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <AvatarPlaceholder gender={member.gender} size="md" />

                    {/* Info */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-bold font-cairo text-text-primary mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-accent text-sm font-cairo font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Timeline Section ── */}
      <section className="section-padding section-alt">
        <Container>
          <SectionTitle
            title={t("timelineTitle")}
            subtitle={t("timelineSub")}
          />

          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Solid line - desktop (center) */}
            <div className="absolute top-0 bottom-0 right-1/2 w-px bg-border hidden md:block translate-x-1/2" />
            {/* Solid line - mobile (right side in RTL) */}
            <div className="absolute top-0 bottom-0 right-7 w-px bg-border md:hidden" />

            <div className="space-y-10">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div key={milestone.year} variants={fadeUp} className="relative">
                    {/* Mobile layout */}
                    <div className="md:hidden flex gap-5">
                      <div className="relative flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center z-10 shrink-0 border-2 border-accent">
                          <span className="text-xs font-bold text-accent font-cairo">
                            {milestone.year}
                          </span>
                        </div>
                      </div>
                      <div className="card rounded-xl p-5 flex-1">
                        <h3 className="text-base font-bold font-cairo text-text-primary mb-1.5">
                          {milestone.title}
                        </h3>
                        <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout - alternating sides */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                      {isLeft ? (
                        <>
                          <div className="text-left">
                            <div className="card rounded-xl p-6">
                              <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center z-10 border-2 border-accent">
                              <span className="text-xs font-bold text-accent font-cairo">
                                {milestone.year}
                              </span>
                            </div>
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div className="flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center z-10 border-2 border-accent">
                              <span className="text-xs font-bold text-accent font-cairo">
                                {milestone.year}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="card rounded-xl p-6">
                              <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Why Us Section ── */}
      <section className="section-padding">
        <Container>
          <SectionTitle
            title={t("whyUsTitle")}
            subtitle={t("whyUsSub")}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {whyUsReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="card rounded-2xl overflow-hidden h-full"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-text-secondary text-sm font-cairo leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding section-navy">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-4">
              {t("readyCta")}
            </h2>
            <p className="text-white/80 text-lg font-cairo mb-8 leading-relaxed">
              {t("readyCtaSub")}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg" variant="gold">
                <span>{t("contactUs")}</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button href="/portfolio" size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                {t("viewWork")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
