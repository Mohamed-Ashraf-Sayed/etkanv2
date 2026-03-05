export interface TechRadarItem {
  id: string;
  name: string;
  quadrant: "languages" | "cms" | "infrastructure" | "tools";
  ring: "adopt" | "trial" | "assess" | "hold";
  description: string;
  isNew?: boolean;
}

export interface TechRadarQuadrant {
  id: string;
  name: string;
  color: string;
}

export interface TechRadarRing {
  id: string;
  name: string;
  description: string;
}

export const quadrants: TechRadarQuadrant[] = [
  { id: "languages", name: "اللغات والأطر", color: "#3B82F6" },
  { id: "cms", name: "المنصات وأنظمة المحتوى", color: "#10B981" },
  { id: "infrastructure", name: "البنية التحتية والسحابة", color: "#8B5CF6" },
  { id: "tools", name: "الأدوات والممارسات", color: "#F59E0B" },
];

export const rings: TechRadarRing[] = [
  { id: "adopt", name: "نعتمد عليها", description: "تقنيات أساسية نستخدمها في كل مشاريعنا بثقة كاملة" },
  { id: "trial", name: "نجرّبها", description: "تقنيات واعدة بنجربها في مشاريع محددة وبنقيّم أداءها" },
  { id: "assess", name: "نقيّمها", description: "تقنيات بندرسها وبنتابع تطورها عشان نحدد لو هنعتمدها" },
  { id: "hold", name: "نراقبها", description: "تقنيات بنتابعها بس مش بنستخدمها في مشاريع جديدة" },
];

