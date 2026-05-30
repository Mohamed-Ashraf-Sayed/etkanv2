import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  Award,
  Target,
  Zap,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAlternates,
  getBreadcrumbSchema,
} from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "قصص نجاح عملائنا | Case Studies — إتقان للحلول المتكاملة",
  description:
    "3 قصص حقيقية لمشاريع نفّذتها إتقان لعملاء في مصر والسعودية. أرقام ملموسة، تحديات، حلول، ونتائج قابلة للقياس من Arab Future و Masarat و Masar.",
  keywords: [
    "قصص نجاح",
    "case studies شركة برمجة",
    "مشاريع إتقان",
    "client success stories Egypt",
    "case study تطوير موقع",
    "نتائج مشاريع تقنية",
  ],
  alternates: getAlternates("/case-studies"),
  openGraph: {
    title: "قصص نجاح عملاء إتقان — Case Studies",
    description:
      "كيف ساعدنا 3 شركات يحوّلوا فكرتهم لمنتج رقمي ناجح. أرقام حقيقية، نتائج قابلة للقياس.",
    type: "website",
  },
};

interface CaseStudy {
  slug: string;
  client: string;
  clientEn: string;
  industry: string;
  logo?: string;
  thumbnail?: string;
  challenge: string;
  solution: string;
  techStack: string[];
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  projectUrl?: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "arab-future-architecture",
    client: "عرب فيوتشر المحدودة",
    clientEn: "Arab Future Ltd",
    industry: "العمارة والمقاولات — السعودية",
    logo: "/images/logos/arab-future.png",
    thumbnail: "/images/projects/arab-future-architecture.jpg",
    challenge:
      "شركة معمارية سعودية رائدة بأكثر من 12 سنة خبرة و350+ مشروع منفذ، لكن موقعها التقني ما كانش يعكس مكانتها الفعلية في السوق. كانوا محتاجين منصة بصرية تعرض جودة شغلهم وتوصل لرجال الأعمال السعوديين والخليجيين الباحثين عن مقاولين بمعايير عالية، وفي نفس الوقت تكون متوافقة مع رؤية 2030.",
    solution:
      "بنينا موقع مؤسسي ثنائي اللغة بهوية فاخرة، مع معرض أعمال تفاعلي يستعرض 350+ مشروع، صفحات خدمات تفصيلية لكل تخصص (GRC، GRP، GRG، الأحجار الصناعية)، وقسم رؤية 2030 يبرز مساهمة الشركة في القطاع المعماري السعودي. نظام إدارة محتوى مرن يخلي فريق الشركة يحدث المشاريع بنفسهم.",
    techStack: ["WordPress", "Elementor", "PHP", "MySQL", "تصميم فاخر مخصص"],
    results: [
      { label: "سنوات الخبرة المعروضة", value: "12+" },
      { label: "مشاريع في معرض الأعمال", value: "350+" },
      { label: "خدمات معمارية موثقة", value: "7" },
      { label: "مدة التنفيذ", value: "10 أسابيع" },
    ],
    testimonial: {
      quote:
        "إتقان قدمت لنا موقع يعكس فعلاً حجم خبرتنا ومكانتنا في السوق السعودي. التصميم احترافي والتسليم كان في الوقت المحدد.",
      author: "إدارة عرب فيوتشر",
      role: "العميل",
    },
    projectUrl: "/portfolio/arab-future-architecture",
  },
  {
    slug: "masarat-education-platform",
    client: "مسارات",
    clientEn: "Masarat",
    industry: "التعليم الإلكتروني — مصر",
    thumbnail: "/images/projects/masarat-education-platform.jpg",
    challenge:
      "ستارت-أب تعليمي مصري طموح عاوز يبني منصة عربية تنافس Coursera و Udemy في السوق المحلي. التحديات كانت ضخمة: نظام LMS كامل، نظام دفع بفلوس مصرية وأجنبية، تتبع تقدم المتعلم، شهادات إتمام، وتجربة مستخدم تخلي المتعلم العربي يحس بالراحة في التصفح. كله لازم يشتغل بسلاسة من الموبايل لأن 70% من المستخدمين في السوق العربي بيستخدموا الموبايل.",
    solution:
      "بنينا منصة كاملة على Next.js + Node.js بـ PostgreSQL، فيها dashboard للمتعلم بيتابع تقدمه، نظام تسجيل في الدورات بدفع متعدد البوابات (Stripe + Paymob)، نظام شهادات تلقائي PDF بعد الانتهاء، ومحرك بحث ذكي في المحتوى. أكتر من 200+ ميزة من analytics للأدمن لاقتراحات الدورات للمتعلم.",
    techStack: [
      "Next.js 14",
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Paymob",
      "AWS S3",
    ],
    results: [
      { label: "متعلم نشط على المنصة", value: "1,000+" },
      { label: "دورة معتمدة متاحة", value: "50+" },
      { label: "معدل إتمام الدورات", value: "78%" },
      { label: "تقييم المتعلمين", value: "4.7/5" },
    ],
    testimonial: {
      quote:
        "النتائج فاقت توقعاتنا. خلال 6 شهور من الإطلاق وصلنا 1,000 متعلم بمعدل إتمام 78% — أرقام عالمية لمنصة تعليمية. الفريق فهم سوقنا وبنى حلول للمشاكل الحقيقية للمستخدم العربي.",
      author: "مؤسس مسارات",
      role: "Founder & CEO",
    },
    projectUrl: "/portfolio/masarat-education-platform",
  },
  {
    slug: "masar-infrastructure",
    client: "شركة مسار",
    clientEn: "Masar Company",
    industry: "البنية التحتية والمقاولات — مصر",
    logo: "/images/logos/masar.png",
    thumbnail: "/images/projects/masar-infrastructure.jpg",
    challenge:
      "شركة مقاولات مصرية كبرى برأس مال 4 مليار جنيه ومشاريع قومية ضخمة زي قناة السويس الجديدة والقطار الكهربائي. المشكلة: موقعهم القديم ما كانش يوصّل حجم المشاريع للمستثمرين الدوليين والحكومات الخليجية. كانوا محتاجين منصة تعرض المشاريع القومية بطريقة احترافية تساعدهم يحصلوا على تعاقدات حكومية أكبر.",
    solution:
      "صممنا موقع مؤسسي بهوية بصرية قوية تتناسب مع حجم الشركة، مع صفحات تفصيلية لكل مشروع قومي بتشمل: التحديات، الحلول التقنية، الجدول الزمني، شركاء التنفيذ (Siemens، الهيئة الهندسية، إلخ). نظام إدارة شراكات يعرض اتفاقيات الشركة مع جهات حكومية ودولية، وصفحة استثمارية للمستثمرين والمناقصات.",
    techStack: ["WordPress", "Elementor", "PHP", "MySQL", "Custom CMS"],
    results: [
      { label: "مشاريع قومية معروضة", value: "15+" },
      { label: "شركاء دوليون موثقون", value: "Siemens, Alstom" },
      { label: "حجم المشاريع المعروضة", value: "4 مليار جنيه" },
      { label: "مدة التنفيذ", value: "8 أسابيع" },
    ],
    projectUrl: "/portfolio/masar-infrastructure",
  },
];

