"use client";

import { useEffect, useState } from "react";
import { FormField, PageHeader, inputClassName, textareaClassName } from "@/features/admin";
import {
  createAdminHeroSlide,
  deleteAdminHeroSlide,
  fetchAdminHeroSlides,
  reorderAdminHeroSlides,
  updateAdminHeroSlide,
} from "@/lib/api/admin";
import type { HeroSlide } from "@/types/site";

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [form, setForm] = useState<Partial<HeroSlide>>({});
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminHeroSlides()
      .then(setSlides)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load hero slides."));

  useEffect(() => {
    load();
  }, []);

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    const ids = [...slides];
    [ids[index], ids[target]] = [ids[target], ids[index]];
    await reorderAdminHeroSlides(ids.map((s) => s.id));
    load();
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Hero Slides" description="Manage homepage carousel slides." />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="space-y-3">
        {slides.map((slide, index) => (
          <div key={slide.id} className="rounded-xl border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{slide.title}</p>
              <p className="text-xs text-gray-500">{slide.link}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(index, -1)} className="text-xs text-gray-400">Up</button>
              <button type="button" onClick={() => move(index, 1)} className="text-xs text-gray-400">Down</button>
              <button type="button" onClick={() => setForm(slide)} className="text-xs text-[#c5a880]">Edit</button>
              <button
                type="button"
                onClick={async () => {
                  if (!confirm("Delete slide?")) return;
                  await deleteAdminHeroSlide(slide.id);
                  load();
                }}
                className="text-xs text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <form
        className="space-y-3 max-w-2xl rounded-xl border border-white/10 p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const payload = {
            title: form.title ?? "",
            subtitle: form.subtitle ?? "",
            image: form.image ?? "",
            cta: form.cta ?? "",
            link: form.link ?? "",
          };
          if (form.id) await updateAdminHeroSlide(form.id, payload);
          else await createAdminHeroSlide(payload);
          setForm({});
          load();
        }}
      >
        {(["title", "subtitle", "image", "cta", "link"] as const).map((field) => (
          <FormField key={field} label={field}>
            {field === "subtitle" ? (
              <textarea className={textareaClassName} value={form[field] ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required />
            ) : (
              <input className={inputClassName} value={form[field] ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required />
            )}
          </FormField>
        ))}
        <button type="submit" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
          {form.id ? "Update Slide" : "Add Slide"}
        </button>
      </form>
    </div>
  );
}
