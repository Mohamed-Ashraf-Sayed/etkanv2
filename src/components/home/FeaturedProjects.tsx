"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Project } from "@/data/projects";
import { getProjects } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

interface Props {
  dbProjects?: Project[];
}

export default function FeaturedProjects({ dbProjects = [] }: Props) {
  const t = useTranslations("featuredProjects");
  const locale = useLocale();
  const staticProjects = getProjects(locale);
  const dbSlugs = new Set(dbProjects.map((p) => p.slug));
  const allProjects = [
    ...dbProjects,
    ...staticProjects.filter((p) => !dbSlugs.has(p.slug)),
  ];
  const featured = allProjects[0];
  const others = allProjects.slice(1, 3);

  return (
    <section className="section-padding section-navy relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/[0.02] rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} light />

        <div className="border border-white/10 rounded-2xl overflow-hidden">
          {/* Featured Project — Large */}
          {featured && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <Link
                href={("/portfolio/" + featured.slug) as any}
                className="group grid gap-0 overflow-hidden transition-colors duration-500 hover:bg-white/[0.03] lg:grid-cols-2"
              >
                {/* Text side */}
                <div className="flex flex-col justify-between gap-6 p-8 md:p-12 lg:p-14 order-2 lg:order-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="gold">{featured.categoryLabel}</Badge>
                    <span className="text-white/30 text-xs font-cairo">
                      {featured.year}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-accent/60 font-cairo uppercase tracking-widest mb-3">
                      {featured.client}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold font-cairo text-white mb-4 leading-tight group-hover:text-accent transition-colors duration-500">
                      {featured.title}
                    </h3>
                    <p className="text-white/50 font-cairo leading-relaxed mb-6 max-w-lg">
                      {featured.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featured.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent/10 text-accent/85 text-[11px] px-3 py-1.5 rounded-md border border-accent/20 font-cairo font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-accent text-sm font-semibold font-cairo group-hover:gap-3 transition-all duration-300">
                      <span>{t("viewProject")}</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Image side */}
                <div className="relative isolate p-4 md:p-6 order-1 lg:order-2">
                  <div className="relative isolate h-full border border-white/10 rounded-xl bg-white/[0.02] p-1.5 overflow-hidden">
                    <div className="relative aspect-[14/9] lg:aspect-auto lg:h-full overflow-hidden rounded-lg">
                      <Image
                        src={featured.thumbnail || "/images/service-web.jpg"}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Bottom row — 2 smaller projects */}
          <div className="flex border-t border-white/10">
            <div className="grid w-full lg:grid-cols-2">
              {others.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className={
                    idx === 0
                      ? "lg:border-e border-white/10"
                      : "border-t lg:border-t-0"
                  }
                >
                  <Link
                    href={("/portfolio/" + project.slug) as any}
                    className="group flex flex-col justify-between gap-8 p-8 md:p-12 transition-colors duration-500 hover:bg-white/[0.03] h-full"
                  >
                    {/* Image */}
                    <div className="relative border border-white/10 rounded-xl bg-white/[0.02] p-1.5 overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                        <Image
                          src={project.thumbnail || "/images/service-web.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="gold">{project.categoryLabel}</Badge>
                        <span className="text-white/30 text-xs font-cairo">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-xs text-accent/60 font-cairo uppercase tracking-widest mb-2">
                        {project.client}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold font-cairo text-white mb-3 leading-tight group-hover:text-accent transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/50 font-cairo leading-relaxed mb-6">
                        {project.summary}
                      </p>

                      <div className="flex items-center gap-2 text-accent text-sm font-semibold font-cairo group-hover:gap-3 transition-all duration-300">
                        <span>{t("viewProject")}</span>
                        <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* View all button */}
        <div className="text-center mt-14">
          <Button variant="gold" size="lg" href="/portfolio">
            {t("viewAll")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
