import type { ContactInquiryInput } from "@/types/api";
import type { ServiceSlug } from "@/lib/navigation";
import { siteContentRepository } from "../repositories";

export class SiteContentService {
  getSiteContent = () => siteContentRepository.getSiteContent();
  getCompany = () => siteContentRepository.getCompany();
  getHeroSlides = () => siteContentRepository.getHeroSlides();
  getAbout = () => siteContentRepository.getAbout();
  getServices = () => siteContentRepository.getServices();
  getListedServices = () => siteContentRepository.getListedServices();
  getServiceBySlug = (slug: ServiceSlug) => siteContentRepository.getServiceBySlug(slug);
  getAllServiceSlugs = () => siteContentRepository.getAllServiceSlugs();
  getProjects = () => siteContentRepository.getProjects();
  getTeamDepartments = () => siteContentRepository.getTeamDepartments();
  getProcessSteps = () => siteContentRepository.getProcessSteps();
  getTestimonials = () => siteContentRepository.getTestimonials();
}

export const siteContentService = new SiteContentService();

export class ContactService {
  submitInquiry(input: ContactInquiryInput) {
    if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
      throw new Error("Name, email, and message are required.");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) {
      throw new Error("Invalid email address.");
    }
    return import("../repositories/contact").then(({ contactRepository }) =>
      contactRepository.submitInquiry(input),
    );
  }
}

export const contactService = new ContactService();
