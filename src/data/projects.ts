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
];

export const projects: Project[] = [
  {
    slug: "masar-infrastructure",
    title: "موقع شركة مسار للبنية التحتية",
    client: "شركة مسار",
    industry: "المقاولات والبنية التحتية",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع مؤسسي لشركة مقاولات متخصصة في مشاريع البنية التحتية الكبرى في مصر",
    description:
      "صممنا موقعاً احترافياً لشركة مسار يعكس حجم مشاريعها الكبرى في البنية التحتية، مع عرض تفصيلي للمشاريع والشراكات والقدرات التقنية.",
    problem:
      "الشركة كانت محتاجة موقع يعكس حجمها الحقيقي كشركة بنية تحتية كبرى ويعرض مشاريعها القومية بشكل احترافي.",
    solution:
      "بنينا موقع مؤسسي متكامل بتصميم قوي يعرض المشاريع الكبرى زي قناة السويس الجديدة والقطار الكهربائي، مع صفحات تفصيلية لكل مشروع.",
    results: [
      { metric: "المشاريع المعروضة", value: "15+", description: "مشروع قومي معروض على الموقع" },
      { metric: "الشراكات", value: "Siemens", description: "شراكات دولية مع كبرى الشركات" },
      { metric: "رأس المال", value: "4 مليار", description: "جنيه حجم مشاريع معروضة" },
    ],
    tags: ["WordPress", "موقع مؤسسي", "بنية تحتية", "مقاولات"],
    thumbnail: "/images/projects/masar-infrastructure.jpg",
    images: [
      "/images/projects/masar-infrastructure-2.jpg",
      "/images/projects/masar-infrastructure-3.jpg",
      "/images/projects/masar-infrastructure-4.jpg",
      "/images/projects/masar-infrastructure-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "8 أسابيع",
    year: "2024",
  },
  {
    slug: "masarat-education-platform",
    title: "منصة مسارات التعليمية",
    client: "مسارات",
    industry: "التعليم الإلكتروني",
    category: "website",
    categoryLabel: "مواقع",
    summary: "منصة تعليمية متكاملة تقدم دورات أونلاين من خبراء متخصصين في مختلف المجالات",
    description:
      "طورنا منصة تعليمية شاملة تتيح للمتعلمين الوصول لدورات في البرمجة والتصميم والتسويق، مع نظام تسجيل وتتبع تقدم ومحتوى تفاعلي.",
    problem:
      "العميل كان محتاج منصة تعليمية عربية متكاملة تقدر تنافس المنصات الكبيرة وتقدم تجربة مستخدم سهلة.",
    solution:
      "بنينا منصة تعليمية بنظام LMS متكامل، نظام تسجيل ودفع، تتبع تقدم المتعلمين، وشهادات إتمام.",
    results: [
      { metric: "المتعلمين", value: "1,000+", description: "متعلم مسجل على المنصة" },
      { metric: "الدورات", value: "50+", description: "دورة متاحة في مختلف المجالات" },
      { metric: "معدل الإتمام", value: "78%", description: "نسبة إتمام الدورات" },
    ],
    tags: ["منصة تعليمية", "LMS", "دورات أونلاين", "تعليم إلكتروني"],
    thumbnail: "/images/projects/masarat-education-platform.jpg",
    images: [
      "/images/projects/masarat-education-platform-2.jpg",
      "/images/projects/masarat-education-platform-3.jpg",
      "/images/projects/masarat-education-platform-4.jpg",
      "/images/projects/masarat-education-platform-5.jpg",
    ],
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe"],
    duration: "12 أسبوع",
    year: "2024",
  },
  {
    slug: "genesis-mining",
    title: "موقع شركة جينيسيس للتعدين",
    client: "Genesis Mining",
    industry: "التعدين والموارد المعدنية",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع مؤسسي لشركة تعدين مصرية كبرى بعمليات تصدير عالمية",
    description:
      "صممنا موقعاً احترافياً ثنائي اللغة لشركة جينيسيس للتعدين يعرض منتجاتها المعدنية وعملياتها التشغيلية وخطط التوسع العالمية.",
    problem:
      "الشركة برأس مال 300 مليون دولار كانت محتاجة موقع يعكس حجمها العالمي ويستهدف عملاء في آسيا وأفريقيا وأوروبا.",
    solution:
      "بنينا موقع متعدد اللغات بتصميم عصري يعرض المنتجات والعمليات التشغيلية مع كتالوج رقمي وصفحات تفصيلية لكل منتج.",
    results: [
      { metric: "الإنتاج الشهري", value: "500K طن", description: "طاقة إنتاجية شهرية" },
      { metric: "العمالة", value: "1,800+", description: "مهندس وفني وعامل" },
      { metric: "الأسواق", value: "4 قارات", description: "تصدير لآسيا وأفريقيا وأوروبا وأمريكا" },
    ],
    tags: ["WordPress", "موقع مؤسسي", "تعدين", "تصدير"],
    thumbnail: "/images/projects/genesis-mining.jpg",
    images: [
      "/images/projects/genesis-mining-2.jpg",
      "/images/projects/genesis-mining-3.jpg",
      "/images/projects/genesis-mining-4.jpg",
      "/images/projects/genesis-mining-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "WooCommerce", "PHP"],
    duration: "10 أسابيع",
    year: "2024",
  },
  {
    slug: "art-vision-agency",
    title: "موقع وكالة Art Vision الإبداعية",
    client: "Art Vision",
    industry: "التسويق والإبداع الرقمي",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع لوكالة إبداعية متكاملة متخصصة في المحتوى الرقمي والتسويق",
    description:
      "صممنا موقعاً مميزاً لوكالة Art Vision يعرض خدماتها في التسويق الرقمي وإنشاء المحتوى وإدارة العلامات التجارية بتصميم إبداعي جذاب.",
    problem:
      "الوكالة كانت محتاجة موقع يعكس إبداعها ويعرض أعمالها بطريقة مميزة تجذب العملاء والعلامات التجارية.",
    solution:
      "بنينا موقع بتصميم إبداعي فريد مع معرض أعمال تفاعلي، صفحات خدمات مفصلة، ومدونة لعرض الخبرات.",
    results: [
      { metric: "العملاء الجدد", value: "+60%", description: "زيادة في استفسارات العملاء" },
      { metric: "التفاعل", value: "3x", description: "زيادة في وقت تصفح الموقع" },
      { metric: "المشاريع", value: "25+", description: "مشروع معروض في البورتفوليو" },
    ],
    tags: ["WordPress", "وكالة إبداعية", "تسويق رقمي", "محتوى"],
    thumbnail: "/images/projects/art-vision-agency.jpg",
    images: [
      "/images/projects/art-vision-agency-2.jpg",
      "/images/projects/art-vision-agency-3.jpg",
      "/images/projects/art-vision-agency-4.jpg",
      "/images/projects/art-vision-agency-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "Bootstrap"],
    duration: "8 أسابيع",
    year: "2024",
  },
  {
    slug: "al-qayrawana-contracting",
    title: "موقع شركة القيروانة للمقاولات",
    client: "شركة القيروانة للمقاولات العامة",
    industry: "المقاولات والإنشاءات",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع مؤسسي لشركة مقاولات مصرية عريقة بخبرة أكثر من 25 سنة",
    description:
      "صممنا موقعاً احترافياً لشركة القيروانة يعرض مشاريعها في الإسكان والمرافق والطرق مع أكثر من 25 سنة خبرة.",
    problem:
      "الشركة بخبرة 25+ سنة وشراكات حكومية كانت محتاجة وجود رقمي يليق بتاريخها وحجم أعمالها.",
    solution:
      "بنينا موقع مؤسسي يعرض المشاريع المنجزة، فريق العمل، والشراكات الحكومية بتصميم احترافي يعكس جودة الشركة.",
    results: [
      { metric: "الخبرة", value: "25+ سنة", description: "خبرة في المقاولات والإنشاءات" },
      { metric: "المشاريع", value: "100+", description: "مشروع منجز في مصر" },
      { metric: "الشراكات", value: "حكومية", description: "شراكات مع الهيئة الهندسية" },
    ],
    tags: ["WordPress", "موقع مؤسسي", "مقاولات", "إنشاءات"],
    thumbnail: "/images/projects/al-qayrawana-contracting.jpg",
    images: [
      "/images/projects/al-qayrawana-contracting-2.jpg",
      "/images/projects/al-qayrawana-contracting-3.jpg",
      "/images/projects/al-qayrawana-contracting-4.jpg",
      "/images/projects/al-qayrawana-contracting-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "6 أسابيع",
    year: "2024",
  },
  {
    slug: "al-saleh-education",
    title: "منصة الصالح للقدرات التعليمية",
    client: "الصالح للقدرات التعليمية",
    industry: "التعليم الإلكتروني",
    category: "website",
    categoryLabel: "مواقع",
    summary: "منصة تعليمية بنظام LMS متكامل لتقديم الدورات التدريبية أونلاين",
    description:
      "طورنا منصة تعليمية إلكترونية متكاملة بنظام إدارة تعلم (LMS) يتيح عرض الدورات والتسجيل وتتبع التقدم.",
    problem:
      "العميل كان محتاج منصة تعليمية سهلة الاستخدام تقدر تستوعب عدد كبير من الطلاب وتقدم تجربة تعليمية تفاعلية.",
    solution:
      "بنينا منصة بنظام LMS متكامل مع نظام تسجيل، فصول افتراضية، واختبارات تفاعلية بدعم كامل للغة العربية.",
    results: [
      { metric: "الطلاب", value: "500+", description: "طالب مسجل على المنصة" },
      { metric: "الدورات", value: "30+", description: "دورة تدريبية متاحة" },
      { metric: "معدل الرضا", value: "92%", description: "نسبة رضا الطلاب" },
    ],
    tags: ["WordPress", "LMS", "منصة تعليمية", "تعليم إلكتروني"],
    thumbnail: "/images/projects/al-saleh-education.jpeg",
    images: [
      "/images/projects/al-saleh-education-2.jpg",
      "/images/projects/al-saleh-education-3.jpg",
      "/images/projects/al-saleh-education-4.jpg",
      "/images/projects/al-saleh-education-5.jpg",
    ],
    techStack: ["WordPress", "LearnPress", "Elementor", "PHP"],
    duration: "6 أسابيع",
    year: "2024",
  },
  {
    slug: "fawasil-aljouf-recruitment",
    title: "موقع فواصل الجوف للاستقدام",
    client: "شركة فواصل الجوف",
    industry: "الاستقدام والتوظيف",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع لشركة استقدام سعودية متخصصة في توفير العمالة المنزلية",
    description:
      "صممنا موقعاً متكاملاً لشركة فواصل الجوف يعرض خدمات الاستقدام من عدة دول مع نظام طلب خدمة أونلاين.",
    problem:
      "الشركة كانت محتاجة موقع يبسّط عملية طلب خدمات الاستقدام ويعرض الخدمات بشكل واضح ومهني.",
    solution:
      "بنينا موقع بتصميم واضح يعرض خدمات الاستقدام من 6 دول مع نموذج طلب خدمة وربط بالواتساب للتواصل المباشر.",
    results: [
      { metric: "الطلبات", value: "1,700+", description: "عملية استقدام ناجحة" },
      { metric: "العقود الشهرية", value: "500+", description: "عقد شهري نشط" },
      { metric: "الدول", value: "6 دول", description: "مصادر استقدام متنوعة" },
    ],
    tags: ["WordPress", "موقع خدمي", "استقدام", "السعودية"],
    thumbnail: "/images/projects/fawasil-aljouf-recruitment.jpg",
    images: [
      "/images/projects/fawasil-aljouf-recruitment-2.jpg",
      "/images/projects/fawasil-aljouf-recruitment-3.jpg",
      "/images/projects/fawasil-aljouf-recruitment-4.jpg",
      "/images/projects/fawasil-aljouf-recruitment-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "5 أسابيع",
    year: "2024",
  },
  {
    slug: "mida-construction",
    title: "موقع شركة ميدة التأسيسية المتحدة",
    client: "شركة ميدة التأسيسية المتحدة",
    industry: "المقاولات والتنمية المستدامة",
    category: "website",
    categoryLabel: "مواقع",
    summary: "موقع مؤسسي لشركة مقاولات رائدة في المقاولات والتنمية المستدامة",
    description:
      "صممنا موقعاً احترافياً لشركة ميدة يعكس ريادتها في مجال المقاولات والتنمية المستدامة مع عرض لمشاريعها وخدماتها.",
    problem:
      "الشركة كانت محتاجة وجود رقمي قوي يعكس رؤيتها في التنمية المستدامة ويعرض مشاريعها بشكل احترافي.",
    solution:
      "بنينا موقع مؤسسي بتصميم عصري يعرض المشاريع والخدمات مع التركيز على رسالة التنمية المستدامة.",
    results: [
      { metric: "المشاريع", value: "50+", description: "مشروع منجز" },
      { metric: "التواجد الرقمي", value: "100%", description: "تحول رقمي كامل" },
      { metric: "الاستفسارات", value: "+80%", description: "زيادة في استفسارات العملاء" },
    ],
    tags: ["موقع مؤسسي", "مقاولات", "تنمية مستدامة", "تصميم عصري"],
    thumbnail: "/images/projects/mida-construction.jpg",
    images: [
      "/images/projects/mida-construction-2.jpg",
      "/images/projects/mida-construction-3.jpg",
      "/images/projects/mida-construction-4.jpg",
      "/images/projects/mida-construction-5.jpg",
    ],
    techStack: ["HTML/CSS", "JavaScript", "Responsive Design"],
    duration: "7 أسابيع",
    year: "2024",
  },
  {
    slug: "klinicon-healthcare",
    title: "منصة Klinicon الطبية",
    client: "Klinicon",
    industry: "الرعاية الصحية",
    category: "website",
    categoryLabel: "مواقع",
    summary: "منصة طبية متكاملة لتقديم الخدمات الصحية والاستشارات الطبية",
    description:
      "طورنا منصة طبية شاملة لـ Klinicon تربط المرضى بالأطباء وتقدم خدمات صحية متكاملة بتصميم عصري وسهل الاستخدام.",
    problem:
      "العميل كان محتاج منصة طبية تربط المرضى بالأطباء وتسهّل عملية البحث والحجز والاستشارات.",
    solution:
      "بنينا منصة طبية بنظام بحث ذكي عن الأطباء والتخصصات، نظام حجز مواعيد، وواجهة سهلة للمرضى والأطباء.",
    results: [
      { metric: "الأطباء", value: "100+", description: "طبيب مسجل على المنصة" },
      { metric: "التخصصات", value: "20+", description: "تخصص طبي متاح" },
      { metric: "الحجوزات", value: "2,000+", description: "حجز شهري عبر المنصة" },
    ],
    tags: ["WordPress", "منصة طبية", "رعاية صحية", "حجز مواعيد"],
    thumbnail: "/images/projects/klinicon-healthcare.jpg",
    images: [
      "/images/projects/klinicon-healthcare-2.jpg",
      "/images/projects/klinicon-healthcare-3.jpg",
      "/images/projects/klinicon-healthcare-4.jpg",
      "/images/projects/klinicon-healthcare-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "14 أسبوع",
    year: "2024",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
