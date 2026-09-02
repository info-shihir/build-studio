import type { ContactInquiryInput, ContactInquiryResult } from "@/types/api";
import { submitContactInquiry as apiSubmit } from "@/lib/api/site";

export async function submitInquiry(input: ContactInquiryInput): Promise<ContactInquiryResult> {
  return apiSubmit(input);
}
