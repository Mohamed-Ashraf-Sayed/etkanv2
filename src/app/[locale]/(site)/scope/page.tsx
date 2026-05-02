import type { Metadata } from "next";
import ProjectScopeClient from "./ProjectScopeClient";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "مخطط المشروع الذكي | AI Project Planner",
  description:
    "اوصف فكرة مشروعك واحصل على خطة كاملة بالذكاء الاصطناعي: مراحل التنفيذ، التقنيات المقترحة، تقدير التكلفة والوقت. مجاناً من إتقان.",
  keywords: [
    "تخطيط مشروع",
    "تقدير تكلفة",
    "ذكاء اصطناعي",
    "project planner",
    "AI",
    "تطوير مواقع",
    "تقدير مشروع",
  ],
  alternates: getAlternates("/scope"),
};

const scopeSchema = getBreadcrumbSchema([
  { name: "الرئيسية", url: `${BASE_URL}/` },
  { name: "مخطط المشروع", url: `${BASE_URL}/scope` },
]);

export default function ProjectScopePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scopeSchema) }}
      />
      <ProjectScopeClient />
    </>
  );
}
