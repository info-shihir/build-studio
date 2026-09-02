import type { ContactInquiryInput, ContactInquiryResult } from "@/types/api";
import type { IContactRepository } from "@/server/repositories/IContactRepository";

export class JsonContactRepository implements IContactRepository {
  async submitInquiry(input: ContactInquiryInput): Promise<ContactInquiryResult> {
    // Placeholder until DB persistence — log for development
    if (process.env.NODE_ENV === "development") {
      console.info("[ContactInquiry]", input);
    }

    return {
      id: `inq_${Date.now()}`,
      receivedAt: new Date().toISOString(),
    };
  }
}

export const jsonContactRepository = new JsonContactRepository();
