export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gender: "male" | "female";
}

export const team: TeamMember[] = [
  {
    name: "م. أحمد محمد",
    role: "المؤسس والمدير التنفيذي",
    bio: "أكثر من 12 سنة خبرة في قيادة المشاريع التقنية وبناء فرق تطوير ناجحة.",
    initials: "أم",
    gender: "male",
  },
  {
    name: "م. خالد إبراهيم",
    role: "مدير البنية التحتية",
    bio: "متخصص في تصميم وتأمين شبكات المؤسسات مع شهادات Cisco وFortinet.",
    initials: "خإ",
    gender: "male",
  },
  {
    name: "أ. ليلى أحمد",
    role: "مديرة التصميم وتجربة المستخدم",
    bio: "مصممة UX/UI بخبرة 8 سنوات في تصميم تجارب رقمية استثنائية.",
    initials: "لأ",
    gender: "female",
  },
  {
    name: "م. عمر حسن",
    role: "مدير تطوير البرمجيات",
    bio: "مطور Full-Stack بخبرة 10 سنوات، متخصص في بناء أنظمة معقدة وقابلة للتوسع.",
    initials: "عح",
    gender: "male",
  },
  {
    name: "أ. سارة يوسف",
    role: "مديرة المشاريع",
    bio: "PMP معتمدة مع خبرة في إدارة مشاريع تقنية كبرى في مصر والسعودية.",
    initials: "سي",
    gender: "female",
  },
  {
    name: "م. محمود علي",
    role: "مهندس DevOps أول",
    bio: "متخصص في السحابة وأتمتة العمليات مع شهادات AWS وAzure.",
    initials: "مع",
    gender: "male",
  },
];

export const milestones = [
  { year: "2018", title: "تأسيس الشركة", description: "بدأنا رحلتنا من القاهرة بفريق من 3 أشخاص" },
  { year: "2019", title: "أول 10 عملاء", description: "حققنا ثقة أول 10 شركات وبدأنا نتوسع" },
  { year: "2020", title: "التوسع الإقليمي", description: "فتحنا فرعنا في الرياض لخدمة السوق السعودي" },
  { year: "2021", title: "50 مشروع ناجح", description: "وصلنا لـ 50 مشروع ناجح وفريق من 15 شخص" },
  { year: "2022", title: "شراكات استراتيجية", description: "شراكات مع Microsoft وCisco وAWS" },
  { year: "2023", title: "أكثر من 100 مشروع", description: "تجاوزنا 100 مشروع ناجح و50 عميل نشط" },
  { year: "2024", title: "قيادة السوق", description: "أصبحنا من أفضل شركات الحلول التقنية في المنطقة" },
];

export const stats = [
  { value: 200, suffix: "+", label: "مشروع ناجح", icon: "Briefcase" },
  { value: 75, suffix: "+", label: "عميل نشط", icon: "Users" },
  { value: 30, suffix: "+", label: "مهندس محترف", icon: "Code2" },
  { value: 6, suffix: "+", label: "سنوات خبرة", icon: "Calendar" },
];

export const values = [
  {
    title: "الجودة أولاً",
    description: "نلتزم بأعلى معايير الجودة في كل مشروع، ولا نقبل بأقل من التميز.",
  },
  {
    title: "الابتكار المستمر",
    description: "نتبنى أحدث التقنيات والمنهجيات لتقديم حلول مبتكرة وفعالة.",
  },
  {
    title: "الشراكة الحقيقية",
    description: "نعامل عملائنا كشركاء نجاح، ونهتم بنجاحهم كما نهتم بنجاحنا.",
  },
  {
    title: "الشفافية والثقة",
    description: "نعمل بشفافية كاملة ونبني علاقات مبنية على الثقة والمصداقية.",
  },
];
