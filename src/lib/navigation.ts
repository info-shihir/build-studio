import { staticSiteContent } from "@/server/adapters/json/staticContent";
import type { ServiceItem } from "@/types/site";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const DIRECTORY_EXCLUDED_SLUGS = new Set<string>(["consultancy"]);

export const consultationCtaHref = "/services/consultancy";

export function getServiceSlugsFromContent(): string[] {
  return staticSiteContent.services.map((s) => s.slug);
}

export const serviceSlugs = getServiceSlugsFromContent() as readonly string[];

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(slug);
}

function buildServiceNavItems(services: ServiceItem[]): NavItem[] {
  return services
    .filter((s) => !DIRECTORY_EXCLUDED_SLUGS.has(s.slug))
    .map((s) => ({ label: s.title.replace(/ & e-GP$/, "").replace(/Export-Import/i, "Export-Import"), href: `/services/${s.slug}` }));
}

export function buildMainNavigation(): NavItem[] {
  const serviceChildren = buildServiceNavItems(staticSiteContent.services);

  return [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: serviceChildren,
    },
    { label: "Projects", href: "/projects" },
    {
      label: "Company",
      href: "/team",
      children: [
        { label: "Team", href: "/team" },
        { label: "How We Work", href: "/process" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];
}

export const mainNavigation: NavItem[] = buildMainNavigation();

export function getPageMeta(page: keyof NonNullable<typeof staticSiteContent.pages>) {
  return staticSiteContent.pages?.[page];
}
