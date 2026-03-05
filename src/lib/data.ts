import { services, serviceCategories, getServiceBySlug, getServicesByCategory } from "@/data/services";
import { servicesEn, serviceCategoriesEn, getServiceBySlugEn, getServicesByCategoryEn } from "@/data/services.en";
import { projects, projectCategories, getProjectBySlug, getProjectsByCategory } from "@/data/projects";
import { projectsEn, projectCategoriesEn, getProjectBySlugEn, getProjectsByCategoryEn } from "@/data/projects.en";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { blogPostsEn, getBlogPostBySlugEn } from "@/data/blog.en";
import { team, milestones, stats, values } from "@/data/team";
import { teamEn, milestonesEn, statsEn, valuesEn } from "@/data/team.en";
import { timeSlots, consultationServices, quoteServiceFeatures, budgetRanges, timelineOptions } from "@/data/booking";
import { timeSlotsEn, consultationServicesEn, quoteServiceFeaturesEn, budgetRangesEn, timelineOptionsEn } from "@/data/booking.en";
import { SYSTEM_PROMPT, WELCOME_MESSAGE, SUGGESTED_QUESTIONS } from "@/data/chatbot";
import { SYSTEM_PROMPT_EN, WELCOME_MESSAGE_EN, SUGGESTED_QUESTIONS_EN } from "@/data/chatbot.en";
import { quadrants, rings, techRadarItems } from "@/data/tech-radar";
import { quadrantsEn, ringsEn, techRadarItemsEn } from "@/data/tech-radar.en";

export function getServices(locale: string) {
  return locale === "en" ? servicesEn : services;
}

export function getServiceCategories(locale: string) {
  return locale === "en" ? serviceCategoriesEn : serviceCategories;
}

export function findServiceBySlug(slug: string, locale: string) {
  return locale === "en" ? getServiceBySlugEn(slug) : getServiceBySlug(slug);
}

export function findServicesByCategory(categorySlug: string, locale: string) {
  return locale === "en" ? getServicesByCategoryEn(categorySlug) : getServicesByCategory(categorySlug);
}

export function getProjects(locale: string) {
  return locale === "en" ? projectsEn : projects;
}

export function getProjectCategories(locale: string) {
  return locale === "en" ? projectCategoriesEn : projectCategories;
}

export function findProjectBySlug(slug: string, locale: string) {
  return locale === "en" ? getProjectBySlugEn(slug) : getProjectBySlug(slug);
}

export function findProjectsByCategory(category: string, locale: string) {
  return locale === "en" ? getProjectsByCategoryEn(category) : getProjectsByCategory(category);
}

export function getBlogPosts(locale: string) {
  return locale === "en" ? blogPostsEn : blogPosts;
}

export function findBlogPostBySlug(slug: string, locale: string) {
  return locale === "en" ? getBlogPostBySlugEn(slug) : getBlogPostBySlug(slug);
}

export function getTeam(locale: string) {
  return locale === "en" ? teamEn : team;
}

export function getMilestones(locale: string) {
  return locale === "en" ? milestonesEn : milestones;
}

export function getStats(locale: string) {
  return locale === "en" ? statsEn : stats;
}

export function getValues(locale: string) {
  return locale === "en" ? valuesEn : values;
}

export function getTimeSlots(locale: string) {
  return locale === "en" ? timeSlotsEn : timeSlots;
}

export function getConsultationServices(locale: string) {
  return locale === "en" ? consultationServicesEn : consultationServices;
}

export function getQuoteServiceFeatures(locale: string) {
  return locale === "en" ? quoteServiceFeaturesEn : quoteServiceFeatures;
}

export function getBudgetRanges(locale: string) {
  return locale === "en" ? budgetRangesEn : budgetRanges;
}

export function getTimelineOptions(locale: string) {
  return locale === "en" ? timelineOptionsEn : timelineOptions;
}

export function getTechRadarData(locale: string) {
  return locale === "en"
    ? { quadrants: quadrantsEn, rings: ringsEn, items: techRadarItemsEn }
    : { quadrants, rings, items: techRadarItems };
}

export function getChatbotConfig(locale: string) {
  return locale === "en"
    ? { systemPrompt: SYSTEM_PROMPT_EN, welcomeMessage: WELCOME_MESSAGE_EN, suggestedQuestions: SUGGESTED_QUESTIONS_EN }
    : { systemPrompt: SYSTEM_PROMPT, welcomeMessage: WELCOME_MESSAGE, suggestedQuestions: SUGGESTED_QUESTIONS };
}
