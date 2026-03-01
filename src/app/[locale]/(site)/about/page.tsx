import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على إتقان للحلول البرمجية، شريكك التقني الموثوق في رحلة التحول الرقمي. فريق من أكثر من 30 متخصصاً يخدمون عملاء في مصر والسعودية والخليج.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
