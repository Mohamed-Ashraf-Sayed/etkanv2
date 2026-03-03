"use client";

import { ChevronDown } from "lucide-react";

export default function HeroScrollButton({
  label,
  ariaLabel,
}: {
  label: string;
  ariaLabel: string;
}) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="flex flex-col items-center gap-2 text-white/40 hover:text-accent transition-colors duration-300 cursor-pointer"
        aria-label={ariaLabel}
      >
        <span className="text-xs font-cairo">{label}</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </div>
  );
}
