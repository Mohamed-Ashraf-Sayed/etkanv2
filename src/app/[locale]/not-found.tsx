"use client";

import { motion } from "framer-motion";
import { Home, ArrowRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-background">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <span className="text-[150px] sm:text-[200px] font-black font-cairo text-transparent bg-clip-text bg-gradient-to-b from-accent/30 to-accent/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold font-cairo text-text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-text-secondary font-cairo text-base mb-8 leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-navy font-bold font-cairo rounded-xl hover:bg-accent-light transition-colors"
          >
            <Home className="w-5 h-5" />
            {t("backHome")}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-surface border border-border text-text-primary font-semibold font-cairo rounded-xl hover:border-accent/50 transition-colors"
          >
            {t("viewServices")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
