import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowLeft, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { industries, getIndustryBySlug } from "@/data/industries";
import {
  getAlternates,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "404" };

  return {
    title: `حلول ${industry.name} | ${industry.shortDescription.slice(0, 50)}`,
    description: `${industry.shortDescription} — أنظمة احترافية لـ ${industry.name} في مصر والسعودية. استشارة مجانية + عرض سعر مخصص.`,
    keywords: industry.targetKeywords,
    alternates: getAlternates(`/solutions/${slug}`),
    openGraph: {
      title: `حلول ${industry.name}`,
      description: industry.shortDescription,
      type: "website",
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const schemas = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "حلول الصناعات", url: `${BASE_URL}/solutions` },
      {
        name: industry.name,
        url: `${BASE_URL}/solutions/${slug}`,
      },
    ]),
    getFAQSchema(industry.faqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `حلول ${industry.name}`,
      description: industry.longDescription,
      provider: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      audience: {
        "@type": "BusinessAudience",
        name: industry.name,
      },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section className="section-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "حلول الصناعات", href: "/solutions" },
              { label: industry.name },
            ]}
          />
          <div className="max-w-4xl">
            <div className="text-6xl mb-4">{industry.emoji}</div>
            <Badge variant="gold">{industry.name}</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              حلول {industry.name}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed">
              {industry.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* Case Study Highlight */}
            <div className="mt-10 inline-flex items-center gap-3 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-accent font-bold font-cairo">
                  {industry.caseStudyHighlight.metric}
                </div>
                <div className="text-white/60 text-sm font-cairo">
                  {industry.caseStudyHighlight.description}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Long Description */}
      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-12">
              {industry.longDescription}
            </p>

            {/* Challenges */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              التحديات اللي بنحلها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {industry.challenges.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/15"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold font-cairo text-text-primary mb-2">
                        {c.title}
                      </h3>
                      <p className="text-text-muted font-cairo text-sm leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              الحلول اللي بنوفرها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {industry.solutions.map((s, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold font-cairo text-text-primary mb-2">
                        {s.title}
                      </h3>
                      <p className="text-text-muted font-cairo text-sm leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              مميزات النظام
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
              {industry.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-text-secondary font-cairo">{f}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              أسئلة شائعة
            </h2>
            <div className="space-y-3 mb-12">
              {industry.faqs.map((faq, i) => (
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
            <div className="rounded-2xl section-navy p-10 text-center text-white">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                جاهز تطور {industry.name} بتاعتك؟
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                استشارة مجانية لمناقشة احتياجاتك ووضع خطة تنفيذ مخصصة لشركتك
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
