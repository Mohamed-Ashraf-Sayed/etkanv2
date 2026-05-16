"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Sparkles, X, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

const DISMISS_KEY = "etqanly-announcement-dismissed-v1";

export default function AnnouncementBar() {
  const t = useTranslations("announcement");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(DISMISS_KEY);
    if (dismissed) setVisible(false);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-accent via-accent-light to-accent text-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-sm">
        <Sparkles className="w-4 h-4 shrink-0" />
        <Link
          href={"/audit" as never}
          className="font-cairo font-bold hover:underline inline-flex items-center gap-1.5"
        >
          {t("text")}
          <span className="inline-flex items-center gap-1 font-extrabold underline-offset-2 underline">
            {t("cta")}
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-navy/10 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
