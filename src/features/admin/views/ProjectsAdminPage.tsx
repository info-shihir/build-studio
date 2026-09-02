"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable, PageHeader } from "@/features/admin";
import { deleteAdminProject, fetchAdminProjects } from "@/lib/api/admin";
import type { ProjectItem } from "@/types/site";

export default function ProjectsAdminPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ProjectItem[]>([]);
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminProjects()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load projects."));

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage portfolio entries."
        action={
          <Link href="/admin/projects/new" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
            New Project
          </Link>
        }
      />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <DataTable
        rows={rows}
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "year", label: "Year" },
        ]}
        onEdit={(row) => router.push(`/admin/projects/${row.id}`)}
        onDelete={async (row) => {
          if (!confirm(`Delete project "${row.title}"?`)) return;
          await deleteAdminProject(row.id);
          load();
        }}
      />
    </div>
  );
}
