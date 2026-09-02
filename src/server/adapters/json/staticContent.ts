import type { SiteContent } from "@/types/site";
import siteContent from "@/data/content.json";

/** Sync read for client-safe config (nav). Server data access uses repositories. */
export const staticSiteContent = siteContent as SiteContent;
