"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Building2, Server, Headphones, TrendingUp, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { serviceCategories } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Building2,
  Server,
  Headphones,
  TrendingUp,
};

const cardGradients: Record<string, string> = {
  Globe: "from-primary/15 via-primary/8 to-transparent",
  Building2: "from-secondary/15 via-secondary/8 to-transparent",
  Server: "from-primary/12 via-accent/8 to-transparent",
  Headphones: "from-accent/15 via-accent/8 to-transparent",
  TrendingUp: "from-accent/15 via-primary/8 to-transparent",
};

function ServiceIllustration({ icon }: { icon: string }) {
  if (icon === "Globe") {
    return (
      <svg viewBox="0 0 120 70" fill="none" className="w-full h-full text-primary-light">
        <rect x="10" y="8" width="100" height="54" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
        <rect x="10" y="8" width="100" height="14" rx="6" fill="currentColor" fillOpacity="0.04" />
        <circle cx="20" cy="15" r="2" fill="currentColor" fillOpacity="0.15" />
        <circle cx="27" cy="15" r="2" fill="currentColor" fillOpacity="0.15" />
        <circle cx="34" cy="15" r="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="18" y="28" width="40" height="6" rx="1.5" fill="currentColor" fillOpacity="0.12" />
        <rect x="18" y="38" width="30" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="18" y="46" width="24" height="8" rx="4" fill="currentColor" fillOpacity="0.1" />
        <rect x="70" y="26" width="32" height="28" rx="4" fill="currentColor" fillOpacity="0.06" />
      </svg>
    );
  }
  if (icon === "Building2") {
    return (
      <svg viewBox="0 0 120 70" fill="none" className="w-full h-full text-secondary">
        <rect x="8" y="8" width="30" height="54" rx="4" fill="currentColor" fillOpacity="0.04" />
        <rect x="12" y="14" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="12" y="22" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="12" y="30" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="24" y="14" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="24" y="22" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="24" y="30" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.06" />
        <rect x="44" y="10" width="68" height="52" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <rect x="50" y="18" width="28" height="6" rx="1.5" fill="currentColor" fillOpacity="0.1" />
        <rect x="50" y="30" width="56" height="6" rx="1.5" fill="currentColor" fillOpacity="0.06" />
        <rect x="50" y="40" width="56" height="6" rx="1.5" fill="currentColor" fillOpacity="0.04" />
        <rect x="50" y="50" width="56" height="6" rx="1.5" fill="currentColor" fillOpacity="0.04" />
        <circle cx="100" cy="20" r="6" fill="currentColor" fillOpacity="0.08" />
      </svg>
    );
  }
  if (icon === "Server") {
    return (
      <svg viewBox="0 0 120 70" fill="none" className="w-full h-full text-primary-light">
        <rect x="20" y="6" width="50" height="16" rx="4" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle cx="30" cy="14" r="2.5" fill="#22c55e" fillOpacity="0.4" />
        <circle cx="38" cy="14" r="2.5" fill="#22c55e" fillOpacity="0.3" />
        <rect x="52" y="11" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.05" />
        <rect x="20" y="26" width="50" height="16" rx="4" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle cx="30" cy="34" r="2.5" fill="#22c55e" fillOpacity="0.4" />
        <circle cx="38" cy="34" r="2.5" fill="#f59e0b" fillOpacity="0.3" />
        <rect x="52" y="31" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.05" />
        <rect x="20" y="46" width="50" height="16" rx="4" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle cx="30" cy="54" r="2.5" fill="#22c55e" fillOpacity="0.4" />
        <circle cx="38" cy="54" r="2.5" fill="#22c55e" fillOpacity="0.3" />
        <rect x="52" y="51" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.05" />
        <line x1="70" y1="14" x2="80" y2="14" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2" />
        <line x1="70" y1="34" x2="80" y2="34" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2" />
        <line x1="70" y1="54" x2="80" y2="54" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2" />
        <rect x="80" y="8" width="30" height="50" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
        <polyline points="86,48 92,40 98,44 104,32" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      </svg>
    );
  }
  // Headphones - support
  return (
    <svg viewBox="0 0 120 70" fill="none" className="w-full h-full text-accent">
      <rect x="15" y="10" width="90" height="50" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
      <circle cx="38" cy="28" r="10" fill="currentColor" fillOpacity="0.06" />
      <rect x="54" y="22" width="40" height="4" rx="1.5" fill="currentColor" fillOpacity="0.1" />
      <rect x="54" y="30" width="30" height="3" rx="1" fill="currentColor" fillOpacity="0.06" />
      <rect x="28" y="44" width="64" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />
      <rect x="34" y="46" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ServicesSection() {
  return (
    <section className="section-padding relative">
      <Container>
        <SectionTitle
          title="خدماتنا"
          subtitle="حلول تقنية شاملة تلبي كل احتياجات عملك"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {serviceCategories.map((category) => {
            const Icon = iconMap[category.icon] || Globe;
            const gradient = cardGradients[category.icon] || cardGradients.Globe;

            return (
              <motion.div
                key={category.slug}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card-premium rounded-2xl overflow-hidden h-full flex flex-col"
              >
                {/* Visual header area */}
                <div
                  className={`relative h-24 bg-gradient-to-b ${gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Abstract illustration behind icon */}
                  <div className="absolute inset-0 opacity-60">
                    <ServiceIllustration icon={category.icon} />
                  </div>
                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-surface/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-sm">
                    <Icon className="w-7 h-7 text-primary-light" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-bold font-cairo text-text-primary mb-3">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed font-tajawal mb-5 flex-1">
                    {category.description}
                  </p>

                  {/* Link */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-primary-light text-sm font-semibold hover:text-accent transition-colors group"
                  >
                    اعرف أكثر
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
