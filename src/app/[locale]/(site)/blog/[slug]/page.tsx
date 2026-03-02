import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { blogPosts } from "@/data/blog";
import { findBlogPostBySlug, getBlogPosts } from "@/lib/data";
import BlogPostContent from "./BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = findBlogPostBySlug(slug, locale);

  if (!post) {
    return { title: locale === "en" ? "Article Not Found" : "المقال غير موجود" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: locale === "en" ? "en_US" : "ar_EG",
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
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

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
