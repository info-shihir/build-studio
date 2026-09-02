import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  icon: z.string().min(1),
  shortDesc: z.string().min(1),
  longDesc: z.string().min(1),
  details: z.array(z.string()).optional(),
  scope: z.array(z.string()).optional(),
  features: z.array(z.string()).min(1),
  processSteps: z.array(z.object({ title: z.string(), desc: z.string() })).optional(),
  timeline: z.string().optional(),
  targetSectors: z.string().optional(),
  typicalTeam: z.string().optional(),
  tools: z.string().optional(),
  methodology: z.string().optional(),
  compliance: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  category: z.string().min(1),
  client: z.string().min(1),
  location: z.string().min(1),
  year: z.string().min(1),
  area: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  sortOrder: z.number().int().optional(),
});

export const heroSlideSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().min(1),
  cta: z.string().min(1),
  link: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  company: z.string().min(1),
  quote: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  image: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const processStepSchema = z.object({
  id: z.string().optional(),
  step: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  desc: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const teamDepartmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  departmentId: z.string().min(1),
  name: z.string().min(1),
  credentials: z.string().optional(),
  role: z.string().min(1),
  bio: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  image: z.string().min(1),
  socials: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      pinterest: z.string().optional(),
    })
    .optional(),
  sortOrder: z.number().int().optional(),
});

export const aboutSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  pillars: z.array(z.object({ title: z.string().min(1), desc: z.string().min(1) })).min(1),
});

export const companySchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  foundedYear: z.string().min(1),
  logo: z.string().optional(),
  registeredOffice: z.string().optional(),
  authorizedCapital: z.string().optional(),
  liabilityType: z.string().optional(),
  regulatoryNote: z.string().optional(),
  stats: z.array(
    z.object({
      id: z.string().optional(),
      value: z.string().min(1),
      label: z.string().min(1),
      sub: z.string().min(1),
    }),
  ),
  contact: z.object({
    address: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    hours: z.string().min(1),
    socials: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      pinterest: z.string().optional(),
    }),
  }),
});

export const pageMetaSchema = z.object({
  slug: z.string().min(1),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
