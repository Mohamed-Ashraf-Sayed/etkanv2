import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { industries } from "@/data/industries";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "حلول مخصصة لكل صناعة | إتقان للحلول المتكاملة",
  description:
    "حلول تقنية مخصصة لـ 6 صناعات: المطاعم، العيادات، المدارس، العقارات، التجارة الإلكترونية، والمصانع. أنظمة جاهزة + تخصيص حسب احتياجاتك.",
  keywords: [
    "نظام إدارة مطعم",
    "نظام إدارة عيادة",
    "نظام إدارة مدرسة",
    "نظام عقاري",
    "متجر إلكتروني",
    "نظام إدارة مصنع",
    "حلول صناعية",
  ],
  alternates: getAlternates("/solutions"),
};

export default function SolutionsHub() {
  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "حلول الصناعات", url: `${BASE_URL}/solutions` },
  ]);

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
          <Breadcrumb items={[{ label: "حلول الصناعات" }]} />
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold">حلول مخصصة</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              حلول تقنية لكل صناعة
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              مش كل صناعة بتحتاج نفس الحل. عندنا خبرة عميقة في 6 قطاعات
              رئيسية، بنوفر أنظمة جاهزة + تخصيص حسب احتياجات شركتك.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/solutions/${industry.slug}` as never}
                className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all"
              >
                <div className="p-8">
                  <div className="text-5xl mb-4">{industry.emoji}</div>
                  <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {industry.name}
                  </h2>
                  <p className="text-text-muted font-cairo text-sm leading-relaxed mb-5 line-clamp-3">
                    {industry.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold font-cairo text-sm group-hover:gap-3 transition-all">
                    استكشف الحل
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
