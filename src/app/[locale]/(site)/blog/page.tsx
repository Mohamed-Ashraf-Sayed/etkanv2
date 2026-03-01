import type { Metadata } from "next";
import BlogPageContent from "./BlogPageContent";

export const metadata: Metadata = {
  title: "المدونة",
  description:
    "مقالات ونصائح تقنية من فريق خبراء إتقان. اقرأ عن أحدث التقنيات والحلول البرمجية والأمن السيبراني.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
