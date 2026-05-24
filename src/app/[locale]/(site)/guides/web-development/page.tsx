import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Clock,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Code2,
  DollarSign,
  Calendar,
  Users,
  Layers,
  Shield,
  Smartphone,
  Search,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAlternates,
  getBreadcrumbSchema,
  getArticleSchema,
  getFAQSchema,
  getHowToSchema,
} from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

const TITLE =
  "تكلفة تصميم موقع إلكتروني في مصر 2026 — الدليل الشامل (أسعار + خطوات)";
const DESCRIPTION =
  "كم سعر تصميم موقع إلكتروني في مصر 2026؟ من 5,000 جنيه لـ 200,000+. دليل شامل بالأسعار، التقنيات، الخطوات، وكيف تختار شركة برمجة. استشارة مجانية.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "تطوير المواقع",
    "تصميم المواقع",
    "تكلفة تصميم موقع",
    "أنواع المواقع الإلكترونية",
    "كيف اعمل موقع",
    "خطوات تصميم موقع",
    "أفضل شركة تطوير مواقع",
  ],
  alternates: getAlternates("/guides/web-development"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
};

const faqs = [
  {
    question: "ما هي مدة تطوير موقع إلكتروني؟",
    answer:
      "تختلف حسب نوع المشروع: موقع تعريفي بسيط (1-3 أسابيع)، موقع شركة متوسط (4-8 أسابيع)، متجر إلكتروني (6-12 أسبوع)، تطبيق ويب معقد (3-6 شهور).",
  },
  {
    question: "ما الفرق بين المصمم والمطور؟",
    answer:
      "المصمم (Designer) بيركز على الشكل البصري وتجربة المستخدم (UI/UX). المطور (Developer) بيكتب الكود اللي بيخلي الموقع يشتغل. شركات احترافية بتجمع الاتنين في فريق واحد.",
  },
  {
    question: "هل أحتاج موقع متجاوب؟",
    answer:
      "نعم بكل تأكيد. أكتر من 60% من زيارات الإنترنت من الموبايل. Google كمان بيعطل ranking أعلى للمواقع المتجاوبة. التصميم المتجاوب مش رفاهية، ضرورة.",
  },
  {
    question: "ما هي أفضل الاستضافات للمواقع العربية؟",
    answer:
      "للمواقع الصغيرة: Hostinger, Namecheap (تكلفة منخفضة). للمواقع المتوسطة: SiteGround, Cloudways. للمواقع الكبيرة: AWS, Google Cloud, Azure. السرعة والـ uptime أهم من السعر.",
  },
  {
    question: "كيف أحمي موقعي من الاختراق؟",
    answer:
      "ابدأ بـ SSL/HTTPS (إجباري). استخدم كلمات سر قوية وغيرها كل 3 شهور. حدّث جميع الـ plugins. اعمل backups يومية. استخدم Web Application Firewall (WAF). راقب الموقع بـ security tools.",
  },
  {
    question: "هل WordPress آمن للأعمال؟",
    answer:
      "WordPress يشغل 40%+ من مواقع الإنترنت. آمن إذا تم تحديثه باستمرار، مع plugins موثوقة فقط، و themes premium. للمواقع الحساسة (مالية، طبية)، Custom Development أفضل.",
  },
  {
    question: "ما هو SEO ولماذا مهم؟",
    answer:
      "SEO (Search Engine Optimization) هو تحسين موقعك ليظهر في أعلى نتائج Google. أهميته: 75% من الناس مش بيعدوا الصفحة الأولى من نتائج البحث. موقع بدون SEO = موقع غير موجود.",
  },
  {
    question: "كيف أزيد سرعة موقعي؟",
    answer:
      "1) استخدم صور WebP/AVIF بدل JPG. 2) فعل caching في الـ server. 3) قلل عدد plugins. 4) استخدم CDN. 5) قلل حجم الـ JS/CSS بـ minification. 6) استخدم استضافة سريعة. الهدف: LCP < 2.5s.",
  },
];

