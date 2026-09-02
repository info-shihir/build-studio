"use client";

import { useEffect, useState } from "react";
import { FormField, PageHeader, StringListEditor, inputClassName, textareaClassName } from "@/features/admin";
import { fetchAdminAbout, updateAdminAbout } from "@/lib/api/admin";
import type { AboutSection } from "@/types/site";

export default function AboutAdminPage() {
  const [form, setForm] = useState<AboutSection>({ title: "", subtitle: "", paragraphs: [], pillars: [] });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchAdminAbout()
      .then(setForm)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load about content."));
  }, []);

  return (
    <div>
      <PageHeader title="About" description="Edit corporate profile content." />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {saved && <p className="text-green-400 text-sm mb-4">Saved successfully.</p>}
      <form
        className="space-y-4 max-w-3xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setSaved(false);
          await updateAdminAbout({
            ...form,
            paragraphs: form.paragraphs.filter(Boolean),
            pillars: form.pillars.filter((p) => p.title && p.desc),
          });
          setSaved(true);
        }}
      >
        <FormField label="Title">
          <input className={inputClassName} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </FormField>
        <FormField label="Subtitle">
          <textarea className={textareaClassName} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required />
        </FormField>
        <StringListEditor label="Paragraphs" values={form.paragraphs} onChange={(paragraphs) => setForm({ ...form, paragraphs })} />
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">Pillars</p>
          {form.pillars.map((pillar, index) => (
            <div key={index} className="grid sm:grid-cols-2 gap-2">
              <input className={inputClassName} placeholder="Title" value={pillar.title} onChange={(e) => {
                const pillars = [...form.pillars];
                pillars[index] = { ...pillars[index], title: e.target.value };
                setForm({ ...form, pillars });
              }} />
              <input className={inputClassName} placeholder="Description" value={pillar.desc} onChange={(e) => {
                const pillars = [...form.pillars];
                pillars[index] = { ...pillars[index], desc: e.target.value };
                setForm({ ...form, pillars });
              }} />
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, pillars: [...form.pillars, { title: "", desc: "" }] })} className="text-xs text-gray-400">+ Add pillar</button>
        </div>
        <button type="submit" className="px-6 py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">Save About</button>
      </form>
    </div>
  );
}
