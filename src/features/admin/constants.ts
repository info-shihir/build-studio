export const adminNavItems = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/hero", label: "Hero Slides" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/process", label: "Process" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/company", label: "Company" },
  { href: "/admin/pages", label: "Page Meta" },
  { href: "/admin/inquiries", label: "Inquiries" },
] as const;

export const pageMetaSlugs = [
  "about",
  "services",
  "projects",
  "team",
  "process",
  "testimonials",
  "contact",
] as const;

export const serviceIcons = [
  "Building",
  "HardHat",
  "Route",
  "Ship",
  "Package",
  "Briefcase",
] as const;
