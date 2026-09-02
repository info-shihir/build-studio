import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET() {
  return withAdmin("viewer", (actor) => adminContentService.listHeroSlides(actor));
}

export async function POST(request: Request) {
  const body = await request.json();
  return withAdmin("editor", (actor) => adminContentService.createHeroSlide(actor, body));
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { ids?: string[] };
  if (!body.ids?.length) throw new Error("ids array is required.");
  return withAdmin("editor", (actor) => adminContentService.reorderHeroSlides(actor, body.ids));
}
