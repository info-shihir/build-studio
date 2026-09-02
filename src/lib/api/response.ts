import type { ApiResponse } from "@/types/api";

export function jsonOk<T>(data: T, init?: ResponseInit): Response {
  const body: ApiResponse<T> = { success: true, data };
  return Response.json(body, init);
}

export function jsonError(message: string, status = 400, code = "BAD_REQUEST"): Response {
  const body: ApiResponse<never> = {
    success: false,
    error: { code, message },
  };
  return Response.json(body, { status });
}

export function jsonNotImplemented(message = "Admin API not implemented yet."): Response {
  return jsonError(message, 501, "NOT_IMPLEMENTED");
}
