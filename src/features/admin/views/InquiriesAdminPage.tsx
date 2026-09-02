"use client";

import { useEffect, useState } from "react";
import { DataTable, PageHeader } from "@/features/admin";
import { fetchAdminInquiries, markAdminInquiryRead } from "@/lib/api/admin";
import type { ContactInquiryListItem } from "@/types/admin";

export default function InquiriesAdminPage() {
  const [rows, setRows] = useState<ContactInquiryListItem[]>([]);
  const [selected, setSelected] = useState<ContactInquiryListItem | null>(null);
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminInquiries()
      .then((res) => setRows(res.items))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load inquiries."));

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Contact Inquiries" description="Review messages submitted from the public contact form." />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <DataTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "projectType", label: "Type" },
          {
            key: "receivedAt",
            label: "Received",
            render: (row) => new Date(row.receivedAt).toLocaleString(),
          },
          {
            key: "readAt",
            label: "Status",
            render: (row) => (row.readAt ? "Read" : "Unread"),
          },
        ]}
        onEdit={(row) => {
          setSelected(row);
          if (!row.readAt) markAdminInquiryRead(row.id).then(load);
        }}
      />
      {selected && (
        <div className="rounded-xl border border-white/10 p-5 space-y-2 max-w-3xl">
          <p className="text-white font-semibold">{selected.name}</p>
          <p className="text-sm text-gray-400">{selected.email} · {selected.projectType}</p>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{selected.message}</p>
        </div>
      )}
    </div>
  );
}
