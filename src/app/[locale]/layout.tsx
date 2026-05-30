import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getLocalBusinessSchema,
} from "@/lib/seo";
import PageTracker from "@/components/analytics/PageTracker";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo-var",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const META_AR = {
  title:
    "إتقان للحلول المتكاملة | شركة تصميم مواقع وتطبيقات في مصر والسعودية",
  titleTemplate: "%s | إتقان للحلول المتكاملة",
  description:
    "أفضل شركة برمجة وتصميم مواقع وتطبيقات موبايل في مصر والسعودية. نطور أنظمة ERP و CRM، نجهز البنية التحتية، ونقدم دعم فني مستمر. استشارة مجانية — تواصل معنا الآن.",
  ogTitle: "إتقان للحلول المتكاملة | شركة تصميم مواقع وتطبيقات",
  ogDescription:
    "أفضل شركة برمجة وتصميم مواقع وتطبيقات في مصر والسعودية. أنظمة ERP و CRM، بنية تحتية، ودعم فني. استشارة مجانية.",
  siteName: "إتقان للحلول المتكاملة",
  ogLocale: "ar_EG",
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
    "أنظمة ERP",
    "أنظمة CRM",
    "تحول رقمي",
    "شركة برمجة في السعودية",
  ],
};

const META_EN = {
  title:
    "Etqan IT Solutions | Web & Mobile App Development Company in Egypt & Saudi Arabia",
  titleTemplate: "%s | Etqan IT Solutions",
  description:
    "Leading software development company in Egypt & Saudi Arabia. We build web apps, mobile apps, ERP, CRM systems, and IT infrastructure. Free consultation — get in touch today.",
  ogTitle: "Etqan IT Solutions | Web & Mobile App Development",
  ogDescription:
    "Leading software development company in Egypt & Saudi Arabia. We build websites, mobile apps, ERP, CRM, and infrastructure. Free consultation.",
  siteName: "Etqan IT Solutions",
  ogLocale: "en_US",
  keywords: [
    "software development company Egypt",
    "web development company Egypt",
    "mobile app development Egypt",
    "ERP system Saudi Arabia",
    "CRM system Egypt",
    "IT solutions MENA",
    "Next.js development",
    "React Native development",
    "custom software Egypt",
    "Saudi Arabia software company",
    "Etqan IT Solutions",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const m = isEn ? META_EN : META_AR;
  const canonicalUrl = isEn ? `${BASE_URL}/en` : BASE_URL;

  return {
    title: { default: m.title, template: m.titleTemplate },
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      url: canonicalUrl,
      siteName: m.siteName,
      title: m.ogTitle,
      description: m.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ar-EG": BASE_URL,
        "en-US": `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    authors: [{ name: m.siteName, url: BASE_URL }],
    creator: m.siteName,
    publisher: m.siteName,
    category: "Technology",
    applicationName: "Etqan IT Solutions",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
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
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
        "yandex-verification":
          process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={cairo.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
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
        <GoogleAnalytics />
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
