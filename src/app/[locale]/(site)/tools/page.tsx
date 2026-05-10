import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Calculator, Sparkles, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "أدوات مجانية | حاسبة تكلفة المشروع + مخطط ذكي | إتقان",
  description:
    "أدوات مجانية احترافية: حاسبة تكلفة تصميم المواقع والتطبيقات، مخطط مشروع AI، حاسبة ROI. تقدير دقيق في ثواني، بدون تسجيل.",
  keywords: [
    "حاسبة تكلفة موقع",
    "تقدير تكلفة تطبيق",
    "حاسبة ROI",
    "أدوات مجانية للمشاريع",
    "مخطط مشروع",
  ],
  alternates: getAlternates("/tools"),
};

const tools = [
  {
    slug: "/scope",
    title: "مخطط المشروع الذكي AI",
    description:
      "اوصف مشروعك واحصل على خطة كاملة: مراحل، تقنيات، تكلفة، ووقت — بالذكاء الاصطناعي.",
    icon: Sparkles,
    color: "purple",
    badge: "AI Powered",
    isNew: true,
  },
  {
    slug: "/tools/cost-calculator",
    title: "حاسبة تكلفة المشروع",
    description:
      "احسب تكلفة موقعك، تطبيقك، أو نظامك في ثواني. تقدير دقيق بناءً على احتياجاتك.",
    icon: Calculator,
    color: "emerald",
    badge: "مجاني",
  },
];

export default function ToolsPage() {
  const schema = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "أدوات مجانية", url: `${BASE_URL}/tools` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}${tool.slug}`,
        name: tool.title,
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
          <Breadcrumb items={[{ label: "أدوات مجانية" }]} />
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold">100% مجاني</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              أدوات مجانية لإدارة مشروعك
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              مجموعة أدوات احترافية بتساعدك تخطط، تقدر، وتدير مشروعك التقني -
              مجاناً تماماً، بدون تسجيل أو اشتراك.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={tool.slug as never}
                  className="group block bg-surface border border-border rounded-2xl p-8 hover:border-accent/40 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        tool.color === "purple"
                          ? "bg-purple-500/10 border border-purple-500/20"
                          : "bg-emerald-500/10 border border-emerald-500/20"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          tool.color === "purple"
                            ? "text-purple-500"
                            : "text-emerald-500"
                        }`}
                      />
                    </div>
                    {tool.isNew && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/15 text-accent font-cairo">
                        جديد
                      </span>
                    )}
                  </div>
                  <Badge variant="muted">{tool.badge}</Badge>
                  <h2 className="text-xl font-bold font-cairo text-text-primary mt-3 mb-3 group-hover:text-accent transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-text-muted font-cairo text-sm leading-relaxed mb-5">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold font-cairo text-sm group-hover:gap-3 transition-all">
                    استخدم الأداة
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
