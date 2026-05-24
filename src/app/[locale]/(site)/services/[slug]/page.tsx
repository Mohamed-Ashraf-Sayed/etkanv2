import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { findServiceBySlug } from "@/lib/data";
import {
  getAlternates,
  getServiceSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// SEO-optimized titles for high-intent commercial queries
const SEO_OVERRIDES: Record<string, { titleAr: string; descAr: string; titleEn: string; descEn: string; keywords: string[] }> = {
  "web-dev": {
    titleAr:
      "أفضل شركة تطوير مواقع في مصر والسعودية 2026 — إتقان للحلول المتكاملة",
    descAr:
      "شركة تطوير مواقع احترافية في مصر والسعودية. تصميم مواقع شركات، متاجر إلكترونية، ومنصات بـ Next.js و WordPress. أسعار من 5,000 جنيه + ضمان 6 شهور.",
    titleEn:
      "Best Web Development Company in Egypt & Saudi Arabia 2026 | Etqan",
    descEn:
      "Professional web development company in Egypt & Saudi Arabia. Corporate websites, e-commerce, and platforms with Next.js & WordPress. Pricing from $200 + 6-month warranty.",
    keywords: [
      "شركة تطوير مواقع",
      "أفضل شركة تصميم مواقع",
      "تصميم موقع إلكتروني",
      "شركة برمجة مواقع في مصر",
      "تطوير مواقع في السعودية",
      "web development company Egypt",
      "best web design Saudi Arabia",
    ],
  },
  "mobile-apps": {
    titleAr:
      "أفضل شركة تطوير تطبيقات موبايل في مصر والسعودية 2026 — iOS + Android",
    descAr:
      "شركة تطوير تطبيقات الموبايل لـ iOS و Android في مصر والسعودية. تطبيقات أصلية وهجينة (Flutter, React Native). تكلفة من 80,000 جنيه + استشارة مجانية.",
    titleEn:
      "Best Mobile App Development Company in Egypt & Saudi Arabia 2026",
    descEn:
      "iOS & Android mobile app development company in Egypt & Saudi Arabia. Native and hybrid apps (Flutter, React Native). Starting from $3,200 + free consultation.",
    keywords: [
      "شركة تطوير تطبيقات",
      "أفضل شركة تطبيقات موبايل",
      "تطوير تطبيق iOS Android",
      "شركة برمجة تطبيقات في مصر",
      "تطبيقات الموبايل في السعودية",
      "Flutter React Native development",
      "mobile app company Egypt",
    ],
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = findServiceBySlug(slug, locale);

  if (!service) {
    return {
      title: locale === "en" ? "Service Not Found" : "الخدمة غير موجودة",
    };
  }

  const override = SEO_OVERRIDES[slug];
  const isEn = locale === "en";
  const title = override
    ? isEn ? override.titleEn : override.titleAr
    : service.title;
  const description = override
    ? isEn ? override.descEn : override.descAr
    : service.description;

  return {
    title,
    description,
    keywords: override?.keywords,
    alternates: getAlternates(`/services/${slug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${isEn ? "/en" : ""}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const service = findServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  const schemas = [
    getServiceSchema({
      title: service.title,
      description: service.description,
      slug: service.slug,
    }),
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      {
        name: isArabic ? "خدماتنا" : "Services",
        url: `${baseUrl}/services`,
      },
      { name: service.title, url: `${baseUrl}/services/${slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
