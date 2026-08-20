import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  center?: boolean;
}

/**
 * Manuscript-style divider: fine gold hairlines meeting a rotated diamond,
 * echoing ornament separators in Arabic manuscripts — the craft "إتقان" evokes.
 */
export default function GoldDivider({ className, center = true }: GoldDividerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center gap-3",
        center ? "justify-center" : "justify-start",
        className
      )}
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/70" />
      <span className="w-2 h-2 rotate-45 border border-accent bg-accent/20" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/70" />
    </div>
  );
}
