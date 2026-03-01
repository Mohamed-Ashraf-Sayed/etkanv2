"use client";

import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  steps: { label: string }[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto mb-10">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-cairo transition-all duration-300 shrink-0
                  ${
                    isCompleted
                      ? "bg-accent text-navy"
                      : isCurrent
                      ? "bg-accent text-navy shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      : "bg-surface-light text-text-muted border border-border"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`
                  text-[10px] font-cairo mt-1.5 whitespace-nowrap hidden sm:block
                  ${isCurrent ? "text-accent font-semibold" : "text-text-muted"}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 rounded transition-colors duration-300 ${
                  i < currentStep ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
