import { withAdmin } from "@/server/api/adminRoute";
import { adminContentService } from "@/server/services/AdminContentService";

export async function GET() {
  return withAdmin("viewer", (actor) => adminContentService.listPageMeta(actor));
}
