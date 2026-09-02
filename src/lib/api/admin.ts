import { request } from "./client";
import type {
  AboutSection,
  AdminDashboardStats,
  CompanyMeta,
  ContactInquiryListItem,
  HeroSlide,
  PageMeta,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  TeamDepartment,
  Testimonial,
} from "@/types/admin";
import type { PaginatedResponse } from "@/types/api";

export function fetchDashboardStats() {
  return request<AdminDashboardStats>("/admin/dashboard");
}

export function fetchAdminServices() {
  return request<ServiceItem[]>("/admin/services");
}

export function fetchAdminService(id: string) {
  return request<ServiceItem>(`/admin/services/${id}`);
}

export function createAdminService(data: unknown) {
  return request<ServiceItem>("/admin/services", { method: "POST", body: JSON.stringify(data) });
}

export function updateAdminService(id: string, data: unknown) {
  return request<ServiceItem>(`/admin/services/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteAdminService(id: string) {
  return request<{ deleted: boolean }>(`/admin/services/${id}`, { method: "DELETE" });
}

export function fetchAdminProjects() {
  return request<ProjectItem[]>("/admin/projects");
}

export function fetchAdminProject(id: string) {
  return request<ProjectItem>(`/admin/projects/${id}`);
}

export function createAdminProject(data: unknown) {
  return request<ProjectItem>("/admin/projects", { method: "POST", body: JSON.stringify(data) });
}

export function updateAdminProject(id: string, data: unknown) {
  return request<ProjectItem>(`/admin/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteAdminProject(id: string) {
  return request<{ deleted: boolean }>(`/admin/projects/${id}`, { method: "DELETE" });
}

export function fetchAdminHeroSlides() {
  return request<HeroSlide[]>("/admin/hero-slides");
}

export function createAdminHeroSlide(data: unknown) {
  return request<HeroSlide>("/admin/hero-slides", { method: "POST", body: JSON.stringify(data) });
}

export function updateAdminHeroSlide(id: string, data: unknown) {
  return request<HeroSlide>(`/admin/hero-slides/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteAdminHeroSlide(id: string) {
  return request<{ deleted: boolean }>(`/admin/hero-slides/${id}`, { method: "DELETE" });
}

export function reorderAdminHeroSlides(ids: string[]) {
  return request<HeroSlide[]>("/admin/hero-slides", {
    method: "PATCH",
    body: JSON.stringify({ ids }),
  });
}

export function fetchAdminTestimonials() {
  return request<Testimonial[]>("/admin/testimonials");
}

export function createAdminTestimonial(data: unknown) {
  return request<Testimonial>("/admin/testimonials", { method: "POST", body: JSON.stringify(data) });
}

export function updateAdminTestimonial(id: string, data: unknown) {
  return request<Testimonial>(`/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteAdminTestimonial(id: string) {
  return request<{ deleted: boolean }>(`/admin/testimonials/${id}`, { method: "DELETE" });
}

export function fetchAdminProcessSteps() {
  return request<(ProcessStep & { id?: string })[]>("/admin/process-steps");
}

export function createAdminProcessStep(data: unknown) {
  return request<ProcessStep & { id: string }>("/admin/process-steps", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateAdminProcessStep(id: string, data: unknown) {
  return request<ProcessStep & { id: string }>(`/admin/process-steps/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteAdminProcessStep(id: string) {
  return request<{ deleted: boolean }>(`/admin/process-steps/${id}`, { method: "DELETE" });
}

export function fetchAdminDepartments() {
  return request<TeamDepartment[]>("/admin/team/departments");
}

export function createAdminDepartment(data: unknown) {
  return request<TeamDepartment>("/admin/team/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateAdminDepartment(id: string, data: unknown) {
  return request<TeamDepartment>(`/admin/team/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteAdminDepartment(id: string) {
  return request<{ deleted: boolean }>(`/admin/team/departments/${id}`, { method: "DELETE" });
}

export function fetchAdminMembers(departmentId?: string) {
  const query = departmentId ? `?departmentId=${encodeURIComponent(departmentId)}` : "";
  return request<TeamDepartment["members"]>(`/admin/team/members${query}`);
}

export function createAdminMember(data: unknown) {
  return request<TeamDepartment["members"][number]>("/admin/team/members", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateAdminMember(id: string, data: unknown) {
  return request<TeamDepartment["members"][number]>(`/admin/team/members/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteAdminMember(id: string) {
  return request<{ deleted: boolean }>(`/admin/team/members/${id}`, { method: "DELETE" });
}

export function fetchAdminAbout() {
  return request<AboutSection>("/admin/about");
}

export function updateAdminAbout(data: unknown) {
  return request<AboutSection>("/admin/about", { method: "PUT", body: JSON.stringify(data) });
}

export function fetchAdminCompany() {
  return request<CompanyMeta>("/admin/company");
}

export function updateAdminCompany(data: unknown) {
  return request<CompanyMeta>("/admin/company", { method: "PUT", body: JSON.stringify(data) });
}

export function fetchAdminPageMetaList() {
  return request<(PageMeta & { slug: string })[]>("/admin/pages");
}

export function updateAdminPageMeta(slug: string, data: unknown) {
  return request<PageMeta & { slug: string }>(`/admin/pages/${slug}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function fetchAdminInquiries(page = 1, pageSize = 20) {
  return request<PaginatedResponse<ContactInquiryListItem>>(
    `/admin/inquiries?page=${page}&pageSize=${pageSize}`,
  );
}

export function fetchAdminInquiry(id: string) {
  return request<ContactInquiryListItem>(`/admin/inquiries/${id}`);
}

export function markAdminInquiryRead(id: string) {
  return request<ContactInquiryListItem>(`/admin/inquiries/${id}`, { method: "PATCH" });
}
