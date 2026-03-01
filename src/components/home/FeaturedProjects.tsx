"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="section-padding section-navy relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/[0.02] rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          title="مشاريع مميزة"
          subtitle="نماذج من أعمالنا التي نفتخر بها"
          light
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.slug} variants={cardVariants}>
              <Link
                href={"/portfolio/" + project.slug}
                className="block group h-full"
              >
                <div className="rounded-2xl overflow-hidden h-full flex flex-col bg-white/[0.05] border border-white/10 hover:border-accent/40 transition-all duration-500 hover:bg-white/[0.08]">
                  {/* Header band */}
                  <div className="px-6 pt-6 pb-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="gold">{project.categoryLabel}</Badge>
                      <span className="text-white/30 text-xs font-cairo">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-cairo text-white group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent/80 font-cairo mt-1">
                      {project.client}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 flex-1 flex flex-col">
                    <p className="text-sm text-white/55 leading-relaxed font-cairo mb-5 flex-1">
                      {project.summary}
                    </p>

                    {/* Result metric */}
                    {project.results[0] && (
                      <div className="mb-5 border-r-2 border-accent pr-4 py-1">
                        <span className="text-3xl font-black font-cairo text-accent block leading-none">
                          {project.results[0].value}
                        </span>
                        <span className="text-white/45 text-xs font-cairo mt-1 block">
                          {project.results[0].metric}
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 text-white/50 text-[11px] px-2.5 py-1 rounded-md border border-white/10 font-cairo"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View link */}
                    <div className="flex items-center gap-2 text-accent text-sm font-semibold font-cairo group-hover:gap-3 transition-all duration-300">
                      <span>عرض المشروع</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <div className="text-center mt-14">
          <Button variant="gold" size="lg" href="/portfolio">
            شاهد كل أعمالنا
          </Button>
        </div>
      </Container>
    </section>
  );
}
