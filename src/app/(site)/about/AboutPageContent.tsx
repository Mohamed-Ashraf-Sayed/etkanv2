"use client";

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

const whyUsReasons = [
  { title: "خبرة تقنية عميقة", description: "فريق من المهندسين المتخصصين بخبرة تتجاوز 10 سنوات", icon: Wrench },
  { title: "حلول مخصصة 100%", description: "كل مشروع يُبنى من الصفر حسب احتياجاتك الفعلية", icon: Target },
  { title: "التزام بالمواعيد", description: "نلتزم بالجدول الزمني ونسلم في الوقت المحدد", icon: Clock },
  { title: "دعم مستمر", description: "فريق دعم متاح لمساعدتك حتى بعد تسليم المشروع", icon: HeadphonesIcon },
  { title: "أسعار تنافسية", description: "جودة عالية بأسعار تناسب ميزانيتك", icon: BadgeDollarSign },
  { title: "تواجد محلي", description: "مكاتب في مصر والسعودية لخدمة أفضل", icon: MapPin },
];

/* ── Animation Variants ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Team gradient accents ── */
const teamGradients = [
  "from-primary to-primary-light",
  "from-accent to-accent",
  "from-secondary to-primary",
  "from-primary to-accent",
  "from-accent to-secondary",
  "from-secondary to-accent",
];

/* ── Hero Illustration ── */
function AboutIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 400 320" fill="none" className="w-full h-auto text-primary-light">
          {/* Center person (leader) */}
          <circle cx="200" cy="130" r="34" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx="200" cy="118" r="10" fill="currentColor" fillOpacity="0.15" />
          <path d="M182 148 C182 138 190 133 200 133 C210 133 218 138 218 148" fill="currentColor" fillOpacity="0.1" />

          {/* Top-right person */}
          <circle cx="310" cy="70" r="24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <circle cx="310" cy="62" r="7" fill="currentColor" fillOpacity="0.12" />
          <path d="M299 82 C299 76 304 73 310 73 C316 73 321 76 321 82" fill="currentColor" fillOpacity="0.08" />
          <line x1="228" y1="115" x2="288" y2="78" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 3" />

          {/* Top-left person */}
          <circle cx="90" cy="65" r="24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <circle cx="90" cy="57" r="7" fill="currentColor" fillOpacity="0.12" />
          <path d="M79 77 C79 71 84 68 90 68 C96 68 101 71 101 77" fill="currentColor" fillOpacity="0.08" />
          <line x1="172" y1="118" x2="112" y2="73" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 3" />

          {/* Bottom-right person */}
          <circle cx="320" cy="215" r="24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <circle cx="320" cy="207" r="7" fill="currentColor" fillOpacity="0.12" />
          <path d="M309 227 C309 221 314 218 320 218 C326 218 331 221 331 227" fill="currentColor" fillOpacity="0.08" />
          <line x1="225" y1="150" x2="298" y2="205" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 3" />

          {/* Bottom-left person */}
          <circle cx="75" cy="210" r="24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <circle cx="75" cy="202" r="7" fill="currentColor" fillOpacity="0.12" />
          <path d="M64 222 C64 216 69 213 75 213 C81 213 86 216 86 222" fill="currentColor" fillOpacity="0.08" />
          <line x1="175" y1="148" x2="97" y2="200" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 3" />

          {/* Code panel floating */}
          <rect x="280" y="130" width="80" height="50" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
          <rect x="290" y="142" width="24" height="4" rx="1.5" fill="#2563eb" fillOpacity="0.2" />
          <rect x="318" y="142" width="14" height="4" rx="1.5" fill="#f59e0b" fillOpacity="0.15" />
          <rect x="290" y="150" width="40" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
          <rect x="290" y="157" width="30" height="3" rx="1" fill="currentColor" fillOpacity="0.05" />
          <rect x="290" y="164" width="36" height="3" rx="1" fill="#7c3aed" fillOpacity="0.12" />

          {/* Gear element */}
          <circle cx="52" cy="140" r="18" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
          <circle cx="52" cy="140" r="7" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
          {/* Gear teeth */}
          <rect x="49" y="120" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.06" />
          <rect x="49" y="155" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.06" />
          <rect x="32" y="137" width="5" height="6" rx="1" fill="currentColor" fillOpacity="0.06" />
          <rect x="67" y="137" width="5" height="6" rx="1" fill="currentColor" fillOpacity="0.06" />

          {/* Chart element bottom */}
          <rect x="150" y="240" width="100" height="50" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
          <rect x="164" y="275" width="10" height="8" rx="2" fill="#2563eb" fillOpacity="0.15" />
          <rect x="180" y="268" width="10" height="15" rx="2" fill="#2563eb" fillOpacity="0.2" />
          <rect x="196" y="272" width="10" height="11" rx="2" fill="#2563eb" fillOpacity="0.18" />
          <rect x="212" y="262" width="10" height="21" rx="2" fill="#2563eb" fillOpacity="0.25" />
          <rect x="228" y="266" width="10" height="17" rx="2" fill="#2563eb" fillOpacity="0.22" />
          <rect x="162" y="250" width="36" height="5" rx="1.5" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        className="absolute bottom-8 -right-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="bg-surface/90 border border-border/50 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
          <div className="text-xl font-black font-cairo gradient-text">+200</div>
          <div className="text-[11px] text-text-muted font-tajawal">مشروع ناجح</div>
        </div>
      </motion.div>

      {/* Floating team card */}
      <motion.div
        className="absolute top-4 -left-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="bg-surface/90 border border-border/50 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 space-x-reverse">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-surface" />
              <div className="w-6 h-6 rounded-full bg-accent/20 border border-surface" />
              <div className="w-6 h-6 rounded-full bg-secondary/20 border border-surface" />
            </div>
            <span className="text-[11px] text-text-muted font-tajawal">+30 مهندس</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════ */
