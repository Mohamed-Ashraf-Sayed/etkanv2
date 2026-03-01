const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etkan2.phi-rose.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "إتقان للحلول البرمجية",
    alternateName: "Etqan IT Solutions",
    url: BASE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    areaServed: ["EG", "SA"],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "إتقان للحلول البرمجية",
    alternateName: "Etqan IT Solutions",
    url: BASE_URL,
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "إتقان للحلول البرمجية",
    url: BASE_URL,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "ERP Systems",
      "CRM Systems",
      "IT Infrastructure",
      "Technical Support",
    ],
  };
}

export function getServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "إتقان للحلول البرمجية",
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/blog/${article.slug}`,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "إتقان للحلول البرمجية",
    },
  };
}
