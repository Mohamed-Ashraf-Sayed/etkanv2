"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/about" as const, label: t("about") },
    { href: "/services" as const, label: t("services") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/booking" as const, label: t("booking") },
    { href: "/contact" as const, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
            : "bg-navy/80 backdrop-blur-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white font-cairo">
                {t("brand")}
              </span>
              <span className="hidden sm:inline text-accent text-xs font-cairo opacity-80">
                {t("brandSub")}
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
                      "px-4 py-2 text-sm font-medium font-cairo transition-colors duration-200",
                      isActive
                        ? "text-accent font-semibold"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Language + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <ThemeToggle />
              <div className="hidden lg:block">
                <Button
                  href="/contact"
                  size="sm"
                  variant="gold"
                >
                  {t("cta")}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 text-white/70 hover:text-white transition-colors duration-200"
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
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
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-[280px] bg-navy border-l border-white/10 lg:hidden overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <span className="text-lg font-black tracking-tight text-white font-cairo">
                    {t("brand")}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                    aria-label={t("closeMenu")}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 py-3 overflow-y-auto">
                  {navLinks.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center mx-3 px-4 py-3 rounded-xl text-base font-cairo font-medium transition-colors duration-200",
                            isActive
                              ? "text-accent bg-accent/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-white/10">
                  <Button
                    href="/contact"
                    variant="gold"
                    size="md"
                    className="w-full"
                  >
                    {t("cta")}
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
