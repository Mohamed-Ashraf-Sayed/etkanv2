import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo-var",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal-var",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "إتقان للحلول البرمجية | حلول تقنية متكاملة",
    template: "%s | إتقان للحلول البرمجية",
  },
  description:
    "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني. أكثر من 50 شركة وثقت بنا في مصر والسعودية.",
  keywords: [
    "حلول تقنية",
    "تطوير مواقع",
    "تطوير تطبيقات",
    "أنظمة ERP",
    "أنظمة CRM",
    "بنية تحتية",
    "دعم فني",
    "شبكات",
    "سيرفرات",
    "مصر",
    "السعودية",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "إتقان للحلول البرمجية",
    title: "إتقان للحلول البرمجية | حلول تقنية متكاملة",
    description:
      "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`} suppressHydrationWarning>
      <body className="font-cairo antialiased bg-background text-text-primary min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
