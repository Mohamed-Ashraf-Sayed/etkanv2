import type { Metadata } from "next";
import BlogPageContent from "./BlogPageContent";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";
import { getPublishedBlogPosts } from "@/lib/db-blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "المدونة | مقالات تقنية عن البرمجة والتحول الرقمي",
  description:
    "مقالات ونصائح تقنية من خبراء إتقان عن تصميم المواقع، تطوير التطبيقات، أنظمة ERP و CRM، الأمن السيبراني، والتحول الرقمي للشركات.",
  keywords: [
    "مقالات تقنية",
    "مدونة برمجة",
    "نصائح تصميم مواقع",
    "التحول الرقمي",
    "أمن سيبراني",
  ],
  alternates: getAlternates("/blog"),
};

const blogSchema = getBreadcrumbSchema([
  { name: "الرئيسية", url: `${BASE_URL}/` },
  { name: "المدونة", url: `${BASE_URL}/blog` },
]);

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbPosts = await getPublishedBlogPosts(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogPageContent dbPosts={dbPosts} />
    </>
  );
}