export default function WebDevelopmentGuide() {
  const url = `${BASE_URL}/guides/web-development`;
  const schemas = [
    getArticleSchema({
      title: TITLE,
      excerpt: DESCRIPTION,
      slug: "web-development",
      date: "2026-01-15",
      author: "فريق إتقان",
    }),
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "أدلة شاملة", url: `${BASE_URL}/guides` },
      { name: TITLE, url },
    ]),
    getFAQSchema(faqs),
    getHowToSchema({
      name: "كيفية تطوير موقع إلكتروني احترافي خطوة بخطوة",
      description: "دليل عملي لتطوير موقع إلكتروني من الفكرة حتى الإطلاق",
      url,
      totalTime: "P30D",
      steps: [
        {
          name: "تحديد الهدف وجمهور الموقع",
          text: "حدد الغرض من الموقع (تعريفي، متجر، تطبيق ويب)، الجمهور المستهدف، الميزانية، والمتطلبات الوظيفية الأساسية.",
        },
        {
          name: "تصميم تجربة المستخدم (UX) والواجهة (UI)",
          text: "ارسم wireframes للصفحات، صمم mockups بـ Figma أو Adobe XD، اختر نظام ألوان وخطوط متناسقة، اختبر التصميم مع مستخدمين حقيقيين.",
        },
        {
          name: "اختيار التقنيات والاستضافة",
          text: "اختر Frontend (React, Vue, Next.js) و Backend (Node.js, Laravel, Django)، استضافة (AWS, DigitalOcean, Vercel)، قاعدة بيانات (PostgreSQL, MongoDB).",
        },
        {
          name: "تطوير الموقع (Frontend + Backend)",
          text: "اكتب الكود بأفضل الممارسات، استخدم Git للتحكم في الإصدارات، اعمل code reviews، اتبع معايير الأمان (OWASP Top 10).",
        },
        {
          name: "الاختبار وضمان الجودة (QA)",
          text: "اختبر على متصفحات مختلفة (Chrome, Firefox, Safari, Edge)، اختبر على أجهزة موبايل وأحجام شاشات متعددة، اختبارات أداء وأمان.",
        },
        {
          name: "تحسين SEO والأداء",
          text: "اضبط meta tags، sitemap.xml، robots.txt، structured data (Schema.org)، حسّن سرعة الموقع لـ Core Web Vitals < 2.5s LCP.",
        },
        {
          name: "النشر والإطلاق",
          text: "اربط دومين، فعّل HTTPS/SSL، اعمل deploy على production، اضبط backups يومية، monitoring عبر Sentry/New Relic.",
        },
        {
          name: "الصيانة والتحديثات المستمرة",
          text: "حدّث التبعيات والإضافات شهرياً، راقب الأداء، أصلح bugs بسرعة، طوّر ميزات جديدة بناءً على feedback المستخدمين.",
        },
      ],
    }),
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: TITLE,
      description: DESCRIPTION,
      url,
      author: { "@type": "Organization", name: "إتقان للحلول المتكاملة" },
      publisher: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.png` },
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "أدلة شاملة", href: "/guides" },
              { label: "تطوير المواقع" },
            ]}
          />
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">دليل شامل</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/60 font-cairo">
                <Clock className="w-3.5 h-3.5" />
                30 دقيقة قراءة
              </span>
            </div>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              {TITLE}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed">
              {DESCRIPTION}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto prose-content">
            {/* TL;DR */}
            <div className="bg-accent/5 border-2 border-accent/30 rounded-2xl p-6 mb-12">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                الخلاصة السريعة
              </h2>
              <p className="text-text-primary font-cairo text-lg leading-relaxed">
                تطوير موقع احترافي في 2026 يحتاج: تخطيط دقيق (1-2 أسبوع)،
                تصميم UI/UX (2-4 أسابيع)، تطوير (4-12 أسبوع)، اختبار ونشر (1-2
                أسبوع). التكلفة: 5,000 - 200,000+ جنيه حسب التعقيد. أهم 5 عوامل
                للنجاح: تصميم متجاوب، سرعة عالية، SEO من البداية، أمان قوي،
                ومحتوى جيد.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-surface border border-border rounded-2xl p-6 mb-12">
              <h2 className="font-bold font-cairo text-text-primary mb-4">
                محتويات الدليل
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                {[
                  "ما هو تطوير المواقع؟",
                  "أنواع المواقع الإلكترونية",
                  "تكلفة تصميم موقع في 2026",
                  "مراحل تطوير الموقع",
                  "التقنيات الحديثة",
                  "كيف تختار شركة برمجة",
                  "SEO من البداية",
                  "الأمان والحماية",
                  "أسئلة شائعة",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-text-secondary font-cairo hover:text-accent cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Section 1 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              1. ما هو تطوير المواقع؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              تطوير المواقع (Web Development) هو عملية بناء وصيانة المواقع
              الإلكترونية. بيشمل كل خطوات إنشاء موقع، من التخطيط وتصميم الواجهة
              لكتابة الكود ونشر الموقع على الإنترنت.
            </p>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              الموقع الإلكتروني في 2026 مش مجرد صفحة معلومات. هو منصة تفاعلية
              بتمثل شركتك، بتجذب عملاء جدد، وبتحول الزوار لعملاء فعليين. شركة
              بدون موقع احترافي = شركة غير موجودة في عيون 4.6 مليار مستخدم
              للإنترنت.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                { icon: Code2, label: "Frontend", desc: "الواجهة المرئية" },
                { icon: Layers, label: "Backend", desc: "الـ server logic" },
                { icon: Shield, label: "Security", desc: "حماية البيانات" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-surface border border-border"
                  >
                    <Icon className="w-8 h-8 text-accent mb-3" />
                    <h3 className="font-bold font-cairo text-text-primary mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-text-muted font-cairo">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Section 2 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              2. أنواع المواقع الإلكترونية
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              قبل ما تبدأ مشروعك، لازم تعرف نوع الموقع المناسب لشركتك. كل نوع
              ليه متطلبات مختلفة في التصميم، التقنية، والميزانية.
            </p>

            <div className="space-y-4 my-8">
              {[
                {
                  type: "موقع تعريفي (Brochure)",
                  pages: "5-10 صفحات",
                  best: "الشركات الناشئة، المهنيين الفرديين",
                  price: "5,000 - 25,000 جنيه",
                },
                {
                  type: "موقع شركة احترافي",
                  pages: "10-30 صفحة",
                  best: "الشركات المتوسطة، المؤسسات",
                  price: "25,000 - 80,000 جنيه",
                },
                {
                  type: "متجر إلكتروني",
                  pages: "متغير حسب المنتجات",
                  best: "البيع المباشر، التجار",
                  price: "30,000 - 200,000 جنيه",
                },
                {
                  type: "تطبيق ويب (Web App)",
                  pages: "نظام كامل",
                  best: "المنصات، SaaS, marketplaces",
                  price: "100,000 - 500,000+ جنيه",
                },
                {
                  type: "موقع مدونة (Blog)",
                  pages: "غير محدود",
                  best: "الكتّاب، صانعي المحتوى",
                  price: "5,000 - 30,000 جنيه",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-surface border border-border"
                >
                  <h4 className="font-bold font-cairo text-text-primary mb-2">
                    {item.type}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm font-cairo text-text-muted">
                    <div>
                      <span className="font-bold text-accent">الحجم:</span>{" "}
                      {item.pages}
                    </div>
                    <div>
                      <span className="font-bold text-accent">الأنسب لـ:</span>{" "}
                      {item.best}
                    </div>
                    <div>
                      <span className="font-bold text-accent">السعر:</span>{" "}
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 3 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              3. تكلفة تصميم موقع في 2026
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              السؤال الأكثر شيوعاً: <strong>كم تكلفة تصميم موقع؟</strong>{" "}
              الإجابة الصادقة: تختلف. لكن ممكن نحدد نطاقات واقعية بناءً على نوع
              المشروع.
            </p>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 my-8">
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold font-cairo text-text-primary mb-2">
                    💡 نصيحة احترافية
                  </h3>
                  <p className="text-text-secondary font-cairo leading-relaxed">
                    احذر من العروض الرخيصة جداً (أقل من 5,000 جنيه لموقع شركة).
                    عادةً بتكون من مطورين هواة، باستخدام themes جاهزة، بدون SEO
                    أو security. النتيجة: موقع بطيء، غير آمن، وما بيرتبش في
                    Google. <Link href="/tools/cost-calculator" className="text-accent underline">احسب تكلفة مشروعك بدقة</Link>.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-h3 font-bold font-cairo text-text-primary mb-3 mt-8">
              العوامل اللي بتحدد التكلفة
            </h3>
            <ul className="space-y-3 my-6">
              {[
                "نوع وحجم الموقع (5 صفحات vs 50 صفحة)",
                "التصميم (template جاهز vs تصميم مخصص)",
                "التقنية (WordPress vs Custom Development)",
                "الميزات (e-commerce, multi-language, integrations)",
                "خبرة الفريق (freelancer vs شركة احترافية)",
                "الموقع الجغرافي (مصر vs أمريكا - نفس الجودة، 1/5 السعر)",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-text-secondary font-cairo"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Section 4 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              4. مراحل تطوير الموقع
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              بناء موقع احترافي بيمر بـ 6 مراحل أساسية. كل مرحلة محتاجة وقت
              وخبرة معينة:
            </p>

            <div className="space-y-4 my-8">
              {[
                {
                  num: "01",
                  title: "اكتشاف ومتطلبات",
                  duration: "1-2 أسبوع",
                  desc: "اجتماعات لفهم أهدافك، جمهورك، وميزانيتك. تحليل المنافسين. وضع خطة المحتوى.",
                },
                {
                  num: "02",
                  title: "التصميم UI/UX",
                  duration: "2-4 أسابيع",
                  desc: "Wireframes → Mockups → Design system. تصميم كل صفحة بدقة، Mobile-first.",
                },
                {
                  num: "03",
                  title: "التطوير Development",
                  duration: "4-12 أسبوع",
                  desc: "كتابة الكود (Frontend + Backend)، Database، APIs. اختبار مرحلي.",
                },
                {
                  num: "04",
                  title: "المحتوى Content",
                  duration: "بالتوازي",
                  desc: "كتابة نصوص الـ SEO، رفع الصور، تحضير الفيديوهات.",
                },
                {
                  num: "05",
                  title: "الاختبار QA",
                  duration: "1-2 أسبوع",
                  desc: "اختبار شامل: المتصفحات، الأجهزة، السرعة، الأمان، إصلاح أي مشاكل.",
                },
                {
                  num: "06",
                  title: "الإطلاق Launch",
                  duration: "1-3 أيام",
                  desc: "نشر الموقع، إعداد الاستضافة والـ DNS، Google Search Console، Analytics.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-surface border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent text-navy font-black font-cairo text-lg flex items-center justify-center shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-bold font-cairo text-text-primary">
                        {step.title}
                      </h3>
                      <span className="text-xs text-accent font-cairo whitespace-nowrap">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted font-cairo leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 5 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              5. التقنيات الحديثة في 2026
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              التقنيات بتتطور بسرعة. اللي كان trending سنة 2022 ممكن يكون قديم
              دلوقتي. هذه أهم التقنيات اللي بنستخدمها في إتقان لبناء مواقع
              احترافية:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                { name: "Next.js 16", desc: "أفضل framework لـ React في 2026" },
                {
                  name: "TypeScript",
                  desc: "كتابة كود آمن وقابل للصيانة",
                },
                {
                  name: "Tailwind CSS",
                  desc: "تصميم سريع و responsive",
                },
                { name: "Server Components", desc: "أداء فائق + SEO ممتاز" },
                {
                  name: "Headless CMS",
                  desc: "إدارة محتوى مرنة (Strapi, Sanity)",
                },
                {
                  name: "Vercel/AWS",
                  desc: "نشر سريع وموثوق",
                },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-surface border border-border"
                >
                  <h4 className="font-bold font-cairo text-accent mb-1">
                    {tech.name}
                  </h4>
                  <p className="text-sm text-text-muted font-cairo">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Section 6 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              6. كيف تختار شركة برمجة مناسبة؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              اختيار الشركة الغلط = خسارة فلوس ووقت. هذه أهم 7 معايير يجب فحصها
              قبل توقيع أي عقد:
            </p>

            <ol className="space-y-3 my-8 list-decimal list-inside marker:text-accent marker:font-bold">
              {[
                "اطلب أعمالهم السابقة (Portfolio) واتصل بعملائهم القدام للتأكد من الجودة",
                "تأكد من خبرتهم في مجالك تحديداً (B2B vs B2C، نفس النوع)",
                "اطلب تفصيل واضح للسعر (مش رقم واحد فقط)",
                "اعرف عدد الفريق وخبرتهم (مبتدأ vs senior)",
                "اقرأ العقد بعناية (الملكية الفكرية، التعديلات، الضمان)",
                "تأكد من الدعم بعد التسليم (3-12 شهور ضمان أساسي)",
                "اختار شركة بتفهم لغتك وثقافتك (السوق المحلي)",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-text-secondary font-cairo text-lg leading-relaxed pl-2"
                >
                  {item}
                </li>
              ))}
            </ol>

            {/* Section 7 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              7. SEO من البداية
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              <strong>أكبر غلطة:</strong> بناء موقع وبعدين التفكير في SEO. الـ
              SEO يجب يبدأ من اليوم الأول. مواقع كتيرة بتفشل في الـ ranking
              لأنها مبنية على foundation ضعيف.
            </p>

            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 my-8">
              <h3 className="font-bold font-cairo text-text-primary mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-accent" />
                Checklist SEO الأساسية
              </h3>
              <ul className="space-y-2">
                {[
                  "URLs نظيفة وقصيرة",
                  "Meta tags لكل صفحة (title, description)",
                  "Schema markup (Organization, Product, etc.)",
                  "Sitemap.xml + robots.txt",
                  "Canonical tags",
                  "hreflang للمواقع المتعددة اللغات",
                  "Page speed < 2.5s (LCP)",
                  "Mobile-first responsive design",
                  "Internal linking strategy",
                  "Image optimization (WebP, alt text)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-text-secondary font-cairo"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 8 */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              8. الأمان والحماية
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              في 2025، حصل اختراق كل 39 ثانية في المتوسط. أمان موقعك مش رفاهية،
              ضرورة. تكلفة الاختراق ممكن تكون كارثية: فقدان ثقة العملاء، خسارة
              مالية، عقوبات قانونية.
            </p>

            {/* CTA */}
            <div className="rounded-2xl section-navy p-10 text-center text-white my-12">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                جاهز تطور موقعك؟
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                خلينا نناقش مشروعك ونعملك خطة تنفيذ مفصلة. استشارة مجانية بدون
                التزام.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/booking" variant="gold" size="lg">
                  احجز استشارة مجانية
                </Button>
                <Button
                  href="/tools/cost-calculator"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-accent border border-white/10"
                >
                  احسب التكلفة الآن
                </Button>
              </div>
            </div>

            {/* FAQs */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6 mt-12">
              أسئلة شائعة
            </h2>
            <div className="space-y-3">
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
