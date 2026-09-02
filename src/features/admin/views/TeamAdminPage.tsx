"use client";

import { useEffect, useState } from "react";
import {
  DataTable,
  FormField,
  PageHeader,
  inputClassName,
  textareaClassName,
} from "@/features/admin";
import {
  createAdminDepartment,
  createAdminMember,
  deleteAdminDepartment,
  deleteAdminMember,
  fetchAdminDepartments,
  updateAdminDepartment,
  updateAdminMember,
} from "@/lib/api/admin";
import type { TeamDepartment, TeamMember } from "@/types/site";

export default function TeamAdminPage() {
  const [departments, setDepartments] = useState<TeamDepartment[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [memberForm, setMemberForm] = useState<Partial<TeamMember & { departmentId: string }>>({});
  const [deptForm, setDeptForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const load = () =>
    fetchAdminDepartments()
      .then((rows) => {
        setDepartments(rows);
        if (!selectedDeptId && rows[0]) setSelectedDeptId(rows[0].id);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load team."));

  useEffect(() => {
    load();
  }, []);

  const selectedDept = departments.find((d) => d.id === selectedDeptId);

  return (
    <div className="space-y-8">
      <PageHeader title="Team" description="Manage departments and member profiles." />
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#c5a880]">Departments</h2>
          <DataTable
            rows={departments}
            columns={[{ key: "title", label: "Title" }]}
            onEdit={(row) => setDeptForm({ title: row.title, description: row.description ?? "" })}
            onDelete={async (row) => {
              if (!confirm(`Delete department "${row.title}"?`)) return;
              await deleteAdminDepartment(row.id);
              load();
            }}
          />
          <form
            className="space-y-3 rounded-xl border border-white/10 p-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const existing = departments.find((d) => d.title === deptForm.title);
              if (existing) await updateAdminDepartment(existing.id, deptForm);
              else await createAdminDepartment(deptForm);
              setDeptForm({ title: "", description: "" });
              load();
            }}
          >
            <FormField label="Department Title">
              <input className={inputClassName} value={deptForm.title} onChange={(e) => setDeptForm({ ...deptForm, title: e.target.value })} required />
            </FormField>
            <FormField label="Description">
              <textarea className={textareaClassName} value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} />
            </FormField>
            <button type="submit" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
              Save Department
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <FormField label="Selected Department">
            <select className={inputClassName} value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)}>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </FormField>
          {selectedDept && (
            <>
              <DataTable
                rows={selectedDept.members}
                columns={[
                  { key: "name", label: "Name" },
                  { key: "role", label: "Role" },
                ]}
                onEdit={(row) => setMemberForm({ ...row, departmentId: selectedDeptId })}
                onDelete={async (row) => {
                  if (!confirm(`Delete member "${row.name}"?`)) return;
                  await deleteAdminMember(row.id);
                  load();
                }}
              />
              <form
                className="space-y-3 rounded-xl border border-white/10 p-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const payload = {
                    departmentId: selectedDeptId,
                    name: memberForm.name ?? "",
                    role: memberForm.role ?? "",
                    bio: memberForm.bio ?? "",
                    credentials: memberForm.credentials,
                    phone: memberForm.phone,
                    email: memberForm.email,
                    image: memberForm.image ?? "/images/logo.jpg",
                    socials: memberForm.socials,
                  };
                  if (memberForm.id) await updateAdminMember(memberForm.id, payload);
                  else await createAdminMember(payload);
                  setMemberForm({});
                  load();
                }}
              >
                {(["name", "role", "credentials", "phone", "email", "image"] as const).map((field) => (
                  <FormField key={field} label={field}>
                    <input
                      className={inputClassName}
                      value={(memberForm[field] as string) ?? ""}
                      onChange={(e) => setMemberForm({ ...memberForm, [field]: e.target.value })}
                      required={field === "name" || field === "role" || field === "image"}
                    />
                  </FormField>
                ))}
                <FormField label="Bio">
                  <textarea className={textareaClassName} value={memberForm.bio ?? ""} onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })} required />
                </FormField>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0a] text-xs font-display uppercase tracking-widest font-bold">
                  {memberForm.id ? "Update Member" : "Add Member"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
