import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  gold: "bg-accent text-navy font-bold hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]",
  navy: "bg-navy text-white hover:bg-navy-light border border-transparent hover:border-accent",
  outline: "bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent",
  "outline-light": "bg-transparent text-white border border-white/20 hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-text-primary hover:bg-surface-light",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm min-h-[44px] rounded-lg gap-2",
  md: "px-6 py-3 text-base min-h-[48px] rounded-xl gap-2.5",
  lg: "px-8 py-3.5 text-lg min-h-[52px] rounded-xl gap-3",
};

export default function Button({
  variant = "gold",
  size = "md",
  href,
  className,
  children,
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-cairo font-semibold transition-all duration-300 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles}
    >
      {children}
    </button>
  );
}
