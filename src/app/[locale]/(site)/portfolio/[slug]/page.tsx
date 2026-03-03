import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { findProjectBySlug } from "@/lib/data";
import { getDbProjectBySlug } from "@/lib/db-projects";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = findProjectBySlug(slug, locale) || await getDbProjectBySlug(slug, locale);

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
  const project = findProjectBySlug(slug, locale) || await getDbProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
