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
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-cairo font-semibold text-text-secondary hover:text-accent border border-border hover:border-accent/30 transition-all duration-200"
      aria-label={locale === "ar" ? "Switch to English" : "التحويل للعربية"}
    >
      <Globe className="w-4 h-4" />
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
}
