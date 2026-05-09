import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, GitCompare } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { comparisons } from "@/data/comparisons";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "مقارنات تقنية | ERP vs CRM, WordPress vs Custom, Native vs Hybrid",
  description:
    "مقارنات شاملة بين أهم التقنيات والأنظمة. ERP vs CRM، WordPress vs Custom Development، Native vs Hybrid Apps. اختر الأنسب لمشروعك.",
  keywords: [
    "مقارنات تقنية",
    "ERP vs CRM",
    "WordPress vs Custom",
    "Native vs Hybrid",
    "أيهما أفضل",
  ],
  alternates: getAlternates("/comparison"),
};

export default function ComparisonsHub() {
  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "مقارنات تقنية", url: `${BASE_URL}/comparison` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: "مقارنات تقنية" }]} />
          <div className="max-w-3xl">
            <Badge variant="gold">دليل المقارنة</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              مقارنات تقنية شاملة
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              مقارنات تفصيلية بين أهم التقنيات والأنظمة. ساعدنا نختار الأنسب
              لمشروعك بناءً على حجم شركتك، ميزانيتك، وأهدافك.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/comparison/${c.slug}` as never}
                className="group block p-8 rounded-2xl bg-surface border border-border hover:border-accent/40 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <GitCompare className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 group-hover:text-accent transition-colors">
                  {c.title}
                </h2>
                <p className="text-text-muted font-cairo text-sm leading-relaxed mb-5">
                  {c.subtitle}
                </p>
                <div className="flex items-center gap-2 text-accent font-bold font-cairo text-sm group-hover:gap-3 transition-all">
                  اقرأ المقارنة
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
