import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET(request: Request) {
  const departmentId = new URL(request.url).searchParams.get("departmentId") ?? undefined;
  return withAdmin("viewer", (actor) => adminContentService.listMembers(actor, departmentId));
}

export async function POST(request: Request) {
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.createMember(actor, body));
}
