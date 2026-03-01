"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
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
  primary:
    "bg-gradient-to-l from-primary to-secondary text-white shadow-glow hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]",
  secondary:
    "bg-surface-light text-text-primary border border-border hover:border-primary/40",
  outline:
    "bg-transparent text-text-primary gradient-border",
  ghost:
    "bg-transparent text-text-primary hover:bg-glass-light",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm min-h-[44px] rounded-lg gap-2",
  md: "px-6 py-3 text-base min-h-[48px] rounded-xl gap-2.5",
  lg: "px-8 py-3.5 text-lg min-h-[52px] rounded-xl gap-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-cairo font-semibold transition-colors duration-300 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const motionProps: HTMLMotionProps<"button"> = {
    whileHover: disabled ? {} : { scale: 1.03 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  if (href && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
