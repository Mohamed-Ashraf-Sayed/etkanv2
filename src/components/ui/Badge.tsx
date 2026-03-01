import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "navy" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-accent/10 text-accent border-accent/30",
  navy: "bg-navy/10 text-navy dark:bg-white/10 dark:text-white border-navy/20 dark:border-white/20",
  muted: "bg-surface-light text-text-secondary border-border",
};

export default function Badge({ children, variant = "gold" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border font-cairo",
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
