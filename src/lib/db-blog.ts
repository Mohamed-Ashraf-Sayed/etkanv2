import { prisma } from "@/lib/db";
import type { BlogPost } from "@/data/blog";

const cache = {
  published: null as { data: BlogPost[]; ts: number } | null,
  bySlug: new Map<string, { data: BlogPost | undefined; ts: number }>(),
};
const TTL = 5 * 60 * 1000; // 5 minutes

function dbToBlog(p: {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: string;
  category: string;
  tags: string;
  heroImage: string;
  inlineImages: string;
  readingTime: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}, locale: string): BlogPost {
  const isEn = locale === "en";
  const publishedDate = p.publishedAt || p.createdAt;
  const updatedDate = p.updatedAt && p.updatedAt > publishedDate ? p.updatedAt : null;
  return {
    slug: p.slug,
    title: isEn ? p.titleEn || p.title : p.title,
    excerpt: isEn ? p.excerptEn || p.excerpt : p.excerpt,
    content: isEn ? p.contentEn || p.content : p.content,
    author: p.author,
    date: publishedDate.toISOString().split("T")[0],
    dateModified: updatedDate ? updatedDate.toISOString().split("T")[0] : undefined,
    readingTime: p.readingTime,
    tags: JSON.parse(p.tags || "[]"),
    category: p.category,
    heroImage: p.heroImage || undefined,
    inlineImages: JSON.parse(p.inlineImages || "[]"),
  };
}

export async function getPublishedBlogPosts(locale: string): Promise<BlogPost[]> {
  if (cache.published && Date.now() - cache.published.ts < TTL) {
    return cache.published.data.map((p) =>
      ({ ...p, content: p.content || "" })
    );
  }
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });
    const mapped = posts.map((p) => dbToBlog(p, locale));
    cache.published = { data: mapped, ts: Date.now() };
    return mapped;
  } catch (e) {
    console.error("getPublishedBlogPosts error:", e);
    return [];
  }
}

export async function getBlogPostBySlugFromDB(
  slug: string,
  locale: string
): Promise<BlogPost | undefined> {
  const cached = cache.bySlug.get(slug);
  if (cached && Date.now() - cached.ts < TTL) return cached.data;

  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post || post.status !== "published") {
      cache.bySlug.set(slug, { data: undefined, ts: Date.now() });
      return undefined;
    }
    const mapped = dbToBlog(post, locale);
    cache.bySlug.set(slug, { data: mapped, ts: Date.now() });
    return mapped;
  } catch (e) {
    console.error("getBlogPostBySlugFromDB error:", e);
    return undefined;
  }
}

export function clearBlogCache() {
  cache.published = null;
  cache.bySlug.clear();
}
