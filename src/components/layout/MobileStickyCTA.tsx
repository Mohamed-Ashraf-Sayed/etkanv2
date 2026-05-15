"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Phone, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

const HIDDEN_PATHS = ["/admin", "/booking", "/contact"];

export default function MobileStickyCTA() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldHide = HIDDEN_PATHS.some((p) => pathname.includes(p));
  if (shouldHide || !scrolledPastHero) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur border-t border-white/10 px-4 py-3 flex items-center gap-2 shadow-[0_-4px_24px_rgba(0,0,0,0.3)]">
      <Link
        href="/booking"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-navy font-bold font-cairo text-sm hover:bg-accent-light transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        {t("freeConsultation")}
      </Link>
      <a
        href="tel:+201094807674"
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors shrink-0"
        aria-label={t("callUs")}
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
