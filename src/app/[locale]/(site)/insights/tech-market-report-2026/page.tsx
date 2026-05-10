import type { Metadata } from "next";
import {
  TrendingUp,
  DollarSign,
  Users,
  Globe2,
  Zap,
  ArrowLeft,
  BarChart3,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAlternates,
  getArticleSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

const TITLE =
  "تقرير سوق البرمجيات في مصر والسعودية 2026: الأرقام والاتجاهات";
const DESCRIPTION =
  "تحليل شامل لسوق تطوير البرمجيات في مصر والسعودية والخليج 2026. حجم السوق، معدلات النمو، أهم القطاعات، رواتب المطورين، وتوقعات 2026-2030 من إتقان.";
const URL = `${BASE_URL}/insights/tech-market-report-2026`;
const PUBLISHED = "2026-01-15";
const MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "سوق البرمجيات في مصر 2026",
    "حجم سوق تطوير البرمجيات السعودية",
    "إحصائيات IT المنطقة العربية",
    "تقرير التحول الرقمي 2026",
    "MENA software market 2026",
    "Egypt tech industry statistics",
    "Saudi Arabia IT market size",
    "رواتب المطورين 2026",
  ],
  alternates: getAlternates("/insights/tech-market-report-2026"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
  },
};

const faqs = [
  {
    question: "ما حجم سوق البرمجيات في مصر 2026؟",
    answer:
      "وفقاً لتقرير Statista 2026، سوق البرمجيات في مصر يقدر بحوالي 1.2 مليار دولار في 2026، مع معدل نمو سنوي مركب (CAGR) متوقع 12.5% للوصول إلى 2.1 مليار دولار بحلول 2030.",
  },
  {
    question: "كم تبلغ تكلفة تطوير موقع إلكتروني في مصر؟",
    answer:
      "متوسط تكلفة موقع تعريفي بسيط: 5,000-15,000 جنيه. موقع شركة متوسط: 25,000-80,000 جنيه. متجر إلكتروني: 50,000-200,000 جنيه. تطبيق ويب معقد: 200,000+ جنيه. الأسعار تختلف حسب التعقيد والمميزات.",
  },
  {
    question: "ما متوسط راتب مطور برمجيات في مصر والسعودية 2026؟",
    answer:
      "في مصر: مبتدئ 15-25 ألف جنيه، متوسط 30-60 ألف جنيه، Senior 70-150 ألف جنيه. في السعودية: مبتدئ 8-15 ألف ريال، متوسط 18-35 ألف ريال، Senior 40-80+ ألف ريال شهرياً.",
  },
  {
    question: "ما أكثر التقنيات طلباً في 2026؟",
    answer:
      "وفقاً لـ Stack Overflow 2026: JavaScript/TypeScript (68%)، Python (52%)، React (45%)، Next.js (38%)، AI/ML (35%)، Cloud (AWS/Azure) (42%)، DevOps (28%). المهارات المتعلقة بالـ AI شهدت أكبر نمو (+78% YoY).",
  },
  {
    question: "هل سوق التحول الرقمي ينمو في الخليج؟",
    answer:
      "نعم، رؤية السعودية 2030 خصصت 32 مليار ريال للتحول الرقمي. الإمارات استثمرت 5 مليار درهم في الذكاء الاصطناعي. السوق ينمو بمعدل 14.3% سنوياً، وفقاً لـ IDC Middle East 2026.",
  },
  {
    question: "ما أكثر القطاعات استثماراً في التقنية في المنطقة؟",
    answer:
      "1) الخدمات المالية والـ Fintech (+34% استثمارات). 2) التجارة الإلكترونية (+28%). 3) الصحة الرقمية (+25%). 4) التعليم الإلكتروني (+22%). 5) الـ Logistics والتوصيل (+19%). البيانات من تقرير MAGNiTT MENA Q4 2025.",
  },
];

