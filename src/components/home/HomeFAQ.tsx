"use client";

import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const faqsAr = [
  {
    q: "كم تكلفة العمل مع إتقان؟",
    a: "الأسعار تختلف حسب حجم المشروع. موقع بسيط من 5,000 جنيه، موقع شركة من 25,000 جنيه، تطبيق موبايل من 80,000 جنيه، نظام ERP من 150,000 جنيه. كل عرض سعر مخصص حسب احتياجاتك. استخدم حاسبة التكلفة على الموقع لتقدير مبدئي.",
  },
  {
    q: "كم وقت تطوير المشروع؟",
    a: "موقع بسيط: 1-3 أسابيع. موقع شركة متوسط: 4-8 أسابيع. تطبيق موبايل: 3-6 شهور. نظام ERP/CRM: 6-12 شهر. الجدول الزمني الدقيق يتحدد بعد جلسة تحليل المتطلبات. نلتزم بالمواعيد ولو تأخّر التسليم من جهتنا نعوّض العميل.",
  },
  {
    q: "هل أملك الكود المصدري؟",
    a: "نعم بالكامل. بعد سداد كامل المبلغ المتّفق عليه، تنتقل ملكية الكود وأصول التصميم إليك. تستلم الكود مع التوثيق الفني ويمكنك تعديله أو نقله لأي مطور آخر بدون قيود.",
  },
  {
    q: "ماذا لو احتجت تعديلات بعد التسليم؟",
    a: "كل مشاريع البرمجة المخصصة لها ضمان 6 شهور (3 شهور لمشاريع WordPress) — أي bug أو خلل نصلحه مجاناً. التعديلات الجوهرية أو الميزات الجديدة تُسعَّر بشكل منفصل. نقدّم باقات صيانة شهرية اختيارية للتحديثات المستمرة.",
  },
  {
    q: "كيف تتم عملية الدفع؟",
    a: "ندفع على 3 مراحل: 30% عند توقيع العقد لبدء العمل، 30% عند تسليم النسخة التجريبية، 40% عند التسليم النهائي. نقبل التحويل البنكي والدفع بالجنيه المصري والريال السعودي والدرهم الإماراتي والدولار. تقسيط على 6-12 شهر متاح للمشاريع الكبيرة.",
  },
  {
    q: "هل تعملون مع شركات صغيرة وStartups؟",
    a: "نعم، حوالي 40% من عملائنا شركات ناشئة وأعمال صغيرة. عندنا باقات MVP للـ Startups بأسعار خاصة، وحلول scalable تنمو معاك من 5 مستخدمين لـ 50,000 مستخدم بدون الحاجة لإعادة البناء.",
  },
  {
    q: "هل أحتاج معرفة تقنية للتعامل معكم؟",
    a: "لا. عملاؤنا من خلفيات متنوعة — معظمهم من مدراء أعمال بدون خبرة برمجية. مدير حسابك المخصص يترجم احتياجاتك التجارية لمتطلبات تقنية، ويشرح لك كل تفصيلة بدون مصطلحات معقدة. نقدّم تدريب للفريق بعد التسليم.",
  },
  {
    q: "ماذا لو لم أكن راضياً عن النتيجة؟",
    a: "نشتغل بمنهجية agile: في نهاية كل مرحلة (كل 2-3 أسابيع) تراجع التقدم وتطلب تعديلات قبل الانتقال للمرحلة التالية. ده يضمن إن النتيجة النهائية مطابقة لتوقعاتك. في حالات نادرة، فيه استرداد جزئي حسب مراحل الإنجاز كما هو موضح في الشروط.",
  },
];

const faqsEn = [
  {
    q: "How much does working with Etqan cost?",
    a: "Pricing varies by project size. Basic websites from 5,000 EGP, corporate websites from 25,000 EGP, mobile apps from 80,000 EGP, ERP systems from 150,000 EGP. Every quote is customized. Use the cost calculator on the site for an initial estimate.",
  },
  {
    q: "How long does development take?",
    a: "Basic websites: 1-3 weeks. Mid-size corporate websites: 4-8 weeks. Mobile apps: 3-6 months. ERP/CRM systems: 6-12 months. Exact timeline is set after a requirements analysis session. We honor deadlines and compensate the client if we cause a delay.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes, fully. Once the final payment is settled, source code and design assets transfer to you. You receive the code with technical documentation, free to modify or migrate to any other developer with no restrictions.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "Custom development comes with a 6-month warranty (3 months for WordPress) — bugs are fixed free of charge. Substantive changes or new features are quoted separately. We offer optional monthly maintenance for continuous updates.",
  },
  {
    q: "How does payment work?",
    a: "3 milestones: 30% upon contract signing, 30% at staging delivery, 40% upon final delivery. We accept bank transfers in EGP, SAR, AED, USD, and EUR. 6-12 month installments available for larger projects.",
  },
  {
    q: "Do you work with small businesses and startups?",
    a: "Yes. Around 40% of our clients are startups and small businesses. We offer MVP packages with startup-friendly pricing, and scalable solutions that grow with you from 5 users to 50,000 without requiring a rebuild.",
  },
  {
    q: "Do I need technical knowledge to work with you?",
    a: "No. Most of our clients are business owners without coding experience. Your dedicated account manager translates business needs into technical requirements and explains everything in plain language. Team training is included after delivery.",
  },
  {
    q: "What if I'm not satisfied with the result?",
    a: "We work agile: at the end of every 2-3 week milestone, you review progress and request changes before moving on. This ensures the final result matches your expectations. In rare cases, partial refunds are available based on completed milestones as outlined in our terms.",
  },
];

export default function HomeFAQ() {
  const t = useTranslations("homeFaq");
  const locale = useLocale();
  const faqs = locale === "en" ? faqsEn : faqsAr;

  return (
    <section className="section-padding bg-white dark:bg-background">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="max-w-3xl mx-auto space-y-3 mt-12">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="font-bold font-cairo text-text-primary text-start">
                  {faq.q}
                </span>
                <span className="text-accent text-2xl shrink-0 ms-3 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-text-secondary font-cairo leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
