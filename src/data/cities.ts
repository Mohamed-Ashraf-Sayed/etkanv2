export interface City {
  slug: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  countryCode: "EG" | "SA" | "AE" | "QA" | "KW";
  populationDesc?: string; // for content variation
  popular?: boolean;
}

export const cities: City[] = [
  // Egypt
  {
    slug: "cairo",
    nameAr: "القاهرة",
    nameEn: "Cairo",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
    popular: true,
  },
  {
    slug: "giza",
    nameAr: "الجيزة",
    nameEn: "Giza",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
    popular: true,
  },
  {
    slug: "alexandria",
    nameAr: "الإسكندرية",
    nameEn: "Alexandria",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
    popular: true,
  },
  {
    slug: "mansoura",
    nameAr: "المنصورة",
    nameEn: "Mansoura",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
  },
  {
    slug: "tanta",
    nameAr: "طنطا",
    nameEn: "Tanta",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
  },
  {
    slug: "ismailia",
    nameAr: "الإسماعيلية",
    nameEn: "Ismailia",
    countryAr: "مصر",
    countryEn: "Egypt",
    countryCode: "EG",
  },
  // Saudi Arabia
  {
    slug: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryCode: "SA",
    popular: true,
  },
  {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryCode: "SA",
    popular: true,
  },
  {
    slug: "dammam",
    nameAr: "الدمام",
    nameEn: "Dammam",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryCode: "SA",
  },
  {
    slug: "mecca",
    nameAr: "مكة",
    nameEn: "Mecca",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryCode: "SA",
  },
  {
    slug: "medina",
    nameAr: "المدينة",
    nameEn: "Medina",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryCode: "SA",
  },
  // UAE
  {
    slug: "dubai",
    nameAr: "دبي",
    nameEn: "Dubai",
    countryAr: "الإمارات",
    countryEn: "UAE",
    countryCode: "AE",
    popular: true,
  },
  {
    slug: "abu-dhabi",
    nameAr: "أبوظبي",
    nameEn: "Abu Dhabi",
    countryAr: "الإمارات",
    countryEn: "UAE",
    countryCode: "AE",
  },
  // Gulf
  {
    slug: "doha",
    nameAr: "الدوحة",
    nameEn: "Doha",
    countryAr: "قطر",
    countryEn: "Qatar",
    countryCode: "QA",
  },
  {
    slug: "kuwait-city",
    nameAr: "الكويت",
    nameEn: "Kuwait City",
    countryAr: "الكويت",
    countryEn: "Kuwait",
    countryCode: "KW",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getPopularCities(): City[] {
  return cities.filter((c) => c.popular);
}