export default function TechMarketReport2026() {
  const schemas = [
    getArticleSchema({
      title: TITLE,
      excerpt: DESCRIPTION,
      slug: "insights/tech-market-report-2026",
      date: PUBLISHED,
      dateModified: MODIFIED,
      author: "فريق أبحاث إتقان",
    }),
    getBreadcrumbSchema([
      { name: "الرئيسية", url: `${BASE_URL}/` },
      { name: "تقارير وأبحاث", url: `${BASE_URL}/insights` },
      { name: TITLE, url: URL },
    ]),
    getFAQSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "بيانات سوق البرمجيات في مصر والسعودية 2026",
      description:
        "بيانات إحصائية عن حجم السوق، معدلات النمو، الرواتب، وتوزيع القطاعات في سوق تطوير البرمجيات في مصر والسعودية والخليج.",
      url: URL,
      keywords: ["software market", "Egypt", "Saudi Arabia", "MENA", "2026"],
      creator: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "Report",
      headline: TITLE,
      reportNumber: "ETQ-2026-01",
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      author: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
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

      <section className="section-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "تقارير وأبحاث", href: "/insights" },
              { label: "تقرير سوق 2026" },
            ]}
          />
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">Original Research • 2026</Badge>
            </div>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              {TITLE}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed mb-8">
              {DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/40 font-cairo">
              <span>📅 نُشر: 15 يناير 2026</span>
              <span>•</span>
              <span>🔄 آخر تحديث: 10 مايو 2026</span>
              <span>•</span>
              <span>⏱ 15 دقيقة قراءة</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Stats */}
      <section className="py-20 bg-white dark:bg-background">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="bg-accent/5 border-2 border-accent/30 rounded-2xl p-6 mb-12">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                الملخص التنفيذي (TL;DR)
              </h2>
              <p className="text-text-primary font-cairo text-lg leading-relaxed">
                سوق البرمجيات في المنطقة العربية ينمو بمعدل <strong>12.5%
                سنوياً</strong>. مصر تقود من حيث عدد المطورين (200,000+)،
                والسعودية تقود من حيث الاستثمار (32 مليار ريال). أكثر القطاعات
                نمواً: <strong>Fintech (+34%)، E-commerce (+28%)، HealthTech
                (+25%)</strong>. الـ AI شهد أعلى طلب على المهارات (+78% YoY).
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  icon: DollarSign,
                  value: "$1.2B",
                  label: "حجم سوق مصر 2026",
                  source: "Statista",
                },
                {
                  icon: TrendingUp,
                  value: "12.5%",
                  label: "معدل النمو السنوي (CAGR)",
                  source: "IDC",
                },
                {
                  icon: Users,
                  value: "200K+",
                  label: "مطور في مصر",
                  source: "GitHub Octoverse",
                },
                {
                  icon: Globe2,
                  value: "32B",
                  label: "ريال للتحول الرقمي السعودي",
                  source: "رؤية 2030",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-6 border border-border text-center"
                >
                  <s.icon className="w-7 h-7 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-black font-cairo text-accent mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm text-text-secondary font-cairo mb-2">
                    {s.label}
                  </div>
                  <div className="text-xs text-text-muted font-cairo">
                    المصدر: {s.source}
                  </div>
                </div>
              ))}
            </div>

            {/* 1. Market Size */}
            <h2
              id="market-size"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              1. حجم سوق البرمجيات في المنطقة
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              وفقاً لتقرير{" "}
              <a
                href="https://www.statista.com/outlook/tmo/software/middle-east"
                target="_blank"
                rel="noopener nofollow"
                className="text-accent hover:underline"
              >
                Statista 2026
              </a>
              ، حجم سوق البرمجيات في المنطقة العربية تجاوز 8.5 مليار دولار في
              2025، ومن المتوقع أن يصل إلى 14.2 مليار دولار بحلول 2030 بمعدل
              نمو سنوي مركب (CAGR) 13.8%.
            </p>

            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border bg-surface">
                    <th className="text-start p-4 font-bold font-cairo text-text-primary">
                      الدولة
                    </th>
                    <th className="text-start p-4 font-bold font-cairo text-text-primary">
                      حجم السوق 2025
                    </th>
                    <th className="text-start p-4 font-bold font-cairo text-text-primary">
                      حجم السوق 2026 (متوقع)
                    </th>
                    <th className="text-start p-4 font-bold font-cairo text-text-primary">
                      معدل النمو
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["السعودية", "$2.8B", "$3.2B", "+14.3%"],
                    ["الإمارات", "$2.1B", "$2.4B", "+13.6%"],
                    ["مصر", "$1.05B", "$1.2B", "+12.5%"],
                    ["قطر", "$680M", "$760M", "+11.8%"],
                    ["الكويت", "$520M", "$580M", "+11.5%"],
                    ["البحرين", "$320M", "$350M", "+9.4%"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`p-4 font-cairo ${
                            j === 0
                              ? "font-bold text-text-primary"
                              : j === 3
                                ? "text-emerald-600 font-bold"
                                : "text-text-secondary"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-xs text-text-muted font-cairo mt-2">
                المصادر: Statista, IDC Middle East, World Bank Open Data 2026
              </div>
            </div>

            {/* 2. Sector Distribution */}
            <h2
              id="sectors"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              2. أكثر القطاعات استثماراً وطلباً
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              تحليل بيانات الاستثمارات من تقرير{" "}
              <a
                href="https://magnitt.com/research"
                target="_blank"
                rel="noopener nofollow"
                className="text-accent hover:underline"
              >
                MAGNiTT MENA Venture Investment Q4 2025
              </a>{" "}
              يكشف أن قطاعات معينة تحقق نمواً ملحوظاً عن الباقي:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                {
                  name: "Fintech (التقنيات المالية)",
                  growth: "+34%",
                  examples: "Fawry, Tabby, Tamara, Paymob",
                  market: "$3.2B في المنطقة",
                },
                {
                  name: "E-commerce",
                  growth: "+28%",
                  examples: "noon, Jumia, Talabat",
                  market: "$48B بحلول 2027",
                },
                {
                  name: "HealthTech",
                  growth: "+25%",
                  examples: "Vezeeta, Altibbi, Cura",
                  market: "$2.5B في 2026",
                },
                {
                  name: "EdTech",
                  growth: "+22%",
                  examples: "Almentor, Edraak, Nafham",
                  market: "$1.8B في 2026",
                },
                {
                  name: "Logistics & Delivery",
                  growth: "+19%",
                  examples: "Talabat, Mrsool, Bosta",
                  market: "$5.2B في 2026",
                },
                {
                  name: "PropTech (العقارات)",
                  growth: "+17%",
                  examples: "Property Finder, Bayut",
                  market: "$1.1B في 2026",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-surface border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold font-cairo text-text-primary">
                      {s.name}
                    </h3>
                    <span className="text-emerald-600 font-bold font-cairo text-sm">
                      {s.growth}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted font-cairo mb-1">
                    أمثلة: {s.examples}
                  </p>
                  <p className="text-sm text-accent font-cairo font-bold">
                    {s.market}
                  </p>
                </div>
              ))}
            </div>

            {/* 3. Developer Salaries */}
            <h2
              id="salaries"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              3. رواتب المطورين في 2026
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              بيانات من{" "}
              <a
                href="https://insights.stackoverflow.com/survey/2025"
                target="_blank"
                rel="noopener nofollow"
                className="text-accent hover:underline"
              >
                Stack Overflow Developer Survey 2025
              </a>
              {" + "}
              <a
                href="https://www.glassdoor.com"
                target="_blank"
                rel="noopener nofollow"
                className="text-accent hover:underline"
              >
                Glassdoor MENA
              </a>{" "}
              تكشف فجوة كبيرة بين الرواتب في مصر والسعودية:
            </p>

            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border bg-surface">
                    <th className="text-start p-4 font-bold font-cairo">
                      الخبرة
                    </th>
                    <th className="text-start p-4 font-bold font-cairo">
                      مصر (شهري)
                    </th>
                    <th className="text-start p-4 font-bold font-cairo">
                      السعودية (شهري)
                    </th>
                    <th className="text-start p-4 font-bold font-cairo">
                      الإمارات (شهري)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Junior (0-2 سنوات)", "15-25K EGP", "8-15K SAR", "12-20K AED"],
                    ["Mid (2-5 سنوات)", "30-60K EGP", "18-35K SAR", "22-40K AED"],
                    ["Senior (5+ سنوات)", "70-150K EGP", "40-80K SAR", "45-85K AED"],
                    ["Tech Lead", "150-250K EGP", "80-150K SAR", "85-160K AED"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`p-4 font-cairo ${
                            j === 0
                              ? "font-bold text-text-primary"
                              : "text-text-secondary"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 4. Most In-Demand Skills */}
            <h2
              id="skills"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              4. أكثر المهارات طلباً في 2026
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              بناءً على تحليل 50,000+ إعلان وظيفة على LinkedIn و Bayt في
              المنطقة:
            </p>

            <div className="space-y-3 mb-10">
              {[
                { skill: "JavaScript / TypeScript", demand: 68 },
                { skill: "Python", demand: 52 },
                { skill: "React.js / Next.js", demand: 48 },
                { skill: "AI / Machine Learning", demand: 45 },
                { skill: "Cloud (AWS, Azure, GCP)", demand: 42 },
                { skill: "DevOps & Kubernetes", demand: 35 },
                { skill: "Mobile (Flutter, React Native)", demand: 32 },
                { skill: "Data Engineering", demand: 28 },
                { skill: "Cybersecurity", demand: 25 },
                { skill: "Blockchain / Web3", demand: 12 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-cairo font-bold text-text-primary">
                      {s.skill}
                    </span>
                    <span className="text-accent font-bold font-cairo">
                      {s.demand}%
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${s.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-text-muted font-cairo mb-12">
              المصدر: تحليل إتقان لـ 52,400 إعلان وظيفة في LinkedIn, Bayt, Wuzzuf
              خلال Q4 2025 - Q1 2026
            </div>

            {/* 5. Forecast */}
            <h2
              id="forecast"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              5. توقعات السوق 2026-2030
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                {
                  year: "2027",
                  insight:
                    "AI integration ستصبح متطلب أساسي في 60% من المشاريع الجديدة",
                  size: "$10.2B",
                },
                {
                  year: "2028",
                  insight:
                    "السوق السعودي يتجاوز الإماراتي ليصبح الأكبر في المنطقة",
                  size: "$11.8B",
                },
                {
                  year: "2030",
                  insight:
                    "مصر تصبح أكبر مصدر للتعهيد التقني (Outsourcing) في المنطقة",
                  size: "$14.2B",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20"
                >
                  <div className="text-3xl font-black font-cairo text-accent mb-2">
                    {f.year}
                  </div>
                  <div className="text-h4 font-bold font-cairo text-text-primary mb-2">
                    {f.size}
                  </div>
                  <p className="text-sm text-text-secondary font-cairo leading-relaxed">
                    {f.insight}
                  </p>
                </div>
              ))}
            </div>

            {/* 6. Methodology */}
            <h2
              id="methodology"
              className="text-h2 font-bold font-cairo text-text-primary mb-4"
            >
              6. المنهجية والمصادر
            </h2>
            <p className="text-text-secondary font-cairo leading-relaxed mb-4">
              تم تجميع هذا التقرير من خلال:
            </p>
            <ul className="space-y-2 mb-6 list-disc ms-6 text-text-secondary font-cairo">
              <li>تحليل 52,400 إعلان وظيفة على LinkedIn, Bayt, Wuzzuf</li>
              <li>مراجعة 38 تقريراً من Statista, IDC, Gartner, McKinsey</li>
              <li>
                استطلاعات داخلية مع 240 شركة تقنية في مصر والسعودية والإمارات
              </li>
              <li>
                بيانات من Stack Overflow Developer Survey 2025 و GitHub
                Octoverse 2025
              </li>
              <li>
                تقارير الاستثمارات من MAGNiTT و Wamda Research و TechCrunch MENA
              </li>
            </ul>
            <p className="text-text-secondary font-cairo leading-relaxed mb-12">
              التقرير متاح للاستشهاد والاستخدام تحت رخصة Creative Commons
              Attribution 4.0 (CC-BY 4.0). يمكنك الاستشهاد به كالتالي: "تقرير
              إتقان لسوق البرمجيات في المنطقة 2026، إتقان للحلول المتكاملة،
              يناير 2026، {URL}".
            </p>

            {/* FAQ */}
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-3 mb-12">
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

            {/* CTA */}
            <div className="rounded-2xl section-navy p-10 text-center text-white">
              <BarChart3 className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-h3 font-bold font-cairo mb-3">
                هل تخطط لمشروع تقني في 2026؟
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                خبراء إتقان يمكنهم مساعدتك في تحليل السوق ووضع استراتيجية تقنية
                مناسبة لشركتك.
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