/*                COMPONENT               */
/* ══════════════════════════════════════ */

export default function AboutPageContent() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "من نحن" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">
            {/* Text side */}
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Badge variant="accent">تعرف علينا</Badge>
              <h1 className="text-h1 font-bold font-cairo gradient-text mt-6 mb-6">
                نبني المستقبل الرقمي
                <br />
                <span className="text-text-primary">لعملائنا</span>
              </h1>
              <p className="text-lg text-text-secondary font-tajawal leading-relaxed max-w-xl">
                من فريق صغير في 2018 لأكثر من 30 مهندس متخصص يخدمون
                عملاء في مصر والسعودية والخليج. نقدم حلول تقنية مبتكرة
                بأعلى معايير الجودة العالمية.
              </p>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                {[
                  { num: "200+", label: "مشروع" },
                  { num: "75+", label: "عميل" },
                  { num: "6+", label: "سنوات" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black font-cairo gradient-text">{s.num}</div>
                    <div className="text-xs text-text-muted font-tajawal">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Illustration side */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <AboutIllustration />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Story + Vision/Mission ── */}
      <section className="relative section-padding section-gradient-1">
        <div className="noise-overlay" />
        <Container>
          <SectionTitle title="قصتنا" subtitle="من البداية للنجاح" />

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Story card */}
            <motion.div
              className="card-premium rounded-2xl p-8 lg:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-accent to-secondary" />
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <Quote className="w-6 h-6 text-primary-light" />
                </div>
                <p className="text-text-secondary text-lg leading-relaxed font-tajawal">
                  إتقان تأسست في 2018 بهدف واحد: تقديم حلول تقنية بجودة
                  عالمية للشركات في المنطقة العربية. بدأنا بفريق صغير من 3
                  مهندسين شغوفين بالتكنولوجيا، واليوم أصبحنا فريقاً من أكثر من
                  30 متخصصاً يخدمون عملاء في مصر والسعودية والخليج.
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
                className="card-premium rounded-2xl overflow-hidden h-full"
              >
                <div className="h-2 bg-gradient-to-l from-primary to-accent" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold font-cairo text-text-primary">
                      رؤيتنا
                    </h3>
                  </div>
                  <p className="text-text-secondary font-tajawal leading-relaxed">
                    أن نكون الشريك التقني الأول لكل شركة تسعى للتميز الرقمي في
                    المنطقة العربية.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card-premium rounded-2xl overflow-hidden h-full"
              >
                <div className="h-2 bg-gradient-to-l from-secondary to-primary" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold font-cairo text-text-primary">
                      مهمتنا
                    </h3>
                  </div>
                  <p className="text-text-secondary font-tajawal leading-relaxed">
                    تمكين الشركات من تحقيق أهدافها من خلال حلول تقنية مبتكرة
                    وموثوقة.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Stats Banner ── */}
      <section className="relative section-padding-sm overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.06) 50%, rgba(245,158,11,0.04) 100%)",
          }}
        />
        <div className="noise-overlay absolute inset-0" />
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
      <section className="relative section-padding section-gradient-2">
        <div className="noise-overlay" />
        <Container>
          <SectionTitle title="قيمنا" subtitle="المبادئ التي توجه عملنا" />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              const gradients = [
                "from-primary/20 to-primary/5",
                "from-accent/20 to-accent/5",
                "from-secondary/20 to-secondary/5",
                "from-primary/15 to-accent/8",
              ];
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-premium rounded-2xl overflow-hidden h-full"
                >
                  {/* Visual header */}
                  <div className={`h-20 bg-gradient-to-b ${gradients[index]} flex items-center justify-center relative`}>
                    <div className="absolute top-2 left-3 text-3xl font-black font-cairo text-text-primary/[0.04] select-none">
                      0{index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-surface/80 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-light" />
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
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
            title="فريقنا"
            subtitle="الخبراء الذين يقفون وراء نجاحك"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card-premium rounded-2xl overflow-hidden h-full"
              >
                {/* Gradient accent top */}
                <div className={`h-1.5 bg-gradient-to-l ${teamGradients[index % teamGradients.length]}`} />

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
                      <p className="text-primary-light text-sm font-tajawal font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
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
      <section className="relative section-padding section-gradient-1">
        <div className="noise-overlay" />
        <Container>
          <SectionTitle
            title="رحلتنا عبر السنين"
            subtitle="من البداية المتواضعة إلى قيادة السوق"
          />

          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Gradient line - desktop (center) */}
            <div className="absolute top-0 bottom-0 right-1/2 w-px bg-gradient-to-b from-primary via-accent to-secondary hidden md:block translate-x-1/2" />
            {/* Gradient line - mobile (right side in RTL) */}
            <div className="absolute top-0 bottom-0 right-7 w-px bg-gradient-to-b from-primary via-accent to-secondary md:hidden" />

            <div className="space-y-10">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const gradientColors = index % 2 === 0
                  ? "from-primary to-accent"
                  : "from-accent to-secondary";

                return (
                  <motion.div key={milestone.year} variants={fadeUp} className="relative">
                    {/* Mobile layout */}
                    <div className="md:hidden flex gap-5">
                      <div className="relative flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientColors} flex items-center justify-center z-10 shrink-0 shadow-md`}>
                          <span className="text-xs font-bold text-white font-cairo">
                            {milestone.year}
                          </span>
                        </div>
                      </div>
                      <div className="card-premium rounded-xl p-5 flex-1">
                        <h3 className="text-base font-bold font-cairo text-text-primary mb-1.5">
                          {milestone.title}
                        </h3>
                        <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout - alternating sides */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                      {isLeft ? (
                        <>
                          <div className="text-left">
                            <div className="card-premium rounded-xl p-6">
                              <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientColors} flex items-center justify-center z-10 shadow-md`}>
                              <span className="text-xs font-bold text-white font-cairo">
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
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientColors} flex items-center justify-center z-10 shadow-md`}>
                              <span className="text-xs font-bold text-white font-cairo">
                                {milestone.year}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="card-premium rounded-xl p-6">
                              <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
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
            title="ليه تختارنا؟"
            subtitle="6 أسباب تخليك تثق فينا"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {whyUsReasons.map((reason, index) => {
              const Icon = reason.icon;
              const accents = [
                "from-primary to-primary-light",
                "from-accent to-accent",
                "from-secondary to-primary",
                "from-primary to-accent",
                "from-accent to-secondary",
                "from-secondary to-accent",
              ];
              return (
                <motion.div
                  key={reason.title}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="card-premium rounded-2xl overflow-hidden h-full"
                >
                  <div className={`h-1 bg-gradient-to-l ${accents[index]}`} />
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-text-secondary text-sm font-tajawal leading-relaxed">
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
      <section className="relative section-padding overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.1), transparent)",
          }}
        />
        <div className="noise-overlay absolute inset-0" />
        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-bold font-cairo gradient-text mb-4">
              جاهز تبدأ مشروعك معنا؟
            </h2>
            <p className="text-text-secondary text-lg font-tajawal mb-8 leading-relaxed">
              تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                <span>تواصل معنا</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button href="/portfolio" size="lg" variant="outline">
                شاهد أعمالنا
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
