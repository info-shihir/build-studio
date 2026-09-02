import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET() {
  return withAdmin("viewer", (actor) => adminContentService.listTestimonials(actor));
}

export async function POST(request: Request) {
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.createTestimonial(actor, body));
}
