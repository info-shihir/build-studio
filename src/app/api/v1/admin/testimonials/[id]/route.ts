import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("viewer", async (actor) => {
    const item = await adminContentService.getTestimonial(actor, id);
    if (!item) throw new Error("Testimonial not found.");
    return item;
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.updateTestimonial(actor, id, body));
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("super_admin", async (actor) => {
    await adminContentService.deleteTestimonial(actor, id);
    return { deleted: true };
  });
}
