import type { Metadata } from "next";
import ProjectScopeClient from "./ProjectScopeClient";

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
};

export default function ProjectScopePage() {
  return <ProjectScopeClient />;
}
