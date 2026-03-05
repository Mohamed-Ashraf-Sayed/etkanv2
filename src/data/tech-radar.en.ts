import { TechRadarItem, TechRadarQuadrant, TechRadarRing } from "./tech-radar";

export const quadrantsEn: TechRadarQuadrant[] = [
  { id: "languages", name: "Languages & Frameworks", color: "#3B82F6" },
  { id: "cms", name: "CMS & Platforms", color: "#10B981" },
  { id: "infrastructure", name: "Infrastructure & Cloud", color: "#8B5CF6" },
  { id: "tools", name: "Tools & Techniques", color: "#F59E0B" },
];

export const ringsEn: TechRadarRing[] = [
  { id: "adopt", name: "Adopt", description: "Core technologies we use confidently in all our projects" },
  { id: "trial", name: "Trial", description: "Promising technologies we're testing in selected projects" },
  { id: "assess", name: "Assess", description: "Technologies we're studying and monitoring for potential adoption" },
  { id: "hold", name: "Hold", description: "Technologies we're monitoring but not using in new projects" },
];

export const techRadarItemsEn: TechRadarItem[] = [
  // === Languages & Frameworks - Adopt ===
  {
    id: "react",
    name: "React",
    quadrant: "languages",
    ring: "adopt",
    description: "Our primary JavaScript library for building interactive user interfaces. Used in most of our projects.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    quadrant: "languages",
    ring: "adopt",
    description: "Production-grade React framework. Provides SSR, SSG, and excellent SEO performance.",
    isNew: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    quadrant: "languages",
    ring: "adopt",
    description: "All new code is written in TypeScript. Reduces bugs and improves the development experience.",
  },
  {
    id: "php",
    name: "PHP",
    quadrant: "languages",
    ring: "adopt",
    description: "Primary language for WordPress and Laravel projects. Deep expertise in PHP development.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    quadrant: "languages",
    ring: "adopt",
    description: "Used for backend in projects requiring real-time capabilities and high performance.",
  },

  // === Languages & Frameworks - Trial ===
  {
    id: "vuejs",
    name: "Vue.js",
    quadrant: "languages",
    ring: "trial",
    description: "Flexible and easy-to-learn framework. Testing it in selected projects as a React alternative.",
  },
  {
    id: "python",
    name: "Python",
    quadrant: "languages",
    ring: "trial",
    description: "Used in AI, automation, and data processing projects.",
    isNew: true,
  },
  {
    id: "flutter",
    name: "Flutter",
    quadrant: "languages",
    ring: "trial",
    description: "For building cross-platform mobile apps with a single codebase for iOS and Android.",
    isNew: true,
  },

  // === Languages & Frameworks - Assess ===
  {
    id: "svelte",
    name: "Svelte",
    quadrant: "languages",
    ring: "assess",
    description: "Compile-time framework with excellent performance and less code.",
  },
  {
    id: "go",
    name: "Go",
    quadrant: "languages",
    ring: "assess",
    description: "Fast language by Google. Evaluating it for microservices and high-performance APIs.",
  },

  // === Languages & Frameworks - Hold ===
  {
    id: "jquery",
    name: "jQuery",
    quadrant: "languages",
    ring: "hold",
    description: "Was essential in the past. Now we use React and Vanilla JS instead.",
  },

  // === CMS & Platforms - Adopt ===
  {
    id: "wordpress",
    name: "WordPress",
    quadrant: "cms",
    ring: "adopt",
    description: "Our most-used CMS. Ideal for corporate websites and blogs.",
  },
  {
    id: "elementor",
    name: "Elementor",
    quadrant: "cms",
    ring: "adopt",
    description: "Primary WordPress page builder. Simplifies design and saves significant development time.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    quadrant: "cms",
    ring: "adopt",
    description: "Primary e-commerce solution on WordPress. Flexible and highly customizable.",
  },

  // === CMS & Platforms - Trial ===
  {
    id: "shopify",
    name: "Shopify",
    quadrant: "cms",
    ring: "trial",
    description: "Cloud-based e-commerce platform. Testing it for clients who need a quick solution.",
    isNew: true,
  },
  {
    id: "strapi",
    name: "Strapi",
    quadrant: "cms",
    ring: "trial",
    description: "Headless CMS. Using it with Next.js for advanced projects.",
    isNew: true,
  },

  // === CMS & Platforms - Assess ===
  {
    id: "payload",
    name: "Payload CMS",
    quadrant: "cms",
    ring: "assess",
    description: "TypeScript-based headless CMS. Evaluating it as a modern Strapi alternative.",
    isNew: true,
  },

  // === CMS & Platforms - Hold ===
  {
    id: "joomla",
    name: "Joomla",
    quadrant: "cms",
    ring: "hold",
    description: "Legacy CMS. WordPress offers a better experience in most use cases.",
  },

  // === Infrastructure & Cloud - Adopt ===
  {
    id: "docker",
    name: "Docker",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "Used in all our projects for deployment. Ensures consistent and stable environments.",
  },
  {
    id: "linux",
    name: "Linux",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "Primary server OS. Deep expertise in Ubuntu and CentOS.",
  },
  {
    id: "nginx",
    name: "Nginx",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "Our primary web server and reverse proxy for all projects.",
  },
  {
    id: "mysql",
    name: "MySQL",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "Primary database for WordPress and traditional projects.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    quadrant: "infrastructure",
    ring: "adopt",
    description: "Advanced database for projects needing features like JSON and full-text search.",
  },

  // === Infrastructure & Cloud - Trial ===
  {
    id: "aws",
    name: "AWS",
    quadrant: "infrastructure",
    ring: "trial",
    description: "Amazon cloud services. Testing for projects that need large-scale scaling.",
    isNew: true,
  },
  {
    id: "vercel",
    name: "Vercel",
    quadrant: "infrastructure",
    ring: "trial",
    description: "Deployment platform for Next.js. Fast and easy to use.",
    isNew: true,
  },

  // === Infrastructure & Cloud - Assess ===
  {
    id: "kubernetes",
    name: "Kubernetes",
    quadrant: "infrastructure",
    ring: "assess",
    description: "Container orchestration system. Evaluating for large projects needing orchestration.",
  },

  // === Infrastructure & Cloud - Hold ===
  {
    id: "shared-hosting",
    name: "Shared Hosting",
    quadrant: "infrastructure",
    ring: "hold",
    description: "Shared hosting. We recommend VPS or Cloud for better performance and security.",
  },

  // === Tools & Techniques - Adopt ===
  {
    id: "git",
    name: "Git & GitHub",
    quadrant: "tools",
    ring: "adopt",
    description: "Primary version control system. All projects on GitHub with code review.",
  },
  {
    id: "figma",
    name: "Figma",
    quadrant: "tools",
    ring: "adopt",
    description: "Primary design tool. All interfaces and prototypes are designed in Figma.",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    quadrant: "tools",
    ring: "adopt",
    description: "Primary CSS framework. Saves development time and ensures consistent design.",
  },
  {
    id: "seo",
    name: "SEO Best Practices",
    quadrant: "tools",
    ring: "adopt",
    description: "Search engine optimization standards integrated into all our projects from the start.",
  },

  // === Tools & Techniques - Trial ===
  {
    id: "claude-api",
    name: "Claude AI API",
    quadrant: "tools",
    ring: "trial",
    description: "Using Anthropic's AI to enhance user experience and chatbot functionality.",
    isNew: true,
  },
  {
    id: "playwright",
    name: "Playwright",
    quadrant: "tools",
    ring: "trial",
    description: "Automated browser testing tool. Testing it to ensure project quality.",
    isNew: true,
  },
  {
    id: "cicd",
    name: "CI/CD",
    quadrant: "tools",
    ring: "trial",
    description: "Automated deployment systems. Building pipelines to automate testing and deployment.",
  },

  // === Tools & Techniques - Assess ===
  {
    id: "cursor-ai",
    name: "AI-Assisted Development",
    quadrant: "tools",
    ring: "assess",
    description: "AI-powered development tools. Evaluating their impact on code speed and quality.",
    isNew: true,
  },

  // === Tools & Techniques - Hold ===
  {
    id: "ftp",
    name: "FTP Deploy",
    quadrant: "tools",
    ring: "hold",
    description: "Legacy deployment method. We use Git and Docker instead for security and reliability.",
  },
];
