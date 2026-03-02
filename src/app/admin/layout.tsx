import { Cairo } from "next/font/google";
import "../[locale]/globals.css";
import "./admin.css";

const cairo = Cairo({
  variable: "--font-cairo-var",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "لوحة التحكم — إتقان",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`dark ${cairo.variable}`} suppressHydrationWarning>
      <body className="font-cairo antialiased bg-[#060E1A] text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
