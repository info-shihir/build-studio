"use client";

import { useEffect, useState } from "react";
import { FormField, PageHeader, inputClassName, textareaClassName } from "@/features/admin";
import { pageMetaSlugs } from "@/features/admin/constants";
import { fetchAdminPageMetaList, updateAdminPageMeta } from "@/lib/api/admin";
import type { PageMeta } from "@/types/site";

type PageMetaRow = PageMeta & { slug: string };

export default function PagesMetaAdminPage() {
  const [rows, setRows] = useState<PageMetaRow[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>(pageMetaSlugs[0]);
  const [form, setForm] = useState<PageMetaRow>({ slug: pageMetaSlugs[0], title: "" });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchAdminPageMetaList()
      .then((items) => {
        setRows(items);
        const first = items.find((i) => i.slug === pageMetaSlugs[0]) ?? items[0];
        if (first) {
          setSelectedSlug(first.slug);
          setForm(first);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load page meta."));
  }, []);

  useEffect(() => {
    const row = rows.find((r) => r.slug === selectedSlug);
    if (row) setForm(row);
    else setForm({ slug: selectedSlug, title: "", eyebrow: "", description: "" });
  }, [selectedSlug, rows]);

  return (
    <div>
      <PageHeader title="Page Meta" description="Edit hero copy for public pages." />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {saved && <p className="text-green-400 text-sm mb-4">Saved successfully.</p>}
      <FormField label="Page">
        <select className={inputClassName} value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)}>
          {pageMetaSlugs.map((slug) => (
            <option key={slug} value={slug}>{slug}</option>
          ))}
        </select>
      </FormField>
      <form
        className="space-y-4 max-w-2xl mt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateAdminPageMeta(selectedSlug, form);
          setSaved(true);
          const items = await fetchAdminPageMetaList();
          setRows(items);
        }}
      >
        <FormField label="Eyebrow">
          <input className={inputClassName} value={form.eyebrow ?? ""} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <input className={inputClassName} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </FormField>
        <FormField label="Description">
          <textarea className={textareaClassName} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </FormField>
        <button type="submit" className="px-6 py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">Save Page Meta</button>
      </form>
    </div>
  );
}
