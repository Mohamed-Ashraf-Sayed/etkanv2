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

  return {
    title: service.title,
    description: service.description,
    alternates: getAlternates(`/services/${slug}`),
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/services/${slug}`,
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
