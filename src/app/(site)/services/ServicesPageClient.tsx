"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Users,
  Building2,
  Network,
  Server,
  Headphones,
  TrendingUp,
  ChevronLeft,
  ArrowLeft,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GradientBackground from "@/components/shared/GradientBackground";
import { cn } from "@/lib/utils";
import {
  serviceCategories,
  getServicesByCategory,
  type Service,
} from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Users, Building2, Network, Server, Headphones, TrendingUp,
};

/* ── Card gradients per icon ── */
const cardGradients: Record<string, string> = {
  Globe: "from-primary/15 via-primary/8 to-transparent",
  Smartphone: "from-accent/15 via-accent/8 to-transparent",
  Users: "from-secondary/15 via-secondary/8 to-transparent",
  Building2: "from-secondary/12 via-primary/8 to-transparent",
  Network: "from-primary/12 via-accent/8 to-transparent",
  Server: "from-primary/15 via-primary/8 to-transparent",
  Headphones: "from-accent/15 via-accent/8 to-transparent",
  TrendingUp: "from-accent/15 via-primary/8 to-transparent",
};

/* ── Small card illustrations ── */
function CardIllustration({ icon }: { icon: string }) {
  if (icon === "Globe") {
    return (
      <svg viewBox="0 0 160 60" fill="none" className="w-full h-full text-primary-light">
        <rect x="10" y="6" width="90" height="48" rx="5" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <rect x="10" y="6" width="90" height="12" rx="5" fill="currentColor" fillOpacity="0.03" />
        <circle cx="19" cy="12" r="2" fill="currentColor" fillOpacity="0.12" />
        <circle cx="26" cy="12" r="2" fill="currentColor" fillOpacity="0.12" />
        <rect x="18" y="24" width="36" height="5" rx="1.5" fill="currentColor" fillOpacity="0.1" />
        <rect x="18" y="33" width="24" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="18" y="40" width="20" height="7" rx="3" fill="currentColor" fillOpacity="0.08" />
        <rect x="65" y="22" width="28" height="24" rx="4" fill="currentColor" fillOpacity="0.05" />
        <rect x="115" y="10" width="35" height="44" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <rect x="125" y="16" width="15" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
        <rect x="122" y="24" width="22" height="14" rx="3" fill="currentColor" fillOpacity="0.05" />
        <rect x="122" y="42" width="22" height="6" rx="3" fill="currentColor" fillOpacity="0.06" />
      </svg>
    );
  }
  if (icon === "Smartphone") {
    return (
      <svg viewBox="0 0 160 60" fill="none" className="w-full h-full text-accent">
        <rect x="55" y="2" width="50" height="56" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
        <rect x="70" y="5" width="20" height="4" rx="2" fill="currentColor" fillOpacity="0.06" />
        <rect x="62" y="14" width="36" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect x="62" y="24" width="36" height="14" rx="3" fill="currentColor" fillOpacity="0.05" />
        <rect x="62" y="42" width="16" height="6" rx="3" fill="currentColor" fillOpacity="0.08" />
        <rect x="72" y="52" width="16" height="2" rx="1" fill="currentColor" fillOpacity="0.1" />
        <rect x="10" y="12" width="36" height="18" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <circle cx="20" cy="21" r="4" fill="currentColor" fillOpacity="0.06" />
        <rect x="28" y="18" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
        <rect x="114" y="20" width="36" height="18" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <rect x="120" y="26" width="20" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
      </svg>
    );
  }
  if (icon === "Users" || icon === "Building2") {
    return (
      <svg viewBox="0 0 160 60" fill="none" className="w-full h-full text-secondary">
        <rect x="8" y="4" width="100" height="52" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <rect x="8" y="4" width="24" height="52" rx="6" fill="currentColor" fillOpacity="0.02" />
        <rect x="14" y="12" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
        <rect x="14" y="20" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.04" />
        <rect x="14" y="26" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.04" />
        <rect x="38" y="12" width="30" height="8" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect x="76" y="12" width="24" height="8" rx="2" fill="currentColor" fillOpacity="0.06" />
        <rect x="38" y="26" width="60" height="3" rx="1" fill="currentColor" fillOpacity="0.04" />
        <rect x="38" y="33" width="60" height="3" rx="1" fill="currentColor" fillOpacity="0.04" />
        <rect x="38" y="40" width="60" height="3" rx="1" fill="currentColor" fillOpacity="0.04" />
        <rect x="118" y="4" width="36" height="26" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <polyline points="124,24 130,18 136,20 142,12 148,16" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
        <rect x="118" y="36" width="36" height="20" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <rect x="124" y="42" width="18" height="5" rx="1" fill="currentColor" fillOpacity="0.1" />
      </svg>
    );
  }
  if (icon === "Network" || icon === "Server") {
    return (
      <svg viewBox="0 0 160 60" fill="none" className="w-full h-full text-primary-light">
        <rect x="10" y="8" width="44" height="14" rx="3" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <circle cx="20" cy="15" r="2" fill="#22c55e" fillOpacity="0.35" />
        <circle cx="27" cy="15" r="2" fill="#22c55e" fillOpacity="0.25" />
        <rect x="10" y="26" width="44" height="14" rx="3" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <circle cx="20" cy="33" r="2" fill="#22c55e" fillOpacity="0.35" />
        <circle cx="27" cy="33" r="2" fill="#f59e0b" fillOpacity="0.25" />
        <rect x="10" y="44" width="44" height="14" rx="3" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <circle cx="20" cy="51" r="2" fill="#22c55e" fillOpacity="0.35" />
        <line x1="54" y1="15" x2="72" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2" />
        <line x1="54" y1="33" x2="72" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2" />
        <circle cx="80" cy="30" r="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
        <line x1="90" y1="30" x2="108" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2" />
        <rect x="108" y="8" width="42" height="44" rx="5" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <polyline points="116,42 124,34 132,38 140,26" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      </svg>
    );
  }
  // Headphones / Support
  return (
    <svg viewBox="0 0 160 60" fill="none" className="w-full h-full text-accent">
      <rect x="30" y="4" width="100" height="52" rx="6" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      <rect x="40" y="12" width="50" height="14" rx="4" fill="currentColor" fillOpacity="0.06" />
      <rect x="46" y="16" width="30" height="3" rx="1" fill="currentColor" fillOpacity="0.1" />
      <rect x="46" y="22" width="20" height="2" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="70" y="32" width="50" height="14" rx="4" fill="currentColor" fillOpacity="0.04" />
      <rect x="76" y="36" width="28" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
      <circle cx="16" cy="30" r="12" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
      <path d="M10,28 C10,22 13,20 16,20 C19,20 22,22 22,28" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="8" y="27" width="4" height="6" rx="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="20" y="27" width="4" height="6" rx="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

/* ── Hero illustration ── */
function ServicesHeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 400 320" fill="none" className="w-full h-auto text-primary-light">
          {/* Central hub */}
          <circle cx="200" cy="160" r="40" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx="200" cy="160" r="20" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
          <circle cx="200" cy="160" r="6" fill="currentColor" fillOpacity="0.15" />
          <circle cx="200" cy="160" r="55" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="6 4" />

          {/* Web - top right */}
          <rect x="280" y="40" width="90" height="65" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <rect x="280" y="40" width="90" height="14" rx="8" fill="currentColor" fillOpacity="0.03" />
          <circle cx="292" cy="47" r="2" fill="#ef4444" fillOpacity="0.3" />
          <circle cx="300" cy="47" r="2" fill="#f59e0b" fillOpacity="0.3" />
          <circle cx="308" cy="47" r="2" fill="#22c55e" fillOpacity="0.3" />
          <rect x="290" y="62" width="30" height="5" rx="1.5" fill="currentColor" fillOpacity="0.1" />
          <rect x="290" y="72" width="20" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
          <rect x="290" y="80" width="40" height="14" rx="3" fill="currentColor" fillOpacity="0.04" />
          <line x1="235" y1="140" x2="280" y2="75" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 3" />

          {/* Mobile - top left */}
          <rect x="50" y="50" width="45" height="75" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.8" />
          <rect x="62" y="54" width="20" height="4" rx="2" fill="currentColor" fillOpacity="0.05" />
          <rect x="58" y="66" width="30" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
          <rect x="58" y="78" width="30" height="20" rx="3" fill="currentColor" fillOpacity="0.04" />
          <rect x="58" y="104" width="14" height="6" rx="3" fill="currentColor" fillOpacity="0.06" />
          <rect x="66" y="118" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.08" />
          <line x1="165" y1="145" x2="95" y2="90" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 3" />

          {/* Dashboard - bottom right */}
          <rect x="275" y="200" width="100" height="65" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
          <rect x="275" y="200" width="28" height="65" rx="8" fill="currentColor" fillOpacity="0.02" />
          <rect x="310" y="212" width="26" height="14" rx="3" fill="currentColor" fillOpacity="0.06" />
          <rect x="342" y="212" width="26" height="14" rx="3" fill="currentColor" fillOpacity="0.06" />
          <rect x="310" y="232" width="58" height="26" rx="3" fill="currentColor" fillOpacity="0.03" />
          <rect x="316" y="248" width="10" height="8" rx="1" fill="#2563eb" fillOpacity="0.15" />
          <rect x="330" y="242" width="10" height="14" rx="1" fill="#2563eb" fillOpacity="0.2" />
          <rect x="344" y="245" width="10" height="11" rx="1" fill="#2563eb" fillOpacity="0.18" />
          <rect x="358" y="238" width="10" height="18" rx="1" fill="#2563eb" fillOpacity="0.25" />
          <line x1="230" y1="180" x2="275" y2="230" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 3" />

          {/* Server - bottom left */}
          <rect x="30" y="205" width="70" height="55" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
          <rect x="38" y="212" width="54" height="12" rx="3" fill="currentColor" fillOpacity="0.05" />
          <circle cx="46" cy="218" r="2.5" fill="#22c55e" fillOpacity="0.3" />
          <circle cx="54" cy="218" r="2.5" fill="#22c55e" fillOpacity="0.25" />
          <rect x="38" y="230" width="54" height="12" rx="3" fill="currentColor" fillOpacity="0.05" />
          <circle cx="46" cy="236" r="2.5" fill="#22c55e" fillOpacity="0.3" />
          <circle cx="54" cy="236" r="2.5" fill="#f59e0b" fillOpacity="0.25" />
          <rect x="38" y="248" width="54" height="6" rx="2" fill="currentColor" fillOpacity="0.04" />
          <line x1="170" y1="180" x2="100" y2="225" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 3" />
        </svg>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute bottom-4 -right-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="bg-surface/90 border border-border/50 rounded-xl px-3 py-2 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="text-xs font-tajawal text-text-secondary">حلول متكاملة</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Animation variants ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Service Card ── */
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon] || Globe;
  const gradient = cardGradients[service.icon] || cardGradients.Globe;

  return (
    <Link href={`/services/${service.slug}`} className="block h-full group">
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="card-premium rounded-2xl overflow-hidden h-full flex flex-col"
      >
        {/* Visual header */}
        <div className={`relative h-20 bg-gradient-to-b ${gradient} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-70">
            <CardIllustration icon={service.icon} />
          </div>
          <div className="relative w-12 h-12 rounded-xl bg-surface/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-primary-light" />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold font-cairo text-text-primary mb-1.5 group-hover:text-primary-light transition-colors">
            {service.title}
          </h3>
          <p className="text-text-secondary text-sm font-tajawal leading-relaxed mb-5">
            {service.shortDescription}
          </p>

          <div className="mb-5 flex-1">
            <ul className="space-y-2">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary font-tajawal">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-text-muted text-xs font-tajawal">
              <Sparkles className="w-3.5 h-3.5" />
              {service.techStack.slice(0, 3).join(" · ")}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:text-primary-light transition-colors font-cairo">
              التفاصيل
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════ */
/*                COMPONENT               */
/* ══════════════════════════════════════ */

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].slug);

  const activeCategoryData = serviceCategories.find((c) => c.slug === activeCategory);
  const categoryServices = getServicesByCategory(activeCategory);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <GradientBackground />
        <div className="noise-overlay absolute inset-0" />

        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "خدماتنا" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Badge variant="accent">حلول تقنية شاملة</Badge>
              <h1 className="text-h1 font-bold font-cairo mt-6 mb-6">
                <span className="text-text-primary">نقدم لك </span>
                <span className="gradient-text">أفضل الخدمات</span>
                <br />
                <span className="text-text-primary">التقنية</span>
              </h1>
              <p className="text-lg text-text-secondary font-tajawal max-w-xl leading-relaxed">
                من تطوير المواقع والتطبيقات إلى بناء الأنظمة الداخلية وتجهيز البنية
                التحتية والدعم الفني المستمر
              </p>

              <div className="flex flex-wrap gap-5 mt-8 justify-center lg:justify-start">
                {serviceCategories.map((cat) => {
                  const CatIcon = iconMap[cat.icon] || Globe;
                  return (
                    <div key={cat.slug} className="flex items-center gap-2 text-text-muted">
                      <CatIcon className="w-4 h-4 text-primary/50" />
                      <span className="text-xs font-tajawal">{cat.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <ServicesHeroIllustration />
            </motion.div>
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* ── Category Tabs + Services ── */}
      <section className="relative section-padding section-gradient-1">
        <div className="noise-overlay absolute inset-0" />
        <Container className="relative z-10">
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {serviceCategories.map((cat) => {
              const IconComp = iconMap[cat.icon] || Globe;
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold font-cairo transition-all duration-300 border",
                    isActive
                      ? "bg-gradient-to-l from-primary to-secondary text-white border-primary/30 shadow-glow"
                      : "bg-surface/50 text-text-secondary border-border hover:border-primary/30 hover:text-text-primary hover:bg-surface-light/50"
                  )}
                >
                  <IconComp className={cn("w-4.5 h-4.5", isActive ? "text-white" : "text-primary/60")} />
                  {cat.title}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            {activeCategoryData && (
              <motion.div
                key={activeCategory + "-header"}
                className="text-center mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-h2 font-bold font-cairo gradient-text mb-4">
                  {activeCategoryData.title}
                </h2>
                <p className="text-text-secondary font-tajawal text-lg leading-relaxed">
                  {activeCategoryData.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {categoryServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* ── All Services Overview ── */}
      <section className="relative section-padding">
        <Container>
          <SectionTitle
            title="لمحة سريعة عن كل خدماتنا"
            subtitle="اكتشف مجموعة كاملة من الحلول التقنية اللي نقدمها"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {serviceCategories.map((cat, catIndex) => {
              const CategoryIcon = iconMap[cat.icon] || Globe;
              const catServices = getServicesByCategory(cat.slug);
              const gradients = [
                "from-primary/15 to-primary/5",
                "from-secondary/15 to-secondary/5",
                "from-primary/12 to-accent/8",
                "from-accent/15 to-accent/5",
              ];
              return (
                <motion.div
                  key={cat.slug}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-premium rounded-2xl overflow-hidden"
                >
                  <div className={`h-20 bg-gradient-to-b ${gradients[catIndex]} flex items-center justify-center relative`}>
                    <div className="absolute top-2 left-3 text-3xl font-black font-cairo text-text-primary/[0.04] select-none">
                      0{catIndex + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-surface/80 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-primary-light" />
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold font-cairo text-text-primary mb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2 mb-5">
                      {catServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="text-sm text-text-secondary hover:text-accent transition-colors font-tajawal"
                          >
                            {s.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setActiveCategory(cat.slug);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-xs text-accent font-semibold font-cairo hover:text-primary-light transition-colors inline-flex items-center gap-1"
                    >
                      عرض الخدمات
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative section-padding overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.1), transparent)",
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
            <h2 className="text-h2 font-bold font-cairo mb-6">
              <span className="text-text-primary">مش متأكد من </span>
              <span className="gradient-text">الخدمة المناسبة</span>
              <span className="text-text-primary">؟</span>
            </h2>
            <p className="text-text-secondary text-lg font-tajawal mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا النهاردة واحصل على استشارة مجانية وعرض سعر مخصص
              لاحتياجات شركتك
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                اطلب استشارة مجانية
              </Button>
              <Button href="/portfolio" size="lg" variant="outline">
                شوف أعمالنا
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
