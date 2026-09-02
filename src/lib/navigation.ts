export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Real Estate", href: "/services/real-estate" },
      { label: "Contractor", href: "/services/contractor" },
      { label: "Infrastructure", href: "/services/infrastructure" },
      { label: "Export-Import", href: "/services/export-import" },
      { label: "Supplier", href: "/services/supplier" },
    ],
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

export const consultationCtaHref = "/services/consultancy";

export const serviceSlugs = [
  "real-estate",
  "contractor",
  "infrastructure",
  "export-import",
  "supplier",
  "consultancy",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(slug);
}
