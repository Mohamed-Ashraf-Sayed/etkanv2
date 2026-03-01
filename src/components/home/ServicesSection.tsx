"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { serviceCategories } from "@/data/services";
import { useTranslations } from "next-intl";

const serviceImages: Record<string, string> = {
  "web-and-apps": "/images/service-web.jpg",
  "enterprise-systems": "/images/service-enterprise.jpg",
  infrastructure: "/images/service-infra.jpg",
  support: "/images/service-support.jpg",
  consulting: "/images/service-consulting.jpg",
};

const fadeIn = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeInReverse = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="section-padding relative">
      <Container>
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {serviceCategories.map((category, index) => {
            const isEven = index % 2 === 0;
            const imageSrc = serviceImages[category.slug] || "/images/service-web.jpg";

            return (
              <motion.div
                key={category.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={isEven ? fadeIn : fadeInReverse}
                  className="w-full lg:w-5/12 flex-shrink-0"
                >
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <Image
                      src={imageSrc}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/20 transition-colors duration-500" />

                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center">
                      <span className="text-lg font-bold text-navy font-cairo">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  variants={isEven ? fadeInReverse : fadeIn}
                  className="w-full lg:w-7/12"
                >
                  <div className="gold-line mb-4" />

                  <h3 className="text-h3 font-bold font-cairo text-text-primary mb-4 lg:mb-5">
                    {category.title}
                  </h3>

                  <p className="text-text-secondary text-body-lg font-cairo leading-relaxed mb-6 max-w-xl">
                    {category.description}
                  </p>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2.5 text-accent font-semibold font-cairo transition-all duration-300 hover:gap-4 group/link"
                  >
                    <span>{t("learnMore")}</span>
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
