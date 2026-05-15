"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

const socialLinks = [
  { href: "https://www.linkedin.com/company/etqanly", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/etqanly", icon: Twitter, label: "Twitter" },
  { href: "https://www.facebook.com/etqanly", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/etqanly", icon: Instagram, label: "Instagram" },
];

const partnerships = [
  "Microsoft Partner",
  "Cisco Partner",
  "AWS Partner",
];

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === "loading") return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          locale,
          source: "footer",
        }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  const quickLinks = [
    { href: "/", label: tn("home") },
    { href: "/etqan", label: "عن إتقان" },
    { href: "/about", label: tn("about") },
    { href: "/portfolio", label: tn("portfolio") },
    { href: "/pricing", label: "الأسعار" },
    { href: "/blog", label: tn("blog") },
    { href: "/contact", label: tn("contact") },
  ];

  const serviceLinks = [
    { href: "/services/web-dev", label: t("serviceWeb") },
    { href: "/services/crm", label: t("serviceEnterprise") },
    { href: "/services/networks", label: t("serviceInfra") },
    { href: "/services/it-support", label: t("serviceSupport") },
  ];

  const resourceLinks = [
    { href: "/audit", label: "تقييم مجاني لموقعك" },
    { href: "/tools/cost-calculator", label: "حاسبة التكلفة" },
    { href: "/guides", label: "أدلة شاملة" },
    { href: "/comparison", label: "مقارنات" },
    { href: "/glossary", label: "قاموس تقني" },
    { href: "/insights", label: "تقارير وأبحاث" },
    { href: "/scope", label: "مخطط AI" },
  ];

  const solutionLinks = [
    { href: "/solutions/restaurants", label: "المطاعم" },
    { href: "/solutions/clinics", label: "العيادات" },
    { href: "/solutions/schools", label: "المدارس" },
    { href: "/solutions/ecommerce", label: "التجارة الإلكترونية" },
  ];

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Gold top line */}
      <div className="h-1 bg-accent relative z-10" />
      <FooterBackgroundGradient />

      <Container className="py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt={tn("brand")}
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 font-cairo leading-relaxed max-w-xs mb-6">
              {t("description")}
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-cairo font-semibold text-accent mb-3">
                {t("newsletter")}
              </p>
              {newsletterStatus === "success" ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-cairo">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t("newsletterThanks")}</span>
                </div>
              ) : (
                <form className="flex gap-2" onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === "loading"}
                    placeholder={t("emailPlaceholder")}
                    dir="ltr"
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-accent transition-colors font-cairo disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="px-3 py-2 rounded-lg bg-accent hover:bg-accent-light text-navy font-bold transition-colors duration-200 disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    {newsletterStatus === "loading" ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </form>
              )}
              {newsletterStatus === "error" && (
                <p className="text-xs text-red-400 font-cairo mt-2">
                  {t("newsletterError")}
                </p>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as never}
                    className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              {t("ourServices")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as never}
                    className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as never}
                    className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <a
                  href="mailto:info@etqanly.com"
                  className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  dir="ltr"
                >
                  info@etqanly.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <a
                  href="tel:+201094807674"
                  className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  dir="ltr"
                >
                  +20 109 480 7674
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <span className="text-sm text-white/60 font-cairo">
                  {t("cairo")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <span className="text-sm text-white/60 font-cairo">
                  {t("riyadh")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Text Hover Effect */}
      <div className="lg:flex hidden h-[20rem] -mt-28 -mb-20 relative z-10">
        <TextHoverEffect text="ETQAN" className="z-50" />
      </div>

      {/* Partnerships Bar */}
      <div className="border-t border-white/10 relative z-10">
        <Container className="py-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {partnerships.map((partner) => (
              <span
                key={partner}
                className="text-xs text-white/60 font-cairo"
                dir="ltr"
              >
                {partner}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 font-cairo">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={"/privacy" as never}
                className="text-xs text-white/60 font-cairo hover:text-accent transition-colors"
              >
                {t("privacy")}
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href={"/terms" as never}
                className="text-xs text-white/60 font-cairo hover:text-accent transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
