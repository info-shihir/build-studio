import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Maximize2, X, Layers, User, ArrowRight } from "lucide-react";
import { ProjectItem } from "../types";
import SafeImage from "./SafeImage";
import ProjectCard from "./ProjectCard";
import SiteContainer from "./SiteContainer";

interface ProjectsProps {
  projects: ProjectItem[];
  limit?: number;
  hideHeader?: boolean;
}

export default function Projects({ projects, limit, hideHeader = false }: ProjectsProps) {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Real Estate", "Contractor", "Infrastructure", "Export-Import", "Supplier", "Consultancy"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section id="projects" className="py-24 bg-transparent overflow-hidden relative scroll-mt-24">
      {/* Liquid fluid background ambient orbs */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] rounded-full opacity-30 blur-[120px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <SiteContainer className="relative z-10">
        
        {!hideHeader ? (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-[#c5a880]" />
              <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                Our Work
              </span>
            </div>
            <h2 id="projects-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 text-white">
              Our Projects
            </h2>
          </div>
          {!limit && (
          <div id="projects-filter-bar" className="flex flex-wrap gap-2 relative z-10">
            {categories.map((cat) => (
              <button
                id={`project-filter-btn-${cat.toLowerCase()}`}
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl font-display text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  filter === cat
                    ? "glass-btn-gold text-[#0a0a0a] border border-[#c5a880]/40"
                    : "glass-panel-dark text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          )}
        </div>
        ) : !limit ? (
          <div id="projects-filter-bar" className="flex flex-wrap gap-2 relative z-10 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl font-display text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  filter === cat
                    ? "glass-btn-gold text-[#0a0a0a] border border-[#c5a880]/40"
                    : "glass-panel-dark text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : null}

        {/* Portfolio Project Grid */}
        <motion.div
          id="project-grid-container"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Window for Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <div id="project-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Dark backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 transition-all duration-500 glass-panel-dark text-white"
              >
                {/* Close Button */}
                <button
                  id="close-project-modal"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full shadow-md transition-colors bg-[#0a0a0a] hover:bg-[#c5a880] text-white hover:text-[#0a0a0a]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Scroller */}
                <div className="overflow-y-auto flex-grow">
                  {/* Big Hero Image */}
                  <div className="relative aspect-video w-full max-h-[450px] overflow-hidden bg-gray-900">
                    <SafeImage
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fallbackType="hero"
                      fallbackText={selectedProject.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#c5a880] bg-[#0a0a0a]/90 px-3 py-1.5 rounded-lg border border-white/10">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-4xl mt-4 tracking-tight leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* Core Information Details */}
                  <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Description & custom bullets */}
                    <div className="lg:col-span-8 space-y-8">
                      <div className="space-y-4">
                        <h4 className="font-display text-lg font-bold border-b pb-2 transition-colors duration-300 text-white border-white/5">
                          Project Brief
                        </h4>
                        <p className="font-light leading-relaxed text-base sm:text-lg transition-colors duration-300 text-gray-300">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-display text-lg font-bold border-b pb-2 transition-colors duration-300 text-white border-white/5">
                          Key Features & Specifications
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProject.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-3 text-sm transition-colors duration-300 text-gray-300"
                            >
                              <span className="h-2 w-2 rounded-full bg-[#c5a880] mt-1.5 flex-shrink-0" />
                              <span className="font-sans font-light">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Project Meta Sidebar */}
                    <div className="p-6 rounded-2xl space-y-6 h-fit transition-all duration-500 glass-panel-dark">
                      <h4 className="font-display text-sm tracking-widest uppercase font-bold border-b pb-3 transition-colors duration-300 text-[#c5a880] border-white/5">
                        Metadata Details
                      </h4>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Client</p>
                            <p className="text-sm font-semibold transition-colors duration-300 text-gray-200">{selectedProject.client}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Location</p>
                            <p className="text-sm font-semibold transition-colors duration-300 text-gray-200">{selectedProject.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Layers className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Total Area</p>
                            <p className="text-sm font-semibold transition-colors duration-300 text-gray-200">{selectedProject.area}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Handover Year</p>
                            <p className="text-sm font-semibold transition-colors duration-300 text-gray-200">{selectedProject.year}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t transition-colors duration-300 border-white/5">
                        <a
                          id="modal-cta-quote"
                          href="/contact"
                          onClick={() => setSelectedProject(null)}
                          className="w-full text-center block py-3 bg-[#c5a880] hover:bg-[#a98d65] text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-semibold rounded-xl transition-all duration-300"
                        >
                          Inquire about similar builds
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </SiteContainer>
    </section>
  );
}
