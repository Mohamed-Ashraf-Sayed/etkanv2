import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "تواصل معنا | إتقان للحلول المتكاملة",
  description:
    "تواصل مع شركة إتقان للحصول على استشارة مجانية. اتصل بنا، ابعتلنا واتساب، أو زورنا. نخدم عملاء في مصر والسعودية والخليج.",
  keywords: [
    "تواصل مع إتقان",
    "رقم شركة برمجة",
    "واتساب شركة تصميم مواقع",
    "عنوان شركة IT مصر",
  ],
};

export default function ContactPage() {
  return <ContactPageContent />;
}
