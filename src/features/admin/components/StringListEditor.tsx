"use client";

interface StringListEditorProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function StringListEditor({ label, values, onChange }: StringListEditorProps) {
  const updateItem = (index: number, value: string) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => onChange([...values, ""]);
  const removeItem = (index: number) => onChange(values.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">{label}</span>
        <button
          type="button"
          onClick={addItem}
          className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-white"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={value}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-3 text-xs text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
