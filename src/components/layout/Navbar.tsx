"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/about", label: "من نحن" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 dark:bg-background/70 backdrop-blur-2xl border-b border-border shadow-card"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="gradient-text text-2xl font-black tracking-tight">
                إتقان
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium font-cairo rounded-full transition-all duration-300",
                      isActive
                        ? "text-primary dark:text-white"
                        : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isActive && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                          layoutId="nav-glow-dot"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 28,
                          }}
                        />
                      )}
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-black/[0.06] dark:bg-white/[0.06]"
                        layoutId="nav-active-bg"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 28,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden lg:block">
                <Button
                  href="/contact"
                  size="sm"
                  variant="primary"
                  className="rounded-full"
                >
                  اطلب استشارة
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-300"
                aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-[280px] bg-white/95 dark:bg-background/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl lg:hidden overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-l from-primary via-accent to-secondary" />

              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-border/30">
                  <div className="flex items-center">
                    <span className="gradient-text text-lg font-black tracking-tight">
                      إتقان
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-300"
                      aria-label="إغلاق القائمة"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Drawer Links */}
                <div className="flex-1 py-3 overflow-y-auto">
                  {navLinks.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 mx-3 px-4 py-3 rounded-xl text-base font-cairo font-medium transition-all duration-300",
                            isActive
                              ? "text-primary dark:text-white bg-primary/8 dark:bg-primary/15 border border-primary/15 dark:border-primary/20"
                              : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                          )}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                          )}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Drawer CTA */}
                <div className="p-4 border-t border-border/30">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full rounded-xl"
                  >
                    اطلب استشارة
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
