import { Project } from "./projects";

export const projectCategoriesEn = [
  { value: "all", label: "All" },
  { value: "website", label: "Websites" },
];

export const projectsEn: Project[] = [
  {
    slug: "arab-future-architecture",
    title: "Arab Future Architecture Company Website",
    client: "Arab Future Ltd",
    industry: "Architecture & Construction",
    category: "website",
    categoryLabel: "Websites",
    summary:
      "Professional corporate website for a leading Saudi architectural firm specializing in prefabricated decorative facades and historical building restoration",
    description:
      "We designed a comprehensive corporate website for Arab Future Ltd showcasing their 12+ years of experience and 350+ completed projects, with a complete portfolio gallery and detailed pages for each service line.",
    problem:
      "The company needed a website that reflects its position as a leader in architectural design and decorative facades in Saudi Arabia, showcasing its luxury projects and Vision 2030-aligned approach.",
    solution:
      "We built a bilingual corporate website with a modern design highlighting the firm's premium identity, featuring an interactive project gallery, detailed service pages (GRC, GRP, GRG, artificial stone), and a Vision 2030 section.",
    results: [
      { metric: "Years of Experience", value: "12+", description: "in the Saudi market" },
      { metric: "Projects", value: "350+", description: "successfully delivered" },
      { metric: "Services", value: "7", description: "integrated architectural services" },
    ],
    tags: ["Corporate Website", "Architecture", "Construction", "Saudi Arabia", "Bilingual"],
    thumbnail: "/images/projects/arab-future-architecture.jpg",
    images: [
      "/images/projects/arab-future-architecture-2.jpg",
      "/images/projects/arab-future-architecture-3.jpg",
      "/images/projects/arab-future-architecture-4.jpg",
      "/images/projects/arab-future-architecture-5.jpg",
    ],
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    testimonial: {
      text: "Etqan delivered a website that truly reflects our experience and position in the Saudi market. The design is professional and the delivery was on time.",
      author: "Arab Future Management",
      role: "Client",
    },
    duration: "10 weeks",
    year: "2025",
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
];

export function getProjectBySlugEn(slug: string): Project | undefined {
  return projectsEn.find((p) => p.slug === slug);
}

export function getProjectsByCategoryEn(category: string): Project[] {
  if (category === "all") return projectsEn;
  return projectsEn.filter((p) => p.category === category);
}
