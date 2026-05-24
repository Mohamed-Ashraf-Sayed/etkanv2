import { SITE_STATS } from "@/config/site-stats";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "إتقان للحلول المتكاملة",
    alternateName: [
      "Etqan IT Solutions",
      "Etqan",
      "إتقان",
      "Etqanly",
      "Etqan for Integrated Solutions",
      "شركة إتقان",
    ],
    legalName: "إتقان للحلول المتكاملة",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/opengraph-image`,
    description:
      "شركة إتقان للحلول المتكاملة (Etqan IT Solutions) — شركة برمجيات مصرية رائدة، تأسست 2019 في القاهرة، متخصصة في تطوير المواقع الإلكترونية، تطبيقات الموبايل، أنظمة ERP و CRM، والبنية التحتية. تخدم 75+ عميلاً في مصر والسعودية والخليج.",
    slogan: "شريكك التقني الموثوق",
    foundingDate: "2019",
    foundingLocation: {
      "@type": "Place",
      name: "القاهرة، مصر",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+201094807674",
        email: "info@etqanly.com",
        availableLanguage: ["Arabic", "English"],
        areaServed: ["EG", "SA", "AE", "QA", "KW", "BH", "OM"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+201094807674",
        email: "info@etqanly.com",
        availableLanguage: ["Arabic", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
    },
    knowsLanguage: ["ar", "en"],
    sameAs: [
      "https://www.facebook.com/etqanly",
      "https://www.linkedin.com/company/etqanly",
      "https://twitter.com/etqanly",
      "https://www.instagram.com/etqanly",
      "https://www.youtube.com/@etqanly",
      "https://github.com/etqanly",
    ],
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: SITE_STATS.engineers,
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "ERP Systems",
      "CRM Systems",
      "تطوير المواقع",
      "تطبيقات الموبايل",
      "أنظمة ERP",
      "أنظمة CRM",
      "البنية التحتية",
      "Cloud Computing",
      "Cybersecurity",
      "Digital Transformation",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "إتقان للحلول المتكاملة",
    alternateName: "Etqan IT Solutions",
    url: BASE_URL,
    description:
      "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني.",
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: "إتقان للحلول المتكاملة",
    alternateName: "Etqan IT Solutions",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.png`,
    image: `${BASE_URL}/opengraph-image`,
    priceRange: "$$",
    telephone: "+201094807674",
    email: "info@etqanly.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/etqanly",
      "https://www.linkedin.com/company/etqanly",
      "https://twitter.com/etqanly",
      "https://www.instagram.com/etqanly",
    ],
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
    ],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "ERP Systems",
      "CRM Systems",
      "IT Infrastructure",
      "Technical Support",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(SITE_STATS.clients),
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات إتقان",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تطوير المواقع الإلكترونية",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تطوير تطبيقات الموبايل",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "أنظمة إدارة الأعمال",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تجهيز البنية التحتية",
          },
        },
      ],
    },
  };
}

export function getReviewSchema(
  reviews: Array<{ author: string; text: string; rating?: number }>
) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: review.text,
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      url: BASE_URL,
    },
  }));
}

export function getCanonical(path: string, locale: string = "ar") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return locale === "ar" ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/en${cleanPath}`;
}

export function getAlternates(path: string) {
  const cleanPath = path === "/" ? "" : path;
  return {
    canonical: `${BASE_URL}${cleanPath}`,
    languages: {
      "ar-EG": `${BASE_URL}${cleanPath}`,
      "en-US": `${BASE_URL}/en${cleanPath}`,
      "x-default": `${BASE_URL}${cleanPath}`,
    },
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      name: "إتقان للحلول المتكاملة",
      url: BASE_URL,
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  dateModified?: string;
  image?: string;
  locale?: string;
}) {
  const isEn = article.locale === "en";
  const url = `${BASE_URL}${isEn ? "/en" : ""}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    image: article.image || `${BASE_URL}/opengraph-image`,
    inLanguage: isEn ? "en" : "ar",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: article.author,
      url: `${BASE_URL}${isEn ? "/en" : ""}/blog/author/${slugifyAuthor(article.author)}`,
    },
    publisher: {
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".tldr", "article p:first-of-type"],
    },
  };
}

function slugifyAuthor(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w؀-ۿ-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 50);
}

export function getProductSchema(product: {
  name: string;
  slug: string;
  description: string;
  priceMin: number;
  priceMax: number;
  currency: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    url: `${BASE_URL}/pricing#${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "إتقان للحلول المتكاملة",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.currency,
      lowPrice: product.priceMin,
      highPrice: product.priceMax,
      offerCount: 1,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "إتقان للحلول المتكاملة",
        url: BASE_URL,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(SITE_STATS.clients),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getHowToSchema(howto: {
  name: string;
  description: string;
  url: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.name,
    description: howto.description,
    url: howto.url,
    ...(howto.totalTime ? { totalTime: howto.totalTime } : {}),
    step: howto.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${howto.url}#step-${i + 1}`,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

export function getPersonSchema(person: {
  name: string;
  slug: string;
  jobTitle: string;
  bio?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/blog/author/${person.slug}#person`,
    name: person.name,
    url: `${BASE_URL}/blog/author/${person.slug}`,
    jobTitle: person.jobTitle,
    ...(person.bio ? { description: person.bio } : {}),
    ...(person.image ? { image: person.image } : {}),
    ...(person.sameAs ? { sameAs: person.sameAs } : {}),
    ...(person.knowsAbout ? { knowsAbout: person.knowsAbout } : {}),
    worksFor: {
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      url: BASE_URL,
    },
  };
}
