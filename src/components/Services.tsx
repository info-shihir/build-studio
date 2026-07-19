import { useState } from "react";
import { Compass, Layout, Trees, Eye, Check, ArrowRight, X, Calendar, Building, Cpu, Layers, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ServicesProps {
  services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { theme } = useTheme();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        const element = document.getElementById("services-content-panel");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-6 h-6" />;
      case "Layout":
        return <Layout className="w-6 h-6" />;
      case "Trees":
        return <Trees className="w-6 h-6" />;
      case "Eye":
        return <Eye className="w-6 h-6" />;
      default:
        return <Compass className="w-6 h-6" />;
    }
  };

  const getExtraServiceDetails = (id: string) => {
    switch (id) {
      case "serv-1":
        return {
          timeline: "6 - 12 Weeks (Scale Dependent)",
          targetSectors: "Bespoke Duplexes, Luxury Penthouse Blocks, Commercial Facades",
          typicalTeam: "Lead Design Architect, Principal Structural Engineer, BIM modeling Specialist",
          techStack: "Autodesk Revit, Rhino 3D (Grasshopper), V-Ray, Enscape",
          detailedMethodology: "We start with microclimate solar-path studies followed by spatial schematic flowcharts. We then move into structural grid alignment and MEP path coordination, wrapping up with high-fidelity realistic BIM layouts ready for site engineers.",
          sustainableFeatures: "Double-skin ventilated walls, thermal mass optimization, solar orientation layout maps."
        };
      case "serv-2":
        return {
          timeline: "4 - 8 Weeks",
          targetSectors: "Premium Hospitality Lounges, Corporate Workspaces, Residential Penthouses",
          typicalTeam: "Principal Interior Architect, Custom Millwork Designer, Lighting Specialist",
          techStack: "AutoCAD, SketchUp Pro, 3ds Max, Adobe Photoshop",
          detailedMethodology: "Analyzing human occupancy patterns and natural lighting channels to configure ergonomic, visual, and acoustic harmony. We specify raw timber paneling, low-VOC paint layouts, and customized lighting fixtures for distinct day/night mood modes.",
          sustainableFeatures: "Low-VOC materials, bio-sourced acoustic panels, high-efficiency intelligent LED zoning."
        };
      case "serv-3":
        return {
          timeline: "5 - 9 Weeks",
          targetSectors: "Urban Pocket Parks, Residential Rooftop Terraces, Corporate Courtyards",
          typicalTeam: "Landscape Architect, Horticultural Consultant, Irrigation Systems Engineer",
          techStack: "Vectorworks Landmark, Lumion, ArcGIS, AutoCAD",
          detailedMethodology: "We map local water drainage pathways and soil profiles. We structure active rainwater retention systems and biophilic layouts that seamlessly blend the exterior natural tree canopies into the building's physical thresholds.",
          sustainableFeatures: "Rainwater collection beds, biophilic natural shading, native drought-tolerant planting."
        };
      case "serv-4":
        return {
          timeline: "Ongoing (Active Construction Support)",
          targetSectors: "Private Residential, Corporate Developments, Commercial Fitouts",
          typicalTeam: "Supervising Architect, Project Coordinator, Material Quality Inspector",
          techStack: "PlanGrid, Procore, MS Project",
          detailedMethodology: "We execute strict weekly site visits to audit rebar placements, concrete curing ratios, joint details, and finishing alignments. We act as the technical bridge between client vision, contractor performance, and municipal regulatory guidelines.",
          sustainableFeatures: "Zero-waste construction auditing, carbon-offset concrete verification, sustainable supply chain sourcing."
        };
      default:
        return {
          timeline: "Flexible",
          targetSectors: "Architectural & Interior Projects",
          typicalTeam: "Design & Coordination Specialists",
          techStack: "Standard Industry Design Tools",
          detailedMethodology: "A highly tailored process balancing visual harmony, technical structural integrity, and local environmental context.",
          sustainableFeatures: "Eco-friendly material sourcing and waste reduction strategies."
        };
    }
  };

  return (
    <section id="services" className={`py-24 bg-transparent overflow-hidden relative transition-colors duration-500 scroll-mt-24 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
      {/* Liquid fluid background ambient orbs */}
      <div className={`absolute top-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-45 blur-[100px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />
      <div className={`absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-30 blur-[90px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-2" : "liquid-orb-2"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-[#c5a880]" />
              <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                Our Expertise
              </span>
            </div>
            <h2 id="services-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              What We Offer
            </h2>
          </div>
          <p id="services-intro" className={`font-light text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Delivering bespoke spatial solution grids from early-stage zoning analysis to on-site concrete curing coordination.
          </p>
        </div>

        {/* Tabbed Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Navigation Side (Tab Buttons / Cards) */}
          <div className="lg:col-span-4 flex flex-col space-y-4 relative z-10">
            {services.map((service, index) => (
              <div
                id={`services-card-${index}`}
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTabClick(index);
                  }
                }}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-500 flex flex-col space-y-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c5a880]/50 liquid-glass-card group ${
                  activeTab === index
                    ? "glass-btn-gold text-[#0a0a0a] shadow-[0_8px_30px_rgba(197,168,128,0.3)] border border-[#c5a880]/40"
                    : theme === "dark"
                      ? "glass-panel-dark text-gray-300 liquid-shimmer"
                      : "glass-panel-light text-gray-700 liquid-shimmer liquid-shimmer-light"
                }`}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div
                    className={`p-3 rounded-xl transition-colors duration-300 flex-shrink-0 ${
                      activeTab === index ? "bg-[#0a0a0a] text-[#c5a880]" : "bg-white/5 text-[#c5a880]"
                    }`}
                  >
                    {getIconComponent(service.icon)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-display font-semibold text-base sm:text-lg truncate">
                      {service.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-1 font-light ${
                        activeTab === index 
                          ? "text-[#0a0a0a]/80" 
                          : theme === "dark" 
                            ? "text-gray-400" 
                            : "text-gray-500"
                      }`}
                    >
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 w-full ${
                  activeTab === index 
                    ? "border-[#0a0a0a]/10" 
                    : theme === "dark" 
                      ? "border-white/5" 
                      : "border-black/5"
                }`}>
                  <button
                    id={`view-details-btn-${index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                    }}
                    className={`text-[10px] font-display font-bold tracking-widest uppercase py-1 px-3 rounded-md border transition-all duration-300 hover:scale-[1.05] ${
                      activeTab === index
                        ? "border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#c5a880]"
                        : theme === "dark"
                          ? "border-[#c5a880]/30 text-[#c5a880] hover:border-[#c5a880] hover:text-white hover:bg-[#c5a880]/10"
                          : "border-[#a98d65]/30 text-[#a98d65] hover:border-[#a98d65] hover:text-[#0a0a0a] hover:bg-[#a98d65]/10"
                    }`}
                  >
                    View Details
                  </button>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeTab === index ? "translate-x-1 rotate-0 text-[#0a0a0a]" : "text-gray-500 group-hover:translate-x-1.5"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Presentation Panel (Content Display) */}
          <div
            id="services-content-panel"
            className={`rounded-2xl p-8 sm:p-12 relative overflow-hidden min-h-[480px] flex flex-col justify-between shadow-2xl transition-all duration-500 lg:col-span-8 liquid-glass-card ${
              theme === "dark" ? "glass-panel-dark liquid-shimmer" : "glass-panel-light liquid-shimmer liquid-shimmer-light"
            }`}
          >
            {/* Visual accent background frame */}
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#c5a880]/15 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#c5a880] font-medium">
                      Service Feature {activeTab + 1} of {services.length}
                    </span>
                    <h3 id="service-detail-title" className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
                      {services[activeTab].title}
                    </h3>
                    <div className="h-[2px] w-12 bg-[#c5a880]" />
                  </div>

                  <p id="service-detail-long-desc" className={`font-light text-base leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {services[activeTab].longDesc}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-display text-sm tracking-widest text-[#c5a880] uppercase font-bold">
                      Key Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services[activeTab].features.map((feature, idx) => (
                        <div
                          id={`service-feature-item-${idx}`}
                          key={idx}
                          className={`flex items-center space-x-3 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <div className="p-1 bg-[#c5a880]/10 rounded-full text-[#c5a880]">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-sans text-sm font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    id="service-view-specs-panel-btn"
                    onClick={() => setSelectedService(services[activeTab])}
                    className={`inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-md ${
                      theme === "dark"
                        ? "bg-[#c5a880] text-[#0a0a0a] hover:bg-[#a98d65]"
                        : "bg-[#0a0a0a] text-[#c5a880] hover:bg-[#222] hover:text-[#d3bc9b]"
                    }`}
                  >
                    <span>View Architectural Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={`pt-8 border-t mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${
              theme === "dark" ? "border-white/5" : "border-black/10"
            }`}>
              <span className={`font-mono text-xs transition-colors duration-300 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                Build Studio &middot; Quality & Design Integrity Guaranteed
              </span>
              <a
                id="service-cta-consultation"
                href="#contact"
                className={`inline-flex items-center space-x-2 text-xs font-display font-semibold tracking-widest uppercase group transition-colors duration-200 ${
                  theme === "dark" ? "text-[#c5a880] hover:text-white" : "text-[#a98d65] hover:text-[#0a0a0a]"
                }`}
              >
                <span>Request Custom Service BOQ</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Centered Liquid Glass Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            />

            {/* Modal Glass Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10 liquid-glass-card border ${
                theme === "dark" 
                  ? "glass-panel-dark border-white/10 text-white" 
                  : "glass-panel-light border-[#c5a880]/20 text-[#0a0a0a]"
              }`}
            >
              {/* Shimmer glaze background */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Corner accent border line */}
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-[#c5a880]/15 pointer-events-none" />

              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setSelectedService(null)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-300 z-20 ${
                  theme === "dark" 
                    ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10" 
                    : "bg-black/5 text-gray-600 hover:text-black hover:bg-black/10"
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-start space-x-4 pr-10 mb-6 pb-6 border-b border-current/10">
                <div className="p-3.5 bg-[#c5a880]/15 rounded-2xl text-[#c5a880] flex-shrink-0 border border-[#c5a880]/20 shadow-sm">
                  {getIconComponent(selectedService.icon)}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                    Technical Specifications
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Content (Scrollable) */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-8 text-sm font-light">
                {/* Long Description */}
                <div>
                  <h4 className="font-display text-xs font-bold tracking-widest uppercase text-[#c5a880] mb-2.5">
                    Service Focus & Narrative:
                  </h4>
                  <p className={`leading-relaxed text-base ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {selectedService.longDesc}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <div className="flex items-center space-x-2 text-[#c5a880] mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-display text-xs font-bold tracking-widest uppercase">Development Timeline</span>
                    </div>
                    <p className={`font-sans text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {getExtraServiceDetails(selectedService.id).timeline}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <div className="flex items-center space-x-2 text-[#c5a880] mb-2">
                      <Building className="w-4 h-4" />
                      <span className="font-display text-xs font-bold tracking-widest uppercase">Target Sectors</span>
                    </div>
                    <p className={`font-sans text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {getExtraServiceDetails(selectedService.id).targetSectors}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <div className="flex items-center space-x-2 text-[#c5a880] mb-2">
                      <Layers className="w-4 h-4" />
                      <span className="font-display text-xs font-bold tracking-widest uppercase">Typical Project Team</span>
                    </div>
                    <p className={`font-sans text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {getExtraServiceDetails(selectedService.id).typicalTeam}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <div className="flex items-center space-x-2 text-[#c5a880] mb-2">
                      <Cpu className="w-4 h-4" />
                      <span className="font-display text-xs font-bold tracking-widest uppercase">Architectural Tech Stack</span>
                    </div>
                    <p className={`font-sans text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {getExtraServiceDetails(selectedService.id).techStack}
                    </p>
                  </div>
                </div>

                {/* Methodology */}
                <div>
                  <h4 className="font-display text-xs font-bold tracking-widest uppercase text-[#c5a880] mb-2.5">
                    Process & Methodology:
                  </h4>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {getExtraServiceDetails(selectedService.id).detailedMethodology}
                  </p>
                </div>

                {/* Key Deliverables & Sustainability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-display text-xs font-bold tracking-widest uppercase text-[#c5a880] mb-3">
                      Contract Deliverables:
                    </h4>
                    <div className="space-y-2">
                      {selectedService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-[#c5a880]" />
                          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xs font-bold tracking-widest uppercase text-[#c5a880] mb-3">
                      Environmental Metrics:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <ShieldCheck className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {getExtraServiceDetails(selectedService.id).sustainableFeatures}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                <span className={`font-mono text-[10px] ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  Strict confidentiality & spatial integrity guaranteed.
                </span>
                <a
                  id="modal-cta-book"
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-display font-bold tracking-widest uppercase transition-colors duration-200 ${
                    theme === "dark" 
                      ? "bg-[#c5a880] text-[#0a0a0a] hover:bg-[#a98d65]" 
                      : "bg-[#0a0a0a] text-[#c5a880] hover:bg-[#222]"
                  }`}
                >
                  <span>Consult Studio Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
