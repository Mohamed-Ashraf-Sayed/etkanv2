"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel";
import type { GalleryItem } from "@/components/ui/gallery-hover-carousel";
import type { Project } from "@/data/projects";
import { getProjects } from "@/lib/data";

interface Props {
  dbProjects?: Project[];
}

export default function PortfolioPageClient({ dbProjects = [] }: Props) {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  const staticProjects = getProjects(locale);
  const dbSlugs = new Set(dbProjects.map((p) => p.slug));
  const mergedProjects = [
    ...dbProjects,
    ...staticProjects.filter((p) => !dbSlugs.has(p.slug)),
  ];

  const galleryItems: GalleryItem[] = mergedProjects.map((p) => ({
    id: p.slug,
    title: p.title,
    subtitle: p.client,
    badge: p.categoryLabel,
    summary: p.summary,
    url: `/portfolio/${p.slug}`,
    image: p.thumbnail || "/images/service-web.jpg",
    tags: p.tags.slice(0, 3),
  }));

  return (
    <>
      {/* Hero */}
      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: t("title") }]} />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Badge variant="gold">{t("badge")}</Badge>
            <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
              {t("title")}
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-white/70 font-cairo max-w-3xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Dual Row Gallery */}
      <section className="py-12 md:py-20 bg-white dark:bg-background">
        <GalleryHoverCarousel items={galleryItems} />
      </section>

      {/* CTA */}
      <section className="section-padding section-navy">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/70 text-lg font-cairo mb-8 leading-relaxed">
              {t("ctaSub")}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg" variant="gold">
                {t("ctaButton")}
              </Button>
              <Button
                href="/services"
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:border-accent hover:text-accent"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
