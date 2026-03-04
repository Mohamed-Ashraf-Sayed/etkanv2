import type { Metadata } from "next";
import BlogPageContent from "./BlogPageContent";

export const metadata: Metadata = {
  title: "المدونة | مقالات تقنية عن البرمجة والتحول الرقمي",
  description:
    "مقالات ونصائح تقنية من خبراء إتقان عن تصميم المواقع، تطوير التطبيقات، أنظمة ERP و CRM، الأمن السيبراني، والتحول الرقمي للشركات.",
  keywords: [
    "مقالات تقنية",
    "مدونة برمجة",
    "نصائح تصميم مواقع",
    "التحول الرقمي",
    "أمن سيبراني",
  ],
};

export default function BlogPage() {
  return <BlogPageContent />;
}
