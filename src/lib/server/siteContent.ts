import { siteContentService } from "@/server/services";

/** Server-only helpers for RSC pages (no HTTP round-trip). */
export const getSiteContent = () => siteContentService.getSiteContent();
export const getCompany = () => siteContentService.getCompany();
export const getListedServices = () => siteContentService.getListedServices();
export const getServiceBySlug = (slug: Parameters<typeof siteContentService.getServiceBySlug>[0]) =>
  siteContentService.getServiceBySlug(slug);
export const getAllServiceSlugs = () => siteContentService.getAllServiceSlugs();
export const getProjects = () => siteContentService.getProjects();
export const getTeamDepartments = () => siteContentService.getTeamDepartments();
export const getProcessSteps = () => siteContentService.getProcessSteps();
export const getTestimonials = () => siteContentService.getTestimonials();
export const getAbout = () => siteContentService.getAbout();
