import type { ContactInquiryInput, ContactInquiryResult } from "@/types/api";
import type { SiteContent } from "@/types/site";
import type { ServiceItem } from "@/types/site";
import type { ProjectItem, TeamDepartment } from "@/types/site";
import { request } from "./client";

export async function fetchSiteContent(): Promise<SiteContent> {
  return request<SiteContent>("/content");
}

export async function fetchServices(): Promise<ServiceItem[]> {
  return request<ServiceItem[]>("/services");
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceItem> {
  return request<ServiceItem>(`/services/${slug}`);
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  return request<ProjectItem[]>("/projects");
}

export async function fetchTeamDepartments(): Promise<TeamDepartment[]> {
  return request<TeamDepartment[]>("/team");
}

export async function submitContactInquiry(input: ContactInquiryInput): Promise<ContactInquiryResult> {
  return request<ContactInquiryResult>("/contact/inquiries", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
