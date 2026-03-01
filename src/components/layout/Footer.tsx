"use client";

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
} from "lucide-react";
import Container from "@/components/ui/Container";

const quickLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
];

const serviceLinks = [
  { href: "/services/web-dev", label: "تطوير المواقع والتطبيقات" },
  { href: "/services/crm", label: "الأنظمة الداخلية (ERP/CRM)" },
  { href: "/services/networks", label: "البنية التحتية والشبكات" },
  { href: "/services/it-support", label: "الدعم الفني والصيانة" },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
];

const partnerships = [
  "Microsoft Partner",
  "Cisco Partner",
  "AWS Partner",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Gold top line */}
      <div className="h-1 bg-accent" />

      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight text-white font-cairo">
                إتقان
              </span>
            </Link>
            <p className="text-sm text-white/60 font-cairo leading-relaxed max-w-xs mb-6">
              شريكك التقني الموثوق لتطوير الحلول البرمجية والبنية التحتية.
              نخدم عملاءنا في مصر والسعودية.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-cairo font-semibold text-accent mb-3">
                اشترك في نشرتنا البريدية
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  dir="ltr"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors font-cairo"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-accent hover:bg-accent-light text-navy font-bold transition-colors duration-200"
                >
                  <Send size={14} />
                </button>
              </form>
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
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              خدماتنا
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold font-cairo text-accent uppercase tracking-wider mb-5">
              تواصل معنا
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <a
                  href="mailto:info@devixtech.com"
                  className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  dir="ltr"
                >
                  info@devixtech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <a
                  href="tel:+201234567890"
                  className="text-sm text-white/60 font-cairo hover:text-accent transition-colors duration-200"
                  dir="ltr"
                >
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <span className="text-sm text-white/60 font-cairo">
                  القاهرة، مصر
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-accent mt-0.5 shrink-0"
                />
                <span className="text-sm text-white/60 font-cairo">
                  الرياض، السعودية
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Partnerships Bar */}
      <div className="border-t border-white/10">
        <Container className="py-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {partnerships.map((partner) => (
              <span
                key={partner}
                className="text-xs text-white/30 font-cairo"
                dir="ltr"
              >
                {partner}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 font-cairo">
              &copy; 2025 إتقان للحلول البرمجية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-xs text-white/40 font-cairo hover:text-accent transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="#"
                className="text-xs text-white/40 font-cairo hover:text-accent transition-colors"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
