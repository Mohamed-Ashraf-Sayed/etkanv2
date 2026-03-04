import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

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
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
