import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-14", center && "text-center")}>
      <div className={cn("gold-line mb-4", center && "mx-auto")} />
      <h2
        className={cn(
          "text-h2 font-bold mb-4 font-cairo",
          light ? "text-white" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-body-lg max-w-2xl font-cairo",
            light ? "text-white/70" : "text-text-secondary",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
