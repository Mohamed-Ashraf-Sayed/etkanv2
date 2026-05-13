/**
 * Single source of truth for company stats.
 * All components reference these values to stay consistent.
 */
export const SITE_STATS = {
  clients: 75,
  projects: 200,
  engineers: 30,
  yearsExperience: 6,
  satisfaction: 98,
} as const;

export const STAT_DISPLAY = {
  clientsLabelAr: "عميل نشط",
  clientsLabelEn: "Active Clients",
  projectsLabelAr: "مشروع ناجح",
  projectsLabelEn: "Successful Projects",
  engineersLabelAr: "مهندس محترف",
  engineersLabelEn: "Professional Engineers",
  yearsLabelAr: "سنوات خبرة",
  yearsLabelEn: "Years of Experience",
  satisfactionLabelAr: "رضا العملاء",
  satisfactionLabelEn: "Customer Satisfaction",
} as const;
