"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";

const testimonials = projects
  .filter((p) => p.testimonial)
  .slice(0, 3)
  .map((p) => ({
    text: p.testimonial!.text,
    author: p.testimonial!.author,
    role: p.testimonial!.role,
    company: p.client,
  }));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TestimonialsSection() {
  return (
    <section className="relative section-padding section-gradient-1">
      <div className="noise-overlay absolute inset-0" />

      <Container className="relative z-10">
        <SectionTitle
          title="ماذا يقول عملاؤنا"
          subtitle="آراء عملائنا هي أفضل دليل على جودة خدماتنا"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="card-premium rounded-2xl p-7 flex flex-col"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-accent" />
              </div>

              {/* Testimonial text */}
              <p className="text-text-secondary font-tajawal leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 pt-4">
                <p className="font-cairo font-bold text-text-primary text-sm">
                  {testimonial.author}
                </p>
                <p className="text-text-muted text-xs font-tajawal mt-1">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
