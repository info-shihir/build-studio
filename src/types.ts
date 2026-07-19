export interface Socials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  hours: string;
  socials: Socials;
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

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
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
  role: string;
  bio: string;
  image: string;
  socials: Socials;
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

export interface SiteContent {
  company: CompanyMeta;
  hero: {
    slides: HeroSlide[];
  };
  about: AboutSection;
  services: ServiceItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  process: ProcessStep[];
  testimonials: Testimonial[];
}
