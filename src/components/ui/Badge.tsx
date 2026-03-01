import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "accent";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 dark:bg-gradient-to-l dark:from-primary/20 dark:to-secondary/20 text-primary dark:text-primary-light border-primary/20",
  secondary: "bg-secondary/10 dark:bg-gradient-to-l dark:from-secondary/20 dark:to-secondary-light/20 text-secondary dark:text-secondary-light border-secondary/20",
  accent: "bg-accent/10 dark:bg-gradient-to-l dark:from-accent/20 dark:to-primary/20 text-accent-dark dark:text-accent border-accent/20",
};

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
