import { ArrowLeft, Star, ShieldCheck, Clock, Gift } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/shared/MagneticButton";
import { getTranslations } from "next-intl/server";
import HeroScrollButton from "./HeroScrollButton";
import HeroParallax from "./HeroParallax";
import { SITE_STATS } from "@/config/site-stats";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background Image */}
      <HeroParallax />

      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-navy/85" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px]" />

      <Container className="relative z-10">
        <div className="pt-40 pb-24 lg:pt-48 lg:pb-32">
          {/* Badge */}
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-accent text-sm font-cairo font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              {t("badge")}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-display font-black font-cairo text-white max-w-5xl mt-8">
            {t("titleLine1")}
            <span className="relative inline-block">
              <span className="text-accent"> {t("titleHighlight")} </span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-accent/40 rounded-full" />
            </span>
            {t("titleLine2")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/45 max-w-2xl font-cairo mt-8 leading-relaxed animate-[slideUp_0.5s_ease-out_0.15s_both]">
            {t("subtitle")}
          </p>

          {/* Star rating */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm animate-[slideUp_0.5s_ease-out_0.2s_both]">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-sm font-cairo font-bold text-white">4.9</span>
            <span className="text-xs font-cairo text-white/50">
              ({SITE_STATS.clients}+ {t("reviewsLabel")})
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-[slideUp_0.5s_ease-out_0.25s_both]">
            <MagneticButton strength={0.25}>
              <Button variant="gold" size="lg" href="/booking">
                <span>{t("ctaPrimary")}</span>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Button
                variant="ghost"
                size="lg"
                href="/tools/cost-calculator"
                className="text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
              >
                {t("ctaSecondary")}
              </Button>
            </MagneticButton>
          </div>

          {/* Trust signals under CTAs */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 animate-[slideUp_0.5s_ease-out_0.3s_both]">
            <div className="inline-flex items-center gap-2 text-sm text-white/60 font-cairo">
              <Gift className="w-4 h-4 text-accent" />
              {t("trustFree")}
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-white/60 font-cairo">
              <Clock className="w-4 h-4 text-accent" />
              {t("trustResponse")}
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-white/60 font-cairo">
              <ShieldCheck className="w-4 h-4 text-accent" />
              {t("trustWarranty")}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-10 border-t border-white/[0.06] animate-[slideUp_0.5s_ease-out_0.35s_both]">
            {[
              { value: `+${SITE_STATS.clients}`, label: t("clients") },
              { value: `+${SITE_STATS.projects}`, label: t("projects") },
              { value: `+${SITE_STATS.yearsExperience}`, label: t("years") },
              { value: `٪${SITE_STATS.satisfaction}`, label: t("satisfaction") },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-start">
                <span className="block text-2xl sm:text-3xl font-bold text-accent font-cairo">
                  {stat.value}
                </span>
                <span className="block text-xs sm:text-sm text-white/40 font-cairo mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll down button */}
      <HeroScrollButton label={t("scrollDown")} ariaLabel={t("scrollAria")} />
    </section>
  );
}
