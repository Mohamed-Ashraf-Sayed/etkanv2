import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getDbProjects } from "@/lib/db-projects";
import PortfolioPageClient from "./PortfolioPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "أعمالنا",
  description:
    "اكتشف مشاريعنا الناجحة في تطوير المواقع والتطبيقات، الأنظمة الداخلية، وتجهيز البنية التحتية. أكثر من 50 شركة وثقت بنا في مصر والسعودية.",
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const dbProjects = await getDbProjects(locale);
  return <PortfolioPageClient dbProjects={dbProjects} />;
}
