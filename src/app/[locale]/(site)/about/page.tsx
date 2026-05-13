import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";
import {
  getAlternates,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getLocalBusinessSchema,
} from "@/lib/seo";
import { team } from "@/data/team";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "من نحن | شركة إتقان للحلول المتكاملة",
  description:
    "تعرف على إتقان، شركة برمجيات مصرية بخبرة أكثر من 6 سنوات. فريق من 30+ متخصص يخدم عملاء في مصر والسعودية والخليج. نفذنا 200+ مشروع ناجح لـ 75+ شركة في تصميم المواقع والتطبيقات.",
  keywords: [
    "شركة إتقان",
    "شركة برمجيات مصرية",
    "فريق تطوير برمجيات",
    "شركة IT مصر",
  ],
  alternates: getAlternates("/about"),
};

function slugifyName(name: string): string {
  return name
    .replace(/^(م\.|أ\.|د\.)\s*/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9ء-ي-]/g, "")
    .slice(0, 50);
}

const teamSchemas = team.map((member) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/about#${slugifyName(member.name)}`,
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  image: member.image,
  worksFor: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "إتقان للحلول المتكاملة",
    url: BASE_URL,
  },
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Mobile Apps",
    "ERP Systems",
  ],
}));

const aboutSchemas: object[] = [
  getOrganizationSchema(),
  getLocalBusinessSchema(),
  getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "من نحن", url: `${BASE_URL}/about` },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about`,
    url: `${BASE_URL}/about`,
    name: "من نحن - إتقان للحلول المتكاملة",
    mainEntity: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "إتقان للحلول المتكاملة",
      employee: teamSchemas.map((p) => ({ "@id": p["@id"] })),
    },
  },
  ...teamSchemas,
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchemas) }}
      />
      <AboutPageContent />
    </>
  );
}
