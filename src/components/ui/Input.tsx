"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name || label;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-2 font-cairo"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted",
            "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)]",
            "transition-all duration-200 font-cairo text-right",
            error && "border-error focus:border-error focus:ring-error/30",
            className
          )}
          dir="rtl"
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-error font-cairo">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
