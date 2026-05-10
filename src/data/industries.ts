export interface Industry {
  slug: string;
  name: string;
  nameEn: string;
  shortDescription: string;
  longDescription: string;
  emoji: string;
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string; icon?: string }[];
  features: string[];
  caseStudyHighlight: {
    metric: string;
    description: string;
  };
  targetKeywords: string[];
  faqs: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "المطاعم والكافيهات",
    nameEn: "Restaurants & Cafes",
    emoji: "🍽️",
    shortDescription: "أنظمة إدارة متكاملة للمطاعم والكافيهات: نقاط بيع، إدارة طلبات، توصيل، ومخازن",
    longDescription:
      "إدارة مطعم ناجح في 2026 محتاج أكتر من شيف ممتاز. محتاج نظام إدارة متكامل بيربط نقاط البيع، التوصيل، المخزون، والمحاسبة في منصة واحدة. شغلنا مع +20 سلسلة مطاعم في مصر والسعودية ومعرفنا بالظبط إيه اللي بيخلي العمليات تجري بسلاسة.",
    challenges: [
      {
        title: "إدارة الطلبات من قنوات متعددة",
        description:
          "مطعمك بياخد طلبات من Talabat, الموقع، التطبيق، والـ dine-in. تنسيق كل ده يدوياً بيؤدي لأخطاء وتأخير.",
      },
      {
        title: "تتبع المخزون",
        description:
          "متى المكونات بتنفد؟ كم تكلفة الطبق الفعلية؟ بدون نظام دقيق، الـ food cost ممكن يزيد 5-10% بسهولة.",
      },
      {
        title: "إدارة فروع متعددة",
        description:
          "لو عندك أكتر من فرع، إزاي بتشوف الأداء الموحد؟ المبيعات، المخزون، والموظفين في كل فرع؟",
      },
      {
        title: "تجربة العملاء الرقمية",
        description:
          "العميل دلوقتي عايز يطلب من تطبيق، يدفع أونلاين، ويستلم في 30 دقيقة. بدون منصة رقمية، هتخسر العملاء.",
      },
    ],
    solutions: [
      {
        title: "نظام نقاط بيع POS متكامل",
        description: "بيشتغل offline، يدعم الطباعة لـ kitchen، multiple payment methods",
      },
      {
        title: "تكامل مع منصات التوصيل",
        description: "Talabat, Mrsool, الطلبات تيجي مباشرة لشاشة الـ kitchen",
      },
      {
        title: "تطبيق موبايل للعملاء",
        description: "طلب، دفع، تتبع، loyalty program بكل سهولة",
      },
      {
        title: "إدارة المخزون الذكية",
        description: "تتبع real-time للمكونات، تنبيهات أوتوماتيكية للمشتريات",
      },
      {
        title: "تقارير تحليلية متقدمة",
        description: "أرباح، أكتر طبق مبيعاً، ساعات الذروة، توقعات للمستقبل",
      },
      {
        title: "إدارة الموظفين والورديات",
        description: "schedule، attendance، payroll، performance tracking",
      },
    ],
    features: [
      "نظام POS بيشتغل offline",
      "تكامل مع Talabat, Mrsool",
      "طباعة فواتير + kitchen orders تلقائي",
      "تطبيق موبايل للعملاء (iOS + Android)",
      "إدارة مخازن متعددة الفروع",
      "محاسبة كاملة + ضرائب VAT",
      "Loyalty program + كوبونات",
      "تقارير مبيعات real-time",
      "إدارة ورديات الموظفين",
      "Multi-language (عربي/إنجليزي)",
    ],
    caseStudyHighlight: {
      metric: "زيادة المبيعات 47%",
      description:
        "سلسلة مطاعم في الرياض زادت مبيعاتها 47% خلال 6 شهور بعد تطبيق نظامنا المتكامل",
    },
    targetKeywords: [
      "نظام إدارة مطعم",
      "نظام كاشير مطعم",
      "POS مطاعم",
      "تطبيق توصيل طلبات",
      "نظام مطاعم وكافيهات",
      "أفضل نظام لإدارة المطعم",
      "أنظمة المطاعم في مصر",
      "أنظمة المطاعم في السعودية",
    ],
    faqs: [
      {
        question: "كم تكلفة نظام إدارة مطعم؟",
        answer:
          "تختلف حسب الحجم. الباقة الأساسية (نظام POS واحد + إدارة طلبات): 25,000-50,000 جنيه. الباقة المتكاملة (POS + تطبيق + multi-branch): 80,000-200,000 جنيه. اشتراك شهري للدعم: 1500-5000 جنيه.",
      },
      {
        question: "هل النظام بيشتغل بدون إنترنت؟",
        answer:
          "أيوة، نظام POS عندنا بيشتغل offline، الفواتير بتتسجل محلياً وبتتزامن لما الإنترنت يرجع. مهم جداً لو الإنترنت في منطقتك مش مستقر.",
      },
      {
        question: "هل بيتكامل مع Talabat ومرسول؟",
        answer:
          "نعم، عندنا تكامل مباشر مع Talabat, Mrsool, ToYou, Otlob. الطلبات بتيجي تلقائياً للنظام بدون duplication. وفر 70% من الأخطاء البشرية.",
      },
      {
        question: "كم يستغرق التطبيق؟",
        answer:
          "للمطعم الواحد: 2-4 أسابيع للنشر الكامل والتدريب. لسلسلة مطاعم متعددة الفروع: 6-10 أسابيع. بنبدأ بفرع واحد كـ pilot ونعمل scale.",
      },
      {
        question: "هل يدعم الفواتير الإلكترونية والـ VAT؟",
        answer:
          "بالطبع، النظام معتمد لإصدار الفواتير الإلكترونية حسب لوائح مصر والسعودية. يدعم VAT بنسبة 14% (مصر) و 15% (السعودية) تلقائياً.",
      },
    ],
  },
  {
    slug: "clinics",
    name: "العيادات والمراكز الطبية",
    nameEn: "Clinics & Medical Centers",
    emoji: "🏥",
    shortDescription: "نظام إدارة عيادة شامل: حجوزات، ملفات مرضى، فواتير، تذكيرات، ومواقع طبية",
    longDescription:
      "نظام عيادة احترافي مش رفاهية في 2026، ضرورة. العيادات اللي عندها نظام رقمي بتزيد كفاءتها 40% وبتقلل وقت الانتظار 60%. بنوفر حل متكامل لعيادات الأسنان، الجلدية، الأطفال، والمراكز التشخيصية.",
    challenges: [
      {
        title: "إدارة المواعيد والحجوزات",
        description:
          "حجوزات على Telegram, WhatsApp, تليفون، ورق... ده فوضى. تأخير، تعارضات، عملاء بيستنوا.",
      },
      {
        title: "ملفات المرضى الورقية",
        description:
          "ملف ضائع = مريض غاضب. صعوبة الوصول للتاريخ المرضي + روشتة + أشعات في ثواني.",
      },
      {
        title: "متابعة المرضى",
        description:
          "إزاي تذكر المريض بالموعد القادم؟ متى آخر زيارة؟ هل أخد دواءه؟ بدون نظام، الـ retention ضعيف.",
      },
    ],
    solutions: [
      {
        title: "نظام حجز أونلاين",
        description: "موقع أو تطبيق للحجز الذاتي، يقلل الـ load على الـ reception",
      },
      {
        title: "ملفات إلكترونية شاملة",
        description: "تاريخ مرضي، روشتات، أشعة، تحاليل في ملف واحد متاح فوراً",
      },
      {
        title: "تذكيرات تلقائية SMS/WhatsApp",
        description: "تقلل الـ no-shows بنسبة 50%+",
      },
      {
        title: "موقع طبي احترافي",
        description: "Schema markup للأطباء + Google Maps + تقييمات",
      },
      {
        title: "نظام فوترة وتأمين",
        description: "تكامل مع شركات التأمين + claims تلقائية",
      },
    ],
    features: [
      "حجز أونلاين 24/7",
      "ملفات مرضى رقمية مؤمنة",
      "تذكيرات WhatsApp/SMS تلقائية",
      "تكامل مع شركات التأمين",
      "روشتات وتقارير إلكترونية",
      "تكامل مع المعامل والأشعة",
      "تحصيل أونلاين + قطاع تأمين",
      "تقارير إدارية وأطباء",
      "Mobile app للأطباء والمرضى",
      "HIPAA-compliant security",
    ],
    caseStudyHighlight: {
      metric: "تقليل وقت الانتظار 65%",
      description:
        "مركز طبي في القاهرة قلل وقت انتظار المرضى من 45 دقيقة لـ 15 دقيقة في 3 شهور",
    },
    targetKeywords: [
      "نظام إدارة عيادة",
      "تصميم موقع عيادة",
      "نظام حجوزات طبي",
      "تطبيق عيادة",
      "برنامج إدارة المراكز الطبية",
      "أفضل نظام لعيادة الأسنان",
      "تصميم موقع طبيب",
    ],
    faqs: [
      {
        question: "كم تكلفة نظام إدارة عيادة؟",
        answer:
          "تكلفة الباقة الأساسية (حجوزات + ملفات مرضى + تذكيرات): 30,000-60,000 جنيه. الباقة المتكاملة (مع موقع + تطبيق + تأمين): 80,000-150,000 جنيه. اشتراك شهري: 1000-3500 جنيه.",
      },
      {
        question: "هل النظام آمن طبقاً للمعايير الطبية؟",
        answer:
          "نعم، النظام مبني وفق معايير HIPAA و GDPR. تشفير end-to-end، backups يومية، audit logs، صلاحيات متعددة المستويات. بياناتك في أمان تام.",
      },
      {
        question: "هل يتكامل مع شركات التأمين الطبي؟",
        answer:
          "بالطبع، عندنا تكامل مع شركات التأمين الكبرى في مصر والسعودية: AXA, MetLife, شركة مصر للتأمين، التعاونية، بوبا. claims processing تلقائي.",
      },
      {
        question: "هل بيناسب عيادات الأسنان؟",
        answer:
          "نعم، عندنا templates مخصصة لعيادات الأسنان: مخطط الفم الإلكتروني، خطط علاج، تتبع تقدم العلاج، صور x-ray، كل ده مدمج في النظام.",
      },
    ],
  },
  {
    slug: "schools",
    name: "المدارس والمراكز التعليمية",
    nameEn: "Schools & Educational Centers",
    emoji: "🎓",
    shortDescription:
      "نظام إدارة مدرسي شامل: إدارة طلاب، درجات، حضور، أولياء أمور، ومنصات تعلم",
    longDescription:
      "إدارة مدرسة في 2026 = نظام رقمي قوي. الإدارة اليدوية بقت غير ممكنة مع زيادة عدد الطلاب وتوقعات أولياء الأمور. بنوفر منصة تعليمية متكاملة لأكتر من 30 مدرسة ومركز تعليمي في الشرق الأوسط.",
    challenges: [
      {
        title: "إدارة الطلاب والدرجات",
        description: "آلاف الطلاب، عشرات المعلمين، مئات الـ subjects = chaos بدون نظام.",
      },
      {
        title: "تواصل أولياء الأمور",
        description: "ولي الأمر عايز يعرف كل حاجة لحظة بلحظة: درجات، حضور، واجبات.",
      },
      {
        title: "التعلم الإلكتروني",
        description: "كل مدرسة محتاجة LMS عشان توفر محتوى أونلاين، تكاليف، اختبارات.",
      },
    ],
    solutions: [
      {
        title: "نظام إدارة طلاب (SIS)",
        description: "ملف كامل لكل طالب: درجات، حضور، سلوك، صحة",
      },
      {
        title: "تطبيق ولي الأمر",
        description: "متابعة فورية + إشعارات + دفع المصاريف",
      },
      {
        title: "منصة تعليم إلكتروني",
        description: "LMS متكامل: محاضرات، تكاليف، اختبارات، live classes",
      },
      {
        title: "إدارة مالية شاملة",
        description: "مصاريف، رواتب، ميزانية المدرسة في نظام واحد",
      },
    ],
    features: [
      "نظام SIS متكامل",
      "تطبيق ولي الأمر iOS + Android",
      "تطبيق المعلم لتسجيل الدرجات",
      "منصة تعليم إلكتروني (LMS)",
      "Live classes integration (Zoom, Google Meet)",
      "نظام مالي ومحاسبي",
      "تقارير حضور تلقائية",
      "Online assessments",
      "تكامل مع وزارة التعليم",
      "Multi-language (عربي/إنجليزي/فرنسي)",
    ],
    caseStudyHighlight: {
      metric: "+1000 طالب نشط",
      description:
        "مدرسة في جدة طبقت نظامنا وزادت كفاءة عملياتها بنسبة 60% وقللت الـ overhead 40%",
    },
    targetKeywords: [
      "نظام إدارة مدرسة",
      "منصة تعليم إلكتروني",
      "تطبيق مدرسة",
      "LMS عربي",
      "أفضل نظام مدرسي",
      "تصميم موقع مدرسة",
    ],
    faqs: [
      {
        question: "كم تكلفة نظام إدارة المدرسة؟",
        answer:
          "للمدارس الصغيرة (< 500 طالب): 80,000-150,000 جنيه. للمدارس المتوسطة: 150,000-300,000 جنيه. للمدارس الكبيرة + multi-campus: 300,000-700,000 جنيه. + اشتراك سنوي للدعم.",
      },
      {
        question: "هل بيتكامل مع وزارة التعليم؟",
        answer:
          "نعم، النظام متوافق مع متطلبات وزارة التربية والتعليم في مصر، ووزارة التعليم في السعودية. يدعم نظام نور، وقابل للتكامل مع الأنظمة الحكومية.",
      },
      {
        question: "هل يدعم التعليم الهجين (Hybrid Learning)؟",
        answer:
          "بالطبع. النظام يدعم التعلم في الفصل + الأونلاين معاً. تكامل مع Zoom و Google Meet لـ live classes، مع تسجيل تلقائي للحصص ومتابعة حضور افتراضي.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "العقارات والإنشاء",
    nameEn: "Real Estate & Construction",
    emoji: "🏗️",
    shortDescription:
      "أنظمة عقارية متكاملة: مواقع عقارية، CRM، إدارة وحدات، تكامل خرائط، وعقود إلكترونية",
    longDescription:
      "السوق العقاري في الشرق الأوسط من أكبر القطاعات. شركات العقارات الناجحة بتحتاج موقع احترافي + CRM قوي + نظام إدارة وحدات لتتبع آلاف الوحدات. شغلنا مع +15 شركة عقارية في القاهرة، الرياض، ودبي.",
    challenges: [
      {
        title: "إدارة آلاف الوحدات",
        description: "تتبع وحدات متاحة، مباعة، محجوزة عبر مشاريع متعددة.",
      },
      {
        title: "CRM للـ leads",
        description: "آلاف الاستفسارات، صعوبة follow-up، تسرب leads.",
      },
      {
        title: "العقود والمدفوعات",
        description: "أقساط، فوائد، تأخيرات. كله ورقي = فوضى.",
      },
    ],
    solutions: [
      {
        title: "موقع عقاري احترافي",
        description: "بحث متقدم، خرائط تفاعلية، 3D tours، مقارنة وحدات",
      },
      {
        title: "CRM عقاري متخصص",
        description: "lead management + scoring + automation",
      },
      {
        title: "نظام إدارة الوحدات",
        description: "تتبع الـ inventory + reservations + sales",
      },
      {
        title: "تطبيق مشتري + موظف",
        description: "متابعة مشروع، دفع أقساط، تواصل مباشر",
      },
    ],
    features: [
      "موقع عقاري + بحث متقدم",
      "خرائط تفاعلية (Google Maps/Mapbox)",
      "Virtual tours + 360° photos",
      "CRM عقاري كامل",
      "نظام أقساط ومتابعة مدفوعات",
      "عقود إلكترونية (e-signature)",
      "تكامل مع البنوك",
      "تقارير مبيعات وأداء",
      "Mobile apps (مشتري + موظف)",
      "Lead scoring + automation",
    ],
    caseStudyHighlight: {
      metric: "+30% تحويل leads",
      description:
        "شركة عقارية في الرياض زادت معدل تحويل leads بنسبة 30% بعد تطبيق CRM ونظام التتبع",
    },
    targetKeywords: [
      "نظام عقاري",
      "موقع عقاري",
      "CRM عقارات",
      "تصميم موقع شركة عقارات",
      "نظام إدارة وحدات سكنية",
    ],
    faqs: [
      {
        question: "كم تكلفة نظام شركة عقارات؟",
        answer:
          "موقع عقاري + بحث: 60,000-150,000 جنيه. + CRM: 100,000-250,000 جنيه. النظام المتكامل (موقع + CRM + إدارة وحدات + تطبيق): 250,000-500,000 جنيه.",
      },
      {
        question: "هل يتكامل مع البنوك للأقساط؟",
        answer:
          "نعم، عندنا تكامل مع كل البنوك الكبرى في مصر والسعودية. أقساط شهرية تلقائية، تنبيهات للتأخير، تقارير مالية شاملة، وقدرة على بنك تأمين.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "التجارة الإلكترونية",
    nameEn: "E-commerce",
    emoji: "🛒",
    shortDescription:
      "متاجر إلكترونية احترافية: WooCommerce، Custom، تكامل دفع، شحن، وتطبيقات موبايل",
    longDescription:
      "التجارة الإلكترونية في مصر متوقع توصل لـ $9.7 مليار بحلول 2027. الفرصة ضخمة، لكن المنافسة شرسة. متجرك محتاج يكون أسرع، أحلى، وأذكى من المنافس. شغلنا مع +30 متجر إلكتروني وعارفين الـ recipe للنجاح.",
    challenges: [
      {
        title: "أداء المتجر",
        description: "متجر بطيء = bounce rate عالي + خسارة مبيعات. كل ثانية تأخير = -7% conversions.",
      },
      {
        title: "تجربة الـ checkout",
        description: "70% من العملاء بيتركوا الـ cart بسبب صعوبة الـ checkout. كل خطوة زائدة = خسارة.",
      },
      {
        title: "إدارة المخزون والشحن",
        description: "مع نمو المتجر، إدارة المخزون يدوياً = خطأ + delays.",
      },
    ],
    solutions: [
      {
        title: "متجر سريع جداً",
        description: "Next.js + headless commerce = مواقع تحمل في < 2 ثانية",
      },
      {
        title: "Checkout سلس",
        description: "خطوة واحدة، multiple payment methods، guest checkout",
      },
      {
        title: "تكامل شركات الشحن",
        description: "Aramex, FedEx, محلية - تتبع تلقائي، رسوم محسوبة",
      },
      {
        title: "تطبيق موبايل أصلي",
        description: "60% من المبيعات في 2026 من الموبايل. تطبيق = +35% conversions",
      },
    ],
    features: [
      "متجر سريع جداً (< 2s LCP)",
      "Checkout بخطوة واحدة",
      "Multi-payment (فيزا، فودافون كاش، Apple Pay)",
      "تكامل Aramex, FedEx, محلية",
      "تطبيق iOS + Android",
      "نظام كوبونات وعروض",
      "Loyalty program",
      "Multi-vendor (لو marketplace)",
      "تكامل ERP/المحاسبة",
      "Advanced SEO + sitemaps",
    ],
    caseStudyHighlight: {
      metric: "+185% مبيعات في 6 شهور",
      description:
        "متجر إلكتروني في الإسكندرية زاد مبيعاته 185% بعد إعادة بناء المتجر بـ Custom + تطبيق موبايل",
    },
    targetKeywords: [
      "تصميم متجر إلكتروني",
      "تكلفة متجر إلكتروني",
      "تطوير متجر أونلاين",
      "WooCommerce vs Custom",
      "أفضل شركة تصميم متجر إلكتروني",
    ],
    faqs: [
      {
        question: "WordPress/WooCommerce ولا متجر مخصص؟",
        answer:
          "WooCommerce جيد للبداية وحتى ~500 منتج. لو هتكبر سريعاً أو محتاج features خاصة، Custom Development أفضل. الفرق: WooCommerce 30K-60K جنيه، Custom 100K-300K جنيه. ROI طويل المدى لـ Custom أعلى.",
      },
      {
        question: "كم وقت بناء متجر إلكتروني؟",
        answer:
          "متجر WooCommerce بسيط: 3-4 أسابيع. متجر متوسط (200 منتج + integrations): 6-8 أسابيع. متجر كبير custom (5000+ منتج + multi-vendor): 12-20 أسبوع.",
      },
      {
        question: "هل بيدعم الفواتير الإلكترونية المصرية؟",
        answer:
          "نعم، مدمج تلقائياً مع منظومة الفاتورة الإلكترونية المصرية. يصدر فواتير معتمدة، يبعتها لمصلحة الضرائب، ويحفظ السجلات.",
      },
    ],
  },
  {
    slug: "factories",
    name: "المصانع والإنتاج",
    nameEn: "Factories & Manufacturing",
    emoji: "🏭",
    shortDescription:
      "أنظمة إدارة المصانع: ERP، MRP، تتبع الإنتاج، مخازن، وجودة",
    longDescription:
      "إدارة مصنع في 2026 = ERP قوي + IoT integration + تحليل بيانات. مصانع كتيرة لسه بتشتغل بأنظمة قديمة من الـ 90s. التحول الرقمي = توفير 25-40% في التكاليف وزيادة الإنتاجية بنسبة 50%.",
    challenges: [
      {
        title: "تخطيط الإنتاج",
        description: "أوامر إنتاج، materials, machines, workers - بدون نظام = chaos.",
      },
      {
        title: "إدارة الجودة",
        description: "تتبع defects, batches, recalls يدوياً = كارثة لو حصل مشكلة.",
      },
      {
        title: "Supply chain",
        description: "موردين، purchases, lead times، delays. صعب تخطيط بدون visibility.",
      },
    ],
    solutions: [
      {
        title: "نظام ERP صناعي",
        description: "محاسبة، مخازن، إنتاج، HR في منصة واحدة متخصصة",
      },
      {
        title: "MRP - Material Requirements Planning",
        description: "حساب احتياجات المواد بناءً على Forecast الإنتاج",
      },
      {
        title: "تتبع الإنتاج Real-time",
        description: "كل order, machine, worker - مرئي فوراً",
      },
      {
        title: "إدارة الجودة QMS",
        description: "Inspections, defects tracking, batch traceability",
      },
    ],
    features: [
      "ERP صناعي متكامل",
      "MRP + Production Planning",
      "QMS - Quality Management",
      "Inventory tracking (RFID/barcodes)",
      "Machine monitoring (IoT)",
      "Supply chain management",
      "Maintenance scheduling",
      "Workforce management",
      "Compliance & reporting",
      "Multi-currency + multi-warehouse",
    ],
    caseStudyHighlight: {
      metric: "تقليل التكلفة 32%",
      description:
        "مصنع في الإسماعيلية قلل تكاليف الإنتاج بنسبة 32% خلال سنة بعد تطبيق نظامنا",
    },
    targetKeywords: [
      "نظام إدارة مصنع",
      "ERP صناعي",
      "نظام MRP",
      "إدارة الإنتاج",
      "أنظمة المصانع",
    ],
    faqs: [
      {
        question: "كم تكلفة نظام ERP صناعي؟",
        answer:
          "للمصانع الصغيرة (< 50 موظف): 200,000-400,000 جنيه. للمتوسطة: 400,000-800,000 جنيه. الكبيرة + multi-plant: 800K-2M جنيه. التطبيق ياخد 4-12 شهر.",
      },
      {
        question: "هل يتكامل مع الماكينات الـ IoT؟",
        answer:
          "نعم، عندنا خبرة في تكامل ERP مع PLCs, SCADA systems, IoT sensors. real-time data من الماكينات يوصل لـ ERP لتحليل الأداء واتخاذ قرارات.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
