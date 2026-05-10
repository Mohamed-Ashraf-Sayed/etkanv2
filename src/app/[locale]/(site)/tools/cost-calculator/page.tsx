import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CostCalculatorClient from "./CostCalculatorClient";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "حاسبة تكلفة تصميم المواقع والتطبيقات | مجانية | إتقان",
  description:
    "احسب تكلفة موقعك، تطبيقك، أو نظامك في ثواني. أداة مجانية بدون تسجيل، نتيجة دقيقة بناءً على احتياجاتك. شامل أسعار 2026.",
  keywords: [
    "حاسبة تكلفة موقع",
    "حاسبة تكلفة تطبيق",
    "كم تكلفة تصميم موقع",
    "أسعار البرمجة في مصر",
    "تقدير تكلفة مشروع",
  ],
  alternates: getAlternates("/tools/cost-calculator"),
};

const schema = [
  getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "أدوات مجانية", url: `${BASE_URL}/tools` },
    {
      name: "حاسبة تكلفة المشروع",
      url: `${BASE_URL}/tools/cost-calculator`,
    },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة تكلفة المشروع",
    description: "احسب تكلفة موقعك أو تطبيقك مجاناً في ثواني",
    url: `${BASE_URL}/tools/cost-calculator`,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
  },
];

export default function CostCalculatorPage() {
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
              { label: "أدوات مجانية", href: "/tools" },
              { label: "حاسبة التكلفة" },
            ]}
          />
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold">أداة مجانية</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              حاسبة تكلفة المشروع
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              احصل على تقدير دقيق لتكلفة مشروعك في أقل من دقيقة. بناءً على
              احتياجاتك ومتطلباتك. بدون تسجيل أو دفع.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <CostCalculatorClient />
        </Container>
      </section>
    </>
  );
}
