import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, BarChart3, FileText, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "تقارير وأبحاث | Insights من إتقان",
  description:
    "تقارير وأبحاث أصلية عن السوق التقني في مصر والسعودية والخليج: إحصائيات، اتجاهات، ودراسات حالة من فريق إتقان للحلول المتكاملة.",
  keywords: [
    "تقرير السوق التقني مصر 2026",
    "إحصائيات البرمجيات السعودية",
    "أبحاث سوق التحول الرقمي",
    "tech market report MENA 2026",
  ],
  alternates: getAlternates("/insights"),
};

const reports = [
  {
    slug: "tech-market-report-2026",
    title: "تقرير سوق البرمجيات في مصر والسعودية 2026",
    excerpt:
      "تحليل شامل بالأرقام لسوق تطوير البرمجيات في المنطقة: حجم السوق، معدلات النمو، أهم القطاعات، وتوقعات 2026-2030.",
    icon: BarChart3,
    badge: "تقرير شامل",
    date: "2026-01-15",
    readingTime: "15 دقيقة",
  },
];

export default function InsightsPage() {
  const schema = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "تقارير وأبحاث", url: `${BASE_URL}/insights` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "تقارير وأبحاث | Insights من إتقان",
      url: `${BASE_URL}/insights`,
      hasPart: reports.map((r) => ({
        "@type": "Article",
        headline: r.title,
        url: `${BASE_URL}/insights/${r.slug}`,
        datePublished: r.date,
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
          <Breadcrumb items={[{ label: "تقارير وأبحاث" }]} />
          <div className="max-w-4xl">
            <Badge variant="gold">Original Research</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              تقارير وأبحاث أصلية
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              تقارير مبنية على بيانات حقيقية من السوق التقني العربي. مرجعك
              الموثوق لأرقام واتجاهات تطوير البرمجيات في مصر والسعودية والخليج.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reports.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.slug}
                  href={`/insights/${r.slug}` as never}
                  className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <Badge variant="gold">{r.badge}</Badge>
                  <h3 className="text-h3 font-bold font-cairo text-text-primary mt-4 mb-3 group-hover:text-accent transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-text-secondary font-cairo leading-relaxed mb-5">
                    {r.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted font-cairo">
                    <span>{r.readingTime}</span>
                    <span>•</span>
                    <span>{r.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-5 text-accent font-cairo font-bold">
                    اقرأ التقرير
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}

            <div className="p-8 rounded-2xl bg-surface/50 border border-dashed border-border flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-accent/40" />
              </div>
              <h3 className="text-h4 font-bold font-cairo text-text-primary mb-2">
                المزيد قريباً
              </h3>
              <p className="text-sm text-text-muted font-cairo">
                نعمل على تقارير جديدة بشكل دوري — تابعنا لتحصل على آخر الأبحاث
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
