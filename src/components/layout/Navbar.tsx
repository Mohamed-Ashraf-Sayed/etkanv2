"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/about" as const, label: t("about") },
    { href: "/services" as const, label: t("services") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/tech-radar" as const, label: t("techRadar") },
    { href: "/booking" as const, label: t("booking") },
    { href: "/contact" as const, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50",
          "transition-all duration-500",
          scrolled
            ? "top-3 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-7xl bg-navy/90 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-2xl"
            : "top-0 w-full bg-navy/50 backdrop-blur-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="text-2xl font-black tracking-tight text-white font-cairo">
                {t("brand")}
              </span>
              <span className="hidden sm:inline text-accent text-xs font-cairo opacity-70">
                {t("brandSub")}
              </span>
            </Link>

            {/* Desktop Nav — pill container */}
            <div className="hidden lg:flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-1.5 rounded-full"
                  >
                    {/* Active pill bg */}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-navy shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-white/[0.06]"
                        layoutId="activePill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 text-[15px] font-semibold font-cairo whitespace-nowrap transition-colors duration-200",
                        isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white/80"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2.5">
              <LocaleSwitcher />
              <ThemeToggle />

              {/* CTA */}
              <Link
                href="/booking"
                className={cn(
                  "hidden lg:inline-flex items-center px-5 py-2.5",
                  "text-[13px] font-bold font-cairo",
                  "bg-white text-navy rounded-full",
                  "hover:bg-accent hover:text-navy",
                  "shadow-sm hover:shadow-[0_2px_12px_rgba(212,175,55,0.3)]",
                  "transition-all duration-300"
                )}
              >
                {t("cta")}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-navy/95 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative flex flex-col h-full pt-[78px]">
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-2 space-y-0.5">
                  {navLinks.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-xl text-[15px] font-cairo font-semibold transition-all duration-200",
                            isActive
                              ? "text-white bg-navy shadow-sm border border-white/[0.06]"
                              : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                className="p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link
                  href="/booking"
                  className="flex items-center justify-center w-full py-3.5 bg-white text-navy font-bold font-cairo text-[15px] rounded-full hover:bg-accent transition-all duration-300"
                >
                  {t("cta")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
