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
import { cn } from "@/lib/utils";
import {
  serviceCategories,
  getServicesByCategory,
  type Service,
} from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Users, Building2, Network, Server, Headphones, TrendingUp,
};

/* ── Animation variants ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ── Service Card ── */
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <Link href={`/services/${service.slug}`} className="block h-full group">
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="card rounded-2xl overflow-hidden h-full flex flex-col"
      >
        <div className="p-6 flex flex-col flex-1">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-accent" />
          </div>

          <h3 className="text-xl font-bold font-cairo text-text-primary mb-1.5 group-hover:text-accent transition-colors">
            {service.title}
          </h3>
          <p className="text-text-secondary text-sm font-cairo leading-relaxed mb-5">
            {service.shortDescription}
          </p>

          <div className="mb-5 flex-1">
            <ul className="space-y-2">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary font-cairo">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-text-muted text-xs font-cairo">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              {service.techStack.slice(0, 3).join(" · ")}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:text-accent transition-colors font-cairo">
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
      <section className="relative pt-32 pb-20 overflow-hidden section-navy">
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "خدماتنا" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Badge variant="gold">حلول تقنية شاملة</Badge>
              <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
                نقدم لك أفضل الخدمات
                <br />
                <span className="text-accent">التقنية</span>
              </h1>
              <div className="gold-line mb-6" />
              <p className="text-lg text-white/70 font-cairo max-w-xl leading-relaxed">
                من تطوير المواقع والتطبيقات إلى بناء الأنظمة الداخلية وتجهيز البنية
                التحتية والدعم الفني المستمر
              </p>

              <div className="flex flex-wrap gap-5 mt-8 justify-center lg:justify-start">
                {serviceCategories.map((cat) => {
                  const CatIcon = iconMap[cat.icon] || Globe;
                  return (
                    <div key={cat.slug} className="flex items-center gap-2 text-white/50">
                      <CatIcon className="w-4 h-4 text-accent" />
                      <span className="text-xs font-cairo">{cat.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Icon grid for visual interest */}
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                {serviceCategories.map((cat) => {
                  const CatIcon = iconMap[cat.icon] || Globe;
                  return (
                    <div
                      key={cat.slug}
                      className="rounded-xl p-6 flex flex-col items-center gap-3 text-center bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/40 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <CatIcon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-xs font-cairo text-white/70">{cat.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* ── Category Tabs + Services ── */}
      <section className="relative section-padding">
        <Container className="relative z-10">
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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
                      ? "bg-accent text-navy border-accent"
                      : "bg-transparent text-text-secondary border-border hover:border-accent/30"
                  )}
                >
                  <IconComp className={cn("w-4.5 h-4.5", isActive ? "text-navy" : "text-accent")} />
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
                <div className="gold-line mx-auto mb-4" />
                <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4">
                  {activeCategoryData.title}
                </h2>
                <p className="text-text-secondary font-cairo text-lg leading-relaxed">
                  {activeCategoryData.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
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
      <section className="relative section-padding section-navy">
        <Container>
          <SectionTitle
            title="لمحة سريعة عن كل خدماتنا"
            subtitle="اكتشف مجموعة كاملة من الحلول التقنية اللي نقدمها"
            light
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {serviceCategories.map((cat) => {
              const CategoryIcon = iconMap[cat.icon] || Globe;
              const catServices = getServicesByCategory(cat.slug);
              return (
                <motion.div
                  key={cat.slug}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/40 transition-colors duration-300"
                >
                  <div className="p-5 text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <CategoryIcon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold font-cairo text-white mb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2 mb-5">
                      {catServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="text-sm text-white/60 hover:text-accent transition-colors font-cairo"
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
                      className="text-xs text-accent font-semibold font-cairo hover:text-accent-light transition-colors inline-flex items-center gap-1"
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
      <section className="relative section-padding overflow-hidden section-alt">
        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              مش متأكد من الخدمة المناسبة؟
            </h2>
            <p className="text-text-secondary text-lg font-cairo mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا النهاردة واحصل على استشارة مجانية وعرض سعر مخصص
              لاحتياجات شركتك
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" variant="gold" size="lg">
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
