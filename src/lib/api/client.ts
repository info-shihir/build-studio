import type { ApiResponse } from "@/types/api";

const API_BASE = "/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  const body = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !body.success) {
    throw new Error(body.error?.message ?? `Request failed: ${res.status}`);
  }

  return body.data as T;
}

export { request, API_BASE };
