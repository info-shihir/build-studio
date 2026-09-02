import { siteContentService } from "@/server/services";
import type { ServiceItem } from "@/types/site";
import type { ServiceSlug } from "@/lib/navigation";

/** Listed services for directory UI (excludes Consultancy & e-GP). */
export async function getListedServices(): Promise<ServiceItem[]> {
  return siteContentService.getListedServices();
}

export async function getServiceBySlug(slug: ServiceSlug) {
  return siteContentService.getServiceBySlug(slug);
}

export async function getAllServiceSlugs(): Promise<ServiceSlug[]> {
  return siteContentService.getAllServiceSlugs();
}
