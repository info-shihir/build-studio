"use client";

import { ListChecks } from "lucide-react";
import { ServiceItem } from "@/types";
import SiteContainer from "@/shared/ui/SiteContainer";
import ServiceIcon from "./ServiceIcon";
import ServiceScopeList from "./ServiceScopeList";
import ServiceDeliverables from "./ServiceDeliverables";
import ServiceMetadataSidebar from "./ServiceMetadataSidebar";

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
                  <ServiceIcon name={service.icon} className="w-8 h-8" />
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
              <ServiceScopeList items={service.scope} />
            )}

            <ServiceDeliverables features={service.features} />

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

          <ServiceMetadataSidebar service={service} />
        </div>
      </SiteContainer>
    </div>
  );
}
