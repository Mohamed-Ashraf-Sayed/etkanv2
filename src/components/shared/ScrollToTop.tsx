"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-xl bg-accent hover:bg-accent-light text-navy flex items-center justify-center shadow-lg shadow-accent/20 transition-all duration-200 border border-accent/30"
      aria-label={locale === "en" ? "Back to top" : "العودة للأعلى"}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
