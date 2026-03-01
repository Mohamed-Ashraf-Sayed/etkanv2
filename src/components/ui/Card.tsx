import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl card p-6",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
