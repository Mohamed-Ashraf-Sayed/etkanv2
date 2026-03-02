import { Project } from "./projects";

export const projectCategoriesEn = [
  { value: "all", label: "All" },
  { value: "website", label: "Websites" },
  { value: "mobile", label: "Apps" },
  { value: "systems", label: "Systems" },
  { value: "infrastructure", label: "Infrastructure" },
];

export const projectsEn: Project[] = [
  {
    slug: "saudi-real-estate-platform",
    title: "Integrated Real Estate Platform",
    client: "Gulf Real Estate Company",
    industry: "Real Estate",
    category: "website",
    categoryLabel: "Websites",
    summary: "A comprehensive real estate platform for listing and managing properties with an integrated booking and payment system",
    description:
      "We developed an integrated real estate platform that allows users to search for properties, book viewings, and complete purchases or rentals entirely online.",
    problem:
      "The company relied on traditional methods for property listings, leading to slow deal closings and difficulty reaching potential clients.",
    solution:
      "We built an integrated web platform with smart search, interactive maps, virtual tours, and a complete booking and payment system.",
    results: [
      { metric: "Sales Increase", value: "340%", description: "Sales growth within 6 months" },
      { metric: "New Clients", value: "2,500+", description: "New registered clients monthly" },
      { metric: "Deal Closing Time", value: "-60%", description: "Reduction in deal closing time" },
    ],
    tags: ["Next.js", "React", "PostgreSQL", "Interactive Maps"],
    testimonial: {
      text: "The platform completely changed the way we work. We achieved numbers we never imagined thanks to the Etqan team.",
      author: "Ahmed Al-Khalidi",
      role: "CEO, Gulf Real Estate Company",
    },
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Google Maps API"],
    duration: "12 weeks",
    year: "2024",
  },
  {
    slug: "healthcare-mobile-app",
    title: "Medical Appointment Booking App",
    client: "United Hospitals Group",
    industry: "Healthcare",
    category: "mobile",
    categoryLabel: "Apps",
    summary: "A mobile app for booking medical appointments and managing health records",
    description:
      "We developed a comprehensive mobile app that allows patients to book appointments, have remote consultations, access their medical records, and receive reminders.",
    problem:
      "Patients suffered from long waiting queues and difficulty booking appointments, affecting patient satisfaction and work efficiency.",
    solution:
      "We built an integrated appointment booking app with a management system for doctors and patients, smart notifications, and integration with the existing medical system.",
    results: [
      { metric: "Patient Satisfaction", value: "95%", description: "Patient satisfaction rate with the service" },
      { metric: "Wait Time Reduction", value: "-75%", description: "Reduction in waiting time" },
      { metric: "Monthly Bookings", value: "15,000+", description: "Monthly bookings through the app" },
    ],
    tags: ["React Native", "Firebase", "Node.js", "Mobile App"],
    testimonial: {
      text: "The app greatly simplified things for our patients and increased work efficiency in hospitals. Very professional work.",
      author: "Dr. Sarah Al-Omari",
      role: "Operations Director, United Hospitals",
    },
    techStack: ["React Native", "Firebase", "Node.js", "MongoDB", "WebRTC"],
    duration: "16 weeks",
    year: "2024",
  },
  {
    slug: "logistics-erp",
    title: "Logistics Company ERP System",
    client: "Al-Saree Transport Company",
    industry: "Transport & Logistics",
    category: "systems",
    categoryLabel: "Systems",
    summary: "A comprehensive ERP system for managing transport and logistics operations",
    description:
      "We developed an integrated ERP system including fleet management, live tracking, warehousing, invoicing, and HR in one unified platform.",
    problem:
      "The company relied on separate systems for each department, leading to data duplication, tracking difficulties, and weak operational efficiency.",
    solution:
      "We built a unified ERP system connecting all departments with a centralized dashboard, real-time reports, and live shipment tracking.",
    results: [
      { metric: "Operational Efficiency", value: "+45%", description: "Improvement in operational efficiency" },
      { metric: "Cost Reduction", value: "-30%", description: "Savings in operational costs" },
      { metric: "Data Accuracy", value: "99.5%", description: "Accuracy in data and reports" },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "ERP System"],
    testimonial: {
      text: "The system saved us hours of work every day and noticeably improved data accuracy. An excellent investment.",
      author: "Mohammed Al-Saree",
      role: "General Manager, Al-Saree Transport Company",
    },
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "GraphQL"],
    duration: "20 weeks",
    year: "2023",
  },
  {
    slug: "corporate-network-setup",
    title: "Enterprise Network Setup",
    client: "Al-Aman Egyptian Bank",
    industry: "Banking Sector",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    summary: "Setting up and securing the network infrastructure for a new bank branch",
    description:
      "We set up the complete infrastructure for a new bank branch including networks, servers, security systems, and monitoring systems with the highest security standards.",
    problem:
      "The bank needed a complete and secure infrastructure for the new branch that complies with international banking security standards.",
    solution:
      "We designed and implemented comprehensive infrastructure with a fully secured network, advanced firewalls, backup systems, and a local data center.",
    results: [
      { metric: "Uptime", value: "99.99%", description: "Uptime rate without interruption" },
      { metric: "Security Incidents", value: "Zero", description: "Security incidents since operation" },
      { metric: "Response Speed", value: "<1 sec", description: "Average system response time" },
    ],
    tags: ["Cisco", "Fortinet", "VMware", "Enterprise Networks"],
    testimonial: {
      text: "A professional and committed team with the highest standards. The infrastructure has been working perfectly since day one.",
      author: "Eng. Khaled Mostafa",
      role: "IT Director, Al-Aman Bank",
    },
    techStack: ["Cisco", "Fortinet", "VMware ESXi", "Veeam", "Active Directory"],
    duration: "6 weeks",
    year: "2024",
  },
  {
    slug: "ecommerce-platform",
    title: "Advanced E-Commerce Store",
    client: "Al-Anaka Fashion Company",
    industry: "E-Commerce",
    category: "website",
    categoryLabel: "Websites",
    summary: "A fully integrated online store with inventory management and shipping system",
    description:
      "We built an advanced online store with a seamless shopping experience, smart inventory management, and integration with local shipping companies.",
    problem:
      "The company was only selling from their physical store and wanted to expand online but had no e-commerce experience.",
    solution:
      "We developed a fully integrated online store with attractive design, secure payment system, smart inventory management, and shipping company integration.",
    results: [
      { metric: "Online Revenue", value: "250%", description: "Revenue growth within 4 months" },
      { metric: "Daily Orders", value: "200+", description: "Daily orders through the store" },
      { metric: "Conversion Rate", value: "4.2%", description: "Above-average conversion rate" },
    ],
    tags: ["Next.js", "Stripe", "Inventory Management", "E-Commerce"],
    techStack: ["Next.js", "React", "Stripe", "PostgreSQL", "Node.js"],
    duration: "10 weeks",
    year: "2023",
  },
  {
    slug: "hr-management-system",
    title: "HR Management System",
    client: "Nile Industrial Group",
    industry: "Manufacturing",
    category: "systems",
    categoryLabel: "Systems",
    summary: "A comprehensive HR system for managing 500+ employees",
    description:
      "We built a comprehensive HR system including attendance management, payroll, leave, evaluations, and recruitment for over 500 employees.",
    problem:
      "Managing 500+ employees with manual methods and Excel sheets was exhausting and full of errors and payroll calculation issues.",
    solution:
      "We developed an integrated HR system with a smart fingerprint system, automatic payroll calculation, employee self-service portal, and comprehensive reports.",
    results: [
      { metric: "Time Savings", value: "70%", description: "Savings in HR operation time" },
      { metric: "Payroll Accuracy", value: "100%", description: "Accuracy in payroll calculations" },
      { metric: "Employee Satisfaction", value: "+40%", description: "Improvement in employee satisfaction" },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "HR System"],
    testimonial: {
      text: "The system made HR work incredibly easier. Employees can now track everything from their phones.",
      author: "Ms. Noura Hassan",
      role: "HR Director, Nile Group",
    },
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "biometric API"],
    duration: "14 weeks",
    year: "2023",
  },
];

export function getProjectBySlugEn(slug: string): Project | undefined {
  return projectsEn.find((p) => p.slug === slug);
}

export function getProjectsByCategoryEn(category: string): Project[] {
  if (category === "all") return projectsEn;
  return projectsEn.filter((p) => p.category === category);
}
