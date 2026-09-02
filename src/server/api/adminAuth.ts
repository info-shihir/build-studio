import { auth } from "@/server/auth";
import { jsonError } from "@/lib/api/response";
import type { AdminActor, AdminRole } from "@/types/admin";

const ROLE_RANK: Record<AdminRole, number> = {
  viewer: 1,
  editor: 2,
  super_admin: 3,
};

export async function requireAdminSession(minRole: AdminRole = "viewer"): Promise<
  | { actor: AdminActor; error?: never }
  | { actor?: never; error: Response }
> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return { error: jsonError("Authentication required.", 401, "UNAUTHORIZED") };
  }

  const role = (session.user.role ?? "viewer") as AdminRole;
  if (ROLE_RANK[role] < ROLE_RANK[minRole]) {
    return { error: jsonError("Insufficient permissions.", 403, "FORBIDDEN") };
  }

  return {
    actor: {
      id: session.user.id,
      email: session.user.email,
      role,
    },
  };
}

export async function handleAdminError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === "Insufficient permissions.") {
      return jsonError(error.message, 403, "FORBIDDEN");
    }
    if (error.message.includes("Connect DATABASE_URL")) {
      return jsonError(error.message, 503, "SERVICE_UNAVAILABLE");
    }
    if (error.name === "ZodError") {
      return jsonError("Invalid request data.", 400, "VALIDATION_ERROR");
    }
    if (error.message.includes("not found")) {
      return jsonError(error.message, 404, "NOT_FOUND");
    }
    return jsonError(error.message, 400, "BAD_REQUEST");
  }
  return jsonError("Unexpected server error.", 500, "INTERNAL_ERROR");
}
