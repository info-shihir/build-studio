"use client";

import { useEffect, useState } from "react";
import { DataTable, FormField, PageHeader, inputClassName, textareaClassName } from "@/features/admin";
import {
  createAdminProcessStep,
  deleteAdminProcessStep,
  fetchAdminProcessSteps,
  updateAdminProcessStep,
} from "@/lib/api/admin";

type ProcessRow = { id: string; step: string; title: string; subtitle: string; desc: string };

export default function ProcessAdminPage() {
  const [rows, setRows] = useState<ProcessRow[]>([]);
  const [form, setForm] = useState<Partial<ProcessRow>>({});
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminProcessSteps()
      .then((items) => setRows(items.map((item, index) => ({ ...item, id: (item as ProcessRow).id ?? `step-${index}` }))))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load process steps."));

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Process" description="Manage how-we-work steps." />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <DataTable
        rows={rows}
        columns={[
          { key: "step", label: "Step" },
          { key: "title", label: "Title" },
        ]}
        onEdit={(row) => setForm(row)}
        onDelete={async (row) => {
          if (!confirm("Delete step?")) return;
          await deleteAdminProcessStep(row.id);
          load();
        }}
      />
      <form
        className="space-y-3 max-w-2xl rounded-xl border border-white/10 p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const payload = {
            step: form.step ?? "",
            title: form.title ?? "",
            subtitle: form.subtitle ?? "",
            desc: form.desc ?? "",
          };
          if (form.id && !form.id.startsWith("step-")) await updateAdminProcessStep(form.id, payload);
          else await createAdminProcessStep(payload);
          setForm({});
          load();
        }}
      >
        {(["step", "title", "subtitle"] as const).map((field) => (
          <FormField key={field} label={field}>
            <input className={inputClassName} value={form[field] ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required />
          </FormField>
        ))}
        <FormField label="Description">
          <textarea className={textareaClassName} value={form.desc ?? ""} onChange={(e) => setForm({ ...form, desc: e.target.value })} required />
        </FormField>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
          {form.id ? "Update Step" : "Add Step"}
        </button>
      </form>
    </div>
  );
}