export const techRadarItems: TechRadarItem[] = [
  // === Languages & Frameworks - Adopt ===
  {
    id: "react",
    name: "React",
    quadrant: "languages",
    ring: "adopt",
    description: "مكتبة JavaScript الأساسية لبناء واجهات المستخدم التفاعلية. بنستخدمها في معظم مشاريعنا.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    quadrant: "languages",
    ring: "adopt",
    description: "إطار عمل React للإنتاج. بيوفر SSR و SSG وأداء ممتاز للـ SEO.",
    isNew: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    quadrant: "languages",
    ring: "adopt",
    description: "بنكتب كل الكود الجديد بـ TypeScript. بيقلل الأخطاء وبيحسّن تجربة التطوير.",
  },
  {
    id: "php",
    name: "PHP",
    quadrant: "languages",
    ring: "adopt",
    description: "اللغة الأساسية لمشاريع WordPress و Laravel. خبرة عميقة في تطويرها.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    quadrant: "languages",
    ring: "adopt",
    description: "بنستخدمه للـ backend في المشاريع اللي بتحتاج real-time وأداء عالي.",
  },

  // === Languages & Frameworks - Trial ===
  {
    id: "vuejs",
    name: "Vue.js",
    quadrant: "languages",
    ring: "trial",
    description: "إطار عمل مرن وسهل التعلم. بنجربه في مشاريع محددة كبديل لـ React.",
  },
  {
    id: "python",
    name: "Python",
    quadrant: "languages",
    ring: "trial",
    description: "بنستخدمها في مشاريع الـ AI والـ automation والـ data processing.",
    isNew: true,
  },
  {
    id: "flutter",
    name: "Flutter",
    quadrant: "languages",
    ring: "trial",
    description: "لبناء تطبيقات موبايل cross-platform بكود واحد لـ iOS و Android.",
    isNew: true,
  },

  // === Languages & Frameworks - Assess ===
  {
    id: "svelte",
    name: "Svelte",
    quadrant: "languages",
    ring: "assess",
    description: "إطار عمل بيعمل compile وقت البناء. أداء ممتاز وكود أقل.",
  },
  {
    id: "go",
    name: "Go",
    quadrant: "languages",
    ring: "assess",
    description: "لغة سريعة من Google. بندرسها للـ microservices والـ APIs عالية الأداء.",
  },

  // === Languages & Frameworks - Hold ===
  {
    id: "jquery",
    name: "jQuery",
    quadrant: "languages",
    ring: "hold",
    description: "كانت أساسية زمان. دلوقتي بنستخدم React و Vanilla JS بدلها.",
  },

  // === CMS & Platforms - Adopt ===
  {
    id: "wordpress",
    name: "WordPress",
    quadrant: "cms",
    ring: "adopt",
    description: "أكتر نظام إدارة محتوى بنستخدمه. مثالي للمواقع المؤسسية والمدونات.",
  },
  {
    id: "elementor",
    name: "Elementor",
    quadrant: "cms",
    ring: "adopt",
    description: "أداة بناء صفحات WordPress الأساسية. بتسهّل التصميم وبتوفر وقت كبير.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    quadrant: "cms",
    ring: "adopt",
    description: "الحل الأساسي للمتاجر الإلكترونية على WordPress. مرن وقابل للتخصيص.",
  },

  // === CMS & Platforms - Trial ===
  {
    id: "shopify",
    name: "Shopify",
    quadrant: "cms",
    ring: "trial",
    description: "منصة متاجر إلكترونية سحابية. بنجربها للعملاء اللي محتاجين حل سريع.",
    isNew: true,
  },
  {
    id: "strapi",
    name: "Strapi",
    quadrant: "cms",
    ring: "trial",
    description: "نظام إدارة محتوى headless. بنستخدمه مع Next.js للمشاريع المتقدمة.",
    isNew: true,
  },

  // === CMS & Platforms - Assess ===
  {
    id: "payload",
    name: "Payload CMS",
    quadrant: "cms",
    ring: "assess",
    description: "نظام headless CMS مبني بـ TypeScript. بندرسه كبديل حديث لـ Strapi.",
    isNew: true,
  },

  // === CMS & Platforms - Hold ===
  {
    id: "joomla",
    name: "Joomla",
    quadrant: "cms",
    ring: "hold",
    description: "نظام إدارة محتوى قديم. WordPress بيقدم تجربة أفضل في معظم الحالات.",
  },

  // === Infrastructure & Cloud - Adopt ===
  {
    id: "docker",
    name: "Docker",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "بنستخدمه في كل مشاريعنا للـ deployment. بيضمن بيئة موحدة ومستقرة.",
  },
  {
    id: "linux",
    name: "Linux",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "نظام التشغيل الأساسي لكل السيرفرات. خبرة عميقة في Ubuntu و CentOS.",
  },
  {
    id: "nginx",
    name: "Nginx",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "الـ web server والـ reverse proxy الأساسي في كل مشاريعنا.",
  },
  {
    id: "mysql",
    name: "MySQL",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "قاعدة البيانات الأساسية لمشاريع WordPress والمشاريع التقليدية.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "قاعدة بيانات متقدمة للمشاريع اللي بتحتاج features زي JSON و full-text search.",
  },

  // === Infrastructure & Cloud - Trial ===
  {
    id: "aws",
    name: "AWS",
    quadrant: "infrastructure",
    ring: "trial",
    description: "خدمات أمازون السحابية. بنجربها للمشاريع اللي بتحتاج scaling كبير.",
    isNew: true,
  },
  {
    id: "vercel",
    name: "Vercel",
    quadrant: "infrastructure",
    ring: "trial",
    description: "منصة deployment لـ Next.js. سريعة وسهلة الاستخدام.",
    isNew: true,
  },

  // === Infrastructure & Cloud - Assess ===
  {
    id: "kubernetes",
    name: "Kubernetes",
    quadrant: "infrastructure",
    ring: "assess",
    description: "نظام إدارة containers. بندرسه للمشاريع الكبيرة اللي بتحتاج orchestration.",
  },

  // === Infrastructure & Cloud - Hold ===
  {
    id: "shared-hosting",
    name: "Shared Hosting",
    quadrant: "infrastructure",
    ring: "hold",
    description: "استضافة مشتركة. بننصح بـ VPS أو Cloud بدلها عشان الأداء والأمان.",
  },

  // === Tools & Techniques - Adopt ===
  {
    id: "git",
    name: "Git & GitHub",
    quadrant: "tools",
    ring: "adopt",
    description: "نظام إدارة الكود الأساسي. كل مشاريعنا على GitHub مع code review.",
  },
  {
    id: "figma",
    name: "Figma",
    quadrant: "tools",
    ring: "adopt",
    description: "أداة التصميم الأساسية. بنصمم فيها كل الواجهات والـ prototypes.",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    quadrant: "tools",
    ring: "adopt",
    description: "إطار CSS الأساسي. بيوفر وقت كبير في التطوير وبيضمن تصميم متسق.",
  },
  {
    id: "seo",
    name: "SEO Best Practices",
    quadrant: "tools",
    ring: "adopt",
    description: "معايير تحسين محركات البحث مدمجة في كل مشاريعنا من البداية.",
  },

  // === Tools & Techniques - Trial ===
  {
    id: "claude-api",
    name: "Claude AI API",
    quadrant: "tools",
    ring: "trial",
    description: "بنستخدم الذكاء الاصطناعي من Anthropic لتحسين تجربة المستخدم والشات بوت.",
    isNew: true,
  },
  {
    id: "playwright",
    name: "Playwright",
    quadrant: "tools",
    ring: "trial",
    description: "أداة اختبار تلقائي للمتصفحات. بنجربها لضمان جودة المشاريع.",
    isNew: true,
  },
  {
    id: "cicd",
    name: "CI/CD",
    quadrant: "tools",
    ring: "trial",
    description: "أنظمة النشر التلقائي. بنبني pipelines لأتمتة الاختبار والنشر.",
  },

  // === Tools & Techniques - Assess ===
  {
    id: "cursor-ai",
    name: "AI-Assisted Development",
    quadrant: "tools",
    ring: "assess",
    description: "أدوات تطوير بالذكاء الاصطناعي. بنقيّم تأثيرها على سرعة وجودة الكود.",
    isNew: true,
  },

  // === Tools & Techniques - Hold ===
  {
    id: "ftp",
    name: "FTP Deploy",
    quadrant: "tools",
    ring: "hold",
    description: "طريقة نشر قديمة. بنستخدم Git و Docker بدلها عشان الأمان والموثوقية.",
  },
];
