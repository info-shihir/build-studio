import { motion } from "motion/react";
import { ArrowRight, Compass, Edit3, ClipboardList, HardHat } from "lucide-react";
import { ProcessStep } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ProcessProps {
  steps: ProcessStep[];
}

export default function Process({ steps }: ProcessProps) {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-5 h-5 text-[#c5a880]" />;
      case 1:
        return <Edit3 className="w-5 h-5 text-[#c5a880]" />;
      case 2:
        return <ClipboardList className="w-5 h-5 text-[#c5a880]" />;
      case 3:
        return <HardHat className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <Compass className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  return (
    <section id="process" className={`py-24 bg-transparent overflow-hidden relative transition-colors duration-500 scroll-mt-24 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
      {/* Liquid fluid background ambient orbs */}
      <div className={`absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-25 blur-[100px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />
      <div className={`absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full opacity-30 blur-[110px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-2" : "liquid-orb-2"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#c5a880]" />
            <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
              Our Process
            </span>
            <span className="h-[1px] w-8 bg-[#c5a880]" />
          </div>
          <h2 id="process-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            How We Build
          </h2>
          <p id="process-subtitle" className={`font-light text-sm sm:text-base leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            A meticulous path from a simple conversational brief to structural completion, ensuring full transparency.
          </p>
        </div>

        {/* Process Map Grid */}
        <motion.div
          id="process-steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {steps.map((step, idx) => (
            <motion.div
              id={`process-step-card-${idx}`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              key={idx}
              className={`relative p-8 rounded-2xl flex flex-col justify-between group h-full transition-all duration-500 liquid-glass-card ${
                theme === "dark" 
                  ? "glass-panel-dark liquid-shimmer" 
                  : "glass-panel-light liquid-shimmer liquid-shimmer-light"
              }`}
            >
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  {/* Step Large Label */}
                  <span className="font-mono text-4xl font-extrabold text-[#c5a880]/20 tracking-tight group-hover:text-[#c5a880]/40 transition-colors duration-300">
                    {step.step}
                  </span>
                  
                  {/* Step Icon container */}
                  <div className={`p-3 rounded-sm group-hover:bg-[#c5a880]/15 transition-colors duration-300 ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}>
                    {getStepIcon(idx)}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-sans text-[10px] uppercase font-bold text-[#c5a880] tracking-widest block">
                    {step.subtitle}
                  </span>
                  <h3 id={`process-step-title-${idx}`} className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <p id={`process-step-desc-${idx}`} className={`font-sans text-sm leading-relaxed font-light mt-6 group-hover:text-gray-300 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {step.desc}
              </p>

              {/* Connective arrows for desktop view */}
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden lg:block text-[#c5a880]/30 animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info banner */}
        <div className="mt-16 text-center">
          <p className={`font-mono text-xs transition-colors duration-300 ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
            Have questions about regulatory approvals?{" "}
            <a href="#contact" className={`text-[#c5a880] underline transition-colors ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}>
              Speak with a Project Architect &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
