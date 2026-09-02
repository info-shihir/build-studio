import { jsonOk, jsonError } from "@/lib/api/response";
import { isServiceSlug } from "@/lib/navigation";
import { siteContentService } from "@/server/services";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    if (!isServiceSlug(slug)) {
      return jsonError("Service not found", 404, "NOT_FOUND");
    }
    const service = await siteContentService.getServiceBySlug(slug);
    if (!service) {
      return jsonError("Service not found", 404, "NOT_FOUND");
    }
    return jsonOk(service);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load service", 500);
  }
}
