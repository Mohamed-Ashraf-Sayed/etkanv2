import type { Metadata } from "next";
import BookingPageContent from "./BookingPageContent";

export const metadata: Metadata = {
  title: "حجز موعد وطلب عرض سعر",
  description:
    "احجز موعد استشارة مجانية أو اطلب عرض سعر مخصص لمشروعك من فريق إتقان للحلول البرمجية.",
};

export default function BookingPage() {
  return <BookingPageContent />;
}
