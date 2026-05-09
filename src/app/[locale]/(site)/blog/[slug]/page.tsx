import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findBlogPostBySlug, getBlogPosts } from "@/lib/data";
import {
  getAlternates,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";
import {
  getBlogPostBySlugFromDB,
  getPublishedBlogPosts,
} from "@/lib/db-blog";
import { autoLinkContent, detectHowToSchema } from "@/lib/blog-enhance";
import BlogPostContent from "./BlogPostContent";

export const revalidate = 300;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

async function getPost(slug: string, locale: string) {
  // Try DB first (newer dynamic posts)
  const dbPost = await getBlogPostBySlugFromDB(slug, locale);
  if (dbPost) return dbPost;
  // Fall back to static posts
  return findBlogPostBySlug(slug, locale);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) {
    return {
      title: locale === "en" ? "Article Not Found" : "المقال غير موجود",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: getAlternates(`/blog/${slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: locale === "en" ? "en_US" : "ar_EG",
      authors: [post.author],
      tags: post.tags,
      publishedTime: post.date,
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) {
    notFound();
  }

  const dbPosts = await getPublishedBlogPosts(locale);
  const staticPosts = getBlogPosts(locale);
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const allPosts = [
    ...dbPosts,
    ...staticPosts.filter((p) => !dbSlugs.has(p.slug)),
  ];
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 2);

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  // Apply auto-linking to content
  post.content = autoLinkContent(post.content);

  const articleUrl = `${baseUrl}/blog/${slug}`;
  const howToSchema = detectHowToSchema(post.title, post.content, articleUrl);

  const schemas: object[] = [
    getArticleSchema({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.date,
      author: post.author,
    }),
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      { name: isArabic ? "المدونة" : "Blog", url: `${baseUrl}/blog` },
      { name: post.title, url: articleUrl },
    ]),
  ];
  if (howToSchema) schemas.push(howToSchema);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
