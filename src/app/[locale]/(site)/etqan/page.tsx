import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Award,
  Users,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Building2,
  Globe2,
  Star,
  ArrowLeft,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAlternates,
  getOrganizationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";
import { SITE_STATS } from "@/config/site-stats";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title:
    "إتقان للحلول المتكاملة | شركة إتقان الرسمية في مصر والسعودية",
  description:
    "إتقان للحلول المتكاملة (Etqan IT Solutions) — شركة برمجيات مصرية رائدة منذ 2019. خدماتنا تشمل تطوير المواقع، تطبيقات الموبايل، أنظمة ERP و CRM. 75+ عميل، 200+ مشروع ناجح.",
  keywords: [
    "إتقان",
    "شركة إتقان",
    "إتقان للحلول المتكاملة",
    "إتقان مصر",
    "إتقان السعودية",
    "Etqan",
    "Etqanly",
    "Etqan IT Solutions",
    "شركة إتقان للبرمجة",
    "إتقان للبرمجيات",
    "etqan egypt",
    "etqan riyadh",
  ],
  alternates: getAlternates("/etqan"),
  openGraph: {
    title: "إتقان للحلول المتكاملة | الموقع الرسمي",
    description:
      "شركة إتقان للحلول المتكاملة — شركة برمجيات مصرية رائدة. 75+ عميل، 200+ مشروع ناجح في مصر والسعودية والخليج.",
    type: "website",
    locale: "ar_EG",
  },
};

const brandFaqs = [
  {
    question: "من هي شركة إتقان للحلول المتكاملة؟",
    answer:
      "إتقان للحلول المتكاملة (Etqan IT Solutions) هي شركة برمجيات مصرية تأسست عام 2019 في القاهرة. متخصصة في تطوير المواقع الإلكترونية، تطبيقات الموبايل، أنظمة إدارة الأعمال (ERP/CRM)، والبنية التحتية. تخدم أكثر من 75 شركة في مصر والسعودية والإمارات وقطر والكويت.",
  },
  {
    question: "أين يقع المقر الرئيسي لشركة إتقان؟",
    answer:
      "المقر الرئيسي لشركة إتقان في القاهرة، مصر، مع وجود تشغيلي في الرياض، المملكة العربية السعودية لخدمة عملاء السوق الخليجي.",
  },
  {
    question: "ما هي الخدمات التي تقدمها إتقان؟",
    answer:
      "إتقان تقدم 6 خدمات أساسية: 1) تطوير وتصميم المواقع الإلكترونية، 2) تطوير تطبيقات الموبايل (iOS و Android)، 3) أنظمة ERP و CRM المخصصة، 4) المتاجر الإلكترونية، 5) تجهيز البنية التحتية والشبكات، 6) الدعم الفني المستمر والاستشارات التقنية.",
  },
  {
    question: "هل إتقان شركة موثوقة؟",
    answer:
      "نعم، إتقان للحلول المتكاملة شركة مسجلة قانونياً في مصر، نفذت أكثر من 200 مشروع ناجح، وحصلت على تقييم 4.9 من 5 من 75+ عميل. عملاؤها يشملون شركات في المقاولات، التعليم، الرعاية الصحية، التجارة الإلكترونية، والاستقدام.",
  },
  {
    question: "كيف أتواصل مع شركة إتقان؟",
    answer:
      "يمكنك التواصل مع إتقان عبر: الهاتف +201094807674، البريد الإلكتروني info@etqanly.com، أو من خلال صفحة التواصل على الموقع etqanly.com. كل استشارة أولية مجانية ويتم الرد خلال 24 ساعة.",
  },
  {
    question: "كم تكلفة الخدمات مع إتقان؟",
    answer:
      "تختلف الأسعار حسب المشروع. أمثلة: موقع تعريفي من 5,000 جنيه، موقع شركة من 25,000 جنيه، تطبيق موبايل من 80,000 جنيه، نظام ERP من 150,000 جنيه. كل الأسعار شفافة ومتاحة على صفحة الأسعار في الموقع.",
  },
  {
    question: "هل إتقان شركة مختلفة عن إتقان لتقنية المعلومات؟",
    answer:
      "نعم، إتقان للحلول المتكاملة (Etqan IT Solutions على موقع etqanly.com) شركة مصرية مستقلة تأسست 2019 وتعمل من القاهرة والرياض. لا تربطها علاقة بشركات أخرى تستخدم اسم إتقان في السعودية أو الإمارات.",
  },
  {
    question: "هل تعمل إتقان مع شركات صغيرة وكبيرة؟",
    answer:
      "نعم، إتقان تعمل مع كل أحجام الشركات. لدينا باقات مخصصة للـ Startups وSmall Business، وحلول enterprise للشركات الكبرى. عملاؤنا الحاليون يتنوعون من ستارت-أبس بـ 5 موظفين إلى شركات بـ 500+ موظف.",
  },
];

