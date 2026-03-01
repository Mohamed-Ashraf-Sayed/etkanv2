"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProjectThumbnail from "@/components/shared/ProjectThumbnail";
import { cn } from "@/lib/utils";
import {
  projectCategories,
  getProjectsByCategory,
  type Project,
} from "@/data/projects";

function ProjectCard({ project }: { project: Project }) {
  const firstResult = project.results[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        <div className="card rounded-xl overflow-hidden cursor-pointer h-full flex flex-col">
          {/* Thumbnail */}
          <ProjectThumbnail
            category={project.category}
            title={project.title}
          />

          <div className="p-6 flex flex-col flex-1">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <Badge variant="gold">
                {project.categoryLabel}
              </Badge>
              <span className="text-xs text-accent font-cairo font-semibold">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold font-cairo text-text-primary mb-2">
              {project.title}
            </h3>

            {/* Client & Industry */}
            <p className="text-sm text-accent font-cairo mb-3">
              {project.client} &bull; {project.industry}
            </p>

            {/* Summary */}
            <p className="text-text-secondary text-sm font-cairo leading-relaxed mb-4 flex-1">
              {project.summary}
            </p>

            {/* Featured Result */}
            {firstResult && (
              <div className="border-r-2 border-accent pr-3 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <span className="text-lg font-bold font-cairo text-accent">
                      {firstResult.value}
                    </span>
                    <span className="text-xs text-text-secondary font-cairo mr-2">
                      {firstResult.metric}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-accent/5 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = getProjectsByCategory(activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="section-navy pt-32 pb-20">
        <Container>
          <Breadcrumb items={[{ label: "أعمالنا" }]} />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Badge variant="gold">معرض الأعمال</Badge>
            <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
              أعمالنا
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-white/70 font-cairo max-w-3xl mx-auto leading-relaxed">
              مشاريع حقيقية حققنا فيها نتائج استثنائية لعملائنا. اكتشف كيف
              ساعدنا الشركات في تحويل أفكارهم لمنتجات تقنية ناجحة
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filter & Projects */}
      <section className="section-padding">
        <Container>
          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold font-cairo transition-all duration-300 border cursor-pointer",
                  activeFilter === cat.value
                    ? "bg-accent text-navy border-accent shadow-[0_4px_16px_rgba(212,175,55,0.25)]"
                    : "bg-transparent text-text-secondary border-border hover:border-accent/30 hover:text-accent"
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-text-secondary text-lg font-cairo">
                لا توجد مشاريع في هذا القسم حالياً
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding section-navy">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-6">
              عندك فكرة مشروع؟
            </h2>
            <p className="text-white/70 text-lg font-cairo mb-8 leading-relaxed">
              خلينا نحول فكرتك لمنتج تقني ناجح. تواصل معنا النهاردة واحصل على
              استشارة مجانية
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg" variant="gold">
                ابدأ مشروعك الآن
              </Button>
              <Button href="/services" size="lg" variant="outline" className="border-white/30 text-white hover:border-accent hover:text-accent">
                تعرف على خدماتنا
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
