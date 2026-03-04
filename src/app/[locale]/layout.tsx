import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getLocalBusinessSchema,
} from "@/lib/seo";
import PageTracker from "@/components/analytics/PageTracker";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo-var",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default:
      "إتقان للحلول المتكاملة | شركة تصميم مواقع وتطبيقات في مصر والسعودية",
    template: "%s | إتقان للحلول المتكاملة",
  },
  description:
    "أفضل شركة برمجة وتصميم مواقع وتطبيقات موبايل في مصر والسعودية. نطور أنظمة ERP و CRM، نجهز البنية التحتية، ونقدم دعم فني مستمر. استشارة مجانية — تواصل معنا الآن.",
  keywords: [
    "شركة برمجة",
    "شركة تصميم مواقع",
    "تصميم مواقع في مصر",
    "شركة تطوير تطبيقات",
    "تطبيقات موبايل",
    "شركة برمجيات مصر",
    "تصميم موقع إلكتروني",
    "أفضل شركة برمجة في مصر",
    "شركة IT في مصر",
    "تطوير مواقع",
    "تطوير تطبيقات الجوال",
    "أنظمة ERP",
    "أنظمة CRM",
    "نظام إدارة الشركات",
    "حلول تقنية متكاملة",
    "تحول رقمي",
    "بنية تحتية IT",
    "دعم فني",
    "استشارات تقنية",
    "شركة برمجة في السعودية",
    "web development Egypt",
    "mobile app development",
    "IT solutions Egypt Saudi Arabia",
    "software company Egypt",
    "ERP system",
    "CRM system",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: BASE_URL,
    siteName: "إتقان للحلول المتكاملة",
    title: "إتقان للحلول المتكاملة | شركة تصميم مواقع وتطبيقات",
    description:
      "أفضل شركة برمجة وتصميم مواقع وتطبيقات في مصر والسعودية. أنظمة ERP و CRM، بنية تحتية، ودعم فني. استشارة مجانية.",
  },
  twitter: {
    card: "summary_large_image",
    title: "إتقان للحلول المتكاملة | شركة تصميم مواقع وتطبيقات",
    description:
      "أفضل شركة برمجة وتصميم مواقع وتطبيقات في مصر والسعودية. أنظمة ERP و CRM، بنية تحتية، ودعم فني. استشارة مجانية.",
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    languages: {
      ar: BASE_URL,
      en: `${BASE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "BkAHwm5poUwLr4vAH32Gbs4CrSDLEyJtSyk8S8irKbA",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={cairo.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationSchema(),
              getWebSiteSchema(),
              getLocalBusinessSchema(),
            ]),
          }}
        />
      </head>
      <body className="font-cairo antialiased bg-background text-text-primary min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <PageTracker />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
