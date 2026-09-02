"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "@/types";
import SiteContainer from "@/shared/ui/SiteContainer";
import ServiceIcon from "./ServiceIcon";
import ServiceDetailContent from "./ServiceDetailContent";

interface ServicesProps {
  services: ServiceItem[];
  hideHeader?: boolean;
  eyebrow?: string;
  title?: string;
  intro?: string;
  contentPanelId?: string;
}

const DEFAULT_EYEBROW = "Our Expertise";
const DEFAULT_TITLE = "What We Offer";
const DEFAULT_INTRO =
  "Five integrated divisions aligned with our Memorandum of Association — from real estate and construction to infrastructure, trade, and supply.";

function servicePageHref(slug: string): string {
  return `/services/${slug}`;
}

export default function Services({
  services,
  hideHeader = false,
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
  contentPanelId = "services-content-panel",
}: ServicesProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

  const activeService = services[activeTab];

  const handleDesktopTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleMobileToggle = (index: number) => {
    setMobileExpandedIndex((current) => (current === index ? null : index));
    setActiveTab(index);
  };

  const tabButtonClass = (index: number) =>
    `w-full lg:flex-1 flex-shrink-0 text-left rounded-2xl transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c5a880]/50 liquid-glass-card group p-5 sm:p-6 flex flex-col lg:justify-between gap-4 ${
      activeTab === index
        ? "glass-panel-dark border border-[#c5a880]/40 shadow-[0_8px_30px_rgba(197,168,128,0.15)]"
        : "glass-panel-dark text-gray-300 liquid-shimmer border border-white/5 hover:border-white/10"
    }`;

  const renderDesktopServiceTab = (service: ServiceItem, index: number) => (
    <div
      id={`services-card-${index}`}
      key={service.id}
      role="button"
      tabIndex={0}
      onClick={() => handleDesktopTabClick(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleDesktopTabClick(index);
        }
      }}
      className={tabButtonClass(index)}
    >
      <div className="flex items-center space-x-4 w-full">
        <div
          className={`p-3 rounded-xl transition-colors duration-300 flex-shrink-0 ${
            activeTab === index ? "bg-[#c5a880]/15 text-[#c5a880]" : "bg-white/5 text-[#c5a880]"
          }`}
        >
          <ServiceIcon name={service.icon} />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-display font-semibold truncate text-base sm:text-lg text-white">
            {service.title}
          </h3>
          <p className="text-xs mt-1 line-clamp-2 lg:line-clamp-1 font-light text-gray-400">
            {service.shortDesc}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between pt-4 border-t border-white/5 w-full">
        <Link
          id={`view-details-btn-${index}`}
          href={servicePageHref(service.slug)}
          scroll
          onClick={(e) => e.stopPropagation()}
          className="text-[10px] font-display font-bold tracking-widest uppercase py-1 px-3 rounded-md border border-[#c5a880]/30 text-[#c5a880] hover:border-[#c5a880] hover:text-white hover:bg-[#c5a880]/10 transition-all duration-300 hover:scale-[1.05]"
        >
          View Details
        </Link>
        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>
    </div>
  );

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-transparent overflow-hidden relative transition-colors duration-500 scroll-mt-24 text-white"
    >
      <div className="absolute top-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-45 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-30 blur-[90px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <SiteContainer className="relative z-10">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="h-[1px] w-8 bg-[#c5a880]" />
                <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                  {eyebrow}
                </span>
              </div>
              <h2 id="services-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                {title}
              </h2>
            </div>
            <p
              id="services-intro"
              className="font-light text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 text-gray-400"
            >
              {intro}
            </p>
          </div>
        )}

        <div className="lg:hidden space-y-3">
          {services.map((service, index) => {
            const isExpanded = mobileExpandedIndex === index;
            return (
              <div
                key={service.id}
                id={`services-mobile-accordion-${index}`}
                className={`rounded-2xl overflow-hidden liquid-glass-card glass-panel-dark border transition-all duration-300 ${
                  isExpanded ? "border-[#c5a880]/40 shadow-[0_8px_30px_rgba(197,168,128,0.12)]" : "border-white/10"
                }`}
              >
                <button
                  type="button"
                  id={`services-mobile-trigger-${index}`}
                  onClick={() => handleMobileToggle(index)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div
                    className={`p-2.5 rounded-lg flex-shrink-0 transition-colors ${
                      isExpanded ? "bg-[#c5a880]/15 text-[#c5a880]" : "bg-white/5 text-[#c5a880]"
                    }`}
                  >
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-grow min-w-0 text-left">
                    <p className="font-display font-semibold text-sm text-white truncate">{service.title}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{service.shortDesc}</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#c5a880] flex-shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-white/10">
                        <ServiceDetailContent
                          service={service}
                          index={index}
                          total={services.length}
                          showFooter={false}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-16 items-stretch">
          <div className="col-span-4 relative z-10 lg:min-h-full">
            <div className="flex flex-col gap-3 lg:min-h-full">
              {services.map((service, index) => renderDesktopServiceTab(service, index))}
            </div>
          </div>

          <div
            id={contentPanelId}
            className="rounded-2xl p-8 lg:p-12 relative overflow-hidden min-h-[480px] h-full flex flex-col justify-between shadow-2xl transition-all duration-500 col-span-8 liquid-glass-card glass-panel-dark liquid-shimmer scroll-mt-28 border border-white/5"
          >
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#c5a880]/15 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ServiceDetailContent
                  service={activeService}
                  index={activeTab}
                  total={services.length}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
