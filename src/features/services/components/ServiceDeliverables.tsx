import { Check } from "lucide-react";

interface ServiceDeliverablesProps {
  features: string[];
  compact?: boolean;
}

export default function ServiceDeliverables({ features, compact = false }: ServiceDeliverablesProps) {
  if (features.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-4">
        <h4 className="font-display text-sm tracking-widest text-[#c5a880] uppercase font-bold">
          Key Deliverables
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-3 text-gray-300">
              <div className="p-1 bg-[#c5a880]/10 rounded-full text-[#c5a880]">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="font-sans text-sm font-light">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl liquid-glass-card glass-panel-dark">
      <h3 className="font-display text-sm tracking-widest uppercase font-bold text-[#c5a880] mb-6">
        Key Deliverables
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div className="p-1 bg-[#c5a880]/10 rounded-full text-[#c5a880]">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm text-gray-300 font-light">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
