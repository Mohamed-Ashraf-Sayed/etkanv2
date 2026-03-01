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
    <div
      className={cn("mb-12", center && "text-center")}
    >
      <h2
        className={cn(
          "text-h2 font-bold mb-4 font-cairo",
          light ? "text-text-primary" : "gradient-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-text-secondary text-body-lg max-w-2xl font-tajawal",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
