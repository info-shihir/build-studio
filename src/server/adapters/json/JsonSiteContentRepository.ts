import type { SiteContent } from "@/types/site";
import type { ServiceSlug } from "@/lib/navigation";
import type { ISiteContentRepository } from "../../repositories/ISiteContentRepository";
import { staticSiteContent } from "./staticContent";

const DIRECTORY_EXCLUDED_SLUGS = new Set<string>(["consultancy"]);

const content = staticSiteContent as SiteContent;

export class JsonSiteContentRepository implements ISiteContentRepository {
  async getSiteContent(): Promise<SiteContent> {
    return content;
  }

  async getCompany() {
    return content.company;
  }

  async getHeroSlides() {
    return content.hero.slides;
  }

  async getAbout() {
    return content.about;
  }

  async getServices() {
    return content.services;
  }

  async getListedServices() {
    return content.services.filter((s) => !DIRECTORY_EXCLUDED_SLUGS.has(s.slug));
  }

  async getServiceBySlug(slug: ServiceSlug) {
    return content.services.find((s) => s.slug === slug) ?? null;
  }

  async getAllServiceSlugs(): Promise<ServiceSlug[]> {
    return content.services.map((s) => s.slug as ServiceSlug);
  }

  async getProjects() {
    return content.projects;
  }

  async getTeamDepartments() {
    return content.teamDepartments;
  }

  async getProcessSteps() {
    return content.process;
  }

  async getTestimonials() {
    return content.testimonials;
  }
}

export const jsonSiteContentRepository = new JsonSiteContentRepository();
