"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import GradientBackground from "@/components/shared/GradientBackground";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProjectThumbnail from "@/components/shared/ProjectThumbnail";
import { cn } from "@/lib/utils";
import {
  projectCategories,
  getProjectsByCategory,
  type Project,
} from "@/data/projects";

const categoryBadgeVariant: Record<string, "primary" | "secondary" | "accent"> = {
  website: "primary",
  mobile: "accent",
  systems: "secondary",
  infrastructure: "primary",
};

function ProjectCard({ project }: { project: Project }) {
  const firstResult = project.results[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        <div className="card-premium rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col">
          {/* Thumbnail */}
          <ProjectThumbnail
            category={project.category}
            title={project.title}
          />

          <div className="p-6 flex flex-col flex-1">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant={categoryBadgeVariant[project.category] || "primary"}>
              {project.categoryLabel}
            </Badge>
            <span className="text-xs text-text-muted font-tajawal">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold font-cairo text-text-primary mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Client & Industry */}
          <p className="text-sm text-accent font-tajawal mb-3">
            {project.client} &bull; {project.industry}
          </p>

          {/* Summary */}
          <p className="text-text-secondary text-sm font-tajawal leading-relaxed mb-4 flex-1">
            {project.summary}
          </p>

          {/* Featured Result */}
          {firstResult && (
            <div className="p-3 rounded-xl bg-gradient-to-l from-primary/10 to-accent/5 border border-primary/10 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <span className="text-lg font-bold font-cairo gradient-text">
                    {firstResult.value}
                  </span>
                  <span className="text-xs text-text-secondary font-tajawal mr-2">
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
                className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-surface-light text-text-secondary border border-border"
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GradientBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "أعمالنا" }]} />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge variant="accent">معرض الأعمال</Badge>
            <h1 className="text-h1 font-bold font-cairo gradient-text mt-6 mb-6">
              أعمالنا
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary font-tajawal max-w-3xl mx-auto leading-relaxed">
              مشاريع حقيقية حققنا فيها نتائج استثنائية لعملائنا. اكتشف كيف
              ساعدنا الشركات في تحويل أفكارهم لمنتجات تقنية ناجحة
            </p>
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Filter & Projects */}
      <section className="section-padding">
        <Container>
          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold font-cairo transition-all duration-300 border",
                  activeFilter === cat.value
                    ? "bg-gradient-to-l from-primary to-secondary text-white border-primary/30 shadow-glow"
                    : "bg-glass text-text-secondary border-border hover:border-primary/30 hover:text-text-primary"
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
              <p className="text-text-secondary text-lg font-tajawal">
                لا توجد مشاريع في هذا القسم حالياً
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <GradientBackground />
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo gradient-text mb-6">
              عندك فكرة مشروع؟
            </h2>
            <p className="text-text-secondary text-lg font-tajawal mb-8 leading-relaxed">
              خلينا نحول فكرتك لمنتج تقني ناجح. تواصل معنا النهاردة واحصل على
              استشارة مجانية
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                ابدأ مشروعك الآن
              </Button>
              <Button href="/services" size="lg" variant="outline">
                تعرف على خدماتنا
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
