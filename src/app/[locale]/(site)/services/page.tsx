import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { getAlternates, getFAQSchema, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "خدماتنا | تصميم مواقع وتطبيقات وأنظمة إدارة",
  description:
    "خدمات تصميم وتطوير المواقع الإلكترونية، تطبيقات الموبايل، أنظمة ERP و CRM، تجهيز البنية التحتية، والدعم الفني. احصل على عرض سعر مجاني من إتقان.",
  keywords: [
    "تصميم مواقع",
    "تطوير تطبيقات",
    "أنظمة ERP",
    "أنظمة CRM",
    "بنية تحتية",
    "دعم فني",
    "تصميم موقع إلكتروني",
    "تطبيقات موبايل",
    "نظام إدارة شركات",
  ],
  alternates: getAlternates("/services"),
};

const faqs = [
  {
    question: "كم تكلفة تصميم موقع إلكتروني؟",
    answer:
      "تكلفة تصميم الموقع تختلف حسب نوع المشروع، عدد الصفحات، والمميزات المطلوبة. عندنا خطط تبدأ من 5,000 جنيه للمواقع البسيطة وتصل لـ 100,000+ جنيه للمشاريع الكبيرة. تواصل معنا لعرض سعر مجاني.",
  },
  {
    question: "كم وقت تطوير تطبيق موبايل؟",
    answer:
      "متوسط وقت تطوير تطبيق موبايل من 2 إلى 6 شهور حسب التعقيد. التطبيقات البسيطة 8-12 أسبوع، المتوسطة 3-4 شهور، والمعقدة 5-6 شهور. بنحدد جدول زمني واضح بعد تحليل المتطلبات.",
  },
  {
    question: "هل تقدمون دعم فني بعد التسليم؟",
    answer:
      "أيوة، عندنا خطط دعم فني شهرية وسنوية تشمل الصيانة، التحديثات، حل المشاكل، والدعم على مدار 24/7 للعملاء المميزين.",
  },
  {
    question: "هل أملك حقوق المشروع كاملة؟",
    answer:
      "بالتأكيد. بعد التسليم، انت بتمتلك كل الـ source code، الـ assets، وحقوق الملكية الفكرية للمشروع 100%.",
  },
  {
    question: "هل تشتغلون مع شركات خارج مصر؟",
    answer:
      "أيوة، عندنا عملاء في السعودية، الإمارات، قطر، الكويت، وأوروبا. بنشتغل remotely مع اجتماعات أونلاين منتظمة.",
  },
];

export const servicesSchemas = [
  getFAQSchema(faqs),
  getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "خدماتنا", url: `${BASE_URL}/services` },
  ]),
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchemas) }}
      />
      <ServicesPageClient />
    </>
  );
}
