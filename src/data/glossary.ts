export interface GlossaryTerm {
  slug: string;
  term: string;
  termEn: string;
  definition: string;
  longDefinition: string;
  category: string;
  related?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "api",
    term: "API",
    termEn: "Application Programming Interface",
    definition:
      "واجهة برمجة التطبيقات هي مجموعة من القواعد اللي بتسمح للتطبيقات تتواصل مع بعض.",
    longDefinition:
      "API (Application Programming Interface) هي بروتوكول بيحدد إزاي تطبيق ممكن يطلب بيانات أو خدمات من تطبيق تاني. مثلاً، لما تستخدم تطبيق فيه خريطة، التطبيق ده بيستخدم API بتاع Google Maps عشان يعرض الخريطة. الـ APIs بتسهل ربط الأنظمة المختلفة وبتختصر وقت التطوير.",
    category: "تطوير",
    related: ["rest-api", "graphql", "webhook"],
  },
  {
    slug: "rest-api",
    term: "REST API",
    termEn: "Representational State Transfer API",
    definition:
      "نمط معماري لبناء APIs على بروتوكول HTTP باستخدام methods زي GET و POST.",
    longDefinition:
      "REST (Representational State Transfer) هو الـ standard الأكتر شيوعاً لبناء APIs. بيستخدم HTTP methods (GET للقراءة، POST للإضافة، PUT للتعديل، DELETE للحذف) ومش stateful. سهل الفهم والتطبيق ومدعوم في كل لغات البرمجة.",
    category: "تطوير",
    related: ["api", "graphql"],
  },
  {
    slug: "frontend",
    term: "Frontend",
    termEn: "Frontend",
    definition:
      "الجزء من الموقع أو التطبيق اللي المستخدم بيتعامل معاه مباشرة (الواجهة).",
    longDefinition:
      "الـ Frontend هو كل اللي بتشوفه في المتصفح أو التطبيق: الأزرار، النصوص، الصور، التصميم. بيتم بناؤه باستخدام HTML, CSS, JavaScript وفريموركات زي React, Vue, Angular. الـ Frontend مهم جداً لتجربة المستخدم (UX).",
    category: "تطوير",
    related: ["backend", "react", "ux-ui"],
  },
  {
    slug: "backend",
    term: "Backend",
    termEn: "Backend",
    definition:
      "الجزء من النظام اللي بيشتغل في الخلفية ومش ظاهر للمستخدم (الـ server logic).",
    longDefinition:
      "الـ Backend بيتعامل مع قواعد البيانات، الأمان، authentication، business logic. بيتم بناؤه بلغات زي Node.js, Python, PHP, Java. الـ Backend بيتحمل العمليات المعقدة وبيرسل البيانات للـ Frontend.",
    category: "تطوير",
    related: ["frontend", "database", "api"],
  },
  {
    slug: "fullstack",
    term: "Full-Stack",
    termEn: "Full-Stack Development",
    definition: "تطوير يشمل الـ Frontend والـ Backend معاً.",
    longDefinition:
      "Full-Stack Developer هو مطور قادر يشتغل على كل طبقات التطبيق: من الواجهة الأمامية للخلفية لقواعد البيانات للـ deployment. مفيد جداً للشركات الناشئة لأنه بيقدر يبني المنتج كله بنفسه.",
    category: "تطوير",
    related: ["frontend", "backend"],
  },
  {
    slug: "responsive-design",
    term: "تصميم متجاوب",
    termEn: "Responsive Design",
    definition: "تصميم يتأقلم تلقائياً مع كل أحجام الشاشات (موبايل، تابلت، ديسكتوب).",
    longDefinition:
      "التصميم المتجاوب أصبح ضرورة مش رفاهية. أكتر من 60% من الزيارات في الشرق الأوسط من الموبايل. الموقع المتجاوب بيستخدم CSS Media Queries عشان يتأقلم مع كل جهاز. Google كمان بيرتب المواقع المتجاوبة أعلى في نتائج البحث (Mobile-First Indexing).",
    category: "تصميم",
    related: ["mobile-first", "ux-ui"],
  },
  {
    slug: "ux-ui",
    term: "UX/UI",
    termEn: "User Experience / User Interface",
    definition:
      "UX = تجربة المستخدم (الإحساس باستخدام المنتج). UI = واجهة المستخدم (الشكل البصري).",
    longDefinition:
      "UX (User Experience) بيركز على إن المستخدم يحقق هدفه بسهولة وراحة. UI (User Interface) بيركز على الشكل البصري والألوان والـ layout. الاتنين مهمين، بس UX أساس كل شيء — موقع جميل بس صعب الاستخدام = فشل.",
    category: "تصميم",
    related: ["responsive-design", "wireframe"],
  },
  {
    slug: "seo",
    term: "SEO",
    termEn: "Search Engine Optimization",
    definition: "تحسين المواقع لتظهر في أعلى نتائج محركات البحث زي Google.",
    longDefinition:
      "SEO يشمل تقنيات كتيرة: تحسين السرعة، Schema markup، الـ keywords، الروابط الداخلية، الـ backlinks، المحتوى الجيد. SEO استثمار طويل المدى — بيستغرق 3-6 شهور علشان تشوف نتائج، لكن العائد مستمر.",
    category: "تسويق",
    related: ["serp", "keyword", "backlink"],
  },
  {
    slug: "serp",
    term: "SERP",
    termEn: "Search Engine Results Page",
    definition: "صفحة نتائج محرك البحث اللي بتظهرلك بعد ما تبحث في Google.",
    longDefinition:
      "SERP بتشمل: النتائج العضوية، الإعلانات، Featured Snippets، AI Overviews، Local Pack، People Also Ask. الترتيب الأول في SERP بياخد ~28% من الـ clicks، الترتيب التاني ~15%، التالت ~11%. الفرق ضخم بين الترتيبات.",
    category: "تسويق",
    related: ["seo", "keyword"],
  },
  {
    slug: "backlink",
    term: "Backlink",
    termEn: "Backlink",
    definition: "رابط من موقع تاني يشير لموقعك. بيرفع authority الموقع في Google.",
    longDefinition:
      "Backlinks من أهم عوامل SEO. كل رابط من موقع موثوق = vote of confidence لموقعك. لكن الجودة أهم من الكمية — رابط واحد من موقع DR 80 أحسن من 100 رابط من مواقع spammy. تجنب شراء روابط — Google ممكن يعاقبك.",
    category: "تسويق",
    related: ["seo", "domain-rating"],
  },
  {
    slug: "domain-rating",
    term: "Domain Rating",
    termEn: "Domain Rating (DR)",
    definition: "مقياس قوة الموقع من 0 إلى 100. كل ما زاد، كل ما الموقع أكثر قوة في SEO.",
    longDefinition:
      "DR بيقاس بناءً على عدد وجودة الـ backlinks اللي بتيجي للموقع. مواقع زي Wikipedia عندها DR 95+. مواقع جديدة بتبدأ من 0. زيادة DR بتاخد وقت — متوسط شركة B2B جديدة بتوصل DR 30 في حوالي سنة-سنتين.",
    category: "تسويق",
    related: ["backlink", "seo"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    termEn: "Core Web Vitals",
    definition: "مقاييس Google لأداء الموقع: LCP، INP، CLS.",
    longDefinition:
      "Core Web Vitals = LCP (سرعة تحميل المحتوى الرئيسي < 2.5 ثانية), INP (سرعة الاستجابة للتفاعل < 200ms), CLS (ثبات التصميم < 0.1). Google بيستخدمها كـ ranking factor مباشر منذ 2021. مواقع بطيئة = ترتيب أقل + معدل ارتداد أعلى.",
    category: "أداء",
    related: ["lcp", "page-speed"],
  },
  {
    slug: "lcp",
    term: "LCP",
    termEn: "Largest Contentful Paint",
    definition: "وقت تحميل أكبر عنصر مرئي في الصفحة. الهدف: أقل من 2.5 ثانية.",
    longDefinition:
      "LCP عادةً بيكون صورة الـ hero أو video كبير. لتحسينه: استخدم next/image (تلقائياً priority للـ above-the-fold)، WebP/AVIF formats، Server-side rendering، CDN قريب من المستخدم.",
    category: "أداء",
    related: ["core-web-vitals", "page-speed"],
  },
  {
    slug: "page-speed",
    term: "سرعة الموقع",
    termEn: "Page Speed",
    definition: "الوقت اللي بياخده الموقع علشان يحمل بالكامل في المتصفح.",
    longDefinition:
      "كل 100ms تأخير في التحميل = 1% انخفاض في الـ conversion rate (Amazon). لتسريع الموقع: تحسين الصور، caching، minification للـ JS/CSS، استخدام CDN، lazy loading للمحتوى تحت الـ fold.",
    category: "أداء",
    related: ["core-web-vitals", "lcp"],
  },
  {
    slug: "schema-markup",
    term: "Schema Markup",
    termEn: "Schema.org Structured Data",
    definition:
      "كود JSON-LD بيشرح لـ Google محتوى الصفحة (شركة، خدمة، مقال، تقييم...إلخ).",
    longDefinition:
      "Schema بيخلي Google يفهم الصفحة بشكل أعمق وبيظهرها كـ Rich Result (نجوم، صور، أسئلة...). Schema markup ممكن يزيد الـ CTR بنسبة 20-30%. أنواع مهمة: Organization, LocalBusiness, Article, FAQ, Review, BreadcrumbList.",
    category: "تسويق",
    related: ["seo", "json-ld"],
  },
  {
    slug: "erp",
    term: "ERP",
    termEn: "Enterprise Resource Planning",
    definition:
      "نظام بيدمج كل عمليات الشركة (محاسبة، مخازن، مبيعات، HR) في منصة واحدة.",
    longDefinition:
      "ERP بيوحد البيانات والعمليات في الشركة. الفوايد: تقليل التكلفة 23%، زيادة الإنتاجية 25%، قرارات أسرع وأدق (Panorama Consulting Research). أنظمة شهيرة: SAP, Oracle, Odoo. Custom ERP بيكون مناسب أكتر للشركات اللي عندها متطلبات خاصة.",
    category: "أنظمة",
    related: ["crm", "automation"],
  },
  {
    slug: "crm",
    term: "CRM",
    termEn: "Customer Relationship Management",
    definition: "نظام لإدارة العلاقة مع العملاء: تتبع leads، contacts، deals.",
    longDefinition:
      "CRM بيخزن كل تفاعلاتك مع العملاء في مكان واحد. مفيد لفريق المبيعات، التسويق، خدمة العملاء. أنظمة شهيرة: Salesforce, HubSpot, Zoho. الـ CRM ممكن يزيد المبيعات بنسبة 29% (Salesforce Research).",
    category: "أنظمة",
    related: ["erp", "marketing-automation"],
  },
  {
    slug: "react",
    term: "React",
    termEn: "React",
    definition: "مكتبة JavaScript شهيرة لبناء واجهات المستخدم التفاعلية.",
    longDefinition:
      "React (من Meta) أكثر مكتبة Frontend استخداماً في العالم. بتعتمد على Components قابلة لإعادة الاستخدام. بنبني بيها مواقع، تطبيقات ويب معقدة، و حتى تطبيقات موبايل (React Native). شركات زي Facebook, Netflix, Airbnb بتستخدمها.",
    category: "تطوير",
    related: ["frontend", "javascript", "nextjs"],
  },
  {
    slug: "nextjs",
    term: "Next.js",
    termEn: "Next.js",
    definition: "Framework على React بيوفر SSR، static generation، و routing تلقائي.",
    longDefinition:
      "Next.js (من Vercel) framework عالمي لبناء مواقع سريعة و SEO-friendly. بيدعم Server-Side Rendering, Static Generation, API Routes في مكان واحد. Etqanly.com مبني بـ Next.js 16. شركات زي TikTok, Hulu, Twitch بتستخدمه.",
    category: "تطوير",
    related: ["react", "frontend"],
  },
  {
    slug: "wordpress",
    term: "WordPress",
    termEn: "WordPress",
    definition: "نظام إدارة محتوى (CMS) شهير بيشغل أكتر من 40% من مواقع الإنترنت.",
    longDefinition:
      "WordPress مفتوح المصدر ومجاني. مناسب جداً للمدونات، المواقع الصغيرة، المتاجر الإلكترونية (WooCommerce). عيوبه: بطء، أمان أقل، صعوبة في التخصيص العميق. Custom Development أفضل للمواقع الكبيرة والمعقدة.",
    category: "تطوير",
    related: ["cms"],
  },
  {
    slug: "cms",
    term: "CMS",
    termEn: "Content Management System",
    definition: "نظام إدارة محتوى يتيح لك تعديل الموقع بدون كتابة كود.",
    longDefinition:
      "CMS بيسمح للناس غير التقنيين بإدارة المحتوى: إضافة صفحات، مقالات، صور، تعديل النصوص. أنظمة CMS شهيرة: WordPress, Drupal, Joomla, Strapi (Headless). الـ Headless CMS الجديدة بتفصل الـ backend عن الـ frontend.",
    category: "تطوير",
    related: ["wordpress"],
  },
  {
    slug: "ssl",
    term: "SSL/HTTPS",
    termEn: "SSL Certificate",
    definition: "شهادة بتشفر البيانات بين المتصفح والسيرفر. ضرورية لأي موقع.",
    longDefinition:
      "SSL/TLS بيخلي الـ URL يبدأ بـ https:// (بدل http://) ويظهر القفل في المتصفح. Google بيرتب المواقع الـ HTTPS أعلى. بدون SSL، المتصفحات بتظهر تحذير 'Not Secure'. Let's Encrypt بيوفر SSL مجاني.",
    category: "أمان",
    related: ["security"],
  },
  {
    slug: "cybersecurity",
    term: "الأمن السيبراني",
    termEn: "Cybersecurity",
    definition: "حماية الأنظمة والبيانات من الهجمات والاختراقات.",
    longDefinition:
      "هجمات الـ ransomware زادت بـ 105% في 2025 (SonicWall). تكلفة اختراق بيانات شركة في الشرق الأوسط متوسطها $7.45 مليون (IBM). الحماية تشمل: firewall, encryption, MFA, training للموظفين, regular backups, security audits.",
    category: "أمان",
    related: ["ssl"],
  },
  {
    slug: "cloud-computing",
    term: "الحوسبة السحابية",
    termEn: "Cloud Computing",
    definition: "استخدام servers على الإنترنت بدل ما تشتري وتدير servers بنفسك.",
    longDefinition:
      "الـ Cloud بيوفر marketing pace, scalability, cost reduction. أكبر مزودين: AWS (Amazon), Microsoft Azure, Google Cloud. الـ pay-as-you-go model بيقلل التكلفة الأولية ويتيح للشركات الصغيرة استخدام بنية تحتية على مستوى الشركات الكبيرة.",
    category: "بنية تحتية",
    related: ["aws", "saas"],
  },
  {
    slug: "saas",
    term: "SaaS",
    termEn: "Software as a Service",
    definition: "برامج تصلها عبر الإنترنت بدون تثبيت (زي Gmail, Slack, Microsoft 365).",
    longDefinition:
      "SaaS غير مفهوم البرمجيات. بدل ما تشتري نسخة واحدة، بتدفع subscription شهري وتوصل من أي جهاز. السوق متوقع يوصل $232B بحلول 2024. بناء SaaS بيتطلب multi-tenancy, billing system, scalability من البداية.",
    category: "أنظمة",
    related: ["cloud-computing"],
  },
  {
    slug: "mvp",
    term: "MVP",
    termEn: "Minimum Viable Product",
    definition: "أبسط نسخة من المنتج بتحقق القيمة الأساسية. بتطلق علشان تختبر السوق.",
    longDefinition:
      "MVP من أهم المفاهيم في Lean Startup. الفكرة: بدل ما تبني المنتج كامل في 6 شهور، ابني أبسط نسخة شغالة في 6 أسابيع، أطلقها، شوف ردود الأفعال، عدّل حسب الـ feedback. شركات زي Dropbox, Airbnb, Instagram بدأوا بـ MVP بسيط.",
    category: "أعمال",
    related: ["agile"],
  },
  {
    slug: "agile",
    term: "Agile",
    termEn: "Agile Methodology",
    definition:
      "منهجية تطوير برمجيات بتعتمد على iterations قصيرة و flexibility مع التغيير.",
    longDefinition:
      "Agile (و Scrum منها) بيركز على: تسليم value باستمرار، تعاون مع العميل، التكيف مع التغيير. Sprints عادةً 2 أسبوع. Daily standups. Retrospectives. النتيجة: منتجات أحسن، عملاء أسعد، فرق أكثر إنتاجية.",
    category: "أعمال",
    related: ["mvp", "scrum"],
  },
  {
    slug: "devops",
    term: "DevOps",
    termEn: "DevOps",
    definition: "ثقافة وممارسات بتربط بين فريق التطوير (Dev) و Operations (Ops).",
    longDefinition:
      "DevOps بيشمل CI/CD pipelines, automation, infrastructure as code, monitoring. الفايدة: deployment أسرع 200x، mean time to recovery أقل بـ 24x (Google DORA Research). أدوات شهيرة: Jenkins, GitLab CI, Docker, Kubernetes, Terraform.",
    category: "بنية تحتية",
    related: ["cloud-computing", "ci-cd"],
  },
  {
    slug: "ci-cd",
    term: "CI/CD",
    termEn: "Continuous Integration / Continuous Deployment",
    definition:
      "أتمتة عملية اختبار ونشر الكود لتسريع الـ delivery وتقليل الأخطاء.",
    longDefinition:
      "CI/CD بيخلي الكود من commit للـ production تلقائياً (مع testing في كل خطوة). بدون CI/CD، فرق التطوير ممكن تاخد ساعات أو أيام لكل deployment. مع CI/CD، deployment ممكن يحصل عشرات المرات في اليوم بأمان.",
    category: "بنية تحتية",
    related: ["devops"],
  },
  {
    slug: "database",
    term: "قاعدة البيانات",
    termEn: "Database",
    definition: "مكان لتخزين البيانات بشكل منظم. زي MySQL, PostgreSQL, MongoDB.",
    longDefinition:
      "في نوعين رئيسيين: SQL (relational) زي MySQL, PostgreSQL, SQL Server — مناسبة للبيانات المنظمة. NoSQL زي MongoDB, Firebase — مرنة أكتر. اختيار قاعدة البيانات يعتمد على نوع التطبيق ومعدل النمو.",
    category: "تطوير",
    related: ["sql", "backend"],
  },
  {
    slug: "ai-ml",
    term: "الذكاء الاصطناعي",
    termEn: "AI / Machine Learning",
    definition:
      "تقنيات بتسمح للكمبيوتر يتعلم من البيانات ويتخذ قرارات بدون programming صريح.",
    longDefinition:
      "AI/ML بيستخدم في: chatbots, recommendation systems, fraud detection, predictive analytics. الشركات اللي بتستخدم AI بتزيد إنتاجيتها بنسبة 40% (Accenture). نماذج LLMs زي GPT و Claude غيرت السوق في 2024-2026.",
    category: "تقنيات حديثة",
    related: ["chatbot", "automation"],
  },
  {
    slug: "blockchain",
    term: "Blockchain",
    termEn: "Blockchain",
    definition: "تقنية لتسجيل المعاملات بشكل آمن وغير قابل للتغيير عبر شبكة موزعة.",
    longDefinition:
      "Blockchain أكثر من Bitcoin. الـ enterprise blockchains بتُستخدم في supply chain (تتبع البضائع), identity verification, smart contracts. الفوائد: شفافية، أمان، تقليل الوسطاء. المخاطر: التكلفة، سرعة المعالجة.",
    category: "تقنيات حديثة",
    related: ["cryptocurrency"],
  },
  {
    slug: "iot",
    term: "إنترنت الأشياء",
    termEn: "Internet of Things",
    definition:
      "ربط الأجهزة الفيزيائية (سيارات، أجهزة منزلية، sensors) بالإنترنت لتبادل البيانات.",
    longDefinition:
      "IoT متوقع يوصل لـ 75 مليار جهاز متصل بحلول 2025. تطبيقاته: smart cities, healthcare monitoring, industrial automation, agriculture. التحديات: الأمان (أجهزة كتيرة = نقاط هجوم كتيرة)، البطارية، التوصيل الموثوق.",
    category: "تقنيات حديثة",
    related: ["cloud-computing"],
  },
  {
    slug: "pwa",
    term: "PWA",
    termEn: "Progressive Web App",
    definition:
      "موقع ويب يتصرف زي تطبيق موبايل: يشتغل offline، fast، installable.",
    longDefinition:
      "PWAs بتقدم تجربة موبايل ممتازة من غير ما المستخدم يثبت تطبيق من Store. أمثلة: Twitter Lite, Pinterest, Starbucks. PWA بتقلل bounce rate بنسبة 38%، وبتزيد engagement بنسبة 137% (Google Research).",
    category: "تطوير",
    related: ["mobile-first", "responsive-design"],
  },
  {
    slug: "ssr",
    term: "SSR",
    termEn: "Server-Side Rendering",
    definition: "تحضير صفحات HTML على السيرفر قبل ما تروح للمتصفح. أحسن لـ SEO.",
    longDefinition:
      "SSR (مقابل CSR - Client-Side Rendering) بيخلي محركات البحث تشوف المحتوى الكامل فوراً. السرعة الأولية أحسن (LCP أقل). Next.js بتوفر SSR بشكل تلقائي. SSG (Static Site Generation) أسرع لكن المحتوى ثابت.",
    category: "تطوير",
    related: ["seo", "nextjs"],
  },
  {
    slug: "git",
    term: "Git",
    termEn: "Git",
    definition: "نظام لتتبع تغييرات الكود وتنظيم العمل بين المطورين.",
    longDefinition:
      "Git أهم أداة في التطوير الحديث. بتسجل كل تغيير في الكود، بتسمح بالعمل في فروع (branches) متوازية، وبتيسر العمل الجماعي. GitHub و GitLab و Bitbucket بيوفروا hosting للـ Git repositories.",
    category: "تطوير",
    related: ["ci-cd", "devops"],
  },
  {
    slug: "ux-research",
    term: "UX Research",
    termEn: "User Experience Research",
    definition: "دراسة سلوك المستخدمين لفهم احتياجاتهم وتحسين المنتج.",
    longDefinition:
      "UX Research بيشمل: user interviews, surveys, usability testing, A/B testing, analytics. الشركات اللي بتستثمر في UX Research بتشوف ROI بنسبة 9,900% (Forrester). فهم المستخدم أهم من أي feature تكنيك.",
    category: "تصميم",
    related: ["ux-ui"],
  },
  {
    slug: "ab-testing",
    term: "A/B Testing",
    termEn: "A/B Testing",
    definition: "اختبار نسختين من صفحة لمعرفة أيهما يحقق أداء أفضل.",
    longDefinition:
      "A/B testing علم وفن. بدل ما تعتمد على رأيك، بتختبر فرضية (مثلاً: زرار أحمر مقابل أخضر) وبتشوف النتائج الفعلية. تحتاج عينة كبيرة كفاية (عادةً +1000 زائر) علشان النتيجة تكون statistically significant.",
    category: "تسويق",
    related: ["ux-research", "conversion-rate"],
  },
  {
    slug: "conversion-rate",
    term: "Conversion Rate",
    termEn: "Conversion Rate",
    definition:
      "نسبة الزوار اللي بياخدوا إجراء معين (شراء، تسجيل، استشارة) من إجمالي الزوار.",
    longDefinition:
      "Conversion Rate من أهم مؤشرات نجاح الموقع. متوسط الـ B2B websites: 2-5%. لتحسينه: clear CTAs, social proof, fast page speed, trust signals (شهادات SSL, reviews), شفافية الأسعار.",
    category: "تسويق",
    related: ["ab-testing", "ctr"],
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(glossaryTerms.map((t) => t.category))];
}

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}
