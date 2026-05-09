import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostsGrid from "@/components/blog/PostsGrid";
import { getAllAuthors, getPostsByAuthor } from "@/lib/blog-archive";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors("ar");
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const { posts, authorName } = await getPostsByAuthor(slug, locale);
  if (posts.length === 0) return { title: "404" };

  const title = `${authorName} | كاتب في إتقان`;
  const description = `كل المقالات بقلم ${authorName}. ${posts.length}+ مقالة في تطوير المواقع، التطبيقات، وحلول الأعمال.`;

  return {
    title,
    description,
    alternates: getAlternates(`/blog/author/${slug}`),
    openGraph: { title, description, type: "profile" },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { posts, authorName } = await getPostsByAuthor(slug, locale);

  if (posts.length === 0) notFound();

  const isArabic = locale === "ar";
  const baseUrl = `${BASE_URL}${isArabic ? "" : "/en"}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: authorName,
      url: `${baseUrl}/blog/author/${slug}`,
      jobTitle: isArabic ? "كاتب تقني" : "Tech Writer",
      worksFor: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
    },
    getBreadcrumbSchema([
      { name: isArabic ? "الرئيسية" : "Home", url: `${baseUrl}/` },
      { name: isArabic ? "المدونة" : "Blog", url: `${baseUrl}/blog` },
      { name: authorName, url: `${baseUrl}/blog/author/${slug}` },
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
              { label: authorName },
            ]}
          />
          <div className="max-w-3xl flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-3xl font-bold font-cairo text-accent shrink-0">
              {authorName.charAt(0)}
            </div>
            <div>
              <Badge variant="gold">{isArabic ? "كاتب" : "Author"}</Badge>
              <h1 className="text-h1 font-bold font-cairo text-white mt-4 mb-3">
                {authorName}
              </h1>
              <p className="text-white/60 font-cairo">
                {posts.length} {isArabic ? "مقالة منشورة" : "published articles"}
              </p>
            </div>
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
