import type { ContactInquiryInput } from "@/types/api";
import { jsonOk, jsonError } from "@/lib/api/response";
import { contactService } from "@/server/services";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactInquiryInput & { area?: string };
    const result = await contactService.submitInquiry({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      projectType: body.projectType,
      message: body.area ? `${body.message}\n\nArea/Size: ${body.area}` : body.message,
    });
    return jsonOk(result, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to submit inquiry", 400);
  }
}
