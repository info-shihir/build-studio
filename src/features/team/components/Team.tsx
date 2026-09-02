"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Instagram } from "lucide-react";
import { TeamDepartment, TeamMember } from "@/types";
import SafeImage from "@/shared/ui/SafeImage";
import SiteContainer from "@/shared/ui/SiteContainer";

interface TeamProps {
  departments: TeamDepartment[];
  hideHeader?: boolean;
  /** Show only one department (e.g. leaders on the home page). */
  departmentId?: string;
}

function memberGridClass(count: number): string {
  if (count === 1) return "grid-cols-1 max-w-sm mx-auto w-full";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto w-full";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full";
}

function TeamMemberCard({
  member,
  activeMemberId,
  onToggle,
}: {
  member: TeamMember;
  activeMemberId: string | number | null;
  onToggle: (id: string) => void;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      id={`team-card-${member.id}`}
      variants={itemVariants}
      onClick={() => onToggle(member.id)}
      className="group rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-500 hover:scale-[1.02] hover:shadow-xl liquid-glass-card glass-panel-dark liquid-shimmer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <SafeImage
          src={member.image}
          alt={member.name}
          fallbackType="profile"
          fallbackText={member.name}
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 z-20 transition-all duration-300 ${
            activeMemberId === member.id
              ? "translate-x-0 opacity-100"
              : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        >
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

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end p-6 transition-transform duration-500 ease-out z-10 ${
            activeMemberId === member.id
              ? "translate-y-0"
              : "translate-y-full group-hover:translate-y-0"
          }`}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880] font-bold">
            {member.role}
          </span>
          <h4 className="font-display font-bold text-lg text-white mt-1">
            {member.name}
            {member.credentials && (
              <span className="font-normal text-sm text-gray-300">, {member.credentials}</span>
            )}
          </h4>
          <p className="font-sans text-xs text-gray-300 leading-relaxed font-light mt-3 border-t border-white/10 pt-3">
            {member.bio}
          </p>
          {member.phone && (
            <p className="font-mono text-[10px] text-[#c5a880] mt-2">{member.phone}</p>
          )}
        </div>
      </div>

      <div className="p-5 text-center sm:text-left bg-transparent">
        <h3
          id={`team-name-${member.id}`}
          className={`font-display font-bold text-base transition-colors duration-300 text-white group-hover:text-[#c5a880] ${
            activeMemberId === member.id ? "text-[#c5a880]" : ""
          }`}
        >
          {member.name}
        </h3>
        {member.credentials && (
          <p className="font-sans text-[10px] text-gray-400 mt-0.5">{member.credentials}</p>
        )}
        <p
          id={`team-role-${member.id}`}
          className="font-sans text-xs text-[#c5a880] font-semibold tracking-wider mt-1 uppercase"
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function Team({ departments, hideHeader = false, departmentId }: TeamProps) {
  const [activeMemberId, setActiveMemberId] = useState<string | number | null>(null);

  const visibleDepartments = departmentId
    ? departments.filter((department) => department.id === departmentId)
    : departments;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="team" className="py-24 bg-transparent relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/4 left-5 w-[320px] h-[320px] rounded-full opacity-45 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 right-5 w-[380px] h-[380px] rounded-full opacity-35 blur-[110px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <SiteContainer className="relative z-10">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="h-[1px] w-8 bg-[#c5a880]" />
                <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                  Team
                </span>
              </div>
              <h2
                id="team-title"
                className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 text-white"
              >
                Meet Our Team
              </h2>
            </div>
            <p
              id="team-intro"
              className="font-light text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 text-gray-300"
            >
              {departmentId
                ? "Our leadership team brings together expertise in civil engineering, pharmacy, finance, and corporate governance."
                : "Leadership and departmental teams across HR, IT, accounts, admin, and other divisions."}
            </p>
          </div>
        )}

        <div className="space-y-20">
          {visibleDepartments.map((department) => (
            <div key={department.id} id={`team-department-${department.id}`}>
              <div className="mb-10 space-y-3">
                <div className="inline-flex items-center space-x-2">
                  <span className="h-[1px] w-6 bg-[#c5a880]/70" />
                  <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest font-semibold">
                    {department.title}
                  </span>
                </div>
                {department.description && (
                  <p className="font-light text-sm text-gray-400 max-w-2xl leading-relaxed">
                    {department.description}
                  </p>
                )}
              </div>

              {department.members.length > 0 ? (
                <motion.div
                  id={`team-members-grid-${department.id}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={`grid gap-6 ${memberGridClass(department.members.length)}`}
                >
                  {department.members.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      activeMemberId={activeMemberId}
                      onToggle={(id) => setActiveMemberId(activeMemberId === id ? null : id)}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center">
                  <p className="font-sans text-sm text-gray-400">
                    Team profiles for this department will be updated soon.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
