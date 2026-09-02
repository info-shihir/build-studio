import { jsonOk, jsonError } from "@/lib/api/response";
import { siteContentService } from "@/server/services";

export async function GET() {
  try {
    const data = await siteContentService.getSiteContent();
    return jsonOk(data);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load content", 500);
  }
}
