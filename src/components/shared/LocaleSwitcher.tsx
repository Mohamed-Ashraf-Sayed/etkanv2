"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-cairo font-bold bg-accent/10 hover:bg-accent text-accent hover:text-navy transition-all duration-300"
      aria-label={locale === "ar" ? "Switch to English" : "التحويل للعربية"}
    >
      <Globe className="w-4 h-4" />
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
}
