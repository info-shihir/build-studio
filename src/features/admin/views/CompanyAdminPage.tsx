"use client";

import { useEffect, useState } from "react";
import { FormField, PageHeader, inputClassName, textareaClassName } from "@/features/admin";
import { fetchAdminCompany, updateAdminCompany } from "@/lib/api/admin";
import type { CompanyMeta } from "@/types/site";

export default function CompanyAdminPage() {
  const [form, setForm] = useState<CompanyMeta | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchAdminCompany()
      .then(setForm)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load company profile."));
  }, []);

  if (!form) return <p className="text-gray-500">{error || "Loading..."}</p>;

  return (
    <div>
      <PageHeader title="Company" description="Edit company profile, stats, and contact details." />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {saved && <p className="text-green-400 text-sm mb-4">Saved successfully.</p>}
      <form
        className="space-y-4 max-w-3xl"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateAdminCompany(form);
          setSaved(true);
        }}
      >
        {(["name", "shortName", "tagline", "foundedYear", "logo", "registeredOffice", "regulatoryNote"] as const).map((field) => (
          <FormField key={field} label={field}>
            {field === "regulatoryNote" ? (
              <textarea className={textareaClassName} value={(form[field] as string) ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
            ) : (
              <input className={inputClassName} value={(form[field] as string) ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
            )}
          </FormField>
        ))}
        <FormField label="Description">
          <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-4">
          {(["address", "email", "phone", "hours"] as const).map((field) => (
            <FormField key={field} label={`Contact ${field}`}>
              <input
                className={inputClassName}
                value={form.contact[field]}
                onChange={(e) => setForm({ ...form, contact: { ...form.contact, [field]: e.target.value } })}
                required
              />
            </FormField>
          ))}
        </div>
        <button type="submit" className="px-6 py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">Save Company</button>
      </form>
    </div>
  );
}
