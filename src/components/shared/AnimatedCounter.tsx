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
