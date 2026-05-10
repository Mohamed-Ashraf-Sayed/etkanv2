export interface Testimonial {
  id: string;
  text: string;
  textEn: string;
  author: string;
  authorEn: string;
  role: string;
  roleEn: string;
  company: string;
  rating: number; // 1-5
  image: string;
  industry?: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "ahmed-mahmoud",
    text: "إتقان غيرت طريقة شغلنا بالكامل. الموقع اللي بنوه لينا رفع المبيعات أونلاين بنسبة 200% في أول 3 شهور. التعامل احترافي والدعم سريع.",
    textEn:
      "Etqan completely transformed our operations. The website they built boosted our online sales by 200% in the first 3 months. Professional service and quick support.",
    author: "أحمد محمود",
    authorEn: "Ahmed Mahmoud",
    role: "المدير التنفيذي",
    roleEn: "CEO",
    company: "شركة مسار للبنية التحتية",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    industry: "البنية التحتية",
    date: "2025-09-15",
  },
  {
    id: "sara-khalidi",
    text: "فريق محترف جداً، فهموا متطلباتنا من أول اجتماع وسلموا المشروع قبل الموعد. شغل ممتاز وجودة عالية.",
    textEn:
      "Highly professional team. They understood our requirements from the first meeting and delivered ahead of schedule. Excellent work, high quality.",
    author: "سارة الخالدي",
    authorEn: "Sara Al-Khalidi",
    role: "مديرة التسويق",
    roleEn: "Marketing Director",
    company: "منصة مسارات التعليمية",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    industry: "التعليم",
    date: "2025-08-20",
  },
  {
    id: "khaled-abdulrahman",
    text: "البنية التحتية اللي عملوها لينا وفرت علينا 40% من تكاليف التشغيل. شريك تقني حقيقي ومش مجرد مزود خدمة.",
    textEn:
      "The infrastructure they built saved us 40% in operational costs. A true technology partner, not just a vendor.",
    author: "خالد عبدالرحمن",
    authorEn: "Khaled Abdulrahman",
    role: "مدير تقنية المعلومات",
    roleEn: "IT Director",
    company: "المتحدة للصناعات",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    industry: "الصناعة",
    date: "2025-07-10",
  },
  {
    id: "omar-rida",
    text: "تطبيق الموبايل اللي طوروه لينا حصل على تقييم 4.8 على الستور وتحميلات تجاوزت 50,000 في 6 شهور. جودة عالية جداً.",
    textEn:
      "The mobile app they developed received a 4.8 rating on the store and 50K+ downloads in 6 months. Exceptional quality.",
    author: "عمر رضا",
    authorEn: "Omar Rida",
    role: "المؤسس",
    roleEn: "Founder",
    company: "نيو ميديا",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    industry: "الإعلام الرقمي",
    date: "2025-06-25",
  },
  {
    id: "noura-hussein",
    text: "الدعم الفني اللي بيقدموه مش عادي. أي مشكلة بتتحل في ساعات مش أيام. ميعتمد عليهم 100%.",
    textEn:
      "Their technical support is exceptional. Any issue gets resolved in hours, not days. We rely on them 100%.",
    author: "نورا حسين",
    authorEn: "Noura Hussein",
    role: "مديرة العمليات",
    roleEn: "Operations Manager",
    company: "سمارت سولوشنز",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    industry: "تكنولوجيا المعلومات",
    date: "2025-05-30",
  },
  {
    id: "fares-sayed",
    text: "صمموا لنا نظام ERP متكامل ربط كل أقسام الشركة ببعض. إنتاجيتنا زادت بشكل ملحوظ. شغل احترافي.",
    textEn:
      "They built us an integrated ERP system that connected all departments. Our productivity significantly increased.",
    author: "فارس السيد",
    authorEn: "Fares Al-Sayed",
    role: "مدير المشاريع",
    roleEn: "Project Manager",
    company: "الأمان المالي",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    industry: "الخدمات المالية",
    date: "2025-04-18",
  },
  {
    id: "heba-mostafa",
    text: "من أحسن الشركات اللي اتعاملت معاها. احترافية في الشغل، دقة في المواعيد، وجودة في التسليم.",
    textEn:
      "One of the best companies I've worked with. Professional work, precise deadlines, quality delivery.",
    author: "هبة مصطفى",
    authorEn: "Heba Mostafa",
    role: "مديرة التطوير",
    roleEn: "Development Director",
    company: "الخليج للتجارة",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    industry: "التجارة",
    date: "2025-03-12",
  },
  {
    id: "mohamed-yasser",
    text: "المنصة التعليمية اللي بنوها وصلت لآلاف الطلاب في أقل من شهر. شغل يستاهل التقدير والتوصية.",
    textEn:
      "The educational platform they built reached thousands of students in less than a month. Truly impressive work.",
    author: "محمد ياسر",
    authorEn: "Mohamed Yasser",
    role: "مدير المحتوى",
    roleEn: "Content Director",
    company: "الرواد للأعمال",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    industry: "التعليم",
    date: "2025-02-08",
  },
  {
    id: "layla-ahmed",
    text: "استشارتهم التقنية وفرت علينا وقت ومجهود كبير. فريق بيفهم السوق المحلي كويس وبيقدم حلول عملية.",
    textEn:
      "Their technical consultation saved us significant time and effort. A team that understands the local market.",
    author: "ليلى أحمد",
    authorEn: "Layla Ahmed",
    role: "مديرة التخطيط",
    roleEn: "Planning Director",
    company: "البناء الحديث",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    industry: "المقاولات",
    date: "2025-01-22",
  },
];

export function getTestimonialsByIndustry(industry: string) {
  return testimonials.filter((t) => t.industry === industry);
}

export function getAverageRating(): number {
  if (testimonials.length === 0) return 0;
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return Number((sum / testimonials.length).toFixed(1));
}
