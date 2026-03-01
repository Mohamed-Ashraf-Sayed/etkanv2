"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only show on desktop (no touch)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']");
      setHovering(!!isInteractive);
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    // Smooth ring follow
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  return (
    <>
      {/* Dot (instant) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "#D4AF37",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Ring (follows with delay) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          marginLeft: hovering ? -24 : -16,
          marginTop: hovering ? -24 : -16,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "#D4AF37" : "rgba(212, 175, 55, 0.4)"}`,
          backgroundColor: clicking
            ? "rgba(212, 175, 55, 0.1)"
            : "transparent",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.3s ease, height 0.3s ease, margin 0.3s ease, border-color 0.3s ease, opacity 0.2s, background-color 0.2s",
        }}
      />
    </>
  );
}
