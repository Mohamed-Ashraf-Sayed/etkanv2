import { TimeSlot, ServiceFeatureGroup } from "./booking";

export const timeSlotsEn: TimeSlot[] = [
  { id: "m1", time: "09:00", label: "9:00 AM", period: "morning" },
  { id: "m2", time: "09:45", label: "9:45 AM", period: "morning" },
  { id: "m3", time: "10:30", label: "10:30 AM", period: "morning" },
  { id: "m4", time: "11:15", label: "11:15 AM", period: "morning" },
  { id: "a1", time: "13:00", label: "1:00 PM", period: "afternoon" },
  { id: "a2", time: "13:45", label: "1:45 PM", period: "afternoon" },
  { id: "a3", time: "14:30", label: "2:30 PM", period: "afternoon" },
  { id: "a4", time: "15:15", label: "3:15 PM", period: "afternoon" },
];

export const consultationServicesEn = [
  { value: "web-and-apps", label: "Web & App Development" },
  { value: "enterprise-systems", label: "Enterprise Systems" },
  { value: "infrastructure", label: "Infrastructure & Networks" },
  { value: "support", label: "Technical Support & Maintenance" },
  { value: "consulting", label: "Consulting & Planning" },
  { value: "other", label: "Other" },
];

export const quoteServiceFeaturesEn: Record<string, ServiceFeatureGroup> = {
  "web-and-apps": {
    category: "Web & App Development",
    icon: "Globe",
    features: [
      { id: "website", label: "Website" },
      { id: "ecommerce", label: "E-Commerce Store" },
      { id: "mobile-app", label: "Mobile App" },
      { id: "web-app", label: "Interactive Web App" },
      { id: "landing", label: "Landing Page" },
      { id: "cms", label: "Content Management System" },
    ],
  },
  "enterprise-systems": {
    category: "Enterprise Systems",
    icon: "Database",
    features: [
      { id: "erp", label: "ERP System" },
      { id: "crm", label: "CRM System" },
      { id: "hr", label: "HR System" },
      { id: "inventory", label: "Inventory System" },
      { id: "accounting", label: "Accounting System" },
      { id: "custom", label: "Custom System" },
    ],
  },
  infrastructure: {
    category: "Infrastructure & Networks",
    icon: "Server",
    features: [
      { id: "network", label: "Network Design" },
      { id: "servers", label: "Server Setup" },
      { id: "cloud", label: "Cloud Solutions" },
      { id: "security", label: "Cybersecurity" },
      { id: "backup", label: "Backup Solutions" },
      { id: "monitoring", label: "Monitoring & Management" },
    ],
  },
  support: {
    category: "Technical Support & Maintenance",
    icon: "Wrench",
    features: [
      { id: "it-support", label: "Comprehensive IT Support" },
      { id: "maintenance", label: "Regular Maintenance" },
      { id: "helpdesk", label: "Help Desk" },
      { id: "training", label: "Team Training" },
    ],
  },
};

export const budgetRangesEn = [
  { value: "under-10k", label: "Under 10,000 EGP" },
  { value: "10k-25k", label: "10,000 - 25,000 EGP" },
  { value: "25k-50k", label: "25,000 - 50,000 EGP" },
  { value: "50k-100k", label: "50,000 - 100,000 EGP" },
  { value: "above-100k", label: "Over 100,000 EGP" },
  { value: "not-sure", label: "Not Sure" },
];

export const timelineOptionsEn = [
  { value: "urgent", label: "Urgent (Less than a month)" },
  { value: "1-3months", label: "1 - 3 months" },
  { value: "3-6months", label: "3 - 6 months" },
  { value: "flexible", label: "Flexible / Not determined" },
];
