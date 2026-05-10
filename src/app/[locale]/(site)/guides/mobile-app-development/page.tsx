import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Code2,
  Users,
  DollarSign,
  Zap,
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

const TITLE = "الدليل الشامل لتطوير تطبيقات الموبايل 2026";
const DESCRIPTION =
  "كل ما تحتاج معرفته عن تطوير تطبيقات الموبايل: التقنيات، التكلفة، Native vs Hybrid، خطوات التنفيذ، ونشر التطبيق على Google Play و App Store.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "تطوير تطبيقات الموبايل",
    "تكلفة تطبيق موبايل",
    "Native vs Hybrid",
    "تطبيق iOS Android",
    "Flutter React Native",
    "كيف اعمل تطبيق",
  ],
  alternates: getAlternates("/guides/mobile-app-development"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
};

const faqs = [
  {
    question: "كم تكلفة تطوير تطبيق موبايل؟",
    answer:
      "MVP بسيط: 80,000-150,000 جنيه. تطبيق متوسط: 150,000-300,000 جنيه. تطبيق متكامل: 300,000-700,000+ جنيه. السعر يعتمد على المنصة (iOS فقط أم الاتنين)، التعقيد، والميزات.",
  },
  {
    question: "iOS أم Android، أيهما أبدأ به؟",
    answer:
      "في مصر والسعودية، Android أكتر شعبية (70-75% من السوق). iOS بيدر مال أكتر للمطورين (المستخدمين بيدفعوا أكتر). الأفضل: ابدأ بالاتنين معاً باستخدام Flutter أو React Native.",
  },
  {
    question: "كم يستغرق تطوير تطبيق؟",
    answer:
      "MVP: 8-12 أسبوع. تطبيق متوسط: 4-6 شهور. تطبيق كبير + integrations معقدة: 6-12 شهر. الجدول الزمني يعتمد على حجم الفريق وتعقيد المشروع.",
  },
  {
    question: "ما الفرق بين Native و Hybrid؟",
    answer:
      "Native (Swift للـ iOS، Kotlin للـ Android): أداء أعلى لكن تكلفة 2x. Hybrid (Flutter, React Native): كود واحد للمنصتين، أسرع وأرخص بـ 30-40%. الفرق في الأداء أصبح ضئيلاً في 2026.",
  },
  {
    question: "كيف أنشر تطبيقي على Stores؟",
    answer:
      "Google Play: $25 رسوم تسجيل (مرة واحدة)، الـ approval خلال 1-3 أيام. App Store: $99/سنة، الـ approval قد يستغرق 1-2 أسبوع وأكثر صرامة. لازم تجهز screenshots, descriptions, privacy policy، وأيقونات.",
  },
  {
    question: "هل أحتاج Backend مع التطبيق؟",
    answer:
      "معظم التطبيقات الحديثة تحتاج Backend (server) لإدارة المستخدمين، البيانات، الإشعارات. تطبيقات بسيطة بدون مستخدمين (calculator, note-taking) ممكن تكون standalone. التكلفة الإضافية للـ Backend: 30-50% من تكلفة التطبيق.",
  },
];

