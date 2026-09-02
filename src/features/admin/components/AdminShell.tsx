"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string | null;
  demoMode?: boolean;
}

export default function AdminShell({ children, userEmail, demoMode = false }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            View public site
          </Link>
          <div className="flex items-center gap-4">
            {userEmail && <span className="text-xs text-gray-500">{userEmail}</span>}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-xs font-mono uppercase tracking-widest text-[#c5a880] hover:text-white"
            >
              Sign out
            </button>
          </div>
        </header>
        {demoMode && (
          <div className="border-b border-[#c5a880]/30 bg-[#c5a880]/10 px-6 py-3 text-sm text-gray-300">
            <strong className="text-white">Demo mode.</strong> Content is read-only from{" "}
            <code className="text-[#c5a880]">content.json</code>. Add{" "}
            <code className="text-[#c5a880]">DATABASE_URL</code> and run migrations to save edits.
          </div>
        )}
        <main className="flex-1 p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
