import { jsonContactRepository } from "../adapters/json/JsonContactRepository";
import { dbContactRepository } from "../adapters/db/DbContactRepository";
import { isDatabaseEnabled } from "../db/prisma";
import type { IContactRepository } from "./IContactRepository";

export const contactRepository: IContactRepository = isDatabaseEnabled()
  ? dbContactRepository
  : jsonContactRepository;
