import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

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
  alternates: getAlternates("/contact"),
};

const contactSchema = [
  getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "تواصل معنا", url: `${BASE_URL}/contact` },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "تواصل مع إتقان",
    url: `${BASE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      telephone: "+201094807674",
      email: "info@etqanly.com",
    },
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPageContent />
    </>
  );
}
