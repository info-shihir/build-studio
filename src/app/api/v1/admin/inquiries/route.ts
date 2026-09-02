import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const pageSize = Number(url.searchParams.get("pageSize") ?? "20");
  return withAdmin("viewer", (actor) => adminContentService.listInquiries(actor, page, pageSize));
}
