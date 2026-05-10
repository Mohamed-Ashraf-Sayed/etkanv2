import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "الأدلة الشاملة | تطوير المواقع، التطبيقات، ERP | إتقان",
  description:
    "أدلة شاملة احترافية: الدليل الكامل لتطوير المواقع، تطوير التطبيقات، أنظمة ERP، الأمن السيبراني. مكتبة مرجعية مجانية من خبراء إتقان.",
  alternates: getAlternates("/guides"),
};

const guides = [
  {
    slug: "web-development",
    title: "الدليل الشامل لتطوير المواقع 2026",
    description:
      "كل ما تحتاج معرفته عن تطوير المواقع: التقنيات، التكلفة، المراحل، اختيار الشركة المناسبة، وأمثلة عملية.",
    readingTime: 30,
  },
  {
    slug: "mobile-app-development",
    title: "الدليل الشامل لتطوير تطبيقات الموبايل 2026",
    description:
      "تطوير تطبيقات iOS و Android: التقنيات، Native vs Hybrid، التكلفة، النشر على Stores.",
    readingTime: 25,
  },
  {
    slug: "erp-systems",
    title: "الدليل الشامل لأنظمة ERP في 2026",
    description:
      "أنظمة ERP: التعريف، الفوائد، أفضل الأنظمة (SAP, Oracle, Odoo)، تكلفة التطبيق، والـ ROI.",
    readingTime: 25,
  },
];

export default function GuidesHub() {
  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "أدلة شاملة", url: `${BASE_URL}/guides` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: "أدلة شاملة" }]} />
          <div className="max-w-3xl">
            <Badge variant="gold">مكتبة المعرفة</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              أدلة شاملة احترافية
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              مكتبة مرجعية شاملة من أدلة احترافية. كل دليل يغطي موضوع بالتفصيل
              من الصفر حتى الاحتراف.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}` as never}
                className="group block bg-surface border border-border rounded-2xl p-8 hover:border-accent/40 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 group-hover:text-accent transition-colors">
                  {g.title}
                </h2>
                <p className="text-text-muted font-cairo text-sm leading-relaxed mb-5">
                  {g.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted font-cairo">
                    {g.readingTime} دقيقة قراءة
                  </span>
                  <span className="flex items-center gap-2 text-accent font-bold font-cairo text-sm group-hover:gap-3 transition-all">
                    اقرأ الدليل
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
