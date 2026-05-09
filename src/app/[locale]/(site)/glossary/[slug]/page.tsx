import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  glossaryTerms,
  getTermBySlug,
  getTermsByCategory,
} from "@/data/glossary";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return { title: "404" };

  return {
    title: `${term.term} - ما هو ${term.term}؟ | قاموس إتقان التقني`,
    description: term.definition,
    keywords: [
      term.term,
      term.termEn,
      `ما هو ${term.term}`,
      `تعريف ${term.term}`,
      `${term.term} بالعربي`,
    ],
    alternates: getAlternates(`/glossary/${slug}`),
  };
}

export default async function TermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const related =
    term.related?.map((r) => getTermBySlug(r)).filter(Boolean) || [];
  const sameCategory = getTermsByCategory(term.category)
    .filter((t) => t.slug !== term.slug)
    .slice(0, 4);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      alternateName: term.termEn,
      description: term.longDefinition,
      url: `${BASE_URL}/glossary/${slug}`,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "قاموس المصطلحات التقنية",
        url: `${BASE_URL}/glossary`,
      },
    },
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "قاموس المصطلحات", url: `${BASE_URL}/glossary` },
      { name: term.term, url: `${BASE_URL}/glossary/${slug}` },
    ]),
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
              { label: "قاموس المصطلحات", href: "/glossary" },
              { label: term.term },
            ]}
          />
          <div className="max-w-3xl">
            <Badge variant="gold">{term.category}</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-3">
              {term.term}
            </h1>
            <p
              className="text-lg text-accent/80 font-cairo mb-6"
              dir="ltr"
            >
              {term.termEn}
            </p>
            <div className="gold-line mb-6" />

            {/* TL;DR for AI Overviews */}
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                التعريف المختصر
              </p>
              <p className="text-white text-lg font-cairo leading-relaxed">
                {term.definition}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4">
              ما هو {term.term}؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-10">
              {term.longDefinition}
            </p>

            {/* Related Terms */}
            {related.length > 0 && (
              <div className="mb-10">
                <h3 className="text-h3 font-bold font-cairo text-text-primary mb-5">
                  مصطلحات ذات صلة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {related.map((r) => (
                    <Link
                      key={r!.slug}
                      href={`/glossary/${r!.slug}` as never}
                      className="block p-4 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all group"
                    >
                      <h4 className="font-bold font-cairo text-text-primary group-hover:text-accent transition-colors mb-1">
                        {r!.term}
                      </h4>
                      <p className="text-xs text-text-muted font-cairo line-clamp-1">
                        {r!.definition}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl section-navy p-8 text-center text-white">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                هل تحتاج مساعدة في {term.category}؟
              </h3>
              <p className="text-white/60 font-cairo mb-6">
                خبراء إتقان جاهزين يساعدوك. استشارة مجانية.
              </p>
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Same category */}
      {sameCategory.length > 0 && (
        <section className="section-padding section-alt">
          <Container>
            <h3 className="text-h3 font-bold font-cairo text-text-primary mb-6">
              مصطلحات أخرى في {term.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sameCategory.map((t) => (
                <Link
                  key={t.slug}
                  href={`/glossary/${t.slug}` as never}
                  className="block p-5 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all group"
                >
                  <h4 className="font-bold font-cairo text-text-primary group-hover:text-accent transition-colors mb-2">
                    {t.term}
                  </h4>
                  <p className="text-sm text-text-muted font-cairo line-clamp-2">
                    {t.definition}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
