import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

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
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
