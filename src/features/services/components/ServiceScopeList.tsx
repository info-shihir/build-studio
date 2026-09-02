import { Check } from "lucide-react";

interface ServiceScopeListProps {
  items: string[];
  compact?: boolean;
}

export default function ServiceScopeList({ items, compact = false }: ServiceScopeListProps) {
  if (items.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-3">
        <h4 className="font-display text-sm tracking-widest text-[#c5a880] uppercase font-bold">
          Scope of Work
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item) => (
            <div key={item} className="flex items-start space-x-2 text-gray-400">
              <Check className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 flex-shrink-0" />
              <span className="font-sans text-xs font-light">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl liquid-glass-card glass-panel-dark">
      <h3 className="font-display text-sm tracking-widest uppercase font-bold text-[#c5a880] mb-6">
        Scope of Work
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="p-1 mt-0.5 bg-[#c5a880]/10 rounded-full text-[#c5a880] flex-shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm text-gray-300 font-light">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
