import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug } from "@/lib/data";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
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
  const { slug, locale } = await params;
  const service = findServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
