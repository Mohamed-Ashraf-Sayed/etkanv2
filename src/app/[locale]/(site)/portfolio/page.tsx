import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "أعمالنا",
  description:
    "اكتشف مشاريعنا الناجحة في تطوير المواقع والتطبيقات، الأنظمة الداخلية، وتجهيز البنية التحتية. أكثر من 50 شركة وثقت بنا في مصر والسعودية.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
