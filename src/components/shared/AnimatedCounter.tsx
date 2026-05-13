"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Users,
  Code2,
  Calendar,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Users,
  Code2,
  Calendar,
};

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
  duration?: number;
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  icon,
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(end);
      setHasAnimated(true);
      return;
    }

    const startAnimation = () => {
      setHasAnimated(true);
      const startTime = performance.now();
      const durationMs = duration * 1000;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(tick);
      };

      setDisplayValue(0);
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      observer.disconnect();
      if (!hasAnimated) startAnimation();
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [end, duration, hasAnimated]);

  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div ref={ref} className="text-center">
      {IconComponent && (
        <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500">
          <IconComponent className="w-5 h-5 text-accent" />
        </div>
      )}
      <div className="text-2xl md:text-3xl font-bold font-cairo text-accent-dark dark:text-accent mb-1">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <p className="text-text-muted text-xs md:text-sm font-cairo font-medium">
        {label}
      </p>
    </div>
  );
}
