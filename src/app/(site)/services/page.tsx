import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "نقدم حلول تقنية متكاملة تشمل تطوير المواقع والتطبيقات، بناء الأنظمة الداخلية للشركات، تجهيز البنية التحتية، والدعم الفني المستمر. اكتشف خدماتنا واطلب عرض أسعار مجاني.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
