"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Users,
  Building2,
  Network,
  Server,
  Headphones,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  Clock,
  ArrowLeft,
  Layers,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Users,
  Building2,
  Network,
  Server,
  Headphones,
  TrendingUp,
};

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-premium rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right hover:bg-primary/5 transition-colors"
      >
        <span className="text-text-primary font-semibold font-cairo text-lg">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mr-4"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-text-secondary font-tajawal leading-relaxed border-t border-border/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetailClient({
  service,
}: {
  service: Service;
}) {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.15), transparent)",
          }}
        />
        <div className="noise-overlay absolute inset-0" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-tajawal text-text-secondary">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li><ChevronLeft className="w-4 h-4" /></li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li><ChevronLeft className="w-4 h-4" /></li>
              <li className="text-primary font-medium">{service.title}</li>
            </ol>
          </nav>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-primary-light" />
              </div>
              <Badge variant="primary">{service.category}</Badge>
            </div>

            <h1 className="text-h1 font-bold font-cairo mb-6">
              <span className="gradient-text">{service.title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary font-tajawal leading-relaxed max-w-3xl">
              {service.description}
            </p>

            <div className="flex items-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl card-premium">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-text-secondary font-tajawal text-sm">
                  المدة المتوقعة: <strong className="text-text-primary">{service.timeline}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl card-premium">
                <Layers className="w-5 h-5 text-primary" />
                <span className="text-text-secondary font-tajawal text-sm">
                  <strong className="text-text-primary">{service.techStack.length}</strong> تقنية مستخدمة
                </span>
              </div>
              <Button href="/contact" size="lg">
                اطلب عرض أسعار
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="relative section-padding section-gradient-1">
        <div className="noise-overlay absolute inset-0" />
        <Container className="relative z-10">
          <SectionHeading
            title="المميزات والفوائد"
            subtitle="ليه تختار خدمتنا؟"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="card-premium rounded-xl p-5 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-text-primary font-tajawal leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process / Methodology Timeline */}
      <section className="relative section-padding">
        <Container>
          <SectionHeading
            title="منهجية العمل"
            subtitle="خطوات واضحة ومنظمة لضمان أفضل نتيجة"
          />
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute right-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

            {service.process.map((step) => (
              <div
                key={step.step}
                className="relative flex gap-6 mb-10 last:mb-0"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 glow-primary">
                  <span className="text-white font-bold font-cairo text-lg">
                    {step.step}
                  </span>
                </div>

                {/* Step content */}
                <div className="card-premium rounded-xl p-5 flex-1">
                  <h3 className="text-lg font-bold font-cairo text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary font-tajawal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables Section */}
      <section className="relative section-padding section-gradient-2">
        <div className="noise-overlay absolute inset-0" />
        <Container className="relative z-10">
          <SectionHeading
            title="التسليمات"
            subtitle="إيه اللي هتحصل عليه في نهاية المشروع"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {service.deliverables.map((deliverable, i) => (
              <div
                key={i}
                className="card-premium rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary font-cairo">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-text-primary font-tajawal text-sm leading-relaxed pt-1.5">
                    {deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="التقنيات المستخدمة"
            subtitle="أحدث التقنيات والأدوات لضمان أعلى جودة"
          />
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {service.techStack.map((tech, i) => (
              <div
                key={tech}
                className="card-premium rounded-xl px-5 py-3 flex items-center gap-2"
              >
                <Sparkles className={cn(
                  "w-4 h-4",
                  i % 3 === 0 ? "text-primary" : i % 3 === 1 ? "text-accent" : "text-secondary"
                )} />
                <span className="text-text-primary font-cairo text-sm font-semibold">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      {service.faqs.length > 0 && (
        <section className="relative section-padding section-gradient-1">
          <div className="noise-overlay absolute inset-0" />
          <Container className="relative z-10">
            <SectionHeading
              title="أسئلة شائعة"
              subtitle="إجابات على أكثر الأسئلة اللي بتوصلنا عن الخدمة"
            />
            <div className="max-w-3xl mx-auto space-y-4">
              {service.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative section-padding overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12), transparent)",
          }}
        />
        <div className="noise-overlay absolute inset-0" />

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold font-cairo mb-6">
              <span className="text-text-primary">جاهز </span>
              <span className="gradient-text">تبدأ</span>
              <span className="text-text-primary">؟</span>
            </h2>
            <p className="text-text-secondary text-lg font-tajawal mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا النهاردة واحصل على استشارة مجانية وعرض سعر مخصص لخدمة{" "}
              <span className="text-accent font-semibold">
                {service.shortTitle}
              </span>
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                تواصل معنا الآن
              </Button>
              <Button href="/services" size="lg" variant="outline">
                <ArrowLeft className="w-5 h-5 ml-2" />
                كل الخدمات
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-h2 font-bold font-cairo gradient-text mb-4">
        {title}
      </h2>
      <p className="text-text-secondary text-lg font-tajawal max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
