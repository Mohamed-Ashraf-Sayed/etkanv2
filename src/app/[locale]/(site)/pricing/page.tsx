import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, X, Star, ArrowLeft, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  pricingPackages,
  getCategories,
  getPackagesByCategory,
} from "@/data/pricing";
import {
  getAlternates,
  getBreadcrumbSchema,
  getFAQSchema,
  getProductSchema,
} from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "أسعار الخدمات | تكلفة تصميم المواقع والتطبيقات في مصر 2026",
  description:
    "أسعار شفافة لكل خدماتنا: تصميم المواقع من 5000 جنيه، تطبيقات الموبايل من 80000 جنيه، أنظمة ERP من 150000 جنيه. عروض مخصصة + استشارة مجانية.",
  keywords: [
    "تكلفة تصميم موقع إلكتروني في مصر",
    "أسعار تطوير تطبيقات الموبايل",
    "تكلفة نظام ERP",
    "أسعار تصميم متجر إلكتروني",
    "أسعار البرمجة في مصر",
    "تكلفة CRM",
    "عرض سعر تصميم موقع",
  ],
  alternates: getAlternates("/pricing"),
};

const faqs = [
  {
    question: "هل الأسعار شاملة الضرائب؟",
    answer:
      "الأسعار المعروضة لا تشمل ضريبة القيمة المضافة (VAT). الضريبة تضاف للفاتورة النهائية حسب اللوائح المصرية والسعودية.",
  },
  {
    question: "كيف يتم الدفع؟",
    answer:
      "نقدم خطط دفع مرنة. عادةً 30% دفعة مقدمة عند بدء العمل، 30% في منتصف المشروع، و 40% عند التسليم النهائي. متاح أيضاً تقسيط على 6-12 شهر.",
  },
  {
    question: "ماذا يحدث إذا تجاوز المشروع المدة المتوقعة؟",
    answer:
      "نلتزم بالجدول الزمني المتفق عليه. لو حصل تأخير من جهتنا بدون سبب وجيه، بنكمل المشروع بدون أي تكلفة إضافية. لو حصل تأخير من جهة العميل (ردود متأخرة، تغيير متطلبات)، بنناقش الجدول من جديد.",
  },
  {
    question: "هل يمكن دفع جزء من المبلغ بالدولار؟",
    answer:
      "أيوة، نقبل الدفع بالجنيه المصري، الريال السعودي، الدرهم الإماراتي، الدولار الأمريكي، واليورو. السعر يتم تحويله حسب سعر الصرف وقت الفاتورة.",
  },
  {
    question: "هل يمكن تخصيص الباقة حسب احتياجاتي؟",
    answer:
      "بالتأكيد. كل الباقات قابلة للتخصيص. نوصلك بمدير حساب يفهم احتياجاتك بدقة ويعمل عرض سعر مخصص يناسب ميزانيتك ومتطلباتك.",
  },
  {
    question: "ماذا يشمل ضمان ما بعد التسليم؟",
    answer:
      "بعد التسليم، نقدم ضمان من 1 إلى 6 شهور حسب الباقة. الضمان بيشمل: إصلاح أي أخطاء، توفير الكود المصدري الكامل، التوثيق الفني، وتدريب فريقك على استخدام النظام.",
  },
  {
    question: "هل تعملون مع شركات خارج مصر؟",
    answer:
      "نعم، نخدم عملاء في مصر، السعودية، الإمارات، قطر، الكويت، وأوروبا. نتواصل عبر اجتماعات أونلاين منتظمة (Zoom/Teams)، Slack/WhatsApp للتواصل اليومي، و Project Management tools (Trello/Jira) لمتابعة التقدم.",
  },
];

export default function PricingPage() {
  const categories = getCategories();

  const schema: object[] = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "الأسعار", url: `${BASE_URL}/pricing` },
    ]),
    getFAQSchema(faqs),
  ];

  pricingPackages.forEach((pkg) => {
    schema.push(
      getProductSchema({
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        priceMin: pkg.priceRange.min,
        priceMax: pkg.priceRange.max,
        currency: pkg.priceRange.currency,
        category: pkg.category,
      })
    );
  });

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar-EG").format(n);

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
          <Breadcrumb items={[{ label: "الأسعار" }]} />
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold">شفافية تامة</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              أسعار خدماتنا
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              أسعار واضحة وشفافة لكل خدماتنا. لا توجد رسوم خفية. كل باقة قابلة
              للتخصيص حسب احتياجاتك.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          {categories.map((category) => {
            const packages = getPackagesByCategory(category);
            return (
              <div key={category} className="mb-16">
                <h2 className="text-h2 font-bold font-cairo text-text-primary mb-8 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.slug}
                      className={`relative rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                        pkg.popular
                          ? "bg-accent/5 border-2 border-accent shadow-xl shadow-accent/10"
                          : "bg-surface border border-border hover:border-accent/30"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 right-1/2 translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-navy text-xs font-bold font-cairo">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          الأكثر طلباً
                        </div>
                      )}

                      <h3 className="text-xl font-bold font-cairo text-text-primary mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-text-muted text-sm font-cairo mb-6 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black font-cairo text-accent">
                            {formatPrice(pkg.priceRange.min)}
                          </span>
                          <span className="text-text-muted font-cairo">
                            - {formatPrice(pkg.priceRange.max)}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted font-cairo mt-1">
                          {pkg.priceRange.currency} • {pkg.duration}
                        </p>
                      </div>

                      <ul className="space-y-2.5 mb-6">
                        {pkg.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-text-secondary font-cairo"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                        {pkg.notIncluded?.map((f, i) => (
                          <li
                            key={`x-${i}`}
                            className="flex items-start gap-2 text-sm text-text-muted/60 font-cairo line-through"
                          >
                            <X className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        href="/booking"
                        variant={pkg.popular ? "gold" : "outline"}
                        className="w-full"
                      >
                        طلب عرض سعر
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Custom Quote CTA */}
          <div className="rounded-3xl section-navy p-10 text-center text-white max-w-4xl mx-auto mb-16">
            <h3 className="text-h2 font-bold font-cairo mb-4">
              مشروعك مختلف؟ احصل على عرض مخصص
            </h3>
            <p className="text-white/60 font-cairo mb-8 leading-relaxed max-w-2xl mx-auto">
              كل مشروع له طبيعته. تواصل معنا واشرحلنا فكرتك واحنا هنعملك عرض
              سعر مفصل في أقل من 24 ساعة.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
              </Button>
              <Button
                href="https://wa.me/201094807674"
                variant="ghost"
                size="lg"
                className="text-white/70 hover:text-accent border border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-8 text-center">
              أسئلة شائعة عن الأسعار
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
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
          </div>
        </Container>
      </section>
    </>
  );
}
