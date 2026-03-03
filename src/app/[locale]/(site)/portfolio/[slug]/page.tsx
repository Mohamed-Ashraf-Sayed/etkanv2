import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProjectBySlug } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = findProjectBySlug(slug, locale);

  if (!project) {
    return { title: locale === "en" ? "Project Not Found" : "المشروع غير موجود" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = findProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
