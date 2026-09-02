import type {
  AboutSection,
  CompanyMeta,
  HeroSlide,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  SiteContent,
  TeamDepartment,
  Testimonial,
} from "@/types/site";
import type { ServiceSlug } from "@/lib/navigation";

export interface ISiteContentRepository {
  getSiteContent(): Promise<SiteContent>;
  getCompany(): Promise<CompanyMeta>;
  getHeroSlides(): Promise<HeroSlide[]>;
  getAbout(): Promise<AboutSection>;
  getServices(): Promise<ServiceItem[]>;
  getListedServices(): Promise<ServiceItem[]>;
  getServiceBySlug(slug: ServiceSlug): Promise<ServiceItem | null>;
  getAllServiceSlugs(): Promise<ServiceSlug[]>;
  getProjects(): Promise<ProjectItem[]>;
  getTeamDepartments(): Promise<TeamDepartment[]>;
  getProcessSteps(): Promise<ProcessStep[]>;
  getTestimonials(): Promise<Testimonial[]>;
}
