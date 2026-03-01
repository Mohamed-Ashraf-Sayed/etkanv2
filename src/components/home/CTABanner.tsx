"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/shared/MagneticButton";

export default function CTABanner() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {/* Gold accent line */}
          <div className="gold-line mx-auto mb-8" />

          <h2 className="text-h2 md:text-h1 font-bold font-cairo text-white mb-6 leading-tight">
            جاهز تبدأ مشروعك القادم؟
          </h2>

          <p className="text-white/60 text-lg md:text-xl font-cairo leading-relaxed mb-12 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>

          <MagneticButton strength={0.3} className="inline-block">
            <Button variant="gold" size="lg" href="/contact">
              تواصل معنا الآن
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  );
}
