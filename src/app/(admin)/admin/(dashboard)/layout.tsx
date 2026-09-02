import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { AdminShell } from "@/features/admin";
import { isDatabaseEnabled } from "@/server/db/prisma";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <AdminShell userEmail={session.user.email} demoMode={!isDatabaseEnabled()}>
      {children}
    </AdminShell>
  );
}
