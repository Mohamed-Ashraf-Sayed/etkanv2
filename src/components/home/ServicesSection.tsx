"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { VerticalTabs } from "@/components/ui/vertical-tabs";
import type { VerticalTabItem } from "@/components/ui/vertical-tabs";
import { getServiceCategories } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

const serviceImages: Record<string, string> = {
  "web-and-apps": "/images/service-web.jpg",
  "enterprise-systems": "/images/service-enterprise.jpg",
  infrastructure: "/images/service-infra.jpg",
  support: "/images/service-support.jpg",
  consulting: "/images/service-consulting.jpg",
};

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const categories = getServiceCategories(locale);

  const tabItems: VerticalTabItem[] = categories.map((category, index) => ({
    id: String(index + 1).padStart(2, "0"),
    title: category.title,
    description: category.description,
    image: serviceImages[category.slug] || "/images/service-web.jpg",
  }));

  return (
    <section className="section-padding relative bg-white dark:bg-background">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <VerticalTabs items={tabItems} />
      </Container>
    </section>
  );
}
