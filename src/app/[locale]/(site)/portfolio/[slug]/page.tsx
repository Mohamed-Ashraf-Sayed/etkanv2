import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { findProjectBySlug } from "@/lib/data";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";
import ProjectDetailClient from "./ProjectDetailClient";

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
  const project = findProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: locale === "en" ? "Project Not Found" : "المشروع غير موجود",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: getAlternates(`/portfolio/${slug}`),
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/portfolio/${slug}`,
      images: project.thumbnail
        ? [{ url: `${BASE_URL}${project.thumbnail}` }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const project = findProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": ["Article", "CaseStudy"],
      headline: project.title,
      description: project.summary,
      articleBody: `${project.problem}\n\n${project.solution}`,
      url: `${baseUrl}/portfolio/${slug}`,
      image: project.thumbnail
        ? `${BASE_URL}${project.thumbnail}`
        : `${BASE_URL}/opengraph-image`,
      datePublished: `${project.year}-01-01`,
      author: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.png` },
      },
      about: {
        "@type": "Thing",
        name: project.industry,
      },
      keywords: project.tags.join(", "),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/portfolio/${slug}`,
      },
    },
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      {
        name: isArabic ? "أعمالنا" : "Portfolio",
        url: `${baseUrl}/portfolio`,
      },
      { name: project.title, url: `${baseUrl}/portfolio/${slug}` },
    ]),
  ];

  if (project.testimonial) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Review",
      reviewBody: project.testimonial.text,
      author: {
        "@type": "Person",
        name: project.testimonial.author,
        jobTitle: project.testimonial.role,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      itemReviewed: {
        "@type": "Service",
        name: project.title,
        provider: {
          "@type": "Organization",
          name: "إتقان للحلول المتكاملة",
          url: BASE_URL,
        },
      },
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
