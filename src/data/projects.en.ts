import { Project } from "./projects";

export const projectCategoriesEn = [
  { value: "all", label: "All" },
  { value: "website", label: "Websites" },
];

export const projectsEn: Project[] = [
  {
    slug: "masar-infrastructure",
    title: "Masar Infrastructure Company Website",
    client: "Masar Company",
    industry: "Construction & Infrastructure",
    category: "website",
    categoryLabel: "Websites",
    summary: "Corporate website for a major construction company specializing in large-scale infrastructure projects in Egypt",
    description:
      "We designed a professional website for Masar that reflects the scale of their major infrastructure projects, with detailed project showcases, partnerships, and technical capabilities.",
    problem:
      "The company needed a website that reflects its true scale as a major infrastructure firm and showcases its national projects professionally.",
    solution:
      "We built a comprehensive corporate website with a strong design showcasing major projects like the New Suez Canal and Electric Train, with detailed pages for each project.",
    results: [
      { metric: "Projects Showcased", value: "15+", description: "National projects featured on the website" },
      { metric: "Partnerships", value: "Siemens", description: "International partnerships with major companies" },
      { metric: "Capital", value: "4 Billion", description: "EGP in showcased project value" },
    ],
    tags: ["WordPress", "Corporate Website", "Infrastructure", "Construction"],
    thumbnail: "/images/projects/masar-infrastructure.jpg",
    images: [
      "/images/projects/masar-infrastructure-2.jpg",
      "/images/projects/masar-infrastructure-3.jpg",
      "/images/projects/masar-infrastructure-4.jpg",
      "/images/projects/masar-infrastructure-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "8 weeks",
    year: "2024",
  },
  {
    slug: "masarat-education-platform",
    title: "Masarat Educational Platform",
    client: "Masarat",
    industry: "E-Learning",
    category: "website",
    categoryLabel: "Websites",
    summary: "A comprehensive educational platform offering online courses from specialized experts across various fields",
    description:
      "We developed a comprehensive educational platform that allows learners to access courses in programming, design, and marketing, with enrollment, progress tracking, and interactive content.",
    problem:
      "The client needed a comprehensive Arabic educational platform that could compete with major platforms and offer an easy user experience.",
    solution:
      "We built an educational platform with a full LMS system, enrollment and payment system, learner progress tracking, and completion certificates.",
    results: [
      { metric: "Learners", value: "1,000+", description: "Registered learners on the platform" },
      { metric: "Courses", value: "50+", description: "Available courses across various fields" },
      { metric: "Completion Rate", value: "78%", description: "Course completion rate" },
    ],
    tags: ["Educational Platform", "LMS", "Online Courses", "E-Learning"],
    thumbnail: "/images/projects/masarat-education-platform.jpg",
    images: [
      "/images/projects/masarat-education-platform-2.jpg",
      "/images/projects/masarat-education-platform-3.jpg",
      "/images/projects/masarat-education-platform-4.jpg",
      "/images/projects/masarat-education-platform-5.jpg",
    ],
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe"],
    duration: "12 weeks",
    year: "2024",
  },
  {
    slug: "genesis-mining",
    title: "Genesis Mining Company Website",
    client: "Genesis Mining",
    industry: "Mining & Mineral Resources",
    category: "website",
    categoryLabel: "Websites",
    summary: "Corporate website for a major Egyptian mining company with global export operations",
    description:
      "We designed a professional bilingual website for Genesis Mining showcasing their mineral products, operational processes, and global expansion plans.",
    problem:
      "The company with $300M capital needed a website that reflects its global scale and targets clients in Asia, Africa, and Europe.",
    solution:
      "We built a multilingual website with modern design showcasing products and operations with a digital catalog and detailed product pages.",
    results: [
      { metric: "Monthly Production", value: "500K tons", description: "Monthly production capacity" },
      { metric: "Workforce", value: "1,800+", description: "Engineers, technicians, and workers" },
      { metric: "Markets", value: "4 Continents", description: "Exports to Asia, Africa, Europe, and Americas" },
    ],
    tags: ["WordPress", "Corporate Website", "Mining", "Export"],
    thumbnail: "/images/projects/genesis-mining.jpg",
    images: [
      "/images/projects/genesis-mining-2.jpg",
      "/images/projects/genesis-mining-3.jpg",
      "/images/projects/genesis-mining-4.jpg",
      "/images/projects/genesis-mining-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "WooCommerce", "PHP"],
    duration: "10 weeks",
    year: "2024",
  },
  {
    slug: "art-vision-agency",
    title: "Art Vision Creative Agency Website",
    client: "Art Vision",
    industry: "Marketing & Digital Creativity",
    category: "website",
    categoryLabel: "Websites",
    summary: "Website for a full-service creative agency specializing in digital content and marketing",
    description:
      "We designed a distinctive website for Art Vision agency showcasing their digital marketing, content creation, and brand management services with a creative and attractive design.",
    problem:
      "The agency needed a website that reflects their creativity and showcases their work in a distinctive way to attract clients and brands.",
    solution:
      "We built a website with a unique creative design, interactive portfolio, detailed service pages, and a blog to showcase expertise.",
    results: [
      { metric: "New Clients", value: "+60%", description: "Increase in client inquiries" },
      { metric: "Engagement", value: "3x", description: "Increase in website browsing time" },
      { metric: "Projects", value: "25+", description: "Projects showcased in portfolio" },
    ],
    tags: ["WordPress", "Creative Agency", "Digital Marketing", "Content"],
    thumbnail: "/images/projects/art-vision-agency.jpg",
    images: [
      "/images/projects/art-vision-agency-2.jpg",
      "/images/projects/art-vision-agency-3.jpg",
      "/images/projects/art-vision-agency-4.jpg",
      "/images/projects/art-vision-agency-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "Bootstrap"],
    duration: "8 weeks",
    year: "2024",
  },
  {
    slug: "al-qayrawana-contracting",
    title: "Al-Qayrawana Contracting Company Website",
    client: "Al-Qayrawana General Contracting",
    industry: "Contracting & Construction",
    category: "website",
    categoryLabel: "Websites",
    summary: "Corporate website for a prestigious Egyptian contracting company with over 25 years of experience",
    description:
      "We designed a professional website for Al-Qayrawana showcasing their housing, utilities, and road projects with over 25 years of experience.",
    problem:
      "The company with 25+ years of experience and government partnerships needed a digital presence worthy of its history and scale.",
    solution:
      "We built a corporate website showcasing completed projects, team, and government partnerships with a professional design reflecting the company's quality.",
    results: [
      { metric: "Experience", value: "25+ Years", description: "Experience in contracting and construction" },
      { metric: "Projects", value: "100+", description: "Completed projects in Egypt" },
      { metric: "Partnerships", value: "Government", description: "Partnerships with the Engineering Authority" },
    ],
    tags: ["WordPress", "Corporate Website", "Contracting", "Construction"],
    thumbnail: "/images/projects/al-qayrawana-contracting.jpg",
    images: [
      "/images/projects/al-qayrawana-contracting-2.jpg",
      "/images/projects/al-qayrawana-contracting-3.jpg",
      "/images/projects/al-qayrawana-contracting-4.jpg",
      "/images/projects/al-qayrawana-contracting-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "6 weeks",
    year: "2024",
  },
  {
    slug: "al-saleh-education",
    title: "Al-Saleh Educational Capabilities Platform",
    client: "Al-Saleh Educational Capabilities",
    industry: "E-Learning",
    category: "website",
    categoryLabel: "Websites",
    summary: "Educational platform with a full LMS system for delivering online training courses",
    description:
      "We developed a comprehensive e-learning platform with a Learning Management System (LMS) enabling course display, enrollment, and progress tracking.",
    problem:
      "The client needed an easy-to-use educational platform that could accommodate a large number of students and provide an interactive learning experience.",
    solution:
      "We built a platform with a full LMS system including enrollment, virtual classrooms, and interactive quizzes with full Arabic language support.",
    results: [
      { metric: "Students", value: "500+", description: "Students enrolled on the platform" },
      { metric: "Courses", value: "30+", description: "Available training courses" },
      { metric: "Satisfaction Rate", value: "92%", description: "Student satisfaction rate" },
    ],
    tags: ["WordPress", "LMS", "Educational Platform", "E-Learning"],
    thumbnail: "/images/projects/al-saleh-education.jpeg",
    images: [
      "/images/projects/al-saleh-education-2.jpg",
      "/images/projects/al-saleh-education-3.jpg",
      "/images/projects/al-saleh-education-4.jpg",
      "/images/projects/al-saleh-education-5.jpg",
    ],
    techStack: ["WordPress", "LearnPress", "Elementor", "PHP"],
    duration: "6 weeks",
    year: "2024",
  },
  {
    slug: "fawasil-aljouf-recruitment",
    title: "Fawasil Al-Jouf Recruitment Website",
    client: "Fawasil Al-Jouf Company",
    industry: "Recruitment & Employment",
    category: "website",
    categoryLabel: "Websites",
    summary: "Website for a Saudi recruitment company specializing in domestic labor services",
    description:
      "We designed a comprehensive website for Fawasil Al-Jouf showcasing recruitment services from multiple countries with an online service request system.",
    problem:
      "The company needed a website to simplify the recruitment service request process and present services clearly and professionally.",
    solution:
      "We built a website with a clear design showcasing recruitment services from 6 countries with a service request form and WhatsApp integration for direct communication.",
    results: [
      { metric: "Requests", value: "1,700+", description: "Successful recruitment operations" },
      { metric: "Monthly Contracts", value: "500+", description: "Active monthly contracts" },
      { metric: "Countries", value: "6 Countries", description: "Diverse recruitment sources" },
    ],
    tags: ["WordPress", "Service Website", "Recruitment", "Saudi Arabia"],
    thumbnail: "/images/projects/fawasil-aljouf-recruitment.jpg",
    images: [
      "/images/projects/fawasil-aljouf-recruitment-2.jpg",
      "/images/projects/fawasil-aljouf-recruitment-3.jpg",
      "/images/projects/fawasil-aljouf-recruitment-4.jpg",
      "/images/projects/fawasil-aljouf-recruitment-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "5 weeks",
    year: "2024",
  },
  {
    slug: "mida-construction",
    title: "Mida United Foundation Company Website",
    client: "Mida United Foundation Company",
    industry: "Contracting & Sustainable Development",
    category: "website",
    categoryLabel: "Websites",
    summary: "Corporate website for a leading contracting company in construction and sustainable development",
    description:
      "We designed a professional website for Mida reflecting their leadership in contracting and sustainable development with a showcase of their projects and services.",
    problem:
      "The company needed a strong digital presence reflecting their vision in sustainable development and showcasing their projects professionally.",
    solution:
      "We built a corporate website with modern design showcasing projects and services with a focus on the sustainable development message.",
    results: [
      { metric: "Projects", value: "50+", description: "Completed projects" },
      { metric: "Digital Presence", value: "100%", description: "Complete digital transformation" },
      { metric: "Inquiries", value: "+80%", description: "Increase in client inquiries" },
    ],
    tags: ["Corporate Website", "Contracting", "Sustainable Development", "Modern Design"],
    thumbnail: "/images/projects/mida-construction.jpg",
    images: [
      "/images/projects/mida-construction-2.jpg",
      "/images/projects/mida-construction-3.jpg",
      "/images/projects/mida-construction-4.jpg",
      "/images/projects/mida-construction-5.jpg",
    ],
    techStack: ["HTML/CSS", "JavaScript", "Responsive Design"],
    duration: "7 weeks",
    year: "2024",
  },
  {
    slug: "klinicon-healthcare",
    title: "Klinicon Medical Platform",
    client: "Klinicon",
    industry: "Healthcare",
    category: "website",
    categoryLabel: "Websites",
    summary: "A comprehensive medical platform for delivering healthcare services and medical consultations",
    description:
      "We developed a comprehensive medical platform for Klinicon connecting patients with doctors and providing integrated healthcare services with a modern and user-friendly design.",
    problem:
      "The client needed a medical platform connecting patients with doctors and simplifying the search, booking, and consultation process.",
    solution:
      "We built a medical platform with smart doctor and specialty search, appointment booking system, and easy interface for patients and doctors.",
    results: [
      { metric: "Doctors", value: "100+", description: "Doctors registered on the platform" },
      { metric: "Specialties", value: "20+", description: "Available medical specialties" },
      { metric: "Bookings", value: "2,000+", description: "Monthly bookings through the platform" },
    ],
    tags: ["WordPress", "Medical Platform", "Healthcare", "Appointment Booking"],
    thumbnail: "/images/projects/klinicon-healthcare.jpg",
    images: [
      "/images/projects/klinicon-healthcare-2.jpg",
      "/images/projects/klinicon-healthcare-3.jpg",
      "/images/projects/klinicon-healthcare-4.jpg",
      "/images/projects/klinicon-healthcare-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    duration: "14 weeks",
    year: "2024",
  },
];

export function getProjectBySlugEn(slug: string): Project | undefined {
  return projectsEn.find((p) => p.slug === slug);
}

export function getProjectsByCategoryEn(category: string): Project[] {
  if (category === "all") return projectsEn;
  return projectsEn.filter((p) => p.category === category);
}
