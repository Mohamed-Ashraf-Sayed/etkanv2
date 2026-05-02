"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type VerticalTabItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs({
  items,
  heading,
  subheading,
}: {
  items: VerticalTabItem[];
  heading?: string;
  subheading?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Content */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
          {(heading || subheading) && (
            <div className="space-y-1 mb-12">
              {heading && (
                <h2 className="tracking-tight text-balance text-h2 font-bold font-cairo text-text-primary">
                  {heading}
                </h2>
              )}
              {subheading && (
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.3em] block font-cairo">
                  {subheading}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-0">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "group relative flex items-start gap-4 py-6 md:py-8 text-start transition-all duration-500 border-t border-border first:border-0",
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  <div className="absolute start-[-16px] md:start-[-24px] top-0 bottom-0 w-[2px] bg-border/50">
                    {isActive && (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className="absolute top-0 start-0 w-full bg-accent rounded-full origin-top"
                        initial={{ height: "0%" }}
                        animate={
                          isPaused ? { height: "0%" } : { height: "100%" }
                        }
                        transition={{
                          duration: AUTO_PLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>

                  <span className="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50 font-cairo">
                    /{item.id}
                  </span>

                  <div className="flex flex-col gap-2 flex-1">
                    <span
                      className={cn(
                        "text-lg md:text-xl font-bold font-cairo tracking-tight transition-colors duration-500",
                        isActive ? "text-text-primary" : ""
                      )}
                    >
                      {item.title}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-text-secondary text-sm md:text-base font-cairo leading-relaxed max-w-sm pb-2">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
          <div
            className="relative group/gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-border/50 shadow-xl shadow-navy/10">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 260, damping: 32 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={handleNext}
                >
                  <img
                    src={items[activeIndex].image}
                    alt={items[activeIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 block"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/10" />
                  <div className="absolute inset-0 bg-accent/[0.03]" />

                  {/* Title on image */}
                  <div className="absolute bottom-6 start-6 end-6 md:bottom-8 md:start-8 z-10">
                    <span className="text-xs font-cairo font-semibold text-accent/80 uppercase tracking-widest">
                      /{items[activeIndex].id}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-cairo text-white mt-1">
                      {items[activeIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <div className="absolute top-6 end-6 md:top-8 md:end-8 flex gap-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
                  aria-label="Previous"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
                  aria-label="Next"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
