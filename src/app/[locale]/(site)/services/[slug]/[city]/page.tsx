import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { findServiceBySlug } from "@/lib/data";
import { getCityBySlug, cities } from "@/data/cities";
import {
  getAlternates,
  getServiceSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";
import ServiceCityClient from "./ServiceCityClient";

export const revalidate = 86400; // 24 hours

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string; city: string; locale: string }>;
}

// Pre-generate all combinations at build time
export async function generateStaticParams() {
  const services = ["web-dev", "mobile-dev", "crm", "networks", "it-support"];
  const locales = ["ar", "en"];
  const params: { slug: string; city: string; locale: string }[] = [];
  for (const locale of locales) {
    for (const slug of services) {
      for (const city of cities) {
        params.push({ locale, slug, city: city.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, city: citySlug, locale } = await params;
  const service = findServiceBySlug(slug, locale);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    return { title: "404" };
  }

  const isArabic = locale === "ar";
  const cityName = isArabic ? city.nameAr : city.nameEn;
  const countryName = isArabic ? city.countryAr : city.countryEn;

  const title = isArabic
    ? `${service.title} في ${cityName} | إتقان للحلول المتكاملة`
    : `${service.title} in ${cityName} | Etqan IT Solutions`;

  const description = isArabic
    ? `أفضل شركة ${service.shortTitle || service.title} في ${cityName}, ${countryName}. ${service.shortDescription || service.description.slice(0, 100)} — استشارة مجانية، عروض سعر تنافسية.`
    : `Best ${service.shortTitle || service.title} company in ${cityName}, ${countryName}. ${service.shortDescription || service.description.slice(0, 100)} — Free consultation, competitive pricing.`;

  return {
    title,
    description,
    keywords: isArabic
      ? [
          `${service.title} ${cityName}`,
          `شركة ${service.title} في ${cityName}`,
          `أفضل ${service.title} في ${cityName}`,
          `تكلفة ${service.title} في ${cityName}`,
          `${service.title} في ${countryName}`,
        ]
      : [
          `${service.title} ${cityName}`,
          `${service.title} company ${cityName}`,
          `best ${service.title} ${cityName}`,
          `${service.title} in ${countryName}`,
        ],
    alternates: getAlternates(`/services/${slug}/${citySlug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/services/${slug}/${citySlug}`,
      type: "website",
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { slug, city: citySlug, locale } = await params;
  setRequestLocale(locale);
  const service = findServiceBySlug(slug, locale);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    notFound();
  }

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;
  const cityName = isArabic ? city.nameAr : city.nameEn;

  const schemas = [
    getServiceSchema({
      title: `${service.title} - ${cityName}`,
      description: service.description,
      slug: `${service.slug}/${citySlug}`,
    }),
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      {
        name: isArabic ? "خدماتنا" : "Services",
        url: `${baseUrl}/services`,
      },
      { name: service.title, url: `${baseUrl}/services/${slug}` },
      { name: cityName, url: `${baseUrl}/services/${slug}/${citySlug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.title} - ${cityName}`,
      provider: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: cityName,
        containedInPlace: {
          "@type": "Country",
          name: isArabic ? city.countryAr : city.countryEn,
        },
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ServiceCityClient service={service} city={city} locale={locale} />
    </>
  );
}
