import { Service } from "./services";

export const serviceCategoriesEn = [
  {
    slug: "web-and-apps",
    title: "Web & App Development",
    description:
      "We design and develop professional websites and applications using the latest technologies, combining creative design with high performance to achieve your business goals.",
    icon: "Globe",
  },
  {
    slug: "enterprise-systems",
    title: "Enterprise Systems",
    description:
      "We build integrated management systems (HR/ERP/CRM) customized for your company's needs, to automate processes and improve productivity.",
    icon: "Building2",
  },
  {
    slug: "infrastructure",
    title: "IT Infrastructure",
    description:
      "We set up and secure your company's technical infrastructure including networks, servers, and security systems with the highest quality standards.",
    icon: "Server",
  },
  {
    slug: "support",
    title: "Technical Support & Maintenance",
    description:
      "A specialized technical support team available to help you maintain your systems and resolve technical issues quickly and professionally.",
    icon: "Headphones",
  },
  {
    slug: "consulting",
    title: "Consulting & Planning",
    description:
      "We provide comprehensive feasibility studies and specialized investment consultations to help you make the right decisions and achieve the highest returns.",
    icon: "TrendingUp",
  },
];

export const servicesEn: Service[] = [
  {
    slug: "web-dev",
    title: "Website Development",
    shortTitle: "Web Development",
    category: "Web & App Development",
    categorySlug: "web-and-apps",
    description:
      "We develop responsive, fast websites using the latest technologies like Next.js and React, focusing on user experience, performance, and SEO optimization.",
    shortDescription: "Professional, fast, and responsive websites with cutting-edge technologies",
    icon: "Globe",
    benefits: [
      "Responsive design that works on all devices",
      "Ultra-fast loading speed and excellent performance",
      "Built-in Search Engine Optimization (SEO)",
      "Easy-to-use content management panel",
      "Advanced security and protection",
    ],
    deliverables: [
      "Complete UI/UX design",
      "Fully integrated website ready for launch",
      "Content management panel",
      "Performance and speed report",
      "User guide",
      "3 months free technical support",
    ],
    process: [
      { step: 1, title: "Analysis & Planning", description: "We analyze your requirements and create a clear action plan" },
      { step: 2, title: "Design", description: "We design user interfaces in a modern and attractive style" },
      { step: 3, title: "Development", description: "We build the website using the latest technologies" },
      { step: 4, title: "Testing & Launch", description: "We test everything and launch the site with confidence" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    timeline: "4 - 8 weeks",
    faqs: [
      {
        question: "Is the website mobile-responsive?",
        answer: "Absolutely, all our websites are designed with a Mobile-First approach to work perfectly on all devices.",
      },
      {
        question: "Do you offer SEO services?",
        answer: "Yes, we ensure best SEO practices in every website, with the option for advanced SEO services as an add-on.",
      },
      {
        question: "How long does it take to develop a full website?",
        answer: "It depends on the project size, but the average is 4 to 8 weeks for medium-sized websites.",
      },
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    category: "Web & App Development",
    categorySlug: "web-and-apps",
    description:
      "We develop native and hybrid mobile apps for iOS and Android, with smooth user experience and high performance that meets your business needs.",
    shortDescription: "iOS and Android apps with outstanding design and high performance",
    icon: "Smartphone",
    benefits: [
      "One app that works on both iOS and Android",
      "Attractive and easy-to-use interface design",
      "High performance and fast response",
      "Push notifications and service integration",
      "Continuous updates and support",
    ],
    deliverables: [
      "App UI/UX design",
      "App ready for store publication",
      "API (Application Programming Interface)",
      "Admin panel",
      "Comprehensive testing",
      "Publication on App Store and Google Play",
    ],
    process: [
      { step: 1, title: "Requirements Study", description: "We understand your idea and user needs" },
      { step: 2, title: "Experience Design", description: "We design a smooth user experience and attractive interfaces" },
      { step: 3, title: "Development & Build", description: "We build the app with the latest development technologies" },
      { step: 4, title: "Testing & Publishing", description: "We test and launch the app on stores" },
    ],
    techStack: ["React Native", "Flutter", "Firebase", "Node.js", "REST API", "MongoDB"],
    timeline: "8 - 16 weeks",
    faqs: [
      {
        question: "Do you develop for both iOS and Android?",
        answer: "Yes, we use technologies like React Native and Flutter to build one app that works on both platforms.",
      },
      {
        question: "Do you handle app store publishing?",
        answer: "Yes, we handle the entire publishing process on App Store and Google Play.",
      },
    ],
  },
  {
    slug: "crm",
    title: "Customer Relationship Management (CRM)",
    shortTitle: "CRM System",
    category: "Enterprise Systems",
    categorySlug: "enterprise-systems",
    description:
      "We build custom CRM systems to manage your clients and sales efficiently, with smart reports and analytics to help you make decisions.",
    shortDescription: "Smart and efficient client and sales management",
    icon: "Users",
    benefits: [
      "Centralized management of all client data",
      "Easy sales and deal tracking",
      "Smart reports and analytics",
      "Automation of repetitive tasks",
      "Integration with email and other applications",
    ],
    deliverables: [
      "Fully integrated custom CRM system",
      "Interactive dashboard",
      "Reports and statistics",
      "Mobile app for the team",
      "Team training",
      "6 months technical support",
    ],
    process: [
      { step: 1, title: "Process Analysis", description: "We study sales processes and client interactions" },
      { step: 2, title: "System Design", description: "We design the system that fits your needs" },
      { step: 3, title: "Development & Customization", description: "We build and customize the system per your requirements" },
      { step: 4, title: "Training & Delivery", description: "We train your team and deliver the system ready to use" },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "REST API"],
    timeline: "8 - 14 weeks",
    faqs: [
      {
        question: "Can the system be customized to our needs?",
        answer: "Absolutely, every system is built from scratch according to your company's processes and specific needs.",
      },
      {
        question: "Can it integrate with other systems?",
        answer: "Yes, we support integration with email, WhatsApp, accounting systems, and more.",
      },
    ],
  },
  {
    slug: "erp",
    title: "Enterprise Resource Planning (ERP)",
    shortTitle: "ERP System",
    category: "Enterprise Systems",
    categorySlug: "enterprise-systems",
    description:
      "We develop comprehensive ERP systems to manage all your company operations from finance, inventory, and HR in one integrated system.",
    shortDescription: "Comprehensive management of all your company operations in one place",
    icon: "Building2",
    benefits: [
      "Unified management for all company departments",
      "Cost reduction and efficiency improvement",
      "Comprehensive financial and administrative reports",
      "Department integration and communication facilitation",
      "Scalability with company growth",
    ],
    deliverables: [
      "Fully integrated ERP system",
      "Finance, inventory, and HR modules",
      "Dashboards for each department",
      "Custom reports",
      "Legacy data migration",
      "Comprehensive team training",
    ],
    process: [
      { step: 1, title: "Business Study", description: "We analyze all company operations and departments" },
      { step: 2, title: "Architecture Design", description: "We design the system structure and modules" },
      { step: 3, title: "Phased Development", description: "We develop the system in phases with continuous testing" },
      { step: 4, title: "Migration & Training", description: "We migrate data and train all departments" },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "GraphQL"],
    timeline: "16 - 24 weeks",
    faqs: [
      {
        question: "Does the system fully support Arabic?",
        answer: "Yes, all our systems are built with full Arabic and English support with right-to-left layout.",
      },
      {
        question: "Can we start with one module and expand later?",
        answer: "Absolutely, we design the system architecturally to allow easy addition of new modules.",
      },
    ],
  },
  {
    slug: "networks",
    title: "Network Setup & Security",
    shortTitle: "Networks & Security",
    category: "IT Infrastructure",
    categorySlug: "infrastructure",
    description:
      "We design and set up corporate networks with the latest equipment and technologies, with comprehensive security against cyber threats and ensuring business continuity.",
    shortDescription: "Secure and reliable networks for a stable work environment",
    icon: "Network",
    benefits: [
      "Fast and reliable network",
      "Advanced threat protection",
      "Centralized monitoring and management",
      "Easy scalability",
      "Business continuity assurance",
    ],
    deliverables: [
      "Complete network design",
      "Equipment installation and setup",
      "Firewall and security setup",
      "Network monitoring system",
      "Complete technical documentation",
      "Periodic maintenance",
    ],
    process: [
      { step: 1, title: "Survey & Assessment", description: "We assess the current situation and network needs" },
      { step: 2, title: "Design", description: "We design the appropriate network structure" },
      { step: 3, title: "Implementation", description: "We install and configure all equipment and software" },
      { step: 4, title: "Testing & Delivery", description: "We test performance and security and deliver the project" },
    ],
    techStack: ["Cisco", "Fortinet", "Ubiquiti", "Mikrotik", "VMware", "Active Directory"],
    timeline: "2 - 6 weeks",
    faqs: [
      {
        question: "Do you support enterprise Wi-Fi networks?",
        answer: "Yes, we design and install enterprise Wi-Fi networks with full coverage and centralized management.",
      },
      {
        question: "Do you provide network monitoring services?",
        answer: "Yes, we provide 24/7 monitoring with instant alerts when any issue occurs.",
      },
    ],
  },
  {
    slug: "it-support",
    title: "Technical Support & Maintenance",
    shortTitle: "IT Support",
    category: "Technical Support & Maintenance",
    categorySlug: "support",
    description:
      "We provide comprehensive technical support services to ensure your business continuity, with a specialized team available for quick response and solving technical issues.",
    shortDescription: "Specialized technical support and regular maintenance for your systems",
    icon: "Headphones",
    benefits: [
      "Fast and available technical support",
      "Preventive periodic maintenance",
      "Remote and on-site problem solving",
      "Continuous security updates",
      "Monthly performance reports",
    ],
    deliverables: [
      "Comprehensive support contract",
      "Multiple communication channels",
      "Defined response time (SLA)",
      "Scheduled periodic maintenance",
      "Monthly reports",
      "Ongoing technical consultations",
    ],
    process: [
      { step: 1, title: "Environment Assessment", description: "We assess your current systems and identify needs" },
      { step: 2, title: "Support Plan", description: "We create a customized support plan for your company" },
      { step: 3, title: "Service Start", description: "We begin support and maintenance as planned" },
      { step: 4, title: "Continuous Improvement", description: "We monitor and improve performance continuously" },
    ],
    techStack: ["Remote Desktop", "Monitoring Tools", "Ticketing System", "Backup Solutions"],
    timeline: "Annual renewable contract",
    faqs: [
      {
        question: "What are the support hours?",
        answer: "We provide support during business hours, with 24/7 support available for premium contracts.",
      },
      {
        question: "Do you offer remote support?",
        answer: "Yes, most issues are resolved remotely within minutes, with on-site visits available when needed.",
      },
    ],
  },
  {
    slug: "feasibility-studies",
    title: "Feasibility Studies & Investment Consulting",
    shortTitle: "Feasibility Studies",
    category: "Consulting & Planning",
    categorySlug: "consulting",
    description:
      "We prepare comprehensive feasibility studies for technical and industrial projects, with detailed market and competitor analysis, cost and return evaluation, to help you make informed investment decisions.",
    shortDescription: "Comprehensive feasibility studies and professional investment analysis for your project",
    icon: "TrendingUp",
    benefits: [
      "Comprehensive feasibility studies for technical and industrial projects",
      "Market and competitor analysis to identify success opportunities",
      "Cost and return evaluation with optimal strategy recommendations",
      "Detailed report with clear implementation plan",
      "Data-driven investment consultations",
    ],
    deliverables: [
      "Comprehensive feasibility study report",
      "Market and competitor analysis",
      "Financial analysis and return projections",
      "Detailed implementation plan with timeline",
      "Risk assessment and mitigation plan",
      "Investor presentation",
    ],
    process: [
      { step: 1, title: "Information Gathering", description: "We collect all required data about the project and target market" },
      { step: 2, title: "Analysis & Study", description: "We analyze the market and competitors and evaluate technical and financial feasibility" },
      { step: 3, title: "Report Preparation", description: "We prepare the comprehensive feasibility study report with recommendations" },
      { step: 4, title: "Delivery & Follow-up", description: "We deliver the study and provide follow-up consultations to support your decision" },
    ],
    techStack: ["Financial Analysis", "Market Research", "SWOT Analysis", "Financial Modeling", "Risk Assessment", "Power BI"],
    timeline: "2 - 4 weeks",
    faqs: [
      {
        question: "What types of projects do you provide feasibility studies for?",
        answer: "We provide feasibility studies for all types of projects: technical, industrial, commercial, and service-based. Whether it's a startup or an expansion of an existing project.",
      },
      {
        question: "Does the feasibility study include detailed financial analysis?",
        answer: "Yes, the study includes a complete financial analysis including cost estimation, revenue projections, break-even point, ROI, and payback period.",
      },
      {
        question: "Can you help us present the study to investors?",
        answer: "Absolutely, we prepare a professional pitch deck with the study and help you prepare everything needed to present your project to investors.",
      },
    ],
  },
];

export function getServiceBySlugEn(slug: string): Service | undefined {
  return servicesEn.find((s) => s.slug === slug);
}

export function getServicesByCategoryEn(categorySlug: string): Service[] {
  return servicesEn.filter((s) => s.categorySlug === categorySlug);
}
