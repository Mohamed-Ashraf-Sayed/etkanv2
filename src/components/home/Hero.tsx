"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main dashboard mockup */}
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 480 340"
          fill="none"
          className="w-full h-auto text-primary-light"
        >
          {/* Main window */}
          <rect
            x="30"
            y="10"
            width="420"
            height="280"
            rx="14"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          {/* Title bar */}
          <rect
            x="30"
            y="10"
            width="420"
            height="34"
            rx="14"
            fill="currentColor"
            fillOpacity="0.04"
          />
          <rect
            x="30"
            y="44"
            width="420"
            height="1"
            fill="currentColor"
            fillOpacity="0.08"
          />
          {/* Traffic lights */}
          <circle cx="52" cy="27" r="4.5" fill="#ef4444" fillOpacity="0.45" />
          <circle cx="67" cy="27" r="4.5" fill="#f59e0b" fillOpacity="0.45" />
          <circle cx="82" cy="27" r="4.5" fill="#22c55e" fillOpacity="0.45" />
          {/* URL bar */}
          <rect
            x="110"
            y="20"
            width="220"
            height="14"
            rx="7"
            fill="currentColor"
            fillOpacity="0.04"
          />

          {/* Sidebar */}
          <rect
            x="30"
            y="44"
            width="80"
            height="246"
            fill="currentColor"
            fillOpacity="0.025"
          />
          <line
            x1="110"
            y1="44"
            x2="110"
            y2="290"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
          {/* Sidebar items */}
          <rect
            x="44"
            y="62"
            width="52"
            height="7"
            rx="3"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <rect
            x="44"
            y="80"
            width="42"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="44"
            y="94"
            width="48"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="44"
            y="108"
            width="38"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="44"
            y="122"
            width="45"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />

          {/* Stat cards */}
          <rect
            x="124"
            y="56"
            width="100"
            height="54"
            rx="8"
            fill="currentColor"
            fillOpacity="0.045"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
          <rect
            x="138"
            y="68"
            width="36"
            height="12"
            rx="2"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <rect
            x="138"
            y="86"
            width="58"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />

          <rect
            x="236"
            y="56"
            width="100"
            height="54"
            rx="8"
            fill="currentColor"
            fillOpacity="0.045"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
          <rect
            x="250"
            y="68"
            width="32"
            height="12"
            rx="2"
            fill="#2563eb"
            fillOpacity="0.2"
          />
          <rect
            x="250"
            y="86"
            width="50"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />

          <rect
            x="348"
            y="56"
            width="90"
            height="54"
            rx="8"
            fill="currentColor"
            fillOpacity="0.045"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
          <rect
            x="362"
            y="68"
            width="40"
            height="12"
            rx="2"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <rect
            x="362"
            y="86"
            width="48"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />

          {/* Chart area */}
          <rect
            x="124"
            y="122"
            width="212"
            height="120"
            rx="8"
            fill="currentColor"
            fillOpacity="0.03"
          />
          <rect
            x="138"
            y="134"
            width="70"
            height="7"
            rx="2"
            fill="currentColor"
            fillOpacity="0.08"
          />
          {/* Bar chart */}
          <rect
            x="148"
            y="206"
            width="20"
            height="26"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.2"
          />
          <rect
            x="178"
            y="188"
            width="20"
            height="44"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.28"
          />
          <rect
            x="208"
            y="198"
            width="20"
            height="34"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.22"
          />
          <rect
            x="238"
            y="174"
            width="20"
            height="58"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.35"
          />
          <rect
            x="268"
            y="184"
            width="20"
            height="48"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.25"
          />
          <rect
            x="298"
            y="200"
            width="20"
            height="32"
            rx="3"
            fill="#2563eb"
            fillOpacity="0.18"
          />

          {/* Right panel - activity */}
          <rect
            x="348"
            y="122"
            width="90"
            height="120"
            rx="8"
            fill="currentColor"
            fillOpacity="0.03"
          />
          <rect
            x="358"
            y="134"
            width="50"
            height="7"
            rx="2"
            fill="currentColor"
            fillOpacity="0.08"
          />
          {/* Activity items */}
          <circle
            cx="368"
            cy="158"
            r="5"
            fill="#22c55e"
            fillOpacity="0.15"
            stroke="#22c55e"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <rect
            x="380"
            y="154"
            width="44"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.07"
          />
          <circle
            cx="368"
            cy="176"
            r="5"
            fill="#2563eb"
            fillOpacity="0.15"
            stroke="#2563eb"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <rect
            x="380"
            y="172"
            width="38"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.07"
          />
          <circle
            cx="368"
            cy="194"
            r="5"
            fill="#f59e0b"
            fillOpacity="0.15"
            stroke="#f59e0b"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <rect
            x="380"
            y="190"
            width="42"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.07"
          />
          <circle
            cx="368"
            cy="212"
            r="5"
            fill="#22c55e"
            fillOpacity="0.15"
            stroke="#22c55e"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <rect
            x="380"
            y="208"
            width="36"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.07"
          />
          <circle
            cx="368"
            cy="230"
            r="5"
            fill="#2563eb"
            fillOpacity="0.15"
            stroke="#2563eb"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <rect
            x="380"
            y="226"
            width="40"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.07"
          />

          {/* Bottom row */}
          <rect
            x="124"
            y="254"
            width="314"
            height="28"
            rx="6"
            fill="currentColor"
            fillOpacity="0.025"
          />
          <rect
            x="138"
            y="264"
            width="60"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="220"
            y="264"
            width="45"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="290"
            y="264"
            width="55"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="370"
            y="264"
            width="35"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.06"
          />
        </svg>
      </motion.div>

      {/* Floating code snippet card */}
      <motion.div
        className="absolute -bottom-4 -right-2 sm:right-2"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-44 bg-surface/90 border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <div className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <div className="w-8 h-2 rounded bg-primary/30" />
              <div className="w-12 h-2 rounded bg-accent/20" />
            </div>
            <div className="w-20 h-2 rounded bg-text-muted/10" />
            <div className="flex gap-1.5">
              <div className="w-4 h-2 rounded bg-secondary/25" />
              <div className="w-16 h-2 rounded bg-text-muted/10" />
            </div>
            <div className="w-14 h-2 rounded bg-primary/15" />
          </div>
        </div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        className="absolute -top-2 -left-2 sm:left-2"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="w-40 bg-surface/90 border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-accent/40" />
            </div>
            <div>
              <div className="w-16 h-2.5 rounded bg-text-primary/10 mb-1" />
              <div className="w-10 h-2 rounded bg-text-muted/10" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* === Background Layers === */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(37,99,235,0.15), transparent)",
        }}
      />
      <motion.div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* === Main Content === */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text side (right in RTL) */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Trust badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-text-secondary font-tajawal">
                شريكك التقني الموثوق
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-display font-bold font-cairo gradient-text max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              نبني حلولك التقنية
              <br />
              بإبداع واحترافية
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-body-lg text-text-secondary max-w-2xl font-tajawal mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              شريكك الموثوق في التحول الرقمي. نقدم حلول تقنية متكاملة من تطوير
              البرمجيات إلى تجهيز البنية التحتية بأعلى معايير الجودة.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button variant="primary" size="lg" href="/contact">
                اطلب استشارة مجانية
              </Button>
              <Button variant="outline" size="lg" href="/portfolio">
                شاهد أعمالنا
              </Button>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              className="mt-8 flex items-center gap-2 text-sm text-text-muted font-tajawal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>موثوق من +50 شركة في مصر والسعودية</span>
            </motion.div>
          </motion.div>

          {/* Illustration side (left in RTL) */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
