import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { MapPin, Maximize2 } from "lucide-react";
import { ProjectItem } from "../types";
import SafeImage from "./SafeImage";

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  key?: string | number;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking cursor position normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for super fluid and smooth "liquid glass" response
  const springConfig = { damping: 22, stiffness: 140, mass: 0.8 };

  // Calculate rotation angles based on cursor offset
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Parallax translation for the image (shifts in opposite direction of tilt to add depth)
  const imgX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const springImgX = useSpring(imgX, springConfig);
  const springImgY = useSpring(imgY, springConfig);

  // Translate for text details to make them float on a higher plane
  const floatX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const floatY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);
  const springFloatX = useSpring(floatX, springConfig);
  const springFloatY = useSpring(floatY, springConfig);

  // Glare/shine cursor following position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "120%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "120%"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const normalizedX = (event.clientX - rect.left) / width - 0.5;
    const normalizedY = (event.clientY - rect.top) / height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      id={`project-card-outer-${project.id}`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <motion.div
        id={`project-card-inner-${project.id}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between glass-panel-dark text-white"
      >
        {/* Dynamic liquid glass glare highlight overlay */}
        <motion.div
          id={`project-card-glare-${project.id}`}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: useTransform(
              [glareX, glareY],
              ([xVal, yVal]) => `radial-gradient(circle at ${xVal} ${yVal}, rgba(255, 255, 255, 0.45) 0%, rgba(197, 168, 128, 0.15) 40%, transparent 70%)`
            ),
          }}
        />

        {/* Outer Image Container with custom 3D depth */}
        <div 
          className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900 rounded-t-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Depth background image layer */}
          <motion.div
            className="w-full h-full"
            style={{
              x: springImgX,
              y: springImgY,
              scale: 1.12, // slightly larger to prevent showing edges when shifting
              transformStyle: "preserve-3d",
            }}
          >
            <SafeImage
              src={project.image}
              alt={project.title}
              fallbackType="rect"
              fallbackText={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Subtle dark ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-500 z-10 pointer-events-none" />

          {/* Floating metadata layer with distinct 3D elevation */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 text-white z-20 pointer-events-none flex flex-col space-y-1.5"
            style={{
              x: springFloatX,
              y: springFloatY,
              translateZ: 35,
            }}
          >
            <span className="font-mono text-[10px] text-[#c5a880] tracking-widest uppercase font-semibold">
              {project.category}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl leading-tight text-white drop-shadow-md">
              {project.title}
            </h3>
            
            {/* Quick specifications inside floating meta */}
            <div className="flex items-center space-x-3 mt-2 text-[11px] text-gray-300 font-light pt-2 border-t border-white/10">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#c5a880] flex-shrink-0" />
                <span>{project.location.split(",")[0]}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Maximize2 className="w-3 h-3 text-[#c5a880] flex-shrink-0" />
                <span>{project.area}</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Always-visible card lower footer with secondary 3D element elevation */}
        <div 
          className="p-5 flex justify-between items-center bg-white/[0.01] rounded-b-2xl relative z-10 transition-colors duration-500 border-t border-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className="flex-1 min-w-0 pr-4"
            style={{ translateZ: 15 }}
          >
            <h4 className="font-display font-semibold text-sm tracking-tight truncate transition-colors duration-300 text-gray-100 group-hover:text-[#c5a880]">
              {project.title}
            </h4>
            <p className="font-sans text-[11px] mt-0.5 truncate transition-colors duration-300 text-gray-400">
              {project.location}
            </p>
          </motion.div>

          <motion.div 
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:bg-[#c5a880] group-hover:border-[#c5a880] group-hover:text-[#0a0a0a] border border-white/10 bg-white/5 text-white"
            style={{ translateZ: 25 }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
