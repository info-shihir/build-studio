import type { ServiceSlug } from "@/lib/navigation";
import type { ISiteContentRepository } from "@/server/repositories/ISiteContentRepository";
import { prisma } from "@/server/db/prisma";
import {
  buildSiteContent,
  mapAbout,
  mapCompany,
  mapHeroSlide,
  mapPageMetaRecords,
  mapProcessStep,
  mapProject,
  mapService,
  mapTeamDepartment,
  mapTestimonial,
} from "./mappers";

const DIRECTORY_EXCLUDED_SLUGS = new Set<string>(["consultancy"]);

export class DbSiteContentRepository implements ISiteContentRepository {
  private async loadCore() {
    const [company, heroSlides, about, services, projects, teamDepartments, process, testimonials, pages] =
      await Promise.all([
        prisma.company.findUniqueOrThrow({
          where: { id: "default" },
          include: { stats: { orderBy: { sortOrder: "asc" } } },
        }),
        prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.aboutSection.findUniqueOrThrow({
          where: { id: "default" },
          include: { pillars: { orderBy: { sortOrder: "asc" } } },
        }),
        prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.teamDepartment.findMany({
          orderBy: { sortOrder: "asc" },
          include: { members: { orderBy: { sortOrder: "asc" } } },
        }),
        prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.pageMeta.findMany(),
      ]);

    return {
      company: mapCompany(company),
      heroSlides: heroSlides.map(mapHeroSlide),
      about: mapAbout(about),
      services: services.map(mapService),
      projects: projects.map(mapProject),
      teamDepartments: teamDepartments.map(mapTeamDepartment),
      process: process.map(mapProcessStep),
      testimonials: testimonials.map(mapTestimonial),
      pages: mapPageMetaRecords(pages),
    };
  }

  async getSiteContent() {
    const core = await this.loadCore();
    return buildSiteContent(core);
  }

  async getCompany() {
    const core = await this.loadCore();
    return core.company;
  }

  async getHeroSlides() {
    const slides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
    return slides.map(mapHeroSlide);
  }

  async getAbout() {
    const about = await prisma.aboutSection.findUniqueOrThrow({
      where: { id: "default" },
      include: { pillars: { orderBy: { sortOrder: "asc" } } },
    });
    return mapAbout(about);
  }

  async getServices() {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return services.map(mapService);
  }

  async getListedServices() {
    const services = await this.getServices();
    return services.filter((s) => !DIRECTORY_EXCLUDED_SLUGS.has(s.slug));
  }

  async getServiceBySlug(slug: ServiceSlug) {
    const service = await prisma.service.findUnique({ where: { slug } });
    return service ? mapService(service) : null;
  }

  async getAllServiceSlugs(): Promise<ServiceSlug[]> {
    const services = await prisma.service.findMany({ select: { slug: true }, orderBy: { sortOrder: "asc" } });
    return services.map((s) => s.slug as ServiceSlug);
  }

  async getProjects() {
    const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
    return projects.map(mapProject);
  }

  async getTeamDepartments() {
    const departments = await prisma.teamDepartment.findMany({
      orderBy: { sortOrder: "asc" },
      include: { members: { orderBy: { sortOrder: "asc" } } },
    });
    return departments.map(mapTeamDepartment);
  }

  async getProcessSteps() {
    const steps = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
    return steps.map(mapProcessStep);
  }

  async getTestimonials() {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
    return testimonials.map(mapTestimonial);
  }
}

export const dbSiteContentRepository = new DbSiteContentRepository();
