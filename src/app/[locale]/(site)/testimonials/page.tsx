import type { Metadata } from "next";
import { Star, Quote, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  testimonials,
  getAverageRating,
} from "@/data/testimonials";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "آراء عملائنا | شهادات حقيقية من إتقان للحلول المتكاملة",
  description: `${testimonials.length}+ شهادة حقيقية من عملاء إتقان. تقييم ${getAverageRating()}/5. اقرأ تجاربهم في تطوير المواقع، التطبيقات، أنظمة ERP، والبنية التحتية.`,
  keywords: [
    "آراء عملاء إتقان",
    "شهادات عملاء",
    "تقييم شركة إتقان",
    "تجارب عملاء إتقان",
    "reviews إتقان",
  ],
  alternates: getAlternates("/testimonials"),
};

export default function TestimonialsPage() {
  const avgRating = getAverageRating();

  const schema = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "آراء العملاء", url: `${BASE_URL}/testimonials` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      url: BASE_URL,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toString(),
        reviewCount: testimonials.length.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: testimonials.map((t) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: t.author,
        },
        datePublished: t.date,
        reviewBody: t.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "آراء العملاء" }]} />
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-accent fill-accent"
                />
              ))}
            </div>
            <Badge variant="gold">{avgRating}/5 من {testimonials.length} عميل</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              آراء عملائنا
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              شهادات حقيقية من شركات وعملاء وثقوا بإتقان لتطوير حلولهم
              التقنية.{" "}
              <strong className="text-accent">
                {avgRating}/5
              </strong>{" "}
              متوسط تقييم العملاء.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="bg-surface border border-border rounded-2xl p-6 flex flex-col"
                itemScope
                itemType="https://schema.org/Review"
              >
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? "text-accent fill-accent"
                          : "text-text-muted/30"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className="text-text-secondary font-cairo leading-relaxed mb-6 flex-1"
                  itemProp="reviewBody"
                >
                  {t.text}
                </p>
                <div
                  className="flex items-center gap-3 pt-4 border-t border-border"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                  />
                  <div>
                    <h3
                      className="font-bold font-cairo text-text-primary text-sm"
                      itemProp="name"
                    >
                      {t.author}
                    </h3>
                    <p className="text-xs text-text-muted font-cairo">
                      {t.role} - {t.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl section-navy p-10 text-center text-white max-w-4xl mx-auto mt-16">
            <h2 className="text-h2 font-bold font-cairo mb-3">
              انضم لقائمة عملائنا السعداء
            </h2>
            <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
              {testimonials.length}+ شركة وثقت بنا. ابدأ مشروعك اليوم وكن
              التالي في قائمة قصص النجاح.
            </p>
            <Button href="/booking" variant="gold" size="lg">
              احجز استشارة مجانية
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
