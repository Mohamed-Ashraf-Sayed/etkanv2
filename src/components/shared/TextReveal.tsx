"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** "words" splits by spaces, "lines" animates as one block */
  mode?: "words" | "lines";
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  mode = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (mode === "lines") {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{
            duration: 0.7,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Tag className={className}>{children}</Tag>
        </motion.div>
      </div>
    );
  }

  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: 0, opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