export default function MobileGuide() {
  const url = `${BASE_URL}/guides/mobile-app-development`;
  const schemas = [
    getArticleSchema({
      title: TITLE,
      excerpt: DESCRIPTION,
      slug: "mobile-app-development",
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
      name: "كيفية تطوير تطبيق موبايل ناجح من الصفر",
      description: "خطوات عملية لتطوير تطبيق iOS و Android من الفكرة للنشر",
      url,
      totalTime: "P90D",
      steps: [
        {
          name: "بلورة الفكرة ودراسة السوق",
          text: "حدد المشكلة التي يحلها التطبيق، حلل المنافسين على Google Play و App Store، حدد الـ unique value proposition وقياس الطلب عبر استبيانات.",
        },
        {
          name: "تحديد المنصة (iOS, Android, Both)",
          text: "في السوق العربي Android بيغطي 70-75% من المستخدمين. لو الميزانية محدودة ابدأ بـ Android، أو استخدم Flutter/React Native للمنصتين بكود واحد.",
        },
        {
          name: "تصميم UX/UI متوافق مع الـ Platform",
          text: "اتبع Material Design لـ Android و Human Interface Guidelines لـ iOS. اعمل prototypes في Figma، اختبرها مع 5-10 مستخدمين قبل البرمجة.",
        },
        {
          name: "اختيار التقنية: Native أم Hybrid",
          text: "Native (Swift/Kotlin) لأداء أعلى لتطبيقات gaming/AR. Hybrid (Flutter/React Native) للتطبيقات business بكود مشترك يوفر 30-40% من التكلفة.",
        },
        {
          name: "تطوير الـ Backend والـ APIs",
          text: "معظم التطبيقات تحتاج backend لإدارة المستخدمين والبيانات. استخدم Node.js/Python مع PostgreSQL، أو Firebase لتسريع MVP.",
        },
        {
          name: "تطوير التطبيق وتكامل الميزات",
          text: "ابني الميزات الأساسية (MVP) أولاً، ادمج push notifications (FCM/APNS)، analytics (Firebase/Amplitude)، payment gateways إن لزم.",
        },
        {
          name: "الاختبار على أجهزة حقيقية",
          text: "اختبر على 5+ أجهزة Android بإصدارات مختلفة (Samsung, Xiaomi, etc.) و iPhone بإصدارات iOS مختلفة. استخدم Firebase Test Lab أو BrowserStack.",
        },
        {
          name: "النشر على Google Play و App Store",
          text: "Google Play: $25 رسوم لمرة واحدة، الموافقة خلال 1-3 أيام. App Store: $99/سنة، 1-2 أسبوع للموافقة. جهز screenshots وstore descriptions محسنة لـ ASO.",
        },
        {
          name: "الصيانة والتحديثات الدورية",
          text: "أصدر تحديث كل 4-6 أسابيع لإصلاح bugs وإضافة ميزات. راقب crash reports عبر Sentry/Crashlytics واستجب لـ reviews المستخدمين بسرعة.",
        },
      ],
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "أدلة شاملة", href: "/guides" },
              { label: "تطوير التطبيقات" },
            ]}
          />
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">دليل شامل</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/60 font-cairo">
                <Clock className="w-3.5 h-3.5" />
                25 دقيقة قراءة
              </span>
            </div>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              {TITLE}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              {DESCRIPTION}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent/5 border-2 border-accent/30 rounded-2xl p-6 mb-12">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                الخلاصة السريعة
              </h2>
              <p className="text-text-primary font-cairo text-lg leading-relaxed">
                تطوير تطبيق موبايل ناجح في 2026 يحتاج: استراتيجية MVP واضحة،
                اختيار المنصة الصح (Native vs Hybrid)، تصميم UX ممتاز، Backend
                قوي، و App Store Optimization. التكلفة: 80K-700K جنيه. المدة:
                3-12 شهر.
              </p>
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-8">
              1. لماذا تطبيق الموبايل ضروري الآن؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              في 2026، 60%+ من الإنترنت من الموبايل. المستخدم العادي بيقضي
              4-5 ساعات يومياً على الموبايل. التطبيق بيدي شركتك حضور دائم على
              شاشة العميل، بزيادة engagement بنسبة 3x مقارنة بالموقع.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                {
                  icon: Users,
                  num: "+5B",
                  desc: "مستخدمين الـ smartphones",
                },
                { icon: Smartphone, num: "60%", desc: "من زيارات الإنترنت" },
                { icon: Zap, num: "3x", desc: "engagement أعلى من الويب" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="text-center p-5 rounded-xl bg-surface border border-border"
                  >
                    <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="text-2xl font-black font-cairo text-text-primary">
                      {item.num}
                    </div>
                    <p className="text-sm text-text-muted font-cairo">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              2. أنواع تطبيقات الموبايل
            </h2>
            <div className="space-y-3 my-8">
              {[
                {
                  name: "Native Apps",
                  desc: "تطوير منفصل لكل منصة (Swift للـ iOS، Kotlin للـ Android). أداء عالي، تكلفة عالية.",
                },
                {
                  name: "Hybrid Apps (Flutter/React Native)",
                  desc: "كود واحد للمنصتين. توفير 30-40% من التكلفة. أداء قريب من Native.",
                },
                {
                  name: "Progressive Web Apps (PWAs)",
                  desc: "موقع ويب يتصرف كتطبيق. مش محتاج installation. مناسب للـ MVPs.",
                },
                {
                  name: "Cross-platform (Xamarin, Ionic)",
                  desc: "بدائل للـ Hybrid لكن أقل شعبية في 2026.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-surface border border-border"
                >
                  <h3 className="font-bold font-cairo text-text-primary mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-muted font-cairo">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              3. تكلفة تطوير تطبيق موبايل
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              التكلفة بتختلف بشكل كبير حسب الميزات والتعقيد. فاكر:{" "}
              <Link
                href="/tools/cost-calculator"
                className="text-accent underline font-bold"
              >
                احسب التكلفة الدقيقة لمشروعك
              </Link>{" "}
              باستخدام أداتنا المجانية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                {
                  type: "MVP",
                  range: "80K-150K",
                  features: "5-8 شاشات، authentication، 1-2 features",
                },
                {
                  type: "متوسط",
                  range: "150K-300K",
                  features: "10-15 شاشة، payment، notifications، admin panel",
                },
                {
                  type: "متكامل",
                  range: "300K-700K+",
                  features: "20+ شاشة، AI/ML، real-time، multi-role",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-accent/5 border border-accent/20"
                >
                  <div className="text-xs text-accent font-bold font-cairo mb-1">
                    {item.type}
                  </div>
                  <div className="text-2xl font-black font-cairo text-text-primary mb-2">
                    {item.range}
                  </div>
                  <div className="text-xs text-text-muted font-cairo">
                    جنيه مصري
                  </div>
                  <p className="text-sm text-text-muted font-cairo mt-3">
                    {item.features}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              4. مراحل تطوير التطبيق
            </h2>
            <ol className="space-y-3 my-8 list-decimal list-inside marker:text-accent marker:font-bold">
              {[
                "Discovery & Requirements (1-2 أسبوع): فهم الفكرة، بحث السوق، قائمة الميزات",
                "UX/UI Design (3-4 أسابيع): wireframes، prototypes، تصميم نهائي",
                "Development (8-20 أسبوع): Frontend, Backend, APIs، اختبارات مرحلية",
                "Testing & QA (2-3 أسابيع): اختبارات على أجهزة متعددة، performance، security",
                "Launch & Stores (1-2 أسبوع): publishing على Google Play & App Store",
                "Post-launch Support (مستمر): bug fixes، updates، user analytics",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-text-secondary font-cairo text-lg leading-relaxed pl-2"
                >
                  {item}
                </li>
              ))}
            </ol>

            <div className="rounded-2xl section-navy p-10 text-center text-white my-12">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                جاهز تطلق تطبيقك؟
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                خبراؤنا هيساعدوك من المرحلة الأولى. استشارة مجانية + خطة مفصلة.
              </p>
              <Button href="/booking" variant="gold" size="lg">
                احجز استشارة مجانية
              </Button>
            </div>

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
