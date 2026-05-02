import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findBlogPostBySlug, getBlogPosts } from "@/lib/data";
import {
  getAlternates,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";
import BlogPostContent from "./BlogPostContent";

export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = findBlogPostBySlug(slug, locale);

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
  const post = findBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts(locale);
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

  const schemas = [
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
      { name: post.title, url: `${baseUrl}/blog/${slug}` },
    ]),
  ];

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
