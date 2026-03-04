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
    tags: ["Next.js", "موقع مؤسسي", "بنية تحتية", "مقاولات"],
    thumbnail: "/images/projects/masar-infrastructure.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
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
    tags: ["Next.js", "موقع مؤسسي", "تعدين", "تصدير"],
    thumbnail: "/images/projects/genesis-mining.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "i18n"],
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
    tags: ["Next.js", "وكالة إبداعية", "تسويق رقمي", "محتوى"],
    thumbnail: "/images/projects/art-vision-agency.jpg",
    techStack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
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
    tags: ["Next.js", "موقع مؤسسي", "مقاولات", "إنشاءات"],
    thumbnail: "/images/projects/al-qayrawana-contracting.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS"],
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
    tags: ["Next.js", "موقع خدمي", "استقدام", "السعودية"],
    thumbnail: "/images/projects/fawasil-aljouf-recruitment.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS"],
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
    tags: ["Next.js", "موقع مؤسسي", "مقاولات", "تنمية مستدامة"],
    thumbnail: "/images/projects/mida-construction.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
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
    tags: ["Next.js", "منصة طبية", "رعاية صحية", "حجز مواعيد"],
    thumbnail: "/images/projects/klinicon-healthcare.jpg",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
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
