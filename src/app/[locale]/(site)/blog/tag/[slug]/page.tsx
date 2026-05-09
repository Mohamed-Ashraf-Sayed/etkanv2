import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostsGrid from "@/components/blog/PostsGrid";
import { getAllTags, getPostsByTag } from "@/lib/blog-archive";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags("ar");
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const { posts, tagName } = await getPostsByTag(slug, locale);
  if (posts.length === 0) return { title: "404" };

  const title = `#${tagName} | مقالات إتقان`;
  const description = `${posts.length}+ مقالة عن ${tagName} من خبراء إتقان للحلول المتكاملة.`;

  return {
    title,
    description,
    alternates: getAlternates(`/blog/tag/${slug}`),
    openGraph: { title, description, type: "website" },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { posts, tagName } = await getPostsByTag(slug, locale);

  if (posts.length === 0) notFound();

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  const schemas = [
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      { name: isArabic ? "المدونة" : "Blog", url: `${baseUrl}/blog` },
      { name: `#${tagName}`, url: `${baseUrl}/blog/tag/${slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb
            items={[
              { label: isArabic ? "المدونة" : "Blog", href: "/blog" },
              { label: `#${tagName}` },
            ]}
          />
          <div className="max-w-3xl">
            <Badge variant="gold">{isArabic ? "وسم" : "Tag"}</Badge>
            <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-4">
              #{tagName}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-white/60 font-cairo text-lg">
              {posts.length} {isArabic ? "مقالة" : "articles"}
            </p>
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <PostsGrid posts={posts} />
        </Container>
      </section>
    </>
  );
}
