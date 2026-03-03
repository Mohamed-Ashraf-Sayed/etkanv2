"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);

  const loading = isPending || clicked;

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    setClicked(true);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={loading}
      className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-cairo font-bold transition-all duration-300 ${
        loading
          ? "bg-accent text-navy opacity-80 cursor-wait"
          : "bg-accent/10 hover:bg-accent text-accent hover:text-navy cursor-pointer"
      }`}
      aria-label={locale === "ar" ? "Switch to English" : "التحويل للعربية"}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Globe className="w-4 h-4" />
      )}
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
}
