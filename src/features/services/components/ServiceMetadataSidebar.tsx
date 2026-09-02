import Link from "next/link";
import {
  ArrowRight,
  Building,
  Calendar,
  Cpu,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ServiceItem } from "@/types";

interface ServiceMetadataSidebarProps {
  service: ServiceItem;
}

export default function ServiceMetadataSidebar({ service }: ServiceMetadataSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl liquid-glass-card glass-panel-dark space-y-5">
        {service.timeline && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <Calendar className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Timeline</span>
            </div>
            <p className="text-sm text-gray-300">{service.timeline}</p>
          </div>
        )}
        {service.targetSectors && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <Building className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Target Sectors</span>
            </div>
            <p className="text-sm text-gray-300">{service.targetSectors}</p>
          </div>
        )}
        {service.typicalTeam && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <Users className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Project Team</span>
            </div>
            <p className="text-sm text-gray-300">{service.typicalTeam}</p>
          </div>
        )}
        {service.tools && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <Cpu className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Tools & Systems</span>
            </div>
            <p className="text-sm text-gray-300">{service.tools}</p>
          </div>
        )}
        {service.methodology && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <Layers className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Methodology</span>
            </div>
            <p className="text-sm text-gray-300">{service.methodology}</p>
          </div>
        )}
        {service.compliance && (
          <div>
            <div className="flex items-center gap-2 text-[#c5a880] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-display text-xs font-bold tracking-widest uppercase">Compliance</span>
            </div>
            <p className="text-sm text-gray-300">{service.compliance}</p>
          </div>
        )}
      </div>
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 w-full py-4 glass-btn-gold text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-xl transition-all group"
      >
        <span>Request a Quote</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
