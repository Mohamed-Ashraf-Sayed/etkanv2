import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق إتقان للحصول على استشارة مجانية. مكاتب في مصر والسعودية. هاتف، بريد إلكتروني، أو واتساب.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
