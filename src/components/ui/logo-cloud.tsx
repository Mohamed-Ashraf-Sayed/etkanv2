import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos?: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  const displayLogos = logos || defaultLogos;

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-border md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      {displayLogos.map((logo, index) => {
        const isLastRow = index >= displayLogos.length - (displayLogos.length % 4 || 4);
        const isMdRightEdge = (index + 1) % 4 === 0;
        const isOddCol = (index + 1) % 2 !== 0;
        const altBg = index % 4 === 0 || index % 4 === 3;

        const showPlus = index === 0 || index === 2;

        return (
          <div
            key={logo.alt}
            className={cn(
              "relative flex items-center justify-center gap-3 bg-background px-4 py-8 md:p-8 transition-colors duration-200",
              !isMdRightEdge && "md:border-r border-border",
              isOddCol && "border-r border-border",
              !isLastRow && "border-b border-border",
              altBg && "bg-surface-light dark:bg-surface"
            )}
          >
            <img
              alt={logo.alt}
              src={logo.src}
              className="pointer-events-none w-9 h-9 select-none shrink-0"
            />
            <span className="font-cairo font-semibold text-sm text-text-secondary whitespace-nowrap">
              {logo.alt}
            </span>

            {showPlus && (
              <PlusIcon
                className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-border-light"
                strokeWidth={1}
              />
            )}
            {index === 2 && (
              <PlusIcon
                className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 text-border-light md:block"
                strokeWidth={1}
              />
            )}
          </div>
        );
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}

const defaultLogos: Logo[] = [];
