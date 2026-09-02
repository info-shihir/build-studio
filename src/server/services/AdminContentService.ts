import type { AdminActor, AdminRole } from "@/types/admin";
import { dbAdminContentRepository } from "@/server/adapters/db/DbAdminContentRepository";
import { jsonAdminContentRepository } from "@/server/adapters/json/JsonAdminContentRepository";
import { isDatabaseEnabled } from "@/server/db/prisma";
import {
  aboutSchema,
  companySchema,
  heroSlideSchema,
  pageMetaSchema,
  processStepSchema,
  projectSchema,
  serviceSchema,
  teamDepartmentSchema,
  teamMemberSchema,
  testimonialSchema,
} from "@/server/validation/adminSchemas";

const ROLE_RANK: Record<AdminRole, number> = {
  viewer: 1,
  editor: 2,
  super_admin: 3,
};

function assertRole(actor: AdminActor, minRole: AdminRole) {
  if (ROLE_RANK[actor.role] < ROLE_RANK[minRole]) {
    throw new Error("Insufficient permissions.");
  }
}

function assertCanWrite(actor: AdminActor) {
  assertRole(actor, "editor");
}

function assertCanDelete(actor: AdminActor) {
  assertRole(actor, "super_admin");
}

function actorEmail(actor: AdminActor) {
  return actor.email;
}

export class AdminContentService {
  private repo = isDatabaseEnabled() ? dbAdminContentRepository : jsonAdminContentRepository;

  getDashboardStats(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.getDashboardStats();
  }

  listServices(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listServices();
  }

  getService(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getService(id);
  }

  createService(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = serviceSchema.parse(input);
    return this.repo.createService(data, actorEmail(actor));
  }

  updateService(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = serviceSchema.parse(input);
    return this.repo.updateService(id, data, actorEmail(actor));
  }

  deleteService(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteService(id);
  }

  listProjects(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listProjects();
  }

  getProject(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getProject(id);
  }

  createProject(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = projectSchema.parse(input);
    return this.repo.createProject(data, actorEmail(actor));
  }

  updateProject(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = projectSchema.parse(input);
    return this.repo.updateProject(id, data, actorEmail(actor));
  }

  deleteProject(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteProject(id);
  }

  listHeroSlides(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listHeroSlides();
  }

  getHeroSlide(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getHeroSlide(id);
  }

  createHeroSlide(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = heroSlideSchema.parse(input);
    return this.repo.createHeroSlide(data, actorEmail(actor));
  }

  updateHeroSlide(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = heroSlideSchema.parse(input);
    return this.repo.updateHeroSlide(id, data, actorEmail(actor));
  }

  deleteHeroSlide(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteHeroSlide(id);
  }

  reorderHeroSlides(actor: AdminActor, ids: string[]) {
    assertCanWrite(actor);
    return this.repo.reorderHeroSlides(ids);
  }

  listTestimonials(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listTestimonials();
  }

  getTestimonial(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getTestimonial(id);
  }

  createTestimonial(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = testimonialSchema.parse(input);
    return this.repo.createTestimonial(data, actorEmail(actor));
  }

  updateTestimonial(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = testimonialSchema.parse(input);
    return this.repo.updateTestimonial(id, data, actorEmail(actor));
  }

  deleteTestimonial(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteTestimonial(id);
  }

  listProcessSteps(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listProcessSteps();
  }

  getProcessStep(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getProcessStep(id);
  }

  createProcessStep(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = processStepSchema.parse(input);
    return this.repo.createProcessStep(data, actorEmail(actor));
  }

  updateProcessStep(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = processStepSchema.parse(input);
    return this.repo.updateProcessStep(id, data, actorEmail(actor));
  }

  deleteProcessStep(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteProcessStep(id);
  }

  listDepartments(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listDepartments();
  }

  getDepartment(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getDepartment(id);
  }

  createDepartment(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = teamDepartmentSchema.parse(input);
    return this.repo.createDepartment(data, actorEmail(actor));
  }

  updateDepartment(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = teamDepartmentSchema.parse(input);
    return this.repo.updateDepartment(id, data, actorEmail(actor));
  }

  deleteDepartment(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteDepartment(id);
  }

  listMembers(actor: AdminActor, departmentId?: string) {
    assertRole(actor, "viewer");
    return this.repo.listMembers(departmentId);
  }

  getMember(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getMember(id);
  }

  createMember(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = teamMemberSchema.parse(input);
    return this.repo.createMember(data, actorEmail(actor));
  }

  updateMember(actor: AdminActor, id: string, input: unknown) {
    assertCanWrite(actor);
    const data = teamMemberSchema.parse(input);
    return this.repo.updateMember(id, data, actorEmail(actor));
  }

  deleteMember(actor: AdminActor, id: string) {
    assertCanDelete(actor);
    return this.repo.deleteMember(id);
  }

  getAbout(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.getAbout();
  }

  updateAbout(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = aboutSchema.parse(input);
    return this.repo.updateAbout(data, actorEmail(actor));
  }

  getCompany(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.getCompany();
  }

  updateCompany(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = companySchema.parse(input);
    return this.repo.updateCompany(data, actorEmail(actor));
  }

  listPageMeta(actor: AdminActor) {
    assertRole(actor, "viewer");
    return this.repo.listPageMeta();
  }

  getPageMeta(actor: AdminActor, slug: string) {
    assertRole(actor, "viewer");
    return this.repo.getPageMeta(slug);
  }

  updatePageMeta(actor: AdminActor, input: unknown) {
    assertCanWrite(actor);
    const data = pageMetaSchema.parse(input);
    return this.repo.updatePageMeta(data, actorEmail(actor));
  }

  listInquiries(actor: AdminActor, page: number, pageSize: number) {
    assertRole(actor, "viewer");
    return this.repo.listInquiries(page, pageSize);
  }

  getInquiry(actor: AdminActor, id: string) {
    assertRole(actor, "viewer");
    return this.repo.getInquiry(id);
  }

  markInquiryRead(actor: AdminActor, id: string) {
    assertCanWrite(actor);
    return this.repo.markInquiryRead(id);
  }
}

export const adminContentService = new AdminContentService();
