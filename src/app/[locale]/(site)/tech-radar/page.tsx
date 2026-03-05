import type { Metadata } from "next";
import TechRadarClient from "./TechRadarClient";

export const metadata: Metadata = {
  title: "خريطة التقنيات | Tech Radar",
  description:
    "اكتشف التقنيات والأدوات التي تستخدمها إتقان في بناء مشاريعها. من React و Next.js لـ WordPress و Docker - نختار أفضل التقنيات لكل مشروع.",
  keywords: [
    "tech radar",
    "تقنيات",
    "React",
    "Next.js",
    "WordPress",
    "Docker",
    "Node.js",
    "تطوير ويب",
    "أدوات برمجة",
  ],
};

export default function TechRadarPage() {
  return <TechRadarClient />;
}
