"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "../constants";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0f0f0f] min-h-screen p-4">
      <div className="mb-8 px-2">
        <img
          src="/images/logo.png"
          alt="Arshia Global BD"
          className="h-20 w-auto object-contain mb-3"
        />
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">CMS</p>
        <h2 className="font-display text-lg font-semibold text-white">Arshia Global BD</h2>
      </div>
      <nav className="space-y-1">
        {adminNavItems.map((item) => {
          const active = "exact" in item && item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
