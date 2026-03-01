"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface BookingSuccessStateProps {
  title: string;
  subtitle: string;
  details?: { label: string; value: string }[];
  onReset: () => void;
}

export default function BookingSuccessState({
  title,
  subtitle,
  details,
  onReset,
}: BookingSuccessStateProps) {
  const t = useTranslations("bookingSuccess");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center py-16 max-w-md mx-auto"
    >
      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-accent" />
      </motion.div>

      <h3 className="text-h3 font-bold font-cairo text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-text-secondary font-cairo mb-8">{subtitle}</p>

      {/* Details card */}
      {details && details.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-xl border border-border bg-surface p-5 mb-8 text-right"
        >
          {details.map((d, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2.5 ${
                i < details.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-text-muted font-cairo">
                {d.label}
              </span>
              <span className="text-sm font-semibold text-text-primary font-cairo">
                {d.value}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="gold" href="/">
          {t("backHome")}
        </Button>
        <Button variant="outline" onClick={onReset}>
          {t("bookAnother")}
        </Button>
      </div>
    </motion.div>
  );
}
