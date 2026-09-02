"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FormField,
  PageHeader,
  StringListEditor,
  inputClassName,
  textareaClassName,
} from "@/features/admin";
import { createAdminProject, fetchAdminProject, updateAdminProject } from "@/lib/api/admin";
import type { ProjectItem } from "@/types/site";

const emptyForm = {
  title: "",
  category: "",
  client: "",
  location: "",
  year: "",
  area: "",
  image: "",
  description: "",
  features: [] as string[],
};

export default function ProjectFormPage({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(projectId));

  useEffect(() => {
    if (!projectId) return;
    fetchAdminProject(projectId)
      .then((project: ProjectItem) =>
        setForm({
          title: project.title,
          category: project.category,
          client: project.client,
          location: project.location,
          year: project.year,
          area: project.area,
          image: project.image,
          description: project.description,
          features: project.features,
        }),
      )
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load project."))
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...form, features: form.features.filter(Boolean) };
      if (projectId) await updateAdminProject(projectId, payload);
      else await createAdminProject(payload);
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title={projectId ? "Edit Project" : "New Project"} action={<Link href="/admin/projects" className="text-sm text-gray-400 hover:text-white">Back</Link>} />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        {Object.entries({
          title: "Title",
          category: "Category",
          client: "Client",
          location: "Location",
          year: "Year",
          area: "Area",
          image: "Image URL",
        }).map(([key, label]) => (
          <FormField key={key} label={label}>
            <input
              className={inputClassName}
              value={form[key as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              required={key !== "area"}
            />
          </FormField>
        ))}
        <FormField label="Description">
          <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <StringListEditor label="Features" values={form.features} onChange={(features) => setForm({ ...form, features })} />
        <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
          Save Project
        </button>
      </form>
    </div>
  );
}
