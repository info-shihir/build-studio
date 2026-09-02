"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FormField,
  PageHeader,
  StringListEditor,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/features/admin";
import { serviceIcons } from "@/features/admin/constants";
import {
  createAdminService,
  fetchAdminService,
  updateAdminService,
} from "@/lib/api/admin";
import type { ServiceItem } from "@/types/site";

const emptyForm = {
  slug: "",
  title: "",
  icon: "Building",
  shortDesc: "",
  longDesc: "",
  details: [] as string[],
  scope: [] as string[],
  features: [] as string[],
  timeline: "",
  targetSectors: "",
  typicalTeam: "",
  tools: "",
  methodology: "",
  compliance: "",
};

export default function ServiceFormPage({ serviceId }: { serviceId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(serviceId));

  useEffect(() => {
    if (!serviceId) return;
    fetchAdminService(serviceId)
      .then((service: ServiceItem) => {
        setForm({
          slug: service.slug,
          title: service.title,
          icon: service.icon,
          shortDesc: service.shortDesc,
          longDesc: service.longDesc,
          details: service.details ?? [],
          scope: service.scope ?? [],
          features: service.features,
          timeline: service.timeline ?? "",
          targetSectors: service.targetSectors ?? "",
          typicalTeam: service.typicalTeam ?? "",
          tools: service.tools ?? "",
          methodology: service.methodology ?? "",
          compliance: service.compliance ?? "",
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load service."))
      .finally(() => setLoading(false));
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        features: form.features.filter(Boolean),
        details: form.details.filter(Boolean),
        scope: form.scope.filter(Boolean),
      };
      if (serviceId) await updateAdminService(serviceId, payload);
      else await createAdminService(payload);
      router.push("/admin/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && serviceId && !form.title) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <PageHeader
        title={serviceId ? "Edit Service" : "New Service"}
        action={
          <Link href="/admin/services" className="text-sm text-gray-400 hover:text-white">
            Back to list
          </Link>
        }
      />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Title">
            <input className={inputClassName} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Slug">
            <input className={inputClassName} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </FormField>
        </div>
        <FormField label="Icon">
          <select className={selectClassName} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {serviceIcons.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Short Description">
          <textarea className={textareaClassName} value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} required />
        </FormField>
        <FormField label="Long Description">
          <textarea className={textareaClassName} value={form.longDesc} onChange={(e) => setForm({ ...form, longDesc: e.target.value })} required />
        </FormField>
        <StringListEditor label="Details" values={form.details} onChange={(details) => setForm({ ...form, details })} />
        <StringListEditor label="Scope" values={form.scope} onChange={(scope) => setForm({ ...form, scope })} />
        <StringListEditor label="Features" values={form.features} onChange={(features) => setForm({ ...form, features })} />
        <div className="grid sm:grid-cols-2 gap-4">
          {(["timeline", "targetSectors", "typicalTeam", "tools", "methodology", "compliance"] as const).map((field) => (
            <FormField key={field} label={field}>
              <input
                className={inputClassName}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </FormField>
          ))}
        </div>
        <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
          {loading ? "Saving..." : "Save Service"}
        </button>
      </form>
    </div>
  );
}
