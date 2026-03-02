import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { services } from "@/data/services";
import { servicesEn } from "@/data/services.en";
import { findServiceBySlug } from "@/lib/data";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const service = findServiceBySlug(slug, locale);

  if (!service) {
    return { title: locale === "en" ? "Service Not Found" : "الخدمة غير موجودة" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const service = findServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
