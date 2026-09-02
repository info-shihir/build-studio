"use client";

import { useEffect, useState } from "react";
import { DataTable, FormField, PageHeader, inputClassName, textareaClassName } from "@/features/admin";
import {
  createAdminTestimonial,
  deleteAdminTestimonial,
  fetchAdminTestimonials,
  updateAdminTestimonial,
} from "@/lib/api/admin";
import type { Testimonial } from "@/types/site";

export default function TestimonialsAdminPage() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Partial<Testimonial>>({ rating: 5 });
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminTestimonials()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load testimonials."));

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Testimonials" description="Manage client quotes." />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <DataTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "company", label: "Company" },
        ]}
        onEdit={(row) => setForm(row)}
        onDelete={async (row) => {
          if (!confirm("Delete testimonial?")) return;
          await deleteAdminTestimonial(row.id);
          load();
        }}
      />
      <form
        className="space-y-3 max-w-2xl rounded-xl border border-white/10 p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const payload = {
            name: form.name ?? "",
            company: form.company ?? "",
            quote: form.quote ?? "",
            rating: form.rating ?? 5,
            image: form.image ?? "/images/client_1.jpg",
          };
          if (form.id) await updateAdminTestimonial(form.id, payload);
          else await createAdminTestimonial(payload);
          setForm({ rating: 5 });
          load();
        }}
      >
        {(["name", "company", "image"] as const).map((field) => (
          <FormField key={field} label={field}>
            <input className={inputClassName} value={(form[field] as string) ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required />
          </FormField>
        ))}
        <FormField label="Rating">
          <input type="number" min={1} max={5} className={inputClassName} value={form.rating ?? 5} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
        </FormField>
        <FormField label="Quote">
          <textarea className={textareaClassName} value={form.quote ?? ""} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
        </FormField>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
          {form.id ? "Update" : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}
