import type { ContactInquiryInput, ContactInquiryResult } from "@/types/api";
import type { IContactRepository } from "@/server/repositories/IContactRepository";
import { prisma } from "@/server/db/prisma";

export class DbContactRepository implements IContactRepository {
  async submitInquiry(input: ContactInquiryInput): Promise<ContactInquiryResult> {
    const row = await prisma.contactInquiry.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        projectType: input.projectType,
        message: input.message,
      },
    });
    return {
      id: row.id,
      receivedAt: row.receivedAt.toISOString(),
    };
  }
}

export const dbContactRepository = new DbContactRepository();
