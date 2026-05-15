import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAlternates,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";
import AuditForm from "./AuditForm";
import {
  Gauge,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Lock,
  Clock,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "تقييم فني مجاني لموقعك | إتقان للحلول المتكاملة",
  description:
    "احصل على تقييم فني مجاني لموقعك الإلكتروني خلال 48 ساعة: السرعة، الـ SEO، الأمان، تجربة المستخدم، وتوافق الموبايل. تقرير مفصّل بالتوصيات.",
  keywords: [
    "تقييم موقع مجاني",
    "audit موقع",
    "تحليل أداء موقع",
    "اختبار سرعة موقع",
    "SEO audit",
    "free website audit",
  ],
  alternates: getAlternates("/audit"),
};

const checkpoints = [
  {
    icon: Gauge,
    title: "أداء وسرعة الموقع",
    desc: "اختبار LCP, INP, CLS وفقاً لمعايير Google Core Web Vitals + توصيات تحسين قابلة للتنفيذ.",
  },
  {
    icon: Search,
    title: "SEO تقني وعلى الصفحة",
    desc: "فحص meta tags، structured data، sitemap، robots.txt، canonical URLs، وفرص الـ keywords.",
  },
  {
    icon: Smartphone,
    title: "تجربة الموبايل والـ UX",
    desc: "اختبار التصميم المتجاوب، الـ tap targets، سرعة التحميل على شبكة 3G/4G، وعقبات الـ UX.",
  },
  {
    icon: ShieldCheck,
    title: "الأمان والـ HTTPS",
    desc: "SSL، Security Headers (CSP, HSTS, X-Frame)، إعدادات الـ Cookies، حماية النماذج من XSS/CSRF.",
  },
  {
    icon: Lock,
    title: "الخصوصية والامتثال",
    desc: "GDPR / قانون حماية البيانات السعودي، Cookie Consent، Privacy Policy، Terms.",
  },
  {
    icon: Sparkles,
    title: "تحسينات التحويل (CRO)",
    desc: "ملاحظات على CTAs، الـ forms، Trust signals، وعقبات تمنع الزائرين من التحويل لعملاء.",
  },
];

const faqs = [
  {
    question: "هل التقييم مجاني فعلاً؟",
    answer:
      "نعم، 100% مجاناً، بدون أي التزام مالي. نقدّم التقييم كخدمة قيمة للشركات في السوق العربي، ولأنه يفتح باب لمحادثة عن كيف يمكننا مساعدتك في تحسين موقعك.",
  },
  {
    question: "كم وقت يستغرق التقييم؟",
    answer:
      "بنسلم التقرير خلال 48 ساعة عمل من استلام الرابط. التقرير يتضمن: ملخص تنفيذي بالنقاط القوية والضعيفة، تحليل تفصيلي لـ 6 محاور، وقائمة توصيات مرتّبة حسب الأولوية.",
  },
  {
    question: "ماذا أحصل عليه بالضبط؟",
    answer:
      "تقرير PDF (15-20 صفحة) بالعربية أو الإنجليزية، يشمل: 1) درجة عامة من 100. 2) تحليل لكل محور من المحاور الستة. 3) أمثلة بصور وقياسات. 4) قائمة 10-20 توصية قابلة للتنفيذ مرتّبة حسب الأثر والصعوبة. 5) جلسة شرح 30 دقيقة عبر Zoom.",
  },
  {
    question: "هل ستحاولون بيعي شيء بعد التقييم؟",
    answer:
      "بنشاركك ملاحظاتنا بصراحة. لو رأينا أن الموقع محتاج تحسينات نقدر نعملها، سنقترح خدماتنا. لو محتاج خدمة لا نقدّمها، سنرشدك لمتخصصين موثوقين. التقييم نفسه قائم بذاته ولا يلزمك بأي شيء.",
  },
  {
    question: "هل بياناتي وموقعي في أمان؟",
    answer:
      "نلتزم بسرية تامة. لا نشارك بيانات موقعك أو نتائج التقييم مع أي طرف ثالث. الفريق المعني فقط هو الذي يراجع موقعك، ويوقّع على اتفاقية سرية داخلية.",
  },
];

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "تقييم مجاني", url: `${BASE_URL}/audit` },
    ]),
    getFAQSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "تقييم فني مجاني للمواقع الإلكترونية",
      provider: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
      },
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "تقييم مجاني" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
            <div>
              <Badge variant="gold">مجاناً 100%</Badge>
              <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
                احصل على تقييم فني مجاني لموقعك
              </h1>
              <div className="gold-line mb-6" />
              <p className="text-lg text-white/60 font-cairo leading-relaxed mb-8">
                نراجع موقعك الحالي في 6 محاور (السرعة، SEO، UX، الأمان، الموبايل،
                التحويل) ونرسللك تقرير PDF مفصّل بالتوصيات خلال 48 ساعة.
              </p>

              <div className="flex flex-wrap gap-6 text-sm font-cairo text-white/60">
                <div className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  خلال 48 ساعة
                </div>
                <div className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  تقرير PDF 15+ صفحة
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  بدون التزام
                </div>
              </div>
            </div>

            <div>
              <AuditForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo text-text-primary text-center mb-3">
              إيه اللي بنفحصه في الـ 48 ساعة؟
            </h2>
            <p className="text-text-secondary font-cairo text-center mb-12 max-w-2xl mx-auto">
              فريق متخصص يراجع موقعك يدوياً، مش بس Tools آلية. كل محور بيرجع بتقرير
              تفصيلي بأمثلة وتوصيات قابلة للتنفيذ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {checkpoints.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <c.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold font-cairo text-text-primary mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-cairo leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-20 mb-8 text-center">
              أسئلة شائعة عن التقييم
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-bold font-cairo text-text-primary">
                      {faq.question}
                    </span>
                    <span className="text-accent text-2xl shrink-0 ms-3 group-open:rotate-45 transition-transform">
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
