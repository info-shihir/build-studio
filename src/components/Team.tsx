import { useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Instagram } from "lucide-react";
import { TeamMember } from "../types";
import SafeImage from "./SafeImage";
import { useTheme } from "../context/ThemeContext";

interface TeamProps {
  team: TeamMember[];
}

export default function Team({ team }: TeamProps) {
  const { theme } = useTheme();
  const [activeMemberId, setActiveMemberId] = useState<string | number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="team" className="py-24 bg-transparent relative overflow-hidden scroll-mt-24">
      {/* Liquid fluid background ambient orbs */}
      <div className={`absolute top-1/4 left-5 w-[320px] h-[320px] rounded-full opacity-45 blur-[100px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />
      <div className={`absolute bottom-1/4 right-5 w-[380px] h-[380px] rounded-full opacity-35 blur-[110px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-2" : "liquid-orb-2"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-[#c5a880]" />
              <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                Creative Force
              </span>
            </div>
            <h2 id="team-title" className={`font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
              Meet Our Team
            </h2>
          </div>
          <p id="team-intro" className={`font-light text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Our studio brings together senior BUET graduates, spatial minimalist interior designers, and veteran concrete engineers.
          </p>
        </div>

        {/* Team Grid */}
        <motion.div
          id="team-members-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div
              id={`team-card-${member.id}`}
              variants={itemVariants}
              key={member.id}
              onClick={() => setActiveMemberId(activeMemberId === member.id ? null : member.id)}
              className={`group rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-500 hover:scale-[1.02] hover:shadow-xl liquid-glass-card ${
                theme === "dark" 
                  ? "glass-panel-dark liquid-shimmer" 
                  : "glass-panel-light liquid-shimmer liquid-shimmer-light"
              }`}
            >
              {/* Image Frame with hover slide-over card */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <SafeImage
                  src={member.image}
                  alt={member.name}
                  fallbackType="profile"
                  fallbackText={member.name}
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Social icons overlay on hover / tap */}
                <div className={`absolute top-4 right-4 flex flex-col space-y-2 z-20 transition-all duration-300 ${
                  activeMemberId === member.id 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}>
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white hover:bg-[#c5a880] hover:text-[#0a0a0a] transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white hover:bg-[#c5a880] hover:text-[#0a0a0a] transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Info Overlay Panel */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end p-6 transition-transform duration-500 ease-out z-10 ${
                  activeMemberId === member.id 
                    ? "translate-y-0" 
                    : "translate-y-full group-hover:translate-y-0"
                }`}>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880] font-bold">
                    {member.role}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">
                    {member.name}
                  </h4>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed font-light mt-3 border-t border-white/10 pt-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Standard info footer */}
              <div className="p-5 text-center sm:text-left bg-transparent">
                <h3 id={`team-name-${member.id}`} className={`font-display font-bold text-base transition-colors duration-300 ${
                  theme === "dark" ? "text-white group-hover:text-[#c5a880]" : "text-[#0a0a0a] group-hover:text-[#a98d65]"
                } ${activeMemberId === member.id ? (theme === "dark" ? "text-[#c5a880]" : "text-[#a98d65]") : ""}`}>
                  {member.name}
                </h3>
                <p id={`team-role-${member.id}`} className="font-sans text-xs text-[#c5a880] font-semibold tracking-wider mt-1 uppercase">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