export default async function EtqanBrandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas: object[] = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "إتقان", url: `${BASE_URL}/etqan` },
    ]),
    getFAQSchema(brandFaqs),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "عن شركة إتقان للحلول المتكاملة",
      url: `${BASE_URL}/etqan`,
      mainEntity: { "@id": `${BASE_URL}/#organization` },
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
          <Breadcrumb items={[{ label: "إتقان" }]} />
          <div className="max-w-4xl">
            <Badge variant="gold">الموقع الرسمي</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              إتقان للحلول المتكاملة
            </h1>
            <p className="text-2xl text-accent font-cairo mb-6" dir="ltr">
              Etqan IT Solutions
            </p>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed">
              شركة برمجيات مصرية رائدة، تأسست عام 2019 في القاهرة. متخصصة في
              تطوير المواقع، تطبيقات الموبايل، وأنظمة الأعمال لأكثر من{" "}
              <strong className="text-white">{SITE_STATS.clients} شركة</strong>{" "}
              في مصر والسعودية والخليج.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button href="/portfolio" variant="ghost" size="lg">
                شاهد أعمالنا
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-white dark:bg-background border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Briefcase, value: `${SITE_STATS.projects}+`, label: "مشروع ناجح" },
              { icon: Users, value: `${SITE_STATS.clients}+`, label: "عميل نشط" },
              { icon: Building2, value: `${SITE_STATS.engineers}+`, label: "مهندس محترف" },
              { icon: Globe2, value: "5", label: "دول نخدمها" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-7 h-7 text-accent mx-auto mb-2" />
                <div className="text-3xl font-black font-cairo text-text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted font-cairo">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              من هي شركة إتقان؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              <strong>إتقان للحلول المتكاملة</strong> (Etqan IT Solutions) هي
              شركة برمجيات مصرية متخصصة في تطوير الحلول التقنية للأعمال. تأسست
              الشركة عام <strong>2019</strong> في القاهرة على يد فريق من
              المهندسين المتخصصين، وتوسعت لخدمة عملاء في{" "}
              <strong>السعودية، الإمارات، قطر، الكويت</strong>.
            </p>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-10">
              تتميز إتقان بفهم عميق للسوق العربي ومتطلباته، مع التزام بالمعايير
              العالمية في جودة البرمجة والأمان. الشركة معروفة بـ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "خبرة +6 سنوات في السوق العربي",
                "فريق محلي بـ +30 مهندس متخصص",
                "تعامل ثنائي اللغة (عربي/إنجليزي)",
                "تسليم في المواعيد المحددة",
                "ضمان حتى 6 شهور بعد التسليم",
                "أسعار تنافسية شفافة",
                "دعم فني 24/7 للعملاء المميزين",
                "تكامل مع الأنظمة المحلية (ZATCA, مصلحة الضرائب)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-text-secondary font-cairo">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              خدمات إتقان الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                { name: "تطوير المواقع", href: "/services/web-dev" },
                { name: "تطبيقات الموبايل", href: "/services/mobile-dev" },
                { name: "أنظمة ERP و CRM", href: "/services/crm" },
                { name: "البنية التحتية", href: "/services/networks" },
                { name: "الدعم الفني", href: "/services/it-support" },
                { name: "التسويق الرقمي", href: "/services/marketing" },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href as never}
                  className="group flex items-center justify-between p-5 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all"
                >
                  <span className="font-cairo font-bold text-text-primary group-hover:text-accent transition-colors">
                    {s.name}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              تواصل مع إتقان
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="p-6 rounded-xl bg-surface border border-border">
                <MapPin className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-bold font-cairo text-text-primary mb-1">المقر الرئيسي</h3>
                <p className="text-text-muted font-cairo text-sm">القاهرة، مصر</p>
              </div>
              <div className="p-6 rounded-xl bg-surface border border-border">
                <Phone className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-bold font-cairo text-text-primary mb-1">الهاتف</h3>
                <a
                  href="tel:+201094807674"
                  className="text-text-muted font-cairo text-sm hover:text-accent"
                  dir="ltr"
                >
                  +20 109 480 7674
                </a>
              </div>
              <div className="p-6 rounded-xl bg-surface border border-border">
                <Mail className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-bold font-cairo text-text-primary mb-1">البريد</h3>
                <a
                  href="mailto:info@etqanly.com"
                  className="text-text-muted font-cairo text-sm hover:text-accent"
                  dir="ltr"
                >
                  info@etqanly.com
                </a>
              </div>
            </div>

            {/* FAQ */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              أسئلة شائعة عن شركة إتقان
            </h2>
            <div className="space-y-3 mb-12">
              {brandFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-bold font-cairo text-text-primary">{faq.question}</span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-text-secondary font-cairo leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl section-navy p-10 text-center text-white">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-h3 font-bold font-cairo mb-3">
                ابدأ مشروعك مع إتقان اليوم
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                استشارة مجانية خلال 24 ساعة. تواصل معنا لمناقشة مشروعك واستلام
                عرض سعر مخصص.
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
