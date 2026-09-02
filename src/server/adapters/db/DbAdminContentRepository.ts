import { prisma } from "@/server/db/prisma";
import type { IAdminContentRepository } from "@/server/repositories/IAdminContentRepository";
import type {
  AboutInput,
  CompanyInput,
  HeroSlideInput,
  PageMetaInput,
  ProcessStepInput,
  ProjectInput,
  ServiceInput,
  TeamDepartmentInput,
  TeamMemberInput,
  TestimonialInput,
} from "@/types/admin";
import {
  mapAbout,
  mapCompany,
  mapHeroSlide,
  mapProcessStep,
  mapProject,
  mapService,
  mapTeamDepartment,
  mapTeamMember,
  mapTestimonial,
} from "./mappers";

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export class DbAdminContentRepository implements IAdminContentRepository {
  async getDashboardStats() {
    const [services, projects, teamMembers, heroSlides, testimonials, processSteps, inquiries, unreadInquiries] =
      await Promise.all([
        prisma.service.count(),
        prisma.project.count(),
        prisma.teamMember.count(),
        prisma.heroSlide.count(),
        prisma.testimonial.count(),
        prisma.processStep.count(),
        prisma.contactInquiry.count(),
        prisma.contactInquiry.count({ where: { readAt: null } }),
      ]);
    return {
      services,
      projects,
      teamMembers,
      heroSlides,
      testimonials,
      processSteps,
      inquiries,
      unreadInquiries,
    };
  }

  async listServices() {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(mapService);
  }

  async getService(id: string) {
    const row = await prisma.service.findUnique({ where: { id } });
    return row ? mapService(row) : null;
  }

  async createService(input: ServiceInput, updatedBy: string) {
    const count = await prisma.service.count();
    const row = await prisma.service.create({
      data: {
        id: input.id ?? newId("serv"),
        slug: input.slug,
        title: input.title,
        icon: input.icon,
        shortDesc: input.shortDesc,
        longDesc: input.longDesc,
        details: input.details ?? [],
        scope: input.scope ?? [],
        features: input.features,
        processSteps: input.processSteps ?? [],
        timeline: input.timeline ?? null,
        targetSectors: input.targetSectors ?? null,
        typicalTeam: input.typicalTeam ?? null,
        tools: input.tools ?? null,
        methodology: input.methodology ?? null,
        compliance: input.compliance ?? null,
        sortOrder: input.sortOrder ?? count,
        updatedBy,
      },
    });
    return mapService(row);
  }

  async updateService(id: string, input: ServiceInput, updatedBy: string) {
    const row = await prisma.service.update({
      where: { id },
      data: {
        slug: input.slug,
        title: input.title,
        icon: input.icon,
        shortDesc: input.shortDesc,
        longDesc: input.longDesc,
        details: input.details ?? [],
        scope: input.scope ?? [],
        features: input.features,
        processSteps: input.processSteps ?? [],
        timeline: input.timeline ?? null,
        targetSectors: input.targetSectors ?? null,
        typicalTeam: input.typicalTeam ?? null,
        tools: input.tools ?? null,
        methodology: input.methodology ?? null,
        compliance: input.compliance ?? null,
        sortOrder: input.sortOrder,
        updatedBy,
      },
    });
    return mapService(row);
  }

  async deleteService(id: string) {
    await prisma.service.delete({ where: { id } });
  }

  async listProjects() {
    const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(mapProject);
  }

  async getProject(id: string) {
    const row = await prisma.project.findUnique({ where: { id } });
    return row ? mapProject(row) : null;
  }

  async createProject(input: ProjectInput, updatedBy: string) {
    const count = await prisma.project.count();
    const row = await prisma.project.create({
      data: {
        id: input.id ?? newId("proj"),
        title: input.title,
        category: input.category,
        client: input.client,
        location: input.location,
        year: input.year,
        area: input.area,
        image: input.image,
        description: input.description,
        features: input.features,
        sortOrder: input.sortOrder ?? count,
        updatedBy,
      },
    });
    return mapProject(row);
  }

  async updateProject(id: string, input: ProjectInput, updatedBy: string) {
    const row = await prisma.project.update({
      where: { id },
      data: {
        title: input.title,
        category: input.category,
        client: input.client,
        location: input.location,
        year: input.year,
        area: input.area,
        image: input.image,
        description: input.description,
        features: input.features,
        sortOrder: input.sortOrder,
        updatedBy,
      },
    });
    return mapProject(row);
  }

  async deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
  }

  async listHeroSlides() {
    const rows = await prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(mapHeroSlide);
  }

  async getHeroSlide(id: string) {
    const row = await prisma.heroSlide.findUnique({ where: { id } });
    return row ? mapHeroSlide(row) : null;
  }

  async createHeroSlide(input: HeroSlideInput, _updatedBy: string) {
    const count = await prisma.heroSlide.count();
    const row = await prisma.heroSlide.create({
      data: {
        id: input.id ?? newId("slide"),
        title: input.title,
        subtitle: input.subtitle,
        image: input.image,
        cta: input.cta,
        link: input.link,
        sortOrder: input.sortOrder ?? count,
      },
    });
    return mapHeroSlide(row);
  }

  async updateHeroSlide(id: string, input: HeroSlideInput, _updatedBy: string) {
    const row = await prisma.heroSlide.update({
      where: { id },
      data: {
        title: input.title,
        subtitle: input.subtitle,
        image: input.image,
        cta: input.cta,
        link: input.link,
        sortOrder: input.sortOrder,
      },
    });
    return mapHeroSlide(row);
  }

  async deleteHeroSlide(id: string) {
    await prisma.heroSlide.delete({ where: { id } });
  }

  async reorderHeroSlides(ids: string[]) {
    await Promise.all(ids.map((id, index) => prisma.heroSlide.update({ where: { id }, data: { sortOrder: index } })));
    return this.listHeroSlides();
  }

  async listTestimonials() {
    const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(mapTestimonial);
  }

  async getTestimonial(id: string) {
    const row = await prisma.testimonial.findUnique({ where: { id } });
    return row ? mapTestimonial(row) : null;
  }

  async createTestimonial(input: TestimonialInput, updatedBy: string) {
    const count = await prisma.testimonial.count();
    const row = await prisma.testimonial.create({
      data: {
        id: input.id ?? newId("test"),
        name: input.name,
        company: input.company,
        quote: input.quote,
        rating: input.rating,
        image: input.image,
        sortOrder: input.sortOrder ?? count,
        updatedBy,
      },
    });
    return mapTestimonial(row);
  }

  async updateTestimonial(id: string, input: TestimonialInput, updatedBy: string) {
    const row = await prisma.testimonial.update({
      where: { id },
      data: {
        name: input.name,
        company: input.company,
        quote: input.quote,
        rating: input.rating,
        image: input.image,
        sortOrder: input.sortOrder,
        updatedBy,
      },
    });
    return mapTestimonial(row);
  }

  async deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
  }

  async listProcessSteps() {
    const rows = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map((row) => ({ ...mapProcessStep(row), id: row.id }));
  }

  async getProcessStep(id: string) {
    const row = await prisma.processStep.findUnique({ where: { id } });
    return row ? { ...mapProcessStep(row), id: row.id } : null;
  }

  async createProcessStep(input: ProcessStepInput, _updatedBy: string) {
    const count = await prisma.processStep.count();
    const row = await prisma.processStep.create({
      data: {
        step: input.step,
        title: input.title,
        subtitle: input.subtitle,
        desc: input.desc,
        sortOrder: input.sortOrder ?? count,
      },
    });
    return { ...mapProcessStep(row), id: row.id };
  }

  async updateProcessStep(id: string, input: ProcessStepInput, _updatedBy: string) {
    const row = await prisma.processStep.update({
      where: { id },
      data: {
        step: input.step,
        title: input.title,
        subtitle: input.subtitle,
        desc: input.desc,
        sortOrder: input.sortOrder,
      },
    });
    return { ...mapProcessStep(row), id: row.id };
  }

  async deleteProcessStep(id: string) {
    await prisma.processStep.delete({ where: { id } });
  }

  async listDepartments() {
    const rows = await prisma.teamDepartment.findMany({
      orderBy: { sortOrder: "asc" },
      include: { members: { orderBy: { sortOrder: "asc" } } },
    });
    return rows.map(mapTeamDepartment);
  }

  async getDepartment(id: string) {
    const row = await prisma.teamDepartment.findUnique({
      where: { id },
      include: { members: { orderBy: { sortOrder: "asc" } } },
    });
    return row ? mapTeamDepartment(row) : null;
  }

  async createDepartment(input: TeamDepartmentInput, updatedBy: string) {
    const count = await prisma.teamDepartment.count();
    const row = await prisma.teamDepartment.create({
      data: {
        id: input.id ?? newId("dept"),
        title: input.title,
        description: input.description ?? null,
        sortOrder: input.sortOrder ?? count,
        updatedBy,
      },
      include: { members: true },
    });
    return mapTeamDepartment(row);
  }

  async updateDepartment(id: string, input: TeamDepartmentInput, updatedBy: string) {
    const row = await prisma.teamDepartment.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description ?? null,
        sortOrder: input.sortOrder,
        updatedBy,
      },
      include: { members: { orderBy: { sortOrder: "asc" } } },
    });
    return mapTeamDepartment(row);
  }

  async deleteDepartment(id: string) {
    await prisma.teamDepartment.delete({ where: { id } });
  }

  async listMembers(departmentId?: string) {
    const rows = await prisma.teamMember.findMany({
      where: departmentId ? { departmentId } : undefined,
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapTeamMember);
  }

  async getMember(id: string) {
    const row = await prisma.teamMember.findUnique({ where: { id } });
    return row ? mapTeamMember(row) : null;
  }

  async createMember(input: TeamMemberInput, updatedBy: string) {
    const count = await prisma.teamMember.count({ where: { departmentId: input.departmentId } });
    const row = await prisma.teamMember.create({
      data: {
        id: input.id ?? newId("member"),
        departmentId: input.departmentId,
        name: input.name,
        credentials: input.credentials ?? null,
        role: input.role,
        bio: input.bio,
        phone: input.phone ?? null,
        email: input.email || null,
        image: input.image,
        socialFacebook: input.socials?.facebook ?? null,
        socialInstagram: input.socials?.instagram ?? null,
        socialLinkedin: input.socials?.linkedin ?? null,
        socialPinterest: input.socials?.pinterest ?? null,
        sortOrder: input.sortOrder ?? count,
        updatedBy,
      },
    });
    return mapTeamMember(row);
  }

  async updateMember(id: string, input: TeamMemberInput, updatedBy: string) {
    const row = await prisma.teamMember.update({
      where: { id },
      data: {
        departmentId: input.departmentId,
        name: input.name,
        credentials: input.credentials ?? null,
        role: input.role,
        bio: input.bio,
        phone: input.phone ?? null,
        email: input.email || null,
        image: input.image,
        socialFacebook: input.socials?.facebook ?? null,
        socialInstagram: input.socials?.instagram ?? null,
        socialLinkedin: input.socials?.linkedin ?? null,
        socialPinterest: input.socials?.pinterest ?? null,
        sortOrder: input.sortOrder,
        updatedBy,
      },
    });
    return mapTeamMember(row);
  }

  async deleteMember(id: string) {
    await prisma.teamMember.delete({ where: { id } });
  }

  async getAbout() {
    const about = await prisma.aboutSection.findUniqueOrThrow({
      where: { id: "default" },
      include: { pillars: { orderBy: { sortOrder: "asc" } } },
    });
    return mapAbout(about);
  }

  async updateAbout(input: AboutInput, updatedBy: string) {
    await prisma.aboutPillar.deleteMany({ where: { aboutSectionId: "default" } });
    const about = await prisma.aboutSection.update({
      where: { id: "default" },
      data: {
        title: input.title,
        subtitle: input.subtitle,
        paragraphs: input.paragraphs,
        updatedBy,
        pillars: {
          create: input.pillars.map((pillar, index) => ({
            title: pillar.title,
            desc: pillar.desc,
            sortOrder: index,
          })),
        },
      },
      include: { pillars: { orderBy: { sortOrder: "asc" } } },
    });
    return mapAbout(about);
  }

  async getCompany() {
    const company = await prisma.company.findUniqueOrThrow({
      where: { id: "default" },
      include: { stats: { orderBy: { sortOrder: "asc" } } },
    });
    return mapCompany(company);
  }

  async updateCompany(input: CompanyInput, updatedBy: string) {
    await prisma.statItem.deleteMany({ where: { companyId: "default" } });
    const company = await prisma.company.update({
      where: { id: "default" },
      data: {
        name: input.name,
        shortName: input.shortName,
        tagline: input.tagline,
        description: input.description,
        foundedYear: input.foundedYear,
        logo: input.logo ?? null,
        registeredOffice: input.registeredOffice ?? null,
        authorizedCapital: input.authorizedCapital ?? null,
        liabilityType: input.liabilityType ?? null,
        regulatoryNote: input.regulatoryNote ?? null,
        contactAddress: input.contact.address,
        contactEmail: input.contact.email,
        contactPhone: input.contact.phone,
        contactHours: input.contact.hours,
        socialFacebook: input.contact.socials.facebook ?? null,
        socialInstagram: input.contact.socials.instagram ?? null,
        socialLinkedin: input.contact.socials.linkedin ?? null,
        socialPinterest: input.contact.socials.pinterest ?? null,
        updatedBy,
        stats: {
          create: input.stats.map((stat, index) => ({
            id: stat.id ?? newId("stat"),
            value: stat.value,
            label: stat.label,
            sub: stat.sub,
            sortOrder: index,
          })),
        },
      },
      include: { stats: { orderBy: { sortOrder: "asc" } } },
    });
    return mapCompany(company);
  }

  async listPageMeta() {
    const rows = await prisma.pageMeta.findMany({ orderBy: { slug: "asc" } });
    return rows.map((r) => ({
      slug: r.slug,
      eyebrow: r.eyebrow ?? undefined,
      title: r.title,
      description: r.description ?? undefined,
    }));
  }

  async getPageMeta(slug: string) {
    const row = await prisma.pageMeta.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      slug: row.slug,
      eyebrow: row.eyebrow ?? undefined,
      title: row.title,
      description: row.description ?? undefined,
    };
  }

  async updatePageMeta(input: PageMetaInput, updatedBy: string) {
    const row = await prisma.pageMeta.upsert({
      where: { slug: input.slug },
      update: {
        eyebrow: input.eyebrow ?? null,
        title: input.title,
        description: input.description ?? null,
        updatedBy,
      },
      create: {
        slug: input.slug,
        eyebrow: input.eyebrow ?? null,
        title: input.title,
        description: input.description ?? null,
        updatedBy,
      },
    });
    return {
      slug: row.slug,
      eyebrow: row.eyebrow ?? undefined,
      title: row.title,
      description: row.description ?? undefined,
    };
  }

  async listInquiries(page: number, pageSize: number) {
    const [total, items] = await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.findMany({
        orderBy: { receivedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return {
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        email: i.email,
        phone: i.phone ?? undefined,
        projectType: i.projectType,
        message: i.message,
        receivedAt: i.receivedAt.toISOString(),
        readAt: i.readAt?.toISOString(),
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  }

  async getInquiry(id: string) {
    const row = await prisma.contactInquiry.findUnique({ where: { id } });
    if (!row) return null;
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone ?? undefined,
      projectType: row.projectType,
      message: row.message,
      receivedAt: row.receivedAt.toISOString(),
      readAt: row.readAt?.toISOString(),
    };
  }

  async markInquiryRead(id: string) {
    const row = await prisma.contactInquiry.update({
      where: { id },
      data: { readAt: new Date() },
    });
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone ?? undefined,
      projectType: row.projectType,
      message: row.message,
      receivedAt: row.receivedAt.toISOString(),
      readAt: row.readAt?.toISOString(),
    };
  }
}

export const dbAdminContentRepository = new DbAdminContentRepository();
