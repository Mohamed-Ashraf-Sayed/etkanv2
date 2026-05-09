import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, X, Trophy, Equal, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { comparisons, getComparisonBySlug } from "@/data/comparisons";
import {
  getAlternates,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return { title: "404" };

  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: getAlternates(`/comparison/${slug}`),
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  const schema: object[] = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "مقارنات تقنية", url: `${BASE_URL}/comparison` },
      { name: c.title, url: `${BASE_URL}/comparison/${slug}` },
    ]),
    getFAQSchema(c.faqs),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.description,
      author: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
      },
      publisher: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/icon.png`,
        },
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "مقارنات تقنية", href: "/comparison" },
              { label: c.title },
            ]}
          />
          <div className="max-w-4xl">
            <Badge variant="gold">مقارنة شاملة</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              {c.title}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              {c.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* TL;DR */}
            <div className="bg-accent/5 border-2 border-accent/30 rounded-2xl p-6 mb-10">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                الخلاصة السريعة
              </h2>
              <p className="text-text-primary font-cairo text-lg leading-relaxed whitespace-pre-line">
                {c.recommendation}
              </p>
            </div>

            {/* Introduction */}
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-10">
              {c.introduction}
            </p>

            {/* Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[c.itemA, c.itemB].map((item, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold font-cairo text-text-primary mb-4">
                    {item.name}
                  </h3>
                  <div className="text-xs text-text-muted font-cairo mb-5">
                    {item.pricingNote}
                  </div>

                  <h4 className="text-sm font-bold text-accent mb-2">المميزات</h4>
                  <ul className="space-y-2 mb-5">
                    {item.pros.map((p, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-secondary font-cairo"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-bold text-amber-500 mb-2">العيوب</h4>
                  <ul className="space-y-2 mb-5">
                    {item.cons.map((co, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-secondary font-cairo"
                      >
                        <X className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{co}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-bold text-text-primary mb-1">
                      الأنسب لـ
                    </h4>
                    <p className="text-sm text-text-muted font-cairo leading-relaxed">
                      {item.bestFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              جدول المقارنة التفصيلي
            </h2>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-start p-4 text-sm font-bold font-cairo text-text-primary">
                      الميزة
                    </th>
                    <th className="text-start p-4 text-sm font-bold font-cairo text-text-primary">
                      {c.itemA.name.split(" - ")[0]}
                    </th>
                    <th className="text-start p-4 text-sm font-bold font-cairo text-text-primary">
                      {c.itemB.name.split(" - ")[0]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparisonTable.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-surface-light/30"
                    >
                      <td className="p-4 text-sm font-bold font-cairo text-text-primary">
                        {row.feature}
                      </td>
                      <td
                        className={`p-4 text-sm font-cairo ${
                          row.winner === "a"
                            ? "text-emerald-600 font-bold"
                            : "text-text-secondary"
                        }`}
                      >
                        {row.winner === "a" && (
                          <Trophy className="w-3.5 h-3.5 inline-block ms-1 text-emerald-500" />
                        )}
                        {row.winner === "tie" && (
                          <Equal className="w-3.5 h-3.5 inline-block ms-1 text-text-muted" />
                        )}
                        {row.a}
                      </td>
                      <td
                        className={`p-4 text-sm font-cairo ${
                          row.winner === "b"
                            ? "text-emerald-600 font-bold"
                            : "text-text-secondary"
                        }`}
                      >
                        {row.winner === "b" && (
                          <Trophy className="w-3.5 h-3.5 inline-block ms-1 text-emerald-500" />
                        )}
                        {row.winner === "tie" && (
                          <Equal className="w-3.5 h-3.5 inline-block ms-1 text-text-muted" />
                        )}
                        {row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Conclusion */}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-12">
              <h2 className="text-h3 font-bold font-cairo text-text-primary mb-4">
                الخلاصة
              </h2>
              <p className="text-text-secondary font-cairo text-lg leading-relaxed">
                {c.conclusion}
              </p>
            </div>

            {/* FAQ */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              أسئلة شائعة
            </h2>
            <div className="space-y-3 mb-12">
              {c.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-bold font-cairo text-text-primary">
                      {faq.question}
                    </span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-text-secondary font-cairo leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl section-navy p-8 text-center text-white">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                لسه محتار؟ خبراؤنا هيساعدوك تختار صح
              </h3>
              <p className="text-white/60 font-cairo mb-6">
                استشارة مجانية لمناقشة احتياجاتك واقتراح الحل الأمثل
              </p>
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
