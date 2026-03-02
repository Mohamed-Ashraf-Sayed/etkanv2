export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: "website" | "mobile" | "systems" | "infrastructure";
  categoryLabel: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  results: { metric: string; value: string; description: string }[];
  tags: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  techStack: string[];
  thumbnail?: string;
  images?: string[];
  duration: string;
  year: string;
}

export const projectCategories = [
  { value: "all", label: "الكل" },
  { value: "website", label: "مواقع" },
  { value: "mobile", label: "تطبيقات" },
  { value: "systems", label: "أنظمة" },
  { value: "infrastructure", label: "بنية تحتية" },
];

export const projects: Project[] = [
  {
    slug: "saudi-real-estate-platform",
    title: "منصة عقارية متكاملة",
    client: "شركة الخليج العقارية",
    industry: "العقارات",
    category: "website",
    categoryLabel: "مواقع",
    summary: "منصة عقارية شاملة لعرض وإدارة العقارات مع نظام حجز ودفع متكامل",
    description:
      "طورنا منصة عقارية متكاملة تتيح للمستخدمين البحث عن العقارات، حجز المعاينات، وإتمام عمليات الشراء أو الإيجار بالكامل أونلاين.",
    problem:
      "كانت الشركة تعتمد على الطرق التقليدية في عرض العقارات، مما أدى إلى بطء في إتمام الصفقات وصعوبة في الوصول للعملاء المحتملين.",
    solution:
      "بنينا منصة ويب متكاملة مع نظام بحث ذكي، خرائط تفاعلية، جولات افتراضية، ونظام حجز ودفع إلكتروني متكامل.",
    results: [
      { metric: "زيادة المبيعات", value: "340%", description: "نمو في المبيعات خلال 6 أشهر" },
      { metric: "العملاء الجدد", value: "2,500+", description: "عميل جديد مسجل شهرياً" },
      { metric: "وقت إتمام الصفقة", value: "-60%", description: "تقليل في وقت إتمام الصفقات" },
    ],
    tags: ["Next.js", "React", "PostgreSQL", "خرائط تفاعلية"],
    testimonial: {
      text: "المنصة غيرت طريقة شغلنا بالكامل. حققنا أرقام ما كنا نتخيلها بفضل فريق إتقان.",
      author: "أحمد الخالدي",
      role: "المدير التنفيذي، شركة الخليج العقارية",
    },
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Google Maps API"],
    duration: "12 أسبوع",
    year: "2024",
  },
  {
    slug: "healthcare-mobile-app",
    title: "تطبيق حجز مواعيد طبية",
    client: "مجموعة المستشفيات المتحدة",
    industry: "الرعاية الصحية",
    category: "mobile",
    categoryLabel: "تطبيقات",
    summary: "تطبيق موبايل لحجز المواعيد الطبية وإدارة الملفات الصحية",
    description:
      "طورنا تطبيق موبايل شامل يتيح للمرضى حجز المواعيد، استشارات عن بُعد، الوصول لسجلاتهم الطبية، وتلقي التذكيرات.",
    problem:
      "كان المرضى يعانون من طوابير انتظار طويلة وصعوبة في حجز المواعيد، مما أثر على رضا المرضى وكفاءة العمل.",
    solution:
      "بنينا تطبيق متكامل لحجز المواعيد مع نظام إدارة للأطباء والمرضى، إشعارات ذكية، وتكامل مع النظام الطبي القائم.",
    results: [
      { metric: "رضا المرضى", value: "95%", description: "نسبة رضا المرضى عن الخدمة" },
      { metric: "تقليل الانتظار", value: "-75%", description: "تقليل وقت الانتظار" },
      { metric: "الحجوزات الشهرية", value: "15,000+", description: "حجز شهري عبر التطبيق" },
    ],
    tags: ["React Native", "Firebase", "Node.js", "تطبيق موبايل"],
    testimonial: {
      text: "التطبيق سهّل على مرضانا بشكل كبير وزاد من كفاءة العمل في المستشفيات. شغل احترافي جداً.",
      author: "د. سارة العمري",
      role: "مدير العمليات، المستشفيات المتحدة",
    },
    techStack: ["React Native", "Firebase", "Node.js", "MongoDB", "WebRTC"],
    duration: "16 أسبوع",
    year: "2024",
  },
  {
    slug: "logistics-erp",
    title: "نظام ERP لشركة لوجستيات",
    client: "شركة السريع للنقل",
    industry: "النقل واللوجستيات",
    category: "systems",
    categoryLabel: "أنظمة",
    summary: "نظام ERP شامل لإدارة عمليات النقل واللوجستيات",
    description:
      "طورنا نظام ERP متكامل يشمل إدارة الأسطول، التتبع المباشر، المخازن، الفواتير، والموارد البشرية في منصة واحدة.",
    problem:
      "كانت الشركة تعتمد على أنظمة منفصلة لكل قسم مما أدى لتكرار البيانات وصعوبة المتابعة وضعف في الكفاءة التشغيلية.",
    solution:
      "بنينا نظام ERP موحد يربط كل الأقسام مع لوحة تحكم مركزية وتقارير لحظية وتتبع مباشر للشحنات.",
    results: [
      { metric: "الكفاءة التشغيلية", value: "+45%", description: "تحسن في الكفاءة التشغيلية" },
      { metric: "تقليل التكاليف", value: "-30%", description: "توفير في التكاليف التشغيلية" },
      { metric: "دقة البيانات", value: "99.5%", description: "دقة في البيانات والتقارير" },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "نظام ERP"],
    testimonial: {
      text: "النظام وفر علينا ساعات عمل كل يوم وحسّن دقة البيانات بشكل ملحوظ. استثمار ممتاز.",
      author: "محمد السريع",
      role: "المدير العام، شركة السريع للنقل",
    },
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "GraphQL"],
    duration: "20 أسبوع",
    year: "2023",
  },
  {
    slug: "corporate-network-setup",
    title: "تجهيز شبكة مؤسسية",
    client: "بنك الأمان المصري",
    industry: "القطاع المصرفي",
    category: "infrastructure",
    categoryLabel: "بنية تحتية",
    summary: "تجهيز وتأمين البنية التحتية للشبكة لفرع بنكي جديد",
    description:
      "جهزنا البنية التحتية الكاملة لفرع بنكي جديد شاملة الشبكات، السيرفرات، أنظمة الحماية، وأنظمة المراقبة بأعلى معايير الأمان.",
    problem:
      "البنك كان يحتاج بنية تحتية متكاملة وآمنة للفرع الجديد تتوافق مع معايير الأمان المصرفية العالمية.",
    solution:
      "صممنا ونفذنا بنية تحتية شاملة مع شبكة مؤمنة بالكامل، جدران نارية متقدمة، أنظمة نسخ احتياطي، ومركز بيانات محلي.",
    results: [
      { metric: "وقت التشغيل", value: "99.99%", description: "نسبة التشغيل بدون انقطاع" },
      { metric: "الحوادث الأمنية", value: "صفر", description: "حوادث أمنية منذ التشغيل" },
      { metric: "سرعة الاستجابة", value: "<1 ثانية", description: "متوسط وقت استجابة النظام" },
    ],
    tags: ["Cisco", "Fortinet", "VMware", "شبكات مؤسسية"],
    testimonial: {
      text: "فريق محترف وملتزم بأعلى المعايير. البنية التحتية تعمل بشكل ممتاز منذ اليوم الأول.",
      author: "م. خالد مصطفى",
      role: "مدير تكنولوجيا المعلومات، بنك الأمان",
    },
    techStack: ["Cisco", "Fortinet", "VMware ESXi", "Veeam", "Active Directory"],
    duration: "6 أسابيع",
    year: "2024",
  },
  {
    slug: "ecommerce-platform",
    title: "متجر إلكتروني متقدم",
    client: "شركة الأناقة للأزياء",
    industry: "التجارة الإلكترونية",
    category: "website",
    categoryLabel: "مواقع",
    summary: "متجر إلكتروني متكامل مع نظام إدارة مخزون وشحن",
    description:
      "بنينا متجراً إلكترونياً متقدماً بتجربة تسوق سلسة ونظام إدارة مخزون ذكي وتكامل مع شركات الشحن المحلية.",
    problem:
      "الشركة كانت تبيع فقط من المحل وتريد التوسع أونلاين لكن بدون خبرة في التجارة الإلكترونية.",
    solution:
      "طورنا متجراً إلكترونياً متكاملاً مع تصميم جذاب، نظام دفع آمن، إدارة مخزون ذكية، وتكامل مع شركات الشحن.",
    results: [
      { metric: "الإيرادات أونلاين", value: "250%", description: "نمو في الإيرادات خلال 4 أشهر" },
      { metric: "الطلبات اليومية", value: "200+", description: "طلب يومي عبر المتجر" },
      { metric: "معدل التحويل", value: "4.2%", description: "معدل تحويل فوق المتوسط" },
    ],
    tags: ["Next.js", "Stripe", "إدارة مخزون", "متجر إلكتروني"],
    techStack: ["Next.js", "React", "Stripe", "PostgreSQL", "Node.js"],
    duration: "10 أسابيع",
    year: "2023",
  },
  {
    slug: "hr-management-system",
    title: "نظام إدارة الموارد البشرية",
    client: "مجموعة النيل الصناعية",
    industry: "الصناعة",
    category: "systems",
    categoryLabel: "أنظمة",
    summary: "نظام HR متكامل لإدارة 500+ موظف",
    description:
      "بنينا نظام موارد بشرية شامل يشمل إدارة الحضور، الرواتب، الإجازات، التقييمات، والتوظيف لأكثر من 500 موظف.",
    problem:
      "إدارة 500+ موظف بطرق يدوية وجداول إكسل كانت مرهقة ومليانة أخطاء ومشاكل في حساب الرواتب.",
    solution:
      "طورنا نظام HR متكامل مع نظام بصمة ذكي، حساب رواتب تلقائي، بوابة خدمة ذاتية للموظفين، وتقارير شاملة.",
    results: [
      { metric: "توفير الوقت", value: "70%", description: "توفير في وقت عمليات HR" },
      { metric: "دقة الرواتب", value: "100%", description: "دقة في حساب الرواتب" },
      { metric: "رضا الموظفين", value: "+40%", description: "تحسن في رضا الموظفين" },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "نظام HR"],
    testimonial: {
      text: "النظام سهّل شغل الـ HR بشكل خيالي. الموظفين بقوا يقدروا يتابعوا كل حاجة من الموبايل.",
      author: "أ. نورا حسن",
      role: "مدير الموارد البشرية، مجموعة النيل",
    },
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "biometric API"],
    duration: "14 أسبوع",
    year: "2023",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
