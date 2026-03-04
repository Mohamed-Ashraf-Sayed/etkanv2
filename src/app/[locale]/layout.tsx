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
    default: "إتقان للحلول المتكاملة | Etqan IT Solutions",
    template: "%s | إتقان للحلول المتكاملة",
  },
  description:
    "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني. أكثر من 50 شركة وثقت بنا في مصر والسعودية.",
  keywords: [
    "حلول تقنية",
    "تطوير مواقع",
    "تطوير تطبيقات",
    "أنظمة ERP",
    "أنظمة CRM",
    "IT solutions",
    "web development",
    "mobile apps",
    "Egypt",
    "Saudi Arabia",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: BASE_URL,
    siteName: "إتقان للحلول المتكاملة",
    title: "إتقان للحلول المتكاملة | Etqan IT Solutions",
    description:
      "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني.",
  },
  twitter: {
    card: "summary_large_image",
    title: "إتقان للحلول المتكاملة | Etqan IT Solutions",
    description:
      "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني.",
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
