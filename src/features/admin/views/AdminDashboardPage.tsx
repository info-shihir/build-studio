"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/features/admin";
import { fetchDashboardStats } from "@/lib/api/admin";
import type { AdminDashboardStats } from "@/types/admin";
import { adminNavItems } from "@/features/admin/constants";

const statLinks: { key: keyof AdminDashboardStats; label: string; href: string }[] = [
  { key: "services", label: "Services", href: "/admin/services" },
  { key: "projects", label: "Projects", href: "/admin/projects" },
  { key: "teamMembers", label: "Team Members", href: "/admin/team" },
  { key: "heroSlides", label: "Hero Slides", href: "/admin/hero" },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials" },
  { key: "processSteps", label: "Process Steps", href: "/admin/process" },
  { key: "inquiries", label: "Inquiries", href: "/admin/inquiries" },
  { key: "unreadInquiries", label: "Unread Inquiries", href: "/admin/inquiries" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load dashboard."));
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" description="Manage public site content and review inquiries." />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statLinks.map(({ key, label, href }) => (
          <Link
            key={key}
            href={href}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#c5a880]/30 transition-colors"
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">{label}</p>
            <p className="text-3xl font-display font-bold text-white mt-2">
              {stats ? stats[key] : "—"}
            </p>
          </Link>
        ))}
      </div>
      <section>
        <h2 className="font-display text-sm uppercase tracking-widest text-[#c5a880] mb-4">Modules</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {adminNavItems.filter((item) => !("exact" in item && item.exact)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 hover:text-white hover:border-[#c5a880]/30"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
