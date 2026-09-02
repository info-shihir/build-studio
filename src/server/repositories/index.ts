import { jsonSiteContentRepository } from "../adapters/json/JsonSiteContentRepository";
import { dbSiteContentRepository } from "../adapters/db/DbSiteContentRepository";
import { isDatabaseEnabled } from "../db/prisma";
import type { ISiteContentRepository } from "./ISiteContentRepository";

export const siteContentRepository: ISiteContentRepository = isDatabaseEnabled()
  ? dbSiteContentRepository
  : jsonSiteContentRepository;
