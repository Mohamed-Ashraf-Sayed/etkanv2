"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, Sparkles, X, Triangle, Circle, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getTechRadarData } from "@/lib/data";
import type { TechRadarItem, TechRadarQuadrant, TechRadarRing } from "@/data/tech-radar";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Stable positions for blips within each quadrant+ring
// Each quadrant occupies 90 degrees, each ring has a band
function getBlipPosition(
  item: TechRadarItem,
  quadrantIndex: number,
  ringIndex: number,
  indexInGroup: number,
  totalInGroup: number,
  size: number,
) {
  const center = size / 2;
  const maxRadius = (size / 2) * 0.88;

  // Ring radii bands (inner edge to outer edge)
  const ringBands = [
    [0.08, 0.28], // adopt (innermost)
    [0.30, 0.50], // trial
    [0.52, 0.72], // assess
    [0.74, 0.92], // hold (outermost)
  ];

  const [minR, maxR] = ringBands[ringIndex];

  // Quadrant angles (in radians) - top-right, top-left, bottom-left, bottom-right
  const quadrantAngles = [
    [-Math.PI / 2, 0],        // Q0: top-right (270° to 360°)
    [-Math.PI, -Math.PI / 2], // Q1: top-left (180° to 270°)
    [Math.PI / 2, Math.PI],   // Q2: bottom-left (90° to 180°)
    [0, Math.PI / 2],         // Q3: bottom-right (0° to 90°)
  ];

  const [startAngle, endAngle] = quadrantAngles[quadrantIndex];
  const anglePadding = 0.15; // padding from quadrant edges
  const adjustedStart = startAngle + anglePadding;
  const adjustedEnd = endAngle - anglePadding;

  // Use a seeded pseudo-random based on item id for consistent positions
  const seed = item.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280;
  const pseudoRandom2 = ((seed * 7621 + 31337) % 199999) / 199999;

  // Distribute items evenly across the angle range, with slight random offset
  const angleStep = (adjustedEnd - adjustedStart) / (totalInGroup + 1);
  const angle = adjustedStart + angleStep * (indexInGroup + 1) + (pseudoRandom1 - 0.5) * angleStep * 0.4;

  // Radius within the ring band with some randomness
  const radiusFraction = minR + (maxR - minR) * (0.3 + pseudoRandom2 * 0.5);
  const radius = radiusFraction * maxRadius;

  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
}

