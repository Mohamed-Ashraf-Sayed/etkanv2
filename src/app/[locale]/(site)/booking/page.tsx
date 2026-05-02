import type { Metadata } from "next";
import BookingPageContent from "./BookingPageContent";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "احجز استشارة مجانية | إتقان للحلول المتكاملة",
  description:
    "احجز موعد استشارة مجانية مع فريق إتقان أو اطلب عرض سعر مخصص لمشروعك. تصميم مواقع، تطبيقات، أنظمة إدارة — نساعدك تختار الحل المناسب لشغلك.",
  keywords: [
    "استشارة مجانية تقنية",
    "عرض سعر تصميم موقع",
    "عرض سعر تطبيق",
    "حجز موعد شركة برمجة",
  ],
  alternates: getAlternates("/booking"),
};

const bookingSchema = getBreadcrumbSchema([
  { name: "الرئيسية", url: `${BASE_URL}/` },
  { name: "احجز موعد", url: `${BASE_URL}/booking` },
]);

export default function BookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingSchema) }}
      />
      <BookingPageContent />
    </>
  );
}
