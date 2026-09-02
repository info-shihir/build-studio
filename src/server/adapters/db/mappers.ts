import type {
  AboutSection,
  CompanyMeta,
  HeroSlide,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  ServiceProcessStep,
  SiteContent,
  SitePagesMeta,
  TeamDepartment,
  TeamMember,
  Testimonial,
} from "@/types/site";
import type {
  AboutPillar as PrismaAboutPillar,
  Company,
  HeroSlide as PrismaHeroSlide,
  ProcessStep as PrismaProcessStep,
  Project,
  Service,
  StatItem,
  TeamDepartment as PrismaTeamDepartment,
  TeamMember as PrismaTeamMember,
  Testimonial as PrismaTestimonial,
  PageMeta,
} from "@prisma/client";

export function mapCompany(
  company: Company & { stats: StatItem[] },
): CompanyMeta {
  return {
    name: company.name,
    shortName: company.shortName,
    tagline: company.tagline,
    description: company.description,
    foundedYear: company.foundedYear,
    logo: company.logo ?? undefined,
    registeredOffice: company.registeredOffice ?? undefined,
    authorizedCapital: company.authorizedCapital ?? undefined,
    liabilityType: company.liabilityType ?? undefined,
    regulatoryNote: company.regulatoryNote ?? undefined,
    stats: company.stats
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ id: s.id, value: s.value, label: s.label, sub: s.sub })),
    contact: {
      address: company.contactAddress,
      email: company.contactEmail,
      phone: company.contactPhone,
      hours: company.contactHours,
      socials: {
        facebook: company.socialFacebook ?? undefined,
        instagram: company.socialInstagram ?? undefined,
        linkedin: company.socialLinkedin ?? undefined,
        pinterest: company.socialPinterest ?? undefined,
      },
    },
  };
}

export function mapHeroSlide(slide: PrismaHeroSlide): HeroSlide {
  return {
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image,
    cta: slide.cta,
    link: slide.link,
  };
}

export function mapAbout(
  about: { title: string; subtitle: string; paragraphs: string[]; pillars: PrismaAboutPillar[] },
): AboutSection {
  return {
    title: about.title,
    subtitle: about.subtitle,
    paragraphs: about.paragraphs,
    pillars: about.pillars
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => ({ title: p.title, desc: p.desc })),
  };
}

export function mapService(service: Service): ServiceItem {
  const processSteps = (service.processSteps as unknown as ServiceProcessStep[] | null) ?? [];
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    icon: service.icon,
    shortDesc: service.shortDesc,
    longDesc: service.longDesc,
    details: service.details.length ? service.details : undefined,
    scope: service.scope.length ? service.scope : undefined,
    features: service.features,
    processSteps: processSteps.length ? processSteps : undefined,
    timeline: service.timeline ?? undefined,
    targetSectors: service.targetSectors ?? undefined,
    typicalTeam: service.typicalTeam ?? undefined,
    tools: service.tools ?? undefined,
    methodology: service.methodology ?? undefined,
    compliance: service.compliance ?? undefined,
  };
}

export function mapProject(project: Project): ProjectItem {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    client: project.client,
    location: project.location,
    year: project.year,
    area: project.area,
    image: project.image,
    description: project.description,
    features: project.features,
  };
}

export function mapTeamMember(member: PrismaTeamMember): TeamMember {
  return {
    id: member.id,
    name: member.name,
    credentials: member.credentials ?? undefined,
    role: member.role,
    bio: member.bio,
    phone: member.phone ?? undefined,
    email: member.email ?? undefined,
    image: member.image,
    socials: {
      facebook: member.socialFacebook ?? undefined,
      instagram: member.socialInstagram ?? undefined,
      linkedin: member.socialLinkedin ?? undefined,
      pinterest: member.socialPinterest ?? undefined,
    },
  };
}

export function mapTeamDepartment(
  dept: PrismaTeamDepartment & { members: PrismaTeamMember[] },
): TeamDepartment {
  return {
    id: dept.id,
    title: dept.title,
    description: dept.description ?? undefined,
    members: dept.members
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(mapTeamMember),
  };
}

export function mapProcessStep(step: PrismaProcessStep): ProcessStep {
  return {
    step: step.step,
    title: step.title,
    subtitle: step.subtitle,
    desc: step.desc,
  };
}

export function mapTestimonial(t: PrismaTestimonial): Testimonial {
  return {
    id: t.id,
    name: t.name,
    company: t.company,
    quote: t.quote,
    rating: t.rating,
    image: t.image,
  };
}

export function mapPageMetaRecords(records: PageMeta[]): SitePagesMeta {
  const pages: SitePagesMeta = {};
  for (const record of records) {
    const meta = {
      eyebrow: record.eyebrow ?? undefined,
      title: record.title,
      description: record.description ?? undefined,
    };
    switch (record.slug) {
      case "about":
        pages.about = meta;
        break;
      case "services":
        pages.services = meta;
        break;
      case "projects":
        pages.projects = meta;
        break;
      case "team":
        pages.team = meta;
        break;
      case "process":
        pages.process = meta;
        break;
      case "testimonials":
        pages.testimonials = meta;
        break;
      case "contact":
        pages.contact = meta;
        break;
    }
  }
  return pages;
}

export function buildSiteContent(parts: {
  company: CompanyMeta;
  heroSlides: HeroSlide[];
  about: AboutSection;
  services: ServiceItem[];
  projects: ProjectItem[];
  teamDepartments: TeamDepartment[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  pages?: SitePagesMeta;
}): SiteContent {
  return {
    company: parts.company,
    hero: { slides: parts.heroSlides },
    about: parts.about,
    services: parts.services,
    projects: parts.projects,
    teamDepartments: parts.teamDepartments,
    process: parts.process,
    testimonials: parts.testimonials,
    pages: parts.pages,
  };
}
