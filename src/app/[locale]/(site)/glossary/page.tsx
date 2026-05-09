import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { glossaryTerms, getCategories } from "@/data/glossary";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "قاموس المصطلحات التقنية | إتقان للحلول المتكاملة",
  description: `أكثر من ${glossaryTerms.length} مصطلح تقني بالعربي مشروح بالتفصيل. تطوير المواقع، التطبيقات، الأمن السيبراني، الذكاء الاصطناعي، وأكثر من خبراء إتقان.`,
  keywords: [
    "قاموس تقني",
    "مصطلحات برمجة",
    "مصطلحات تقنية بالعربي",
    "تعريف API",
    "ما هو SEO",
    "ما هو ERP",
    "مصطلحات الويب",
  ],
  alternates: getAlternates("/glossary"),
};

export default function GlossaryPage() {
  const categories = getCategories();

  const schema = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "قاموس المصطلحات", url: `${BASE_URL}/glossary` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "قاموس المصطلحات التقنية",
      hasDefinedTerm: glossaryTerms.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        alternateName: t.termEn,
        description: t.definition,
        url: `${BASE_URL}/glossary/${t.slug}`,
      })),
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
          <Breadcrumb items={[{ label: "قاموس المصطلحات" }]} />
          <div className="max-w-3xl">
            <Badge variant="gold">معجم تقني</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              قاموس المصطلحات التقنية
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              أكثر من {glossaryTerms.length} مصطلح تقني بالعربية مشروح بالتفصيل
              من خبراء إتقان. دليلك المرجعي لفهم البرمجة، التطبيقات، الأمن
              السيبراني، الذكاء الاصطناعي، وأكثر.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          {categories.map((category) => {
            const terms = glossaryTerms.filter((t) => t.category === category);
            return (
              <div key={category} className="mb-14">
                <div className="flex items-baseline gap-3 mb-6 pb-3 border-b border-border">
                  <h2 className="text-h2 font-bold font-cairo text-text-primary">
                    {category}
                  </h2>
                  <span className="text-sm text-text-muted font-cairo">
                    ({terms.length} مصطلح)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}` as never}
                      className="group block p-5 rounded-2xl bg-surface border border-border hover:border-accent/40 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold font-cairo text-text-primary group-hover:text-accent transition-colors">
                          {term.term}
                        </h3>
                        <span
                          className="text-xs text-text-muted font-cairo"
                          dir="ltr"
                        >
                          {term.termEn}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary font-cairo leading-relaxed line-clamp-2">
                        {term.definition}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
