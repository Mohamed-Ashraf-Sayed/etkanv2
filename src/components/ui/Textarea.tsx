"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, rows = 4, id, ...props }, ref) => {
    const textareaId = id || props.name || label;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-secondary mb-2 font-cairo"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted",
            "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)]",
            "transition-all duration-200 font-cairo text-right resize-y",
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

Textarea.displayName = "Textarea";

export default Textarea;
