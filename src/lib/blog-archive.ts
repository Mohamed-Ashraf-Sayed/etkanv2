import { getBlogPosts } from "@/lib/data";
import { getPublishedBlogPosts } from "@/lib/db-blog";
import type { BlogPost } from "@/data/blog";
import { slugify } from "@/lib/utils";

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  const dbPosts = await getPublishedBlogPosts(locale);
  const staticPosts = getBlogPosts(locale);
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  return [...dbPosts, ...staticPosts.filter((p) => !dbSlugs.has(p.slug))];
}

export function postSlugFromCategory(category: string): string {
  return slugify(category);
}

export function postSlugFromTag(tag: string): string {
  return slugify(tag);
}

export function postSlugFromAuthor(author: string): string {
  return slugify(author);
}

export async function getPostsByCategory(
  categorySlug: string,
  locale: string
): Promise<{ posts: BlogPost[]; categoryName: string }> {
  const posts = await getAllPosts(locale);
  const matching = posts.filter(
    (p) => postSlugFromCategory(p.category) === categorySlug
  );
  const categoryName = matching[0]?.category || categorySlug;
  return { posts: matching, categoryName };
}

export async function getPostsByTag(
  tagSlug: string,
  locale: string
): Promise<{ posts: BlogPost[]; tagName: string }> {
  const posts = await getAllPosts(locale);
  const matching = posts.filter((p) =>
    p.tags.some((t) => postSlugFromTag(t) === tagSlug)
  );
  const tagName =
    matching[0]?.tags.find((t) => postSlugFromTag(t) === tagSlug) || tagSlug;
  return { posts: matching, tagName };
}

export async function getPostsByAuthor(
  authorSlug: string,
  locale: string
): Promise<{ posts: BlogPost[]; authorName: string }> {
  const posts = await getAllPosts(locale);
  const matching = posts.filter(
    (p) => postSlugFromAuthor(p.author) === authorSlug
  );
  const authorName = matching[0]?.author || authorSlug;
  return { posts: matching, authorName };
}

export async function getAllCategories(
  locale: string
): Promise<Array<{ slug: string; name: string; count: number }>> {
  const posts = await getAllPosts(locale);
  const map = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    const slug = postSlugFromCategory(post.category);
    const existing = map.get(slug);
    if (existing) existing.count++;
    else map.set(slug, { name: post.category, count: 1 });
  }
  return Array.from(map.entries()).map(([slug, v]) => ({ slug, ...v }));
}

export async function getAllTags(
  locale: string
): Promise<Array<{ slug: string; name: string; count: number }>> {
  const posts = await getAllPosts(locale);
  const map = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const slug = postSlugFromTag(tag);
      const existing = map.get(slug);
      if (existing) existing.count++;
      else map.set(slug, { name: tag, count: 1 });
    }
  }
  return Array.from(map.entries()).map(([slug, v]) => ({ slug, ...v }));
}

export async function getAllAuthors(
  locale: string
): Promise<Array<{ slug: string; name: string; count: number }>> {
  const posts = await getAllPosts(locale);
  const map = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    const slug = postSlugFromAuthor(post.author);
    const existing = map.get(slug);
    if (existing) existing.count++;
    else map.set(slug, { name: post.author, count: 1 });
  }
  return Array.from(map.entries()).map(([slug, v]) => ({ slug, ...v }));
}
