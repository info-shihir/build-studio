import type { AdminRole } from "@/types/admin";

const DEMO_DB_DISABLED_MESSAGE = "Connect DATABASE_URL to save changes.";

export function getDemoCredentials() {
  return {
    email: (process.env.DEMO_ADMIN_EMAIL ?? "demo@arshialtd.com").toLowerCase().trim(),
    password: process.env.DEMO_ADMIN_PASSWORD ?? "demo123",
    name: process.env.DEMO_ADMIN_NAME ?? "Demo Admin",
    role: (process.env.DEMO_ADMIN_ROLE ?? "super_admin") as AdminRole,
  };
}

export function verifyDemoCredentials(email: string, password: string) {
  const demo = getDemoCredentials();
  if (email !== demo.email || password !== demo.password) return null;
  return {
    id: "demo-admin",
    email: demo.email,
    name: demo.name,
    role: demo.role,
  };
}

export function isDemoAdminUser(userId: string | undefined) {
  return userId === "demo-admin";
}

export { DEMO_DB_DISABLED_MESSAGE };
