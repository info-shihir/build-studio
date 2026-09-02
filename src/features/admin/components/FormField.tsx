interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">{label}</label>
      {children}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a880]";

export const textareaClassName =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a880] resize-y min-h-[100px]";

export const selectClassName = inputClassName;
