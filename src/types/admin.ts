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
} from "./site";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export type AdminRole = "super_admin" | "editor" | "viewer";

export interface AdminSession {
  user: AdminUser;
  expiresAt: string;
}

export interface ContentRevisionMeta {
  updatedAt: string;
  updatedBy: string;
}

export interface AdminActor {
  id: string;
  email: string;
  role: AdminRole;
}

export interface ServiceInput {
  id?: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  details?: string[];
  scope?: string[];
  features: string[];
  processSteps?: { title: string; desc: string }[];
  timeline?: string;
  targetSectors?: string;
  typicalTeam?: string;
  tools?: string;
  methodology?: string;
  compliance?: string;
  sortOrder?: number;
}

export interface ProjectInput {
  id?: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  features: string[];
  sortOrder?: number;
}

export interface HeroSlideInput {
  id?: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  sortOrder?: number;
}

export interface TestimonialInput {
  id?: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
  sortOrder?: number;
}

export interface ProcessStepInput {
  id?: string;
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  sortOrder?: number;
}

export interface TeamDepartmentInput {
  id?: string;
  title: string;
  description?: string;
  sortOrder?: number;
}

export interface TeamMemberInput {
  id?: string;
  departmentId: string;
  name: string;
  credentials?: string;
  role: string;
  bio: string;
  phone?: string;
  email?: string;
  image: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    pinterest?: string;
  };
  sortOrder?: number;
}

export interface AboutInput {
  title: string;
  subtitle: string;
  paragraphs: string[];
  pillars: { title: string; desc: string }[];
}

export interface CompanyInput extends Omit<CompanyMeta, "stats" | "contact"> {
  stats: { id?: string; value: string; label: string; sub: string }[];
  contact: CompanyMeta["contact"];
}

export interface PageMetaInput extends PageMeta {
  slug: string;
}

export interface ContactInquiryListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  receivedAt: string;
  readAt?: string;
}

export interface AdminDashboardStats {
  services: number;
  projects: number;
  teamMembers: number;
  heroSlides: number;
  testimonials: number;
  processSteps: number;
  inquiries: number;
  unreadInquiries: number;
}

export type { ServiceItem, ProjectItem, HeroSlide, Testimonial, ProcessStep, TeamDepartment, AboutSection, CompanyMeta, PageMeta };
