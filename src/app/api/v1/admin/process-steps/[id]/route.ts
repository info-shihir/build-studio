import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("viewer", async (actor) => {
    const step = await adminContentService.getProcessStep(actor, id);
    if (!step) throw new Error("Process step not found.");
    return step;
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.updateProcessStep(actor, id, body));
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("super_admin", async (actor) => {
    await adminContentService.deleteProcessStep(actor, id);
    return { deleted: true };
  });
}
