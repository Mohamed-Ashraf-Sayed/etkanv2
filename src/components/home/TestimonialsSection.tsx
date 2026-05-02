"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import type { Testimonial } from "@/components/ui/testimonials-columns";
import { useTranslations, useLocale } from "next-intl";

const testimonialsAr: Testimonial[] = [
  {
    text: "إتقان غيرت طريقة شغلنا بالكامل. الموقع اللي بنوه لينا رفع المبيعات أونلاين بنسبة 200% في أول 3 شهور.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "أحمد محمود",
    role: "المدير التنفيذي - شركة مسار",
  },
  {
    text: "فريق محترف جداً، فهموا متطلباتنا من أول اجتماع وسلموا المشروع قبل الموعد. شغل ممتاز!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "سارة الخالدي",
    role: "مديرة التسويق - مسارات",
  },
  {
    text: "البنية التحتية اللي عملوها لينا وفرت علينا 40% من تكاليف التشغيل. شريك تقني حقيقي.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "خالد عبدالرحمن",
    role: "مدير تقنية المعلومات - المتحدة للصناعات",
  },
  {
    text: "تطبيق الموبايل اللي طوروه لينا حصل على تقييم 4.8 على الستور. جودة عالية جداً.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "عمر رضا",
    role: "مؤسس - نيو ميديا",
  },
  {
    text: "الدعم الفني اللي بيقدموه مش عادي. أي مشكلة بتتحل في ساعات مش أيام.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "نورا حسين",
    role: "مديرة العمليات - سمارت سولوشنز",
  },
  {
    text: "صمموا لنا نظام ERP متكامل ربط كل أقسام الشركة ببعض. إنتاجيتنا زادت بشكل ملحوظ.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "فارس السيد",
    role: "مدير المشاريع - الأمان المالي",
  },
  {
    text: "من أحسن الشركات اللي اتعاملت معاها. احترافية في الشغل ودقة في المواعيد.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "هبة مصطفى",
    role: "مديرة التطوير - الخليج للتجارة",
  },
  {
    text: "المنصة التعليمية اللي بنوها وصلت لآلاف الطلاب في أقل من شهر. شغل يستاهل التقدير.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "محمد ياسر",
    role: "مدير المحتوى - الرواد للأعمال",
  },
  {
    text: "استشارتهم التقنية وفرت علينا وقت ومجهود كبير. فريق بيفهم السوق المحلي كويس.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "ليلى أحمد",
    role: "مديرة التخطيط - البناء الحديث",
  },
];

const testimonialsEn: Testimonial[] = [
  {
    text: "Etqan completely transformed our operations. The website they built boosted our online sales by 200% in the first 3 months.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Ahmed Mahmoud",
    role: "CEO - Masar Company",
  },
  {
    text: "A highly professional team. They understood our requirements from the first meeting and delivered ahead of schedule.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sara Al-Khalidi",
    role: "Marketing Director - Masarat",
  },
  {
    text: "The infrastructure they built saved us 40% in operational costs. A true technology partner.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Khaled Abdulrahman",
    role: "IT Director - United Industries",
  },
  {
    text: "The mobile app they developed received a 4.8 rating on the store. Exceptional quality.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Omar Rida",
    role: "Founder - New Media",
  },
  {
    text: "Their technical support is outstanding. Any issue gets resolved in hours, not days.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Noura Hussein",
    role: "Operations Manager - Smart Solutions",
  },
  {
    text: "They designed a complete ERP system that connected all departments. Our productivity increased significantly.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Fares Al-Sayed",
    role: "Project Manager - Al-Aman Finance",
  },
  {
    text: "One of the best companies I've worked with. Professional work and precise deadlines.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Heba Mostafa",
    role: "Development Director - Gulf Trading",
  },
  {
    text: "The learning platform they built reached thousands of students in less than a month. Truly impressive work.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Mohamed Yasser",
    role: "Content Director - Al-Rowad Business",
  },
  {
    text: "Their technical consultation saved us significant time and effort. A team that truly understands the local market.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Layla Ahmed",
    role: "Planning Director - Modern Construction",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const testimonials = locale === "en" ? testimonialsEn : testimonialsAr;

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

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
        <SectionTitle title={t("title")} subtitle={t("subtitle")} light />

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </Container>
    </section>
  );
}
