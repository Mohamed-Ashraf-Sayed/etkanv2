import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { cities } from "@/data/cities";
import { getPublishedBlogPosts } from "@/lib/db-blog";
import {
  getAllCategories,
  getAllTags,
  getAllAuthors,
} from "@/lib/blog-archive";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

const locales = ["ar", "en"] as const;

function localizedUrl(path: string, locale: string) {
  return locale === "ar" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
}

function withAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedUrl(path, locale);
  }
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/scope", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/booking", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(
    ({ path, changeFrequency, priority }) =>
      locales.map((locale) => ({
        url: localizedUrl(path, locale),
        lastModified: new Date(),
        changeFrequency,
        priority: locale === "ar" ? priority : priority * 0.9,
        alternates: withAlternates(path),
      }))
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    locales.map((locale) => ({
      url: localizedUrl(`/services/${s.slug}`, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "ar" ? 0.8 : 0.7,
      alternates: withAlternates(`/services/${s.slug}`),
    }))
  );

  // City × Service combinations (programmatic SEO)
  const cityServiceRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    cities.flatMap((city) =>
      locales.map((locale) => ({
        url: localizedUrl(`/services/${s.slug}/${city.slug}`, locale),
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: locale === "ar" ? (city.popular ? 0.7 : 0.5) : 0.5,
        alternates: withAlternates(`/services/${s.slug}/${city.slug}`),
      }))
    )
  );

  // Merge static + DB posts (DB takes priority)
  const dbPosts = await getPublishedBlogPosts("ar");
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const allBlogPosts = [
    ...dbPosts,
    ...blogPosts.filter((p) => !dbSlugs.has(p.slug)),
  ];

  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts.flatMap((p) =>
    locales.map((locale) => ({
      url: localizedUrl(`/blog/${p.slug}`, locale),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: locale === "ar" ? 0.7 : 0.6,
      alternates: withAlternates(`/blog/${p.slug}`),
    }))
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) =>
    locales.map((locale) => ({
      url: localizedUrl(`/portfolio/${p.slug}`, locale),
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: locale === "ar" ? 0.6 : 0.5,
      alternates: withAlternates(`/portfolio/${p.slug}`),
    }))
  );

  // Archive pages: categories, tags, authors
  const [categories, tags, authors] = await Promise.all([
    getAllCategories("ar"),
    getAllTags("ar"),
    getAllAuthors("ar"),
  ]);

  const archiveRoutes: MetadataRoute.Sitemap = [
    ...categories.flatMap((c) =>
      locales.map((locale) => ({
        url: localizedUrl(`/blog/category/${c.slug}`, locale),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: withAlternates(`/blog/category/${c.slug}`),
      }))
    ),
    ...tags.flatMap((t) =>
      locales.map((locale) => ({
        url: localizedUrl(`/blog/tag/${t.slug}`, locale),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.4,
        alternates: withAlternates(`/blog/tag/${t.slug}`),
      }))
    ),
    ...authors.flatMap((a) =>
      locales.map((locale) => ({
        url: localizedUrl(`/blog/author/${a.slug}`, locale),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.4,
        alternates: withAlternates(`/blog/author/${a.slug}`),
      }))
    ),
  ];

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...cityServiceRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...archiveRoutes,
  ];
}
