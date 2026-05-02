import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

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
  alternates: getAlternates("/about"),
};

const aboutSchema = getBreadcrumbSchema([
  { name: "الرئيسية", url: `${BASE_URL}/` },
  { name: "من نحن", url: `${BASE_URL}/about` },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPageContent />
    </>
  );
}