// --- Radar SVG Component ---
function RadarSVG({
  items,
  quadrants,
  rings,
  selectedItem,
  hoveredItem,
  activeQuadrant,
  onItemClick,
  onItemHover,
  onItemLeave,
  isRTL,
}: {
  items: TechRadarItem[];
  quadrants: TechRadarQuadrant[];
  rings: TechRadarRing[];
  selectedItem: TechRadarItem | null;
  hoveredItem: string | null;
  activeQuadrant: string | null;
  onItemClick: (item: TechRadarItem) => void;
  onItemHover: (id: string) => void;
  onItemLeave: () => void;
  isRTL: boolean;
}) {
  const size = 700;
  const center = size / 2;
  const maxRadius = (size / 2) * 0.88;

  const ringRadii = [0.28, 0.50, 0.72, 0.92].map((r) => r * maxRadius);

  // Group items by quadrant+ring
  const groupedItems = useMemo(() => {
    const groups: Record<string, TechRadarItem[]> = {};
    items.forEach((item) => {
      const key = `${item.quadrant}-${item.ring}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [items]);

  // Calculate positions
  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const quadrantIds = quadrants.map((q) => q.id);
    const ringIds = rings.map((r) => r.id);

    items.forEach((item) => {
      const qi = quadrantIds.indexOf(item.quadrant);
      const ri = ringIds.indexOf(item.ring);
      const groupKey = `${item.quadrant}-${item.ring}`;
      const group = groupedItems[groupKey] || [];
      const indexInGroup = group.indexOf(item);
      pos[item.id] = getBlipPosition(item, qi, ri, indexInGroup, group.length, size);
    });
    return pos;
  }, [items, quadrants, rings, groupedItems]);

  const quadrantColors = quadrants.map((q) => q.color);

  // Quadrant label positions
  const labelPositions = [
    { x: center + maxRadius * 0.55, y: center - maxRadius * 0.95 },  // top-right
    { x: center - maxRadius * 0.55, y: center - maxRadius * 0.95 },  // top-left
    { x: center - maxRadius * 0.55, y: center + maxRadius * 1.02 },  // bottom-left
    { x: center + maxRadius * 0.55, y: center + maxRadius * 1.02 },  // bottom-right
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size + 30}`}
      className="w-full max-w-[650px] mx-auto"
      style={{ direction: "ltr" }}
    >
      {/* Background rings */}
      {ringRadii.map((r, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      ))}

      {/* Filled ring bands with quadrant colors */}
      {quadrants.map((q, qi) => {
        const startAngle = [-90, -180, 90, 0][qi];
        const isActive = !activeQuadrant || activeQuadrant === q.id;
        return ringRadii.map((r, ri) => {
          const innerR = ri === 0 ? 0 : ringRadii[ri - 1];
          const outerR = r;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + 90) * Math.PI) / 180;

          const x1Outer = center + outerR * Math.cos(startRad);
          const y1Outer = center + outerR * Math.sin(startRad);
          const x2Outer = center + outerR * Math.cos(endRad);
          const y2Outer = center + outerR * Math.sin(endRad);
          const x1Inner = center + innerR * Math.cos(endRad);
          const y1Inner = center + innerR * Math.sin(endRad);
          const x2Inner = center + innerR * Math.cos(startRad);
          const y2Inner = center + innerR * Math.sin(startRad);

          const d =
            ri === 0
              ? `M ${center} ${center} L ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 0 1 ${x2Outer} ${y2Outer} Z`
              : `M ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 0 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${innerR} ${innerR} 0 0 0 ${x2Inner} ${y2Inner} Z`;

          return (
            <path
              key={`${qi}-${ri}`}
              d={d}
              fill={q.color}
              fillOpacity={isActive ? 0.06 + ri * 0.02 : 0.02}
              stroke={q.color}
              strokeOpacity={isActive ? 0.15 : 0.05}
              strokeWidth={0.5}
              className="transition-all duration-300"
            />
          );
        });
      })}

      {/* Quadrant divider lines */}
      <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
      <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />

      {/* Ring labels */}
      {rings.map((ring, i) => {
        const r = i === 0 ? ringRadii[0] / 2 : (ringRadii[i - 1] + ringRadii[i]) / 2;
        return (
          <text
            key={ring.id}
            x={center + r * Math.cos(-Math.PI / 4)}
            y={center + r * Math.sin(-Math.PI / 4)}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current opacity-25 text-[10px] font-medium"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {ring.name}
          </text>
        );
      })}

      {/* Quadrant labels */}
      {quadrants.map((q, i) => {
        const pos = labelPositions[i];
        const isActive = !activeQuadrant || activeQuadrant === q.id;
        return (
          <text
            key={q.id}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={q.color}
            fillOpacity={isActive ? 0.9 : 0.3}
            className="text-[12px] font-bold transition-all duration-300"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {q.name}
          </text>
        );
      })}

      {/* Blips */}
      {items.map((item) => {
        const pos = positions[item.id];
        if (!pos) return null;
        const qi = quadrants.findIndex((q) => q.id === item.quadrant);
        const color = quadrantColors[qi];
        const isSelected = selectedItem?.id === item.id;
        const isHovered = hoveredItem === item.id;
        const isQuadrantActive = !activeQuadrant || activeQuadrant === item.quadrant;
        const isHighlighted = isSelected || isHovered;
        const blipSize = isHighlighted ? 10 : 7;

        return (
          <g
            key={item.id}
            className="cursor-pointer"
            onClick={() => onItemClick(item)}
            onMouseEnter={() => onItemHover(item.id)}
            onMouseLeave={onItemLeave}
            style={{ opacity: isQuadrantActive ? 1 : 0.15, transition: "opacity 0.3s" }}
          >
            {/* Glow effect */}
            {isHighlighted && (
              <circle cx={pos.x} cy={pos.y} r={18} fill={color} fillOpacity={0.15} />
            )}

            {/* Blip shape */}
            {item.isNew ? (
              // Triangle for new items
              <polygon
                points={`${pos.x},${pos.y - blipSize} ${pos.x - blipSize * 0.87},${pos.y + blipSize * 0.5} ${pos.x + blipSize * 0.87},${pos.y + blipSize * 0.5}`}
                fill={color}
                stroke="white"
                strokeWidth={isHighlighted ? 2 : 1.5}
                className="transition-all duration-200"
              />
            ) : (
              // Circle for existing items
              <circle
                cx={pos.x}
                cy={pos.y}
                r={blipSize}
                fill={color}
                stroke="white"
                strokeWidth={isHighlighted ? 2 : 1.5}
                className="transition-all duration-200"
              />
            )}

            {/* Label on hover */}
            {isHighlighted && (
              <>
                <rect
                  x={pos.x - item.name.length * 3.5 - 6}
                  y={pos.y - 28}
                  width={item.name.length * 7 + 12}
                  height={20}
                  rx={4}
                  fill="var(--color-navy, #0B1F3F)"
                  fillOpacity={0.9}
                />
                <text
                  x={pos.x}
                  y={pos.y - 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  className="text-[11px] font-medium"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {item.name}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// --- Mobile Card View ---
function MobileCardView({
  items,
  quadrants,
  rings,
  selectedItem,
  activeQuadrant,
  onItemClick,
  t,
}: {
  items: TechRadarItem[];
  quadrants: TechRadarQuadrant[];
  rings: TechRadarRing[];
  selectedItem: TechRadarItem | null;
  activeQuadrant: string | null;
  onItemClick: (item: TechRadarItem) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const filteredQuadrants = activeQuadrant
    ? quadrants.filter((q) => q.id === activeQuadrant)
    : quadrants;

  return (
    <div className="space-y-8">
      {filteredQuadrants.map((quadrant) => {
        const quadrantItems = items.filter((i) => i.quadrant === quadrant.id);
        if (quadrantItems.length === 0) return null;

        return (
          <motion.div key={quadrant.id} variants={fadeUp}>
            <h3
              className="text-lg font-bold font-cairo mb-4 flex items-center gap-2"
              style={{ color: quadrant.color }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: quadrant.color }}
              />
              {quadrant.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rings.map((ring) => {
                const ringItems = quadrantItems.filter((i) => i.ring === ring.id);
                if (ringItems.length === 0) return null;

                return ringItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className={`text-start p-4 rounded-xl border transition-all duration-200 ${
                      selectedItem?.id === item.id
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-md"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-light)] hover:shadow-sm bg-[var(--color-surface)]"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: quadrant.color }}
                      />
                      <span className="font-semibold font-cairo text-[var(--color-text-primary)]">
                        {item.name}
                      </span>
                      {item.isNew && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">
                          {t("new")}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 ms-5">
                      <span className="text-xs text-[var(--color-text-muted)]">{ring.name}</span>
                    </div>
                  </motion.button>
                ));
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Detail Panel ---
function DetailPanel({
  item,
  quadrant,
  ring,
  onClose,
  t,
}: {
  item: TechRadarItem;
  quadrant: TechRadarQuadrant;
  ring: TechRadarRing;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full shrink-0"
            style={{ backgroundColor: quadrant.color }}
          />
          <h3 className="text-xl font-bold font-cairo text-[var(--color-text-primary)]">
            {item.name}
          </h3>
          {item.isNew && (
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t("new")}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[var(--color-background)] transition-colors text-[var(--color-text-muted)]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[var(--color-text-secondary)] font-cairo leading-relaxed mb-4">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-background)] text-sm">
          <span className="text-[var(--color-text-muted)] font-cairo">{t("detailQuadrant")}:</span>
          <span className="font-semibold font-cairo" style={{ color: quadrant.color }}>
            {quadrant.name}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-background)] text-sm">
          <span className="text-[var(--color-text-muted)] font-cairo">{t("detailRing")}:</span>
          <span className="font-semibold font-cairo text-[var(--color-text-primary)]">
            {ring.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function TechRadarClient() {
  const t = useTranslations("techRadar");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { quadrants, rings, items } = getTechRadarData(locale);

  const [selectedItem, setSelectedItem] = useState<TechRadarItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  const handleItemClick = useCallback((item: TechRadarItem) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  }, []);

  const selectedQuadrant = selectedItem
    ? quadrants.find((q) => q.id === selectedItem.quadrant)
    : null;
  const selectedRing = selectedItem
    ? rings.find((r) => r.id === selectedItem.ring)
    : null;

  // Stats
  const totalItems = items.length;
  const adoptedCount = items.filter((i) => i.ring === "adopt").length;
  const newCount = items.filter((i) => i.isNew).length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden section-navy">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 start-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 end-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: t("title") }]} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <div className="mb-6">
                <Badge variant="gold">
                  <Radar className="w-4 h-4 inline-block me-1.5 -mt-0.5" />
                  {t("badge")}
                </Badge>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-h1 font-bold font-cairo text-white mb-4">
              {t("title")}
            </motion.h1>
            <motion.div variants={fadeUp} className="gold-line mb-6" />
            <motion.p variants={fadeUp} className="text-lg text-white/70 font-cairo max-w-2xl">
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Radar Section */}
      <section className="relative section-padding">
        <Container>
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <button
              onClick={() => setActiveQuadrant(null)}
              className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                !activeQuadrant
                  ? "bg-[var(--color-accent)] text-white shadow-md"
                  : "bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {t("filterAll")}
            </button>
            {quadrants.map((q) => (
              <button
                key={q.id}
                onClick={() => setActiveQuadrant(activeQuadrant === q.id ? null : q.id)}
                className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeQuadrant === q.id
                    ? "text-white shadow-md"
                    : "bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
                }`}
                style={
                  activeQuadrant === q.id
                    ? { backgroundColor: q.color }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: q.color }}
                />
                {q.name}
              </button>
            ))}
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-[var(--color-text-muted)]"
          >
            <div className="flex items-center gap-2 font-cairo">
              <Circle className="w-3 h-3 fill-current" />
              <span>{rings.find((r) => r.id === "adopt")?.name}</span>
            </div>
            <div className="flex items-center gap-2 font-cairo">
              <Triangle className="w-3 h-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span>{t("new")}</span>
            </div>
            {rings.map((ring) => (
              <div key={ring.id} className="flex items-center gap-2 font-cairo">
                <span className="w-3 h-0.5 bg-current rounded-full opacity-40" />
                <span>{ring.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Desktop: SVG Radar | Mobile: Card Grid */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Radar / Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full"
            >
              {/* Desktop Radar */}
              <div className="hidden lg:block">
                <RadarSVG
                  items={items}
                  quadrants={quadrants}
                  rings={rings}
                  selectedItem={selectedItem}
                  hoveredItem={hoveredItem}
                  activeQuadrant={activeQuadrant}
                  onItemClick={handleItemClick}
                  onItemHover={setHoveredItem}
                  onItemLeave={() => setHoveredItem(null)}
                  isRTL={isRTL}
                />
                <p className="text-center text-sm text-[var(--color-text-muted)] font-cairo mt-4">
                  {t("clickToExplore")}
                </p>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                <MobileCardView
                  items={items}
                  quadrants={quadrants}
                  rings={rings}
                  selectedItem={selectedItem}
                  activeQuadrant={activeQuadrant}
                  onItemClick={handleItemClick}
                  t={t}
                />
              </div>
            </motion.div>

            {/* Detail Panel */}
            <div className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
              <AnimatePresence mode="wait">
                {selectedItem && selectedQuadrant && selectedRing ? (
                  <DetailPanel
                    key={selectedItem.id}
                    item={selectedItem}
                    quadrant={selectedQuadrant}
                    ring={selectedRing}
                    onClose={() => setSelectedItem(null)}
                    t={t}
                  />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden lg:block bg-[var(--color-surface)] rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center"
                  >
                    <Radar className="w-10 h-10 mx-auto mb-3 text-[var(--color-text-muted)] opacity-30" />
                    <p className="text-sm text-[var(--color-text-muted)] font-cairo">
                      {t("clickToExplore")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* Stats Section */}
      <section className="relative section-padding bg-[var(--color-background)]">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: totalItems, label: t("statsTechnologies"), color: "var(--color-accent)" },
              { value: adoptedCount, label: t("statsAdopted"), color: "#3B82F6" },
              { value: newCount, label: t("statsNew"), color: "#10B981" },
              { value: 4, label: t("statsQuadrants"), color: "#8B5CF6" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[var(--color-surface)] rounded-2xl p-6 text-center border border-[var(--color-border)] hover:shadow-md transition-shadow"
              >
                <div
                  className="text-3xl md:text-4xl font-bold font-cairo mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] font-cairo">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* CTA Section */}
      <section className="relative section-padding section-navy">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 end-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-h2 font-bold font-cairo text-white mb-4">
              {t("ctaTitle")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 font-cairo mb-8">
              {t("ctaSub")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Button href="/booking" variant="gold" className="gap-2">
                {t("ctaButton")}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/contact" variant="outline-light">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
