import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/features/admin";
import { isDatabaseEnabled } from "@/server/db/prisma";

export default function AdminLoginPage() {
  const demoMode = !isDatabaseEnabled();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">Admin</p>
          <h1 className="font-display text-2xl font-bold">Arshia Global BD CMS</h1>
          <p className="text-sm text-gray-400 font-light">
            {demoMode
              ? "Demo mode — browse the admin panel without a database."
              : "Sign in to manage site content."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
            <LoginForm demoMode={demoMode} />
          </Suspense>
        </div>
        <p className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-white">
            Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
