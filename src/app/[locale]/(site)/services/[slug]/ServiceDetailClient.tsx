"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
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
import SectionTitle from "@/components/ui/SectionTitle";
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
    <div className="card rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right hover:bg-surface-light transition-colors"
      >
        <span className="text-text-primary font-semibold font-cairo text-lg">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mr-4"
        >
          <ChevronDown className="w-5 h-5 text-accent" />
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
            <div className="px-5 pb-5 text-text-secondary font-cairo leading-relaxed border-t border-border pt-4">
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
      <section className="relative pt-32 pb-24 overflow-hidden section-navy">
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-cairo text-white/60">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li><ChevronLeft className="w-4 h-4" /></li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li><ChevronLeft className="w-4 h-4" /></li>
              <li className="text-accent font-medium">{service.title}</li>
            </ol>
          </nav>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-accent" />
              </div>
              <Badge variant="gold">{service.category}</Badge>
            </div>

            <h1 className="text-h1 font-bold font-cairo text-white mb-6">
              {service.title}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-lg sm:text-xl text-white/70 font-cairo leading-relaxed max-w-3xl">
              {service.description}
            </p>

            <div className="flex items-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-cairo text-sm">
                  المدة المتوقعة: <strong className="text-white">{service.timeline}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Layers className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-cairo text-sm">
                  <strong className="text-white">{service.techStack.length}</strong> تقنية مستخدمة
                </span>
              </div>
              <Button href="/contact" variant="gold" size="lg">
                اطلب عرض أسعار
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="relative section-padding section-alt">
        <Container className="relative z-10">
          <SectionTitle
            title="المميزات والفوائد"
            subtitle="ليه تختار خدمتنا؟"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="card rounded-xl p-5 flex items-start gap-3"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <span className="text-text-primary font-cairo leading-relaxed">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process / Methodology Timeline */}
      <section className="relative section-padding section-navy">
        <Container>
          <SectionTitle
            title="منهجية العمل"
            subtitle="خطوات واضحة ومنظمة لضمان أفضل نتيجة"
            light
          />
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute right-[23px] top-0 bottom-0 w-0.5 bg-accent/20" />

            {service.process.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 mb-10 last:mb-0"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Step number circle - gold marker */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <span className="text-navy font-bold font-cairo text-lg">
                    {step.step}
                  </span>
                </div>

                {/* Step content */}
                <div className="rounded-xl p-5 flex-1 bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-lg font-bold font-cairo text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 font-cairo leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables Section */}
      <section className="relative section-padding section-alt">
        <Container className="relative z-10">
          <SectionTitle
            title="التسليمات"
            subtitle="إيه اللي هتحصل عليه في نهاية المشروع"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {service.deliverables.map((deliverable, i) => (
              <motion.div
                key={i}
                className="card rounded-xl p-5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent font-cairo">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-text-primary font-cairo text-sm leading-relaxed pt-1.5">
                    {deliverable}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="section-padding section-navy">
        <Container>
          <SectionTitle
            title="التقنيات المستخدمة"
            subtitle="أحدث التقنيات والأدوات لضمان أعلى جودة"
            light
          />
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {service.techStack.map((tech) => (
              <motion.div
                key={tech}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-2 hover:border-accent/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-white font-cairo text-sm font-semibold">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      {service.faqs.length > 0 && (
        <section className="relative section-padding section-alt">
          <Container className="relative z-10">
            <SectionTitle
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
      <section className="relative section-padding overflow-hidden section-navy">
        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-h2 font-bold font-cairo text-white mb-6">
              جاهز تبدأ؟
            </h2>
            <p className="text-white/70 text-lg font-cairo mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا النهاردة واحصل على استشارة مجانية وعرض سعر مخصص لخدمة{" "}
              <span className="text-accent font-semibold">
                {service.shortTitle}
              </span>
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" variant="gold" size="lg">
                تواصل معنا الآن
              </Button>
              <Button href="/services" size="lg" variant="outline">
                <ArrowLeft className="w-5 h-5 ml-2" />
                كل الخدمات
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
