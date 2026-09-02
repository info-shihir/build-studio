import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/types";
import ServiceScopeList from "./ServiceScopeList";
import ServiceDeliverables from "./ServiceDeliverables";

interface ServiceDetailContentProps {
  service: ServiceItem;
  index: number;
  total: number;
  showFooter?: boolean;
}

function servicePageHref(slug: string): string {
  return `/services/${slug}`;
}

export default function ServiceDetailContent({
  service,
  index,
  total,
  showFooter = true,
}: ServiceDetailContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#c5a880] font-medium">
          Service Feature {index + 1} of {total}
        </span>
        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          {service.title}
        </h3>
        <div className="h-[2px] w-12 bg-[#c5a880]" />
      </div>

      <div className="space-y-3">
        <p className="font-light text-sm sm:text-base leading-relaxed text-gray-300">{service.longDesc}</p>
        {service.details?.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="font-light text-sm leading-relaxed text-gray-400">
            {paragraph}
          </p>
        ))}
      </div>

      {service.scope && service.scope.length > 0 && (
        <ServiceScopeList items={service.scope} compact />
      )}

      <ServiceDeliverables features={service.features} compact />

      <Link
        href={servicePageHref(service.slug)}
        scroll
        className="inline-flex items-center justify-center space-x-2.5 px-5 py-3 rounded-xl text-[10px] sm:text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-md bg-[#c5a880] text-[#0a0a0a] hover:bg-[#a98d65] w-full sm:w-auto"
      >
        <span>View Full Service Details</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      {showFooter && (
        <div className="hidden sm:flex pt-6 border-t flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/5">
          <span className="font-mono text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
            Arshia Global BD &middot; Quality & Integrity Guaranteed
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center sm:justify-start space-x-2 text-[10px] sm:text-xs font-display font-semibold tracking-widest uppercase group text-[#c5a880] hover:text-white w-full sm:w-auto"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
