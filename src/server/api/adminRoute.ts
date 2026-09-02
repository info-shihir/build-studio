import { jsonOk } from "@/lib/api/response";
import { handleAdminError, requireAdminSession } from "@/server/api/adminAuth";
import type { AdminRole } from "@/types/admin";

export async function withAdmin<T>(
  minRole: AdminRole,
  handler: (actor: NonNullable<Awaited<ReturnType<typeof requireAdminSession>>["actor"]>) => Promise<T>,
) {
  try {
    const authResult = await requireAdminSession(minRole);
    if (authResult.error) return authResult.error;
    const data = await handler(authResult.actor);
    return jsonOk(data);
  } catch (error) {
    return handleAdminError(error);
  }
}
