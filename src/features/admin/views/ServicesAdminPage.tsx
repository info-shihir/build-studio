"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable, PageHeader } from "@/features/admin";
import { deleteAdminService, fetchAdminServices } from "@/lib/api/admin";
import type { ServiceItem } from "@/types/site";

export default function ServicesAdminPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ServiceItem[]>([]);
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminServices()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load services."));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (row: ServiceItem) => {
    if (!confirm(`Delete service "${row.title}"?`)) return;
    try {
      await deleteAdminService(row.id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage service divisions and detail content."
        action={
          <Link
            href="/admin/services/new"
            className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold"
          >
            New Service
          </Link>
        }
      />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <DataTable
        rows={rows}
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "icon", label: "Icon" },
        ]}
        onEdit={(row) => router.push(`/admin/services/${row.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
