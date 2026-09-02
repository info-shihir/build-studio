import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET() {
  return withAdmin("viewer", (actor) => adminContentService.getCompany(actor));
}

export async function PUT(request: Request) {
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.updateCompany(actor, body));
}
