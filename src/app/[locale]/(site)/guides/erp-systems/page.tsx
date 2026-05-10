import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Clock,
  CheckCircle2,
  Database,
  TrendingUp,
  Users,
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

const TITLE = "الدليل الشامل لأنظمة ERP في 2026";
const DESCRIPTION =
  "كل ما تحتاج معرفته عن أنظمة ERP: التعريف، الفوائد، أفضل الأنظمة (SAP, Oracle, Odoo)، تكلفة تطبيق ERP، خطوات الاختيار، والـ ROI المتوقع.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "أنظمة ERP",
    "ERP في مصر",
    "ERP في السعودية",
    "أفضل نظام ERP",
    "تكلفة ERP",
    "Oracle SAP Odoo",
    "ERP للشركات",
  ],
  alternates: getAlternates("/guides/erp-systems"),
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
};

const faqs = [
  {
    question: "ما هو نظام ERP؟",
    answer:
      "ERP (Enterprise Resource Planning) هو نظام برمجي يدمج كل عمليات الشركة في منصة واحدة: محاسبة، مخازن، مشتريات، مبيعات، موارد بشرية، إنتاج. الهدف: بيانات موحدة، عمليات أكفأ، قرارات أدق.",
  },
  {
    question: "متى أحتاج لنظام ERP؟",
    answer:
      "علامات إن شركتك محتاجة ERP: 1) عندك أنظمة منفصلة لكل قسم (محاسبة، CRM، HR). 2) موظفينك بيقضوا وقت كبير في data entry. 3) تقاريرك بطيئة وغير دقيقة. 4) صعوبة في التخطيط والتنبؤ. 5) عدد الموظفين تجاوز 30-50.",
  },
  {
    question: "كم تكلفة نظام ERP؟",
    answer:
      "للشركات الصغيرة (Odoo، أنظمة محلية): 50K-200K جنيه. للمتوسطة: 200K-700K جنيه. للكبيرة (SAP، Oracle): 1M-10M+ جنيه. + اشتراكات شهرية للصيانة (10-20% من التكلفة الأولية سنوياً).",
  },
  {
    question: "ما الفرق بين SAP و Oracle و Odoo؟",
    answer:
      "SAP: أقوى وأغلى، مناسب للشركات الكبيرة (1000+ موظف). Oracle NetSuite: cloud-native، مناسب للمتوسطة. Odoo: مفتوح المصدر، مرن، مناسب للصغيرة والمتوسطة، تكلفة أقل بكتير. للمتطلبات الخاصة: Custom ERP من شركة محلية.",
  },
  {
    question: "كم يستغرق تطبيق ERP؟",
    answer:
      "للشركات الصغيرة: 3-6 شهور. المتوسطة: 6-12 شهر. الكبيرة: 12-24 شهر. الفترة تشمل: تحليل العمليات، configuration، data migration، تدريب الموظفين، اختبارات.",
  },
  {
    question: "ما الـ ROI المتوقع من ERP؟",
    answer:
      "حسب أبحاث Panorama Consulting: تقليل التكاليف 23%، زيادة الإنتاجية 25%، تحسين دقة البيانات 40%، تسريع تقفيل الحسابات 50%. الـ payback period المتوسط: 18-24 شهر.",
  },
];

