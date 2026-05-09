import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostsGrid from "@/components/blog/PostsGrid";
import {
  getAllCategories,
  getPostsByCategory,
} from "@/lib/blog-archive";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const cats = await getAllCategories("ar");
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const { posts, categoryName } = await getPostsByCategory(slug, locale);
  if (posts.length === 0) return { title: "404" };

  const title = `${categoryName} | مقالات إتقان`;
  const description = `كل المقالات في تصنيف ${categoryName}. ${posts.length}+ مقالة من خبراء إتقان للحلول المتكاملة.`;

  return {
    title,
    description,
    alternates: getAlternates(`/blog/category/${slug}`),
    openGraph: { title, description, type: "website" },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { posts, categoryName } = await getPostsByCategory(slug, locale);

  if (posts.length === 0) notFound();

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  const schemas = [
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      { name: isArabic ? "المدونة" : "Blog", url: `${baseUrl}/blog` },
      { name: categoryName, url: `${baseUrl}/blog/category/${slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: categoryName,
      description: `${categoryName} articles`,
      url: `${baseUrl}/blog/category/${slug}`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${baseUrl}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    },
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
              { label: categoryName },
            ]}
          />
          <div className="max-w-3xl">
            <Badge variant="gold">{isArabic ? "تصنيف" : "Category"}</Badge>
            <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-4">
              {categoryName}
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
