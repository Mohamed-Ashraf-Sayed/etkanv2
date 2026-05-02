const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "إتقان للحلول المتكاملة",
    alternateName: "Etqan IT Solutions",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.png`,
    description:
      "شركة برمجيات مصرية متخصصة في تطوير المواقع والتطبيقات وأنظمة الإدارة والبنية التحتية",
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+201094807674",
      email: "info@etqanly.com",
      availableLanguage: ["Arabic", "English"],
      areaServed: ["EG", "SA", "AE", "QA", "KW"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "Cairo",
    },
    sameAs: [
      "https://www.facebook.com/etqanly",
      "https://www.linkedin.com/company/etqanly",
      "https://twitter.com/etqanly",
      "https://www.instagram.com/etqanly",
    ],
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
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
      reviewCount: "75",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/blog/${article.slug}`,
    datePublished: article.date,
    image: `${BASE_URL}/opengraph-image`,
    inLanguage: "ar",
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "إتقان للحلول المتكاملة",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
  };
}
