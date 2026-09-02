import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("viewer", async (actor) => {
    const inquiry = await adminContentService.getInquiry(actor, id);
    if (!inquiry) throw new Error("Inquiry not found.");
    return inquiry;
  });
}

export async function PATCH(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("editor", (actor) => adminContentService.markInquiryRead(actor, id));
}
