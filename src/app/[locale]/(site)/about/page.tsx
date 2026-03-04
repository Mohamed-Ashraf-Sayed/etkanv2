import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "من نحن | شركة إتقان للحلول المتكاملة",
  description:
    "تعرف على إتقان، شركة برمجيات مصرية بخبرة أكثر من 5 سنوات. فريق من 30+ متخصص يخدم عملاء في مصر والسعودية والخليج. نفذنا 50+ مشروع ناجح في تصميم المواقع والتطبيقات.",
  keywords: [
    "شركة إتقان",
    "شركة برمجيات مصرية",
    "فريق تطوير برمجيات",
    "شركة IT مصر",
  ],
};

export default function AboutPage() {
  return <AboutPageContent />;
}
