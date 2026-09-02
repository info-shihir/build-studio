import type {
  AboutInput,
  AdminDashboardStats,
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

export interface IAdminContentRepository {
  getDashboardStats(): Promise<AdminDashboardStats>;
  listServices(): Promise<ServiceItem[]>;
  getService(id: string): Promise<ServiceItem | null>;
  createService(input: ServiceInput, updatedBy: string): Promise<ServiceItem>;
  updateService(id: string, input: ServiceInput, updatedBy: string): Promise<ServiceItem>;
  deleteService(id: string): Promise<void>;
  listProjects(): Promise<ProjectItem[]>;
  getProject(id: string): Promise<ProjectItem | null>;
  createProject(input: ProjectInput, updatedBy: string): Promise<ProjectItem>;
  updateProject(id: string, input: ProjectInput, updatedBy: string): Promise<ProjectItem>;
  deleteProject(id: string): Promise<void>;
  listHeroSlides(): Promise<HeroSlide[]>;
  getHeroSlide(id: string): Promise<HeroSlide | null>;
  createHeroSlide(input: HeroSlideInput, updatedBy: string): Promise<HeroSlide>;
  updateHeroSlide(id: string, input: HeroSlideInput, updatedBy: string): Promise<HeroSlide>;
  deleteHeroSlide(id: string): Promise<void>;
  reorderHeroSlides(ids: string[]): Promise<HeroSlide[]>;
  listTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | null>;
  createTestimonial(input: TestimonialInput, updatedBy: string): Promise<Testimonial>;
  updateTestimonial(id: string, input: TestimonialInput, updatedBy: string): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;
  listProcessSteps(): Promise<ProcessStep[]>;
  getProcessStep(id: string): Promise<ProcessStep | null>;
  createProcessStep(input: ProcessStepInput, updatedBy: string): Promise<ProcessStep & { id: string }>;
  updateProcessStep(id: string, input: ProcessStepInput, updatedBy: string): Promise<ProcessStep & { id: string }>;
  deleteProcessStep(id: string): Promise<void>;
  listDepartments(): Promise<TeamDepartment[]>;
  getDepartment(id: string): Promise<TeamDepartment | null>;
  createDepartment(input: TeamDepartmentInput, updatedBy: string): Promise<TeamDepartment>;
  updateDepartment(id: string, input: TeamDepartmentInput, updatedBy: string): Promise<TeamDepartment>;
  deleteDepartment(id: string): Promise<void>;
  listMembers(departmentId?: string): Promise<TeamDepartment["members"]>;
  getMember(id: string): Promise<TeamDepartment["members"][number] | null>;
  createMember(input: TeamMemberInput, updatedBy: string): Promise<TeamDepartment["members"][number]>;
  updateMember(id: string, input: TeamMemberInput, updatedBy: string): Promise<TeamDepartment["members"][number]>;
  deleteMember(id: string): Promise<void>;
  getAbout(): Promise<AboutSection>;
  updateAbout(input: AboutInput, updatedBy: string): Promise<AboutSection>;
  getCompany(): Promise<CompanyMeta>;
  updateCompany(input: CompanyInput, updatedBy: string): Promise<CompanyMeta>;
  listPageMeta(): Promise<(PageMeta & { slug: string })[]>;
  getPageMeta(slug: string): Promise<(PageMeta & { slug: string }) | null>;
  updatePageMeta(input: PageMetaInput, updatedBy: string): Promise<PageMeta & { slug: string }>;
  listInquiries(page: number, pageSize: number): Promise<PaginatedResponse<ContactInquiryListItem>>;
  getInquiry(id: string): Promise<ContactInquiryListItem | null>;
  markInquiryRead(id: string): Promise<ContactInquiryListItem>;
}
