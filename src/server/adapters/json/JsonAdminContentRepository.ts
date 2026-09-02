import type { IAdminContentRepository } from "@/server/repositories/IAdminContentRepository";
import type {
  AboutInput,
  CompanyInput,
  ContactInquiryListItem,
  HeroSlideInput,
  PageMetaInput,
  ProcessStepInput,
  ProjectInput,
  ServiceInput,
  TeamDepartmentInput,
  TeamMemberInput,
  TestimonialInput,
} from "@/types/admin";
import type { PaginatedResponse } from "@/types/api";
import type {
  AboutSection,
  CompanyMeta,
  HeroSlide,
  PageMeta,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  TeamDepartment,
  Testimonial,
} from "@/types/site";
import { staticSiteContent } from "./staticContent";
import { DEMO_DB_DISABLED_MESSAGE } from "@/server/auth/demoUser";

function denyWrite<T>(): Promise<T> {
  return Promise.reject(new Error(DEMO_DB_DISABLED_MESSAGE));
}

export class JsonAdminContentRepository implements IAdminContentRepository {
  async getDashboardStats() {
    const content = staticSiteContent;
    return {
      services: content.services.length,
      projects: content.projects.length,
      teamMembers: content.teamDepartments.reduce((sum, d) => sum + d.members.length, 0),
      heroSlides: content.hero.slides.length,
      testimonials: content.testimonials.length,
      processSteps: content.process.length,
      inquiries: 0,
      unreadInquiries: 0,
    };
  }

  async listServices() {
    return staticSiteContent.services;
  }

  async getService(id: string) {
    return staticSiteContent.services.find((s) => s.id === id) ?? null;
  }

  createService(_input: ServiceInput, _updatedBy: string) {
    return denyWrite<ServiceItem>();
  }

  updateService(_id: string, _input: ServiceInput, _updatedBy: string) {
    return denyWrite<ServiceItem>();
  }

  deleteService(_id: string) {
    return denyWrite<void>();
  }

  async listProjects() {
    return staticSiteContent.projects;
  }

  async getProject(id: string) {
    return staticSiteContent.projects.find((p) => p.id === id) ?? null;
  }

  createProject(_input: ProjectInput, _updatedBy: string) {
    return denyWrite<ProjectItem>();
  }

  updateProject(_id: string, _input: ProjectInput, _updatedBy: string) {
    return denyWrite<ProjectItem>();
  }

  deleteProject(_id: string) {
    return denyWrite<void>();
  }

  async listHeroSlides() {
    return staticSiteContent.hero.slides;
  }

  async getHeroSlide(id: string) {
    return staticSiteContent.hero.slides.find((s) => s.id === id) ?? null;
  }

  createHeroSlide(_input: HeroSlideInput, _updatedBy: string) {
    return denyWrite<HeroSlide>();
  }

  updateHeroSlide(_id: string, _input: HeroSlideInput, _updatedBy: string) {
    return denyWrite<HeroSlide>();
  }

  deleteHeroSlide(_id: string) {
    return denyWrite<void>();
  }

  reorderHeroSlides(_ids: string[]) {
    return denyWrite<HeroSlide[]>();
  }

  async listTestimonials() {
    return staticSiteContent.testimonials;
  }

  async getTestimonial(id: string) {
    return staticSiteContent.testimonials.find((t) => t.id === id) ?? null;
  }

  createTestimonial(_input: TestimonialInput, _updatedBy: string) {
    return denyWrite<Testimonial>();
  }

  updateTestimonial(_id: string, _input: TestimonialInput, _updatedBy: string) {
    return denyWrite<Testimonial>();
  }

  deleteTestimonial(_id: string) {
    return denyWrite<void>();
  }

  async listProcessSteps() {
    return staticSiteContent.process.map((step, index) => ({
      ...step,
      id: `demo-step-${index}`,
    }));
  }

  async getProcessStep(id: string) {
    const steps = await this.listProcessSteps();
    return steps.find((s) => s.id === id) ?? null;
  }

  createProcessStep(_input: ProcessStepInput, _updatedBy: string) {
    return denyWrite<ProcessStep & { id: string }>();
  }

  updateProcessStep(_id: string, _input: ProcessStepInput, _updatedBy: string) {
    return denyWrite<ProcessStep & { id: string }>();
  }

  deleteProcessStep(_id: string) {
    return denyWrite<void>();
  }

  async listDepartments() {
    return staticSiteContent.teamDepartments;
  }

  async getDepartment(id: string) {
    return staticSiteContent.teamDepartments.find((d) => d.id === id) ?? null;
  }

  createDepartment(_input: TeamDepartmentInput, _updatedBy: string) {
    return denyWrite<TeamDepartment>();
  }

  updateDepartment(_id: string, _input: TeamDepartmentInput, _updatedBy: string) {
    return denyWrite<TeamDepartment>();
  }

  deleteDepartment(_id: string) {
    return denyWrite<void>();
  }

  async listMembers(departmentId?: string) {
    if (departmentId) {
      return staticSiteContent.teamDepartments.find((d) => d.id === departmentId)?.members ?? [];
    }
    return staticSiteContent.teamDepartments.flatMap((d) => d.members);
  }

  async getMember(id: string) {
    for (const dept of staticSiteContent.teamDepartments) {
      const member = dept.members.find((m) => m.id === id);
      if (member) return member;
    }
    return null;
  }

  createMember(_input: TeamMemberInput, _updatedBy: string) {
    return denyWrite<TeamDepartment["members"][number]>();
  }

  updateMember(_id: string, _input: TeamMemberInput, _updatedBy: string) {
    return denyWrite<TeamDepartment["members"][number]>();
  }

  deleteMember(_id: string) {
    return denyWrite<void>();
  }

  async getAbout() {
    return staticSiteContent.about;
  }

  updateAbout(_input: AboutInput, _updatedBy: string) {
    return denyWrite<AboutSection>();
  }

  async getCompany() {
    return staticSiteContent.company;
  }

  updateCompany(_input: CompanyInput, _updatedBy: string) {
    return denyWrite<CompanyMeta>();
  }

  async listPageMeta() {
    const pages = staticSiteContent.pages ?? {};
    return Object.entries(pages).map(([slug, meta]) => ({
      slug,
      eyebrow: meta?.eyebrow,
      title: meta?.title ?? slug,
      description: meta?.description,
    }));
  }

  async getPageMeta(slug: string) {
    const meta = staticSiteContent.pages?.[slug as keyof typeof staticSiteContent.pages];
    if (!meta) return null;
    return { slug, ...meta };
  }

  updatePageMeta(_input: PageMetaInput, _updatedBy: string) {
    return denyWrite<PageMeta & { slug: string }>();
  }

  async listInquiries(_page: number, _pageSize: number): Promise<PaginatedResponse<ContactInquiryListItem>> {
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 1,
    };
  }

  async getInquiry(_id: string) {
    return null;
  }

  markInquiryRead(_id: string) {
    return denyWrite<ContactInquiryListItem>();
  }
}

export const jsonAdminContentRepository = new JsonAdminContentRepository();
