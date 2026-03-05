"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Search,
  Eye,
  Layers,
  Code2,
  Globe,
  Server,
  Wrench,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getTechRadarData } from "@/lib/data";
import type { TechRadarItem, TechRadarQuadrant, TechRadarRing } from "@/data/tech-radar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const QUADRANT_ICONS = {
  languages: Code2,
  cms: Globe,
  infrastructure: Server,
  tools: Wrench,
};

const RING_ICONS = {
  adopt: CheckCircle2,
  trial: FlaskConical,
  assess: Search,
  hold: Eye,
};

const RING_COLORS: Record<string, string> = {
  adopt: "#10B981",
  trial: "#3B82F6",
  assess: "#F59E0B",
  hold: "#6B7280",
};

// Stable positions for blips within each quadrant+ring
function getBlipPosition(
  item: TechRadarItem,
  quadrantIndex: number,
  ringIndex: number,
  indexInGroup: number,
  totalInGroup: number,
  size: number,
) {
  const center = size / 2;
  const maxRadius = (size / 2) * 0.92;

  const ringBands = [
    [0.06, 0.26],
    [0.28, 0.48],
    [0.50, 0.70],
    [0.72, 0.90],
  ];

  const [minR, maxR] = ringBands[ringIndex];

  const quadrantAngles = [
    [-Math.PI / 2, 0],
    [-Math.PI, -Math.PI / 2],
    [Math.PI / 2, Math.PI],
    [0, Math.PI / 2],
  ];

  const [startAngle, endAngle] = quadrantAngles[quadrantIndex];
  const anglePadding = 0.18;
  const adjustedStart = startAngle + anglePadding;
  const adjustedEnd = endAngle - anglePadding;

  const seed = item.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const pr1 = ((seed * 9301 + 49297) % 233280) / 233280;
  const pr2 = ((seed * 7621 + 31337) % 199999) / 199999;

  const angleStep = (adjustedEnd - adjustedStart) / (totalInGroup + 1);
  const angle =
    adjustedStart + angleStep * (indexInGroup + 1) + (pr1 - 0.5) * angleStep * 0.35;

  const radiusFraction = minR + (maxR - minR) * (0.25 + pr2 * 0.55);
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
}) {
  const size = 700;
  const center = size / 2;
  const maxRadius = (size / 2) * 0.92;
  const ringRadii = [0.26, 0.48, 0.70, 0.90].map((r) => r * maxRadius);

  const groupedItems = useMemo(() => {
    const groups: Record<string, TechRadarItem[]> = {};
    items.forEach((item) => {
      const key = `${item.quadrant}-${item.ring}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [items]);

  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const qIds = quadrants.map((q) => q.id);
    const rIds = rings.map((r) => r.id);
    items.forEach((item) => {
      const qi = qIds.indexOf(item.quadrant);
      const ri = rIds.indexOf(item.ring);
      const key = `${item.quadrant}-${item.ring}`;
      const group = groupedItems[key] || [];
      pos[item.id] = getBlipPosition(item, qi, ri, group.indexOf(item), group.length, size);
    });
    return pos;
  }, [items, quadrants, rings, groupedItems]);

  return (
    <svg viewBox={`-30 -30 ${size + 60} ${size + 60}`} className="w-full mx-auto" style={{ direction: "ltr" }}>
      <defs>
        {/* Quadrant gradients */}
        {quadrants.map((q, i) => (
          <radialGradient key={q.id} id={`grad-${q.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={q.color} stopOpacity={0.12} />
            <stop offset="100%" stopColor={q.color} stopOpacity={0.02} />
          </radialGradient>
        ))}
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft shadow */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer background circle */}
      <circle cx={center} cy={center} r={maxRadius + 8} fill="none" stroke="white" strokeOpacity={0.03} strokeWidth={16} />

      {/* Quadrant fills */}
      {quadrants.map((q, qi) => {
        const startAngle = [-90, -180, 90, 0][qi];
        const isActive = !activeQuadrant || activeQuadrant === q.id;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = ((startAngle + 90) * Math.PI) / 180;
        const r = maxRadius;
        const x1 = center + r * Math.cos(startRad);
        const y1 = center + r * Math.sin(startRad);
        const x2 = center + r * Math.cos(endRad);
        const y2 = center + r * Math.sin(endRad);
        return (
          <path
            key={q.id}
            d={`M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={`url(#grad-${q.id})`}
            fillOpacity={isActive ? 1 : 0.2}
            className="transition-all duration-500"
          />
        );
      })}

      {/* Ring circles - dashed style */}
      {ringRadii.map((r, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity={0.08}
          strokeWidth={1}
          strokeDasharray={i === 0 ? "none" : "6 4"}
        />
      ))}

      {/* Center dot */}
      <circle cx={center} cy={center} r={4} fill="white" fillOpacity={0.15} />
      <circle cx={center} cy={center} r={2} fill="white" fillOpacity={0.3} />

      {/* Axis lines */}
      <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="white" strokeOpacity={0.06} strokeWidth={1} />
      <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="white" strokeOpacity={0.06} strokeWidth={1} />

      {/* Ring labels along the top-right axis */}
      {rings.map((ring, i) => {
        const r = i === 0 ? ringRadii[0] * 0.55 : (ringRadii[i - 1] + ringRadii[i]) / 2;
        return (
          <g key={ring.id}>
            <text
              x={center}
              y={center - r}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fillOpacity={0.2}
              className="text-[9px] font-semibold uppercase tracking-wider"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {ring.name}
            </text>
          </g>
        );
      })}

      {/* Quadrant labels */}
      {quadrants.map((q, i) => {
        const positions = [
          { x: center + maxRadius * 0.52, y: center - maxRadius - 16 },
          { x: center - maxRadius * 0.52, y: center - maxRadius - 16 },
          { x: center - maxRadius * 0.52, y: center + maxRadius + 18 },
          { x: center + maxRadius * 0.52, y: center + maxRadius + 18 },
        ];
        const pos = positions[i];
        const isActive = !activeQuadrant || activeQuadrant === q.id;
        return (
          <text
            key={q.id}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={q.color}
            fillOpacity={isActive ? 1 : 0.25}
            className="text-[13px] font-bold transition-all duration-300"
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
        const color = quadrants[qi].color;
        const isSelected = selectedItem?.id === item.id;
        const isHovered = hoveredItem === item.id;
        const isQuadrantActive = !activeQuadrant || activeQuadrant === item.quadrant;
        const isHighlighted = isSelected || isHovered;
        const baseSize = 6.5;
        const blipSize = isHighlighted ? 9 : baseSize;

        return (
          <g
            key={item.id}
            className="cursor-pointer"
            onClick={() => onItemClick(item)}
            onMouseEnter={() => onItemHover(item.id)}
            onMouseLeave={onItemLeave}
            style={{
              opacity: isQuadrantActive ? 1 : 0.1,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Pulse ring on selected */}
            {isSelected && (
              <>
                <circle cx={pos.x} cy={pos.y} r={22} fill="none" stroke={color} strokeOpacity={0.3} strokeWidth={1.5}>
                  <animate attributeName="r" from="14" to="24" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Glow */}
            {isHighlighted && (
              <circle cx={pos.x} cy={pos.y} r={16} fill={color} fillOpacity={0.2} filter="url(#glow)" />
            )}

            {/* Blip */}
            {item.isNew ? (
              <polygon
                points={`${pos.x},${pos.y - blipSize} ${pos.x - blipSize * 0.87},${pos.y + blipSize * 0.5} ${pos.x + blipSize * 0.87},${pos.y + blipSize * 0.5}`}
                fill={color}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                filter={isHighlighted ? "url(#shadow)" : undefined}
                className="transition-all duration-200"
              />
            ) : (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={blipSize}
                fill={color}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                filter={isHighlighted ? "url(#shadow)" : undefined}
                className="transition-all duration-200"
              />
            )}

            {/* Tooltip */}
            {isHighlighted && (
              <g>
                <rect
                  x={pos.x - item.name.length * 3.5 - 10}
                  y={pos.y - 32}
                  width={item.name.length * 7 + 20}
                  height={22}
                  rx={6}
                  fill="rgba(0,0,0,0.85)"
                />
                {/* Tooltip arrow */}
                <polygon
                  points={`${pos.x - 4},${pos.y - 10} ${pos.x + 4},${pos.y - 10} ${pos.x},${pos.y - 5}`}
                  fill="rgba(0,0,0,0.85)"
                />
                <text
                  x={pos.x}
                  y={pos.y - 19}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  className="text-[11px] font-semibold"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {item.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// --- Mobile Quadrant Card ---
function QuadrantSection({
  quadrant,
  items,
  rings,
  selectedItem,
  onItemClick,
  t,
}: {
  quadrant: TechRadarQuadrant;
  items: TechRadarItem[];
  rings: TechRadarRing[];
  selectedItem: TechRadarItem | null;
  onItemClick: (item: TechRadarItem) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = QUADRANT_ICONS[quadrant.id as keyof typeof QUADRANT_ICONS] || Code2;

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
    >
      {/* Quadrant header */}
      <div
        className="px-5 py-4 flex items-center gap-3 border-b border-[var(--color-border)]"
        style={{ background: `linear-gradient(135deg, ${quadrant.color}08, ${quadrant.color}15)` }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${quadrant.color}20` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: quadrant.color }} />
        </div>
        <div>
          <h3 className="font-bold font-cairo text-[var(--color-text-primary)]" style={{ color: quadrant.color }}>
            {quadrant.name}
          </h3>
          <span className="text-xs text-[var(--color-text-muted)]">
            {items.length} {t("techCount")}
          </span>
        </div>
      </div>

      {/* Items grouped by ring */}
      <div className="p-4 space-y-4">
        {rings.map((ring) => {
          const ringItems = items.filter((i) => i.ring === ring.id);
          if (ringItems.length === 0) return null;
          const RingIcon = RING_ICONS[ring.id as keyof typeof RING_ICONS] || CheckCircle2;
          const ringColor = RING_COLORS[ring.id] || "#6B7280";

          return (
            <div key={ring.id}>
              <div className="flex items-center gap-2 mb-2">
                <RingIcon className="w-3.5 h-3.5" style={{ color: ringColor }} />
                <span className="text-xs font-semibold font-cairo" style={{ color: ringColor }}>
                  {ring.name}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {ringItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-cairo transition-all duration-200 ${
                      selectedItem?.id === item.id
                        ? "ring-2 shadow-sm"
                        : "hover:shadow-sm"
                    }`}
                    style={{
                      backgroundColor: selectedItem?.id === item.id ? `${quadrant.color}15` : `${quadrant.color}08`,
                      borderColor: selectedItem?.id === item.id ? quadrant.color : "transparent",
                      outlineColor: quadrant.color,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: quadrant.color }} />
                    <span className="text-[var(--color-text-primary)] font-medium">{item.name}</span>
                    {item.isNew && (
                      <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
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
  const QuadIcon = QUADRANT_ICONS[quadrant.id as keyof typeof QUADRANT_ICONS] || Code2;
  const RingIcon = RING_ICONS[ring.id as keyof typeof RING_ICONS] || CheckCircle2;
  const ringColor = RING_COLORS[ring.id] || "#6B7280";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]"
    >
      {/* Colored header */}
      <div
        className="px-5 py-4 relative"
        style={{ background: `linear-gradient(135deg, ${quadrant.color}15, ${quadrant.color}25)` }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 end-3 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-[var(--color-text-muted)]" />
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${quadrant.color}25` }}
          >
            <QuadIcon className="w-5 h-5" style={{ color: quadrant.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-cairo text-[var(--color-text-primary)]">
                {item.name}
              </h3>
              {item.isNew && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t("new")}
                </span>
              )}
            </div>
            <span className="text-xs font-cairo" style={{ color: quadrant.color }}>
              {quadrant.name}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        <p className="text-sm text-[var(--color-text-secondary)] font-cairo leading-relaxed">
          {item.description}
        </p>

        {/* Ring indicator */}
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm"
          style={{ backgroundColor: `${ringColor}10` }}
        >
          <RingIcon className="w-4 h-4 shrink-0" style={{ color: ringColor }} />
          <div>
            <span className="font-semibold font-cairo" style={{ color: ringColor }}>
              {ring.name}
            </span>
            <p className="text-xs text-[var(--color-text-muted)] font-cairo mt-0.5 leading-relaxed">
              {ring.description}
            </p>
          </div>
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

  const totalItems = items.length;
  const adoptedCount = items.filter((i) => i.ring === "adopt").length;
  const newCount = items.filter((i) => i.isNew).length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden section-navy">
        <div className="absolute inset-0">
          <div className="absolute top-20 start-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 end-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
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
            <motion.h1
              variants={fadeUp}
              className="text-h1 font-bold font-cairo text-white mb-4"
            >
              {t("title")}
            </motion.h1>
            <motion.div variants={fadeUp} className="gold-line mb-6" />
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/60 font-cairo max-w-2xl leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* Mini stats in hero */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-8">
              {[
                { value: totalItems, label: t("statsTechnologies") },
                { value: adoptedCount, label: t("statsAdopted") },
                { value: newCount, label: t("statsNew") },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[var(--color-accent)] font-cairo">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40 font-cairo">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Radar Section - Dark background for better contrast */}
      <section className="relative py-16 bg-gradient-to-b from-[var(--color-navy)] via-[#0d2347] to-[var(--color-navy)]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <Container className="relative z-10">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <button
              onClick={() => setActiveQuadrant(null)}
              className={`px-5 py-2.5 rounded-xl text-sm font-cairo font-semibold transition-all duration-300 ${
                !activeQuadrant
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10"
              }`}
            >
              {t("filterAll")}
            </button>
            {quadrants.map((q) => {
              const Icon = QUADRANT_ICONS[q.id as keyof typeof QUADRANT_ICONS] || Code2;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuadrant(activeQuadrant === q.id ? null : q.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-cairo font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeQuadrant === q.id
                      ? "text-white shadow-lg"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10"
                  }`}
                  style={
                    activeQuadrant === q.id
                      ? { backgroundColor: q.color, boxShadow: `0 8px 24px ${q.color}40` }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4" />
                  {q.name}
                </button>
              );
            })}
          </motion.div>

          {/* Desktop: SVG Radar | Mobile: Cards */}
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Radar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="flex-1 w-full"
            >
              {/* Desktop Radar */}
              <div className="hidden lg:block max-w-[620px] mx-auto">
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
                />
                <p className="text-center text-xs text-white/25 font-cairo mt-4">
                  {t("clickToExplore")}
                </p>
              </div>

              {/* Mobile Cards */}
              <motion.div
                className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {(activeQuadrant
                  ? quadrants.filter((q) => q.id === activeQuadrant)
                  : quadrants
                ).map((q) => (
                  <QuadrantSection
                    key={q.id}
                    quadrant={q}
                    items={items.filter((i) => i.quadrant === q.id)}
                    rings={rings}
                    selectedItem={selectedItem}
                    onItemClick={handleItemClick}
                    t={t}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Detail Panel */}
            <div className="w-full xl:w-[340px] xl:sticky xl:top-24 shrink-0">
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
                    className="hidden xl:flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                      <Radar className="w-7 h-7 text-white/15" />
                    </div>
                    <p className="text-sm text-white/20 font-cairo leading-relaxed">
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

      {/* Ring Descriptions */}
      <section className="relative section-padding">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {rings.map((ring) => {
              const RingIcon = RING_ICONS[ring.id as keyof typeof RING_ICONS] || CheckCircle2;
              const ringColor = RING_COLORS[ring.id] || "#6B7280";
              const count = items.filter((i) => i.ring === ring.id).length;

              return (
                <motion.div
                  key={ring.id}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 inset-x-0 h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: ringColor }}
                  />

                  <div className="flex items-start gap-3 mb-3 mt-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${ringColor}12` }}
                    >
                      <RingIcon className="w-5 h-5" style={{ color: ringColor }} />
                    </div>
                    <div>
                      <h3 className="font-bold font-cairo text-[var(--color-text-primary)]">
                        {ring.name}
                      </h3>
                      <span className="text-xs font-cairo" style={{ color: ringColor }}>
                        {count} {t("techCount")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] font-cairo leading-relaxed">
                    {ring.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      <div className="section-divider" />

      {/* CTA Section */}
      <section className="relative section-padding section-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                <Layers className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-h2 font-bold font-cairo text-white mb-4"
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 font-cairo mb-8 leading-relaxed"
            >
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
