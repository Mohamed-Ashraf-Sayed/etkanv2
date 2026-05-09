"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Phone,
  MessageCircle,
  Clock,
  Star,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";

interface Props {
  service: Service;
  city: City;
  locale: string;
}

export default function ServiceCityClient({ service, city, locale }: Props) {
  const isArabic = locale === "ar";
  const cityName = isArabic ? city.nameAr : city.nameEn;
  const countryName = isArabic ? city.countryAr : city.countryEn;
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  return (
    <>
      {/* Hero */}
      <section className="section-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              {
                label: t("خدماتنا", "Services"),
                href: "/services",
              },
              {
                label: service.title,
                href: `/services/${service.slug}`,
              },
              { label: cityName },
            ]}
          />
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="gold">{service.title}</Badge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-cairo">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {cityName}
              </span>
            </div>

            <h1 className="text-display font-black font-cairo text-white mt-6 mb-5">
              {t(
                `${service.title} في ${cityName}`,
                `${service.title} in ${cityName}`
              )}
            </h1>

            <div className="gold-line mb-6" />

            <p className="text-lg sm:text-xl text-white/60 font-cairo leading-relaxed max-w-3xl">
              {t(
                `أفضل شركة ${service.shortTitle || service.title} في ${cityName}، ${countryName}. نقدم حلول تقنية متكاملة لأكثر من 75 شركة في المنطقة، بأسعار تنافسية وجودة عالمية.`,
                `Top ${service.shortTitle || service.title} company in ${cityName}, ${countryName}. We've delivered tech solutions to 75+ businesses across the region, at competitive prices and world-class quality.`
              )}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08]">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm text-white/60 font-cairo">
                  {t("4.9/5 من 75 عميل", "4.9/5 from 75 clients")}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08]">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/60 font-cairo">
                  {t("استشارة مجانية", "Free Consultation")}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/booking" variant="gold" size="lg">
                {t("احجز استشارة مجانية", "Book Free Consultation")}
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                href="https://wa.me/201094807674"
                variant="ghost"
                size="lg"
                className="text-white/70 hover:text-accent border border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Why Etqan in this city */}
      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
              {t(
                `ليه إتقان أفضل شركة ${service.shortTitle || service.title} في ${cityName}؟`,
                `Why Etqan is the best ${service.shortTitle || service.title} company in ${cityName}?`
              )}
            </h2>

            <p className="text-text-secondary font-cairo leading-relaxed text-lg mb-10">
              {t(
                `بنخدم عملاء ${cityName} وكل ${countryName} منذ سنوات. عندنا فريق محترف فاهم السوق المحلي، اللوائح، والاحتياجات الخاصة بالشركات في ${cityName}.`,
                `We've been serving clients in ${cityName} and across ${countryName} for years. Our team understands the local market, regulations, and unique needs of businesses in ${cityName}.`
              )}
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {service.benefits.slice(0, 6).map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-xl bg-surface border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-text-primary font-cairo">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-h3 font-bold font-cairo text-text-primary mb-4">
              {t(
                `ما هي خدمات ${service.title} اللي نقدمها في ${cityName}؟`,
                `What ${service.title} services do we offer in ${cityName}?`
              )}
            </h3>
            <p className="text-text-secondary font-cairo leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="bg-accent/5 border border-accent/15 rounded-2xl p-6 mb-10">
                <h4 className="font-bold font-cairo text-text-primary mb-4">
                  {t("اللي بتحصل عليه:", "What you get:")}
                </h4>
                <ul className="space-y-2.5">
                  {service.deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-text-secondary font-cairo"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Local CTA */}
            <div className="rounded-2xl p-8 section-navy text-center text-white">
              <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-h3 font-bold font-cairo mb-3">
                {t(
                  `ابدأ مشروعك في ${cityName} النهاردة`,
                  `Start your project in ${cityName} today`
                )}
              </h3>
              <p className="text-white/60 font-cairo mb-6 max-w-xl mx-auto">
                {t(
                  "تواصل معنا واحنا هنرد عليك في أقل من ساعة بعرض سعر مجاني",
                  "Contact us and get a free quote in less than an hour"
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/booking" variant="gold" size="lg">
                  {t("احجز موعد", "Book a Meeting")}
                </Button>
                <Button
                  href="tel:+201094807674"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-accent border border-white/10"
                >
                  <Phone className="w-4 h-4" />
                  +20 109 480 7674
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other cities */}
      <section className="section-padding section-alt">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h3 font-bold font-cairo text-text-primary mb-4">
              {t(
                `${service.title} في مدن أخرى`,
                `${service.title} in other cities`
              )}
            </h2>
            <p className="text-text-muted font-cairo mb-8">
              {t(
                "نخدم عملاءنا في أكتر من 15 مدينة حول مصر والخليج",
                "We serve clients in 15+ cities across Egypt and the Gulf"
              )}
            </p>
            <Link
              href={"/services/" + service.slug as never}
              className="inline-flex items-center gap-2 text-accent font-semibold font-cairo hover:gap-3 transition-all"
            >
              {t("استعرض جميع المدن", "View all cities")}
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
