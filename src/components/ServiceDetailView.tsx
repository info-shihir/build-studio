"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Building,
  HardHat,
  Route,
  Ship,
  Package,
  Briefcase,
  Check,
  ArrowRight,
  Calendar,
  Cpu,
  Layers,
  ShieldCheck,
  Users,
  ListChecks,
} from "lucide-react";
import { ServiceItem } from "../types";
import SiteContainer from "./SiteContainer";

const iconMap: Record<string, ReactNode> = {
  Building: <Building className="w-8 h-8" />,
  HardHat: <HardHat className="w-8 h-8" />,
  Route: <Route className="w-8 h-8" />,
  Ship: <Ship className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
  Briefcase: <Briefcase className="w-8 h-8" />,
};

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <div className="pb-16 sm:pb-24 scroll-mt-28">
      <SiteContainer className="space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl liquid-glass-card glass-panel-dark liquid-shimmer">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/20">
                  {iconMap[service.icon]}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880] mb-1">
                    Division Overview
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {service.title}
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-gray-300 font-light leading-relaxed text-base sm:text-lg">
                <p>{service.longDesc}</p>
                {service.details?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            {service.scope && service.scope.length > 0 && (
              <div className="p-8 rounded-2xl liquid-glass-card glass-panel-dark">
                <h3 className="font-display text-sm tracking-widest uppercase font-bold text-[#c5a880] mb-6">
                  Scope of Work
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.scope.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="p-1 mt-0.5 bg-[#c5a880]/10 rounded-full text-[#c5a880] flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-gray-300 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8 rounded-2xl liquid-glass-card glass-panel-dark">
              <h3 className="font-display text-sm tracking-widest uppercase font-bold text-[#c5a880] mb-6">
                Key Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="p-1 bg-[#c5a880]/10 rounded-full text-[#c5a880]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-gray-300 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.processSteps && service.processSteps.length > 0 && (
              <div className="p-8 rounded-2xl liquid-glass-card glass-panel-dark">
                <div className="flex items-center gap-2 mb-6">
                  <ListChecks className="w-5 h-5 text-[#c5a880]" />
                  <h3 className="font-display text-sm tracking-widest uppercase font-bold text-[#c5a880]">
                    Our Process
                  </h3>
                </div>
                <div className="space-y-5">
                  {service.processSteps.map((step, idx) => (
                    <div key={step.title} className="flex gap-4">
                      <span className="font-mono text-lg text-[#c5a880]/50 flex-shrink-0 w-8">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
        </div>
      </SiteContainer>
    </div>
  );
}
