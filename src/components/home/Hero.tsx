"use client";

import Image from "next/image";
import { ArrowLeft, Shield, Zap, Globe, Server, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/shared/MagneticButton";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const services = [
    { icon: Globe, key: "serviceWeb" },
    { icon: Zap, key: "serviceMobile" },
    { icon: Server, key: "serviceInfra" },
    { icon: Shield, key: "serviceSecurity" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={75}
      />

      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-navy/85" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy" />

      {/* Subtle gold accent light */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <div className="pt-52 pb-20 lg:pt-60 lg:pb-24">
          {/* Top tag */}
          <div className="animate-[fadeIn_0.5s_ease-out_both]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.1] text-accent text-sm font-cairo font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {t("badge")}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-display font-black font-cairo text-white max-w-5xl mt-8 animate-[slideUp_0.9s_ease-out_0.2s_both]">
            {t("titleLine1")}
            <span className="text-accent"> {t("titleHighlight")} </span>
            {t("titleLine2")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl font-cairo mt-6 leading-relaxed animate-[slideUp_0.6s_ease-out_0.4s_both]">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-[slideUp_0.5s_ease-out_0.6s_both]">
            <MagneticButton strength={0.25}>
              <Button variant="gold" size="lg" href="/contact">
                <span>{t("ctaPrimary")}</span>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Button
                variant="ghost"
                size="lg"
                href="/portfolio"
                className="text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
              >
                {t("ctaSecondary")}
              </Button>
            </MagneticButton>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-14 pt-8 border-t border-white/[0.08] animate-[slideUp_0.5s_ease-out_0.8s_both]">
            {[
              { value: "+50", label: t("clients") },
              { value: "+100", label: t("projects") },
              { value: "+5", label: t("years") },
              { value: "٪98", label: t("satisfaction") },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent font-cairo">
                  {stat.value}
                </span>
                <span className="text-sm text-white/40 font-cairo">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14 animate-[slideUp_0.6s_ease-out_1s_both]">
            {services.map((service) => (
              <div
                key={service.key}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <service.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-cairo font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                  {t(service.key)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll down button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-accent transition-colors duration-300 cursor-pointer"
          aria-label={t("scrollAria")}
        >
          <span className="text-xs font-cairo">{t("scrollDown")}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
