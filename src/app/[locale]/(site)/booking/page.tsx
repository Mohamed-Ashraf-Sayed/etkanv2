import type { Metadata } from "next";
import BookingPageContent from "./BookingPageContent";

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
};

export default function BookingPage() {
  return <BookingPageContent />;
}
