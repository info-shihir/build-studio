import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  return withAdmin("viewer", async (actor) => {
    const meta = await adminContentService.getPageMeta(actor, slug);
    if (!meta) throw new Error("Page meta not found.");
    return meta;
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();
  return withAdmin("editor", (actor) =>
    adminContentService.updatePageMeta(actor, { ...body, slug }),
  );
}
