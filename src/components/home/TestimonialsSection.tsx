"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AvatarPlaceholder from "@/components/shared/AvatarPlaceholder";
import { projects } from "@/data/projects";
import { useTranslations } from "next-intl";

const testimonials = projects
  .filter((p) => p.testimonial)
  .slice(0, 3)
  .map((p, i) => ({
    text: p.testimonial!.text,
    author: p.testimonial!.author,
    role: p.testimonial!.role,
    company: p.client,
    gender: (["male", "female", "male"] as const)[i],
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="section-navy section-padding relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          light
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] p-7 flex flex-col transition-colors duration-300 hover:bg-white/[0.1]"
            >
              {/* Gold quote icon */}
              <div className="mb-5">
                <Quote className="w-8 h-8 text-accent opacity-80" />
              </div>

              {/* Testimonial text */}
              <p className="text-white/90 font-cairo leading-relaxed text-[15px] mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Gold star rating */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/10 mb-5" />

              {/* Author info with avatar */}
              <div className="flex items-center gap-3">
                <AvatarPlaceholder
                  gender={testimonial.gender}
                  size="sm"
                  className="border-accent/30 shrink-0"
                />
                <div>
                  <p className="font-cairo font-bold text-white text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-white/50 text-xs font-cairo mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