export default function ErpGuide() {
  const url = `${BASE_URL}/guides/erp-systems`;
  const schemas = [
    getArticleSchema({
      title: TITLE,
      excerpt: DESCRIPTION,
      slug: "erp-systems",
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
      name: "كيفية اختيار وتطبيق نظام ERP لشركتك",
      description: "دليل عملي لاختيار وتنفيذ نظام ERP يناسب حجم شركتك وميزانيتك",
      url,
      totalTime: "P180D",
      steps: [
        {
          name: "تحليل احتياجات الشركة والعمليات الحالية",
          text: "اعمل audit لكل قسم (محاسبة، مخازن، مبيعات، HR)، حدد نقاط الألم، اجمع متطلبات من رؤساء الأقسام، وثّق الـ workflows الحالية.",
        },
        {
          name: "تحديد الميزانية والـ ROI المتوقع",
          text: "احسب التكلفة الكلية (TCO): الترخيص + التطبيق + التدريب + الصيانة السنوية. حدد الـ ROI المتوقع (تقليل تكاليف، زيادة إنتاجية، إلخ).",
        },
        {
          name: "تقييم خيارات الـ ERP المتاحة",
          text: "قارن بين SAP, Oracle NetSuite, Odoo, Microsoft Dynamics, Custom ERP. اعمل demo لكل خيار، اطلب references من عملاء شبيهين بحجم شركتك.",
        },
        {
          name: "اختيار شريك التنفيذ (Implementation Partner)",
          text: "اختر شركة محلية بخبرة في القطاع، اطلب case studies، تحقق من شهادات الفريق، اتفق على مراحل التنفيذ والـ deliverables بوضوح.",
        },
        {
          name: "تخطيط وتصميم النظام (Configuration)",
          text: "صمم الـ chart of accounts، حدد user roles & permissions، اضبط workflows لكل قسم، عرّف الـ approval hierarchies والـ KPIs.",
        },
        {
          name: "هجرة البيانات (Data Migration)",
          text: "نظف البيانات من الأنظمة القديمة، عرّف data mapping، انقل البيانات على دفعات، تحقق من سلامة البيانات بعد الهجرة.",
        },
        {
          name: "تدريب الموظفين بشكل مكثف",
          text: "اعمل تدريبات منفصلة لكل قسم، جهز user manuals بالعربية، عيّن super-users في كل قسم لمساعدة الزملاء، اعمل sandbox environment للتجربة.",
        },
        {
          name: "الإطلاق التدريجي (Go-Live)",
          text: "ابدأ بـ pilot في قسم واحد لمدة 4-6 أسابيع، اجمع feedback، صحّح الأخطاء، ثم وسّع لباقي الأقسام تدريجياً.",
        },
        {
          name: "الدعم والتحسين المستمر",
          text: "راقب KPIs شهرياً، اجمع feedback من المستخدمين، حدّث النظام حسب التغيرات، اعمل audits سنوية لقياس الـ ROI الفعلي.",
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
              { label: "أنظمة ERP" },
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
                نظام ERP بيدمج كل عمليات الشركة في منصة واحدة. الفايدة: تقليل
                التكاليف 23%، زيادة الإنتاجية 25%، قرارات أدق. التكلفة: 50K-10M
                جنيه. فيه اختياران: SAP/Oracle (للكبيرة)، Odoo (للمتوسطة)، أو{" "}
                <Link
                  href="/services/crm"
                  className="text-accent underline"
                >
                  Custom ERP
                </Link>{" "}
                (للمتطلبات الخاصة).
              </p>
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-8">
              1. ما هو نظام ERP؟
            </h2>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              <strong>ERP (Enterprise Resource Planning)</strong> هو نظام
              برمجي شامل بيوحد كل عمليات الشركة (محاسبة، مخازن، مبيعات،
              مشتريات، موارد بشرية، إنتاج) في منصة واحدة بقاعدة بيانات موحدة.
            </p>
            <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-6">
              بدل ما يكون عندك 5-10 برامج منفصلة لكل قسم، ERP بيخلي كل البيانات
              في مكان واحد. النتيجة: قرارات أسرع وأدق، تقليل الأخطاء، توفير
              التكاليف، وكفاءة أعلى.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              2. مكونات نظام ERP الأساسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                {
                  name: "المحاسبة المالية",
                  desc: "قوائم مالية، فواتير، ضرائب، موازنات",
                },
                {
                  name: "إدارة المخازن",
                  desc: "تتبع المنتجات، أرصدة، حركات، multi-warehouse",
                },
                {
                  name: "المشتريات والموردين",
                  desc: "أوامر شراء، إدارة موردين، موافقات",
                },
                {
                  name: "المبيعات والـ CRM",
                  desc: "إدارة العملاء، عروض الأسعار، الفواتير",
                },
                {
                  name: "الموارد البشرية",
                  desc: "موظفين، رواتب، إجازات، تقييم الأداء",
                },
                {
                  name: "الإنتاج والتصنيع",
                  desc: "MRP, Bill of Materials، تخطيط الإنتاج",
                },
                {
                  name: "ذكاء الأعمال (BI)",
                  desc: "تقارير، dashboards، توقعات",
                },
                {
                  name: "إدارة المشاريع",
                  desc: "tasks, timelines, budgets, resources",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-surface border border-border"
                >
                  <h3 className="font-bold font-cairo text-accent mb-2">
                    {m.name}
                  </h3>
                  <p className="text-sm text-text-muted font-cairo">{m.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              3. فوائد ERP المثبتة بالأرقام
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              {[
                { num: "-23%", label: "التكاليف" },
                { num: "+25%", label: "الإنتاجية" },
                { num: "+40%", label: "دقة البيانات" },
                { num: "-50%", label: "وقت التقفيل" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-xl bg-accent/5 border border-accent/20"
                >
                  <div className="text-3xl font-black font-cairo text-accent mb-1">
                    {stat.num}
                  </div>
                  <div className="text-xs text-text-muted font-cairo">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted font-cairo mb-8 text-center">
              المصدر: Panorama Consulting Research 2025
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4 mt-12">
              4. أفضل أنظمة ERP في 2026
            </h2>
            <div className="space-y-4 my-8">
              {[
                {
                  name: "SAP S/4HANA",
                  for: "الشركات الكبيرة جداً (1000+ موظف)",
                  pros: "الأقوى عالمياً، features عميقة، compliance دولي",
                  cons: "غالي جداً ($100K-$1M+)، تطبيق معقد",
                },
                {
                  name: "Oracle NetSuite",
                  for: "الشركات المتوسطة والكبيرة",
                  pros: "Cloud-native، شامل، ROI سريع",
                  cons: "Customization محدود، اشتراك سنوي مرتفع",
                },
                {
                  name: "Microsoft Dynamics 365",
                  for: "الشركات اللي بتستخدم Microsoft stack",
                  pros: "تكامل ممتاز مع Office, Azure, Power BI",
                  cons: "بياخد وقت تطبيق طويل",
                },
                {
                  name: "Odoo",
                  for: "الشركات الصغيرة والمتوسطة",
                  pros: "Open-source، مرن، تكلفة منخفضة، عربي",
                  cons: "يحتاج فريق تقني للـ customization",
                },
                {
                  name: "Custom ERP",
                  for: "الشركات بمتطلبات خاصة جداً",
                  pros: "100% حسب احتياجاتك، ملكية كاملة",
                  cons: "وقت تطوير أطول، تكلفة أولية أعلى",
                },
              ].map((sys, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-surface border border-border"
                >
                  <h3 className="font-bold font-cairo text-text-primary text-lg mb-2">
                    {sys.name}
                  </h3>
                  <p className="text-xs text-accent font-cairo mb-3">
                    {sys.for}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong className="text-emerald-600">المميزات:</strong>{" "}
                      <span className="text-text-muted font-cairo">
                        {sys.pros}
                      </span>
                    </div>
                    <div>
                      <strong className="text-amber-600">العيوب:</strong>{" "}
                      <span className="text-text-muted font-cairo">
                        {sys.cons}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl section-navy p-10 text-center text-white my-12">
              <h3 className="text-h3 font-bold font-cairo mb-3">
                محتار في اختيار نظام ERP؟
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                خبراؤنا هيساعدوك تختار النظام الأمثل بناءً على حجم شركتك،
                ميزانيتك، واحتياجاتك المحددة.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/booking" variant="gold" size="lg">
                  احجز استشارة مجانية
                </Button>
                <Button
                  href="/comparison/erp-vs-crm"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-accent border border-white/10"
                >
                  ERP vs CRM
                </Button>
              </div>
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
