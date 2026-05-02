import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "أعمالنا | مشاريع تصميم مواقع وتطبيقات ناجحة",
  description:
    "شاهد أعمالنا ومشاريعنا الناجحة في تصميم المواقع والتطبيقات وأنظمة الإدارة. أكثر من 50 مشروع لعملاء في مصر والسعودية. اطلع على نماذج أعمالنا.",
  keywords: [
    "أعمال إتقان",
    "نماذج أعمال تصميم مواقع",
    "مشاريع تطبيقات ناجحة",
    "بورتفوليو شركة برمجة",
  ],
  alternates: getAlternates("/portfolio"),
};

const portfolioSchema = getBreadcrumbSchema([
  { name: "الرئيسية", url: `${BASE_URL}/` },
  { name: "أعمالنا", url: `${BASE_URL}/portfolio` },
]);

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <PortfolioPageClient />
    </>
  );
}
