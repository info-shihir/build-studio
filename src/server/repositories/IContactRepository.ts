import type { ContactInquiryInput, ContactInquiryResult } from "@/types/api";

export interface IContactRepository {
  submitInquiry(input: ContactInquiryInput): Promise<ContactInquiryResult>;
}
