"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background: central radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12), transparent)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main heading */}
          <h2 className="text-h2 font-bold font-cairo mb-6">
            <span className="text-text-primary">جاهز تبدأ </span>
            <span className="gradient-text">مشروعك القادم</span>
            <span className="text-text-primary">؟</span>
          </h2>

          {/* Subtitle */}
          <p className="text-text-secondary text-lg font-tajawal leading-relaxed mb-10 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="primary" size="lg" href="/contact">
              تواصل معنا الآن
            </Button>
            <Button variant="outline" size="lg" href="/services">
              شاهد خدماتنا
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
