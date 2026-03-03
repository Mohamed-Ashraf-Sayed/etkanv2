import { prisma } from "@/lib/db";
import type { Project } from "@/data/projects";

const categoryLabelsMap: Record<string, Record<string, string>> = {
  ar: { website: "مواقع", mobile: "تطبيقات", systems: "أنظمة", infrastructure: "بنية تحتية" },
  en: { website: "Websites", mobile: "Mobile Apps", systems: "Systems", infrastructure: "Infrastructure" },
};

// In-memory cache to reduce DB connections (hosting limit: 500/hour)
const cache = {
  projects: null as { data: Project[]; locale: string; ts: number } | null,
  bySlug: new Map<string, { data: Project | undefined; ts: number }>(),
};
const TTL = 5 * 60 * 1000; // 5 minutes

function dbToProject(p: Record<string, unknown>, locale: string): Project {
  const isEn = locale === "en";
  const testimonialRaw = JSON.parse(
    (isEn ? (p.testimonialEn as string) || "{}" : (p.testimonial as string) || "{}") as string
  );

  return {
    slug: p.slug as string,
    title: isEn ? ((p.titleEn as string) || (p.title as string)) : (p.title as string),
    client: isEn ? ((p.clientEn as string) || (p.client as string)) : (p.client as string),
    industry: isEn ? ((p.industryEn as string) || (p.industry as string)) : (p.industry as string),
    category: (p.category as string) as Project["category"],
    categoryLabel: categoryLabelsMap[locale]?.[p.category as string] || (p.category as string),
    summary: isEn ? ((p.summaryEn as string) || (p.summary as string)) : (p.summary as string),
    description: isEn ? ((p.descriptionEn as string) || (p.description as string)) : (p.description as string),
    problem: isEn ? ((p.problemEn as string) || (p.problem as string)) : (p.problem as string),
    solution: isEn ? ((p.solutionEn as string) || (p.solution as string)) : (p.solution as string),
    results: JSON.parse((isEn ? (p.resultsEn as string) || "[]" : (p.results as string) || "[]") as string),
    tags: JSON.parse((isEn ? (p.tagsEn as string) || "[]" : (p.tags as string) || "[]") as string),
    testimonial: testimonialRaw?.text ? testimonialRaw : undefined,
    techStack: JSON.parse(((p.techStack as string) || "[]") as string),
    thumbnail: (p.thumbnail as string) || undefined,
    images: (() => {
      const imgs = JSON.parse(((p.images as string) || "[]") as string);
      return imgs.length > 0 ? imgs : undefined;
    })(),
    duration: isEn ? ((p.durationEn as string) || (p.duration as string)) : (p.duration as string),
    year: p.year as string,
  };
}

export async function getDbProjects(locale: string = "ar"): Promise<Project[]> {
  if (cache.projects && cache.projects.locale === locale && Date.now() - cache.projects.ts < TTL) {
    return cache.projects.data;
  }

  try {
    const dbProjects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    const result = dbProjects.map((p) => dbToProject(p as unknown as Record<string, unknown>, locale));
    cache.projects = { data: result, locale, ts: Date.now() };
    return result;
  } catch {
    if (cache.projects) return cache.projects.data;
    return [];
  }
}

export async function getDbProjectBySlug(slug: string, locale: string = "ar"): Promise<Project | undefined> {
  const key = `${slug}-${locale}`;
  const cached = cache.bySlug.get(key);
  if (cached && Date.now() - cached.ts < TTL) {
    return cached.data;
  }

  try {
    const p = await prisma.project.findUnique({ where: { slug } });
    if (!p || !p.isActive) {
      cache.bySlug.set(key, { data: undefined, ts: Date.now() });
      return undefined;
    }
    const result = dbToProject(p as unknown as Record<string, unknown>, locale);
    cache.bySlug.set(key, { data: result, ts: Date.now() });
    return result;
  } catch {
    return cache.bySlug.get(key)?.data;
  }
}