const aggregateRatingValue = "4.9";
const aggregateRatingReviews = "75";

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas: object[] = [
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "قصص النجاح", url: `${BASE_URL}/case-studies` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "قصص نجاح عملاء إتقان",
      url: `${BASE_URL}/case-studies`,
      description:
        "3 قصص حقيقية لمشاريع نفّذتها إتقان لعملاء في مصر والسعودية.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: caseStudies.map((cs, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Article",
            "@id": `${BASE_URL}/case-studies#${cs.slug}`,
            headline: `${cs.client} — ${cs.industry}`,
            url: `${BASE_URL}${cs.projectUrl || `/portfolio/${cs.slug}`}`,
            articleBody: `${cs.challenge} ${cs.solution}`,
          },
        })),
      },
    },
    ...caseStudies.map((cs) => ({
      "@context": "https://schema.org",
      "@type": ["Article", "CaseStudy"],
      "@id": `${BASE_URL}/case-studies#${cs.slug}`,
      headline: `${cs.client} — ${cs.industry}`,
      description: `${cs.challenge.slice(0, 200)}...`,
      author: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      about: {
        "@type": "Organization",
        name: cs.client,
        alternateName: cs.clientEn,
      },
      keywords: cs.techStack.join(", "),
      ...(cs.testimonial && {
        review: {
          "@type": "Review",
          reviewBody: cs.testimonial.quote,
          author: {
            "@type": "Person",
            name: cs.testimonial.author,
            jobTitle: cs.testimonial.role,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: 5,
            bestRating: 5,
          },
        },
      }),
    })),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRatingValue,
        reviewCount: aggregateRatingReviews,
        bestRating: "5",
        worstRating: "1",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero */}
      <section className="section-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "قصص النجاح" }]} />
          <div className="max-w-4xl">
            <Badge variant="gold">Case Studies</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              نجاحات عملاؤنا — أرقام حقيقية
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed">
              3 قصص حقيقية من 75+ عميل، فيها أرقام قابلة للقياس وتقنيات
              مستخدمة. لما تختار إتقان، أنت بتختار شريك بيعرف يدور على النتايج
              مش بس يسلّم الكود.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button href="/portfolio" variant="ghost" size="lg">
                شاهد كل أعمالنا
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Stats */}
      <section className="py-10 bg-white dark:bg-background border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Award, value: "75+", label: "عميل يثق بنا" },
              { icon: TrendingUp, value: "200+", label: "مشروع منفّذ" },
              { icon: Users, value: "4.9/5", label: "تقييم العملاء" },
              { icon: Clock, value: "6 شهور", label: "متوسط الضمان" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="w-7 h-7 text-accent mx-auto mb-2" />
                <div className="text-3xl font-black font-cairo text-text-primary">
                  {s.value}
                </div>
                <div className="text-sm text-text-muted font-cairo">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-5xl mx-auto space-y-20">
            {caseStudies.map((cs, idx) => (
              <article
                key={cs.slug}
                id={cs.slug}
                className="scroll-mt-24"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-navy text-sm font-bold font-cairo">
                    {idx + 1}
                  </span>
                  <Badge variant="gold">{cs.industry}</Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
                  {/* Client info + thumbnail */}
                  <div className="lg:col-span-2">
                    <h2 className="text-h2 font-bold font-cairo text-text-primary mb-2">
                      {cs.client}
                    </h2>
                    <p
                      className="text-sm text-text-muted font-cairo mb-5"
                      dir="ltr"
                    >
                      {cs.clientEn}
                    </p>
                    {cs.thumbnail && (
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-border">
                        <Image
                          src={cs.thumbnail}
                          alt={`${cs.client} project screenshot`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Challenge + Solution */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <h3 className="inline-flex items-center gap-2 text-h4 font-bold font-cairo text-text-primary mb-3">
                        <Target className="w-5 h-5 text-accent" />
                        التحدي
                      </h3>
                      <p className="text-text-secondary font-cairo leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="inline-flex items-center gap-2 text-h4 font-bold font-cairo text-text-primary mb-3">
                        <Zap className="w-5 h-5 text-accent" />
                        الحل
                      </h3>
                      <p className="text-text-secondary font-cairo leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <p className="text-xs font-bold text-text-muted font-cairo mb-2 uppercase tracking-wider">
                        التقنيات المستخدمة
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cs.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-lg bg-accent/5 border border-accent/15 text-xs font-cairo text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-accent/[0.08] to-transparent border-2 border-accent/20 rounded-2xl p-6 mb-6">
                  <h3 className="inline-flex items-center gap-2 text-h4 font-bold font-cairo text-text-primary mb-5">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    النتائج
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cs.results.map((r, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl md:text-3xl font-black font-cairo text-accent mb-1">
                          {r.value}
                        </div>
                        <div className="text-xs text-text-muted font-cairo">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {cs.testimonial && (
                  <blockquote className="relative bg-surface border border-border rounded-2xl p-7 mb-6">
                    <Quote className="absolute top-5 start-5 w-7 h-7 text-accent/30" />
                    <p className="text-text-primary font-cairo leading-relaxed text-lg ps-10 mb-4">
                      &ldquo;{cs.testimonial.quote}&rdquo;
                    </p>
                    <footer className="ps-10 text-sm text-text-muted font-cairo">
                      <strong className="text-text-secondary">
                        {cs.testimonial.author}
                      </strong>{" "}
                      — {cs.testimonial.role}
                    </footer>
                  </blockquote>
                )}

                {/* CTA */}
                {cs.projectUrl && (
                  <div className="text-center">
                    <Link
                      href={cs.projectUrl as never}
                      className="inline-flex items-center gap-2 text-accent font-cairo font-bold hover:underline"
                    >
                      شاهد التفاصيل الكاملة للمشروع
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding section-navy">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-h2 font-bold font-cairo mb-4">
              عاوز تكون قصة النجاح الجاية؟
            </h2>
            <p className="text-white/60 font-cairo mb-8 leading-relaxed">
              أحجز استشارة مجانية 30 دقيقة، نسمع فكرتك، ونقترح خطة عمل واقعية
              — حتى لو الحل الأنسب مش معانا، هنرشدك للجهة الصح.
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
