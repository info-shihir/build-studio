export interface Socials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
}

export interface CompanyMap {
  lat?: number;
  lng?: number;
  zoom?: number;
  label?: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  hours: string;
  socials: Socials;
  map?: CompanyMap;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sub: string;
}

export interface CompanyMeta {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  foundedYear: string;
  logo?: string;
  registeredOffice?: string;
  authorizedCapital?: string;
  liabilityType?: string;
  regulatoryNote?: string;
  stats: StatItem[];
  contact: ContactInfo;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

export interface AboutPillar {
  title: string;
  desc: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  pillars: AboutPillar[];
}

export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  details?: string[];
  scope?: string[];
  processSteps?: ServiceProcessStep[];
  timeline?: string;
  targetSectors?: string;
  typicalTeam?: string;
  tools?: string;
  methodology?: string;
  compliance?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  credentials?: string;
  role: string;
  bio: string;
  phone?: string;
  email?: string;
  image: string;
  socials: Socials;
}

export interface TeamDepartment {
  id: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
}

export interface PageMeta {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface SitePagesMeta {
  about?: PageMeta;
  services?: PageMeta;
  projects?: PageMeta;
  team?: PageMeta;
  process?: PageMeta;
  testimonials?: PageMeta;
  contact?: PageMeta;
}

export interface SiteContent {
  company: CompanyMeta;
  hero: {
    slides: HeroSlide[];
  };
  about: AboutSection;
  services: ServiceItem[];
  projects: ProjectItem[];
  teamDepartments: TeamDepartment[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  pages?: SitePagesMeta;
}
