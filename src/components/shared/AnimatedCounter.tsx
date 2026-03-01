"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
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
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayValue(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, end, duration]);

  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div ref={ref} className="text-center">
      {IconComponent && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary-light" />
        </div>
      )}
      <div className="text-h1 font-bold font-cairo gradient-text mb-2">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <p className="text-text-secondary text-sm sm:text-base font-tajawal">
        {label}
      </p>
    </div>
  );
}
