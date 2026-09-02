import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("viewer", async (actor) => {
    const dept = await adminContentService.getDepartment(actor, id);
    if (!dept) throw new Error("Department not found.");
    return dept;
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.updateDepartment(actor, id, body));
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  return withAdmin("super_admin", async (actor) => {
    await adminContentService.deleteDepartment(actor, id);
    return { deleted: true };
  });
}
