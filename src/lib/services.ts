import { content } from "./content";
import { ServiceItem } from "../types";
import { ServiceSlug } from "./navigation";

const DIRECTORY_EXCLUDED_SLUGS = new Set<string>(["consultancy"]);

/** Core division services shown in homepage/services directory UI (excludes Consultancy & e-GP). */
export function getListedServices(): ServiceItem[] {
  return content.services.filter((s) => !DIRECTORY_EXCLUDED_SLUGS.has(s.slug));
}

export function getServiceBySlug(slug: ServiceSlug): ServiceItem | undefined {
  return content.services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return content.services.map((s) => s.slug as ServiceSlug);
}
