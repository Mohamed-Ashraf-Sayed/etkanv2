"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ className, children, hover = false }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl glass-card p-6",
        hover && "cursor-pointer",
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: "var(--shadow-card-hover)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
