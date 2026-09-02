import { CompanyMeta } from "@/types";

interface CompanyLogoProps {
  company: CompanyMeta;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
};

export default function CompanyLogo({
  company,
  size = "md",
  showText = true,
  className = "",
}: CompanyLogoProps) {
  return (
    <div className={`flex items-center space-x-2.5 group ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border border-white/10 bg-white flex-shrink-0 transition-transform duration-500 group-hover:scale-105`}
      >
        <img
          src={company.logo || "/images/logo.jpg"}
          alt={`${company.name} logo`}
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <div className="flex flex-col min-w-0">
          <span className="font-display font-bold text-base tracking-wider leading-none text-white truncate">
            {company.shortName.split(" ")[0].toUpperCase()}
          </span>
          <span className="font-mono text-[8px] text-[#c5a880] tracking-widest mt-0.5 uppercase leading-none truncate">
            {company.shortName.split(" ").slice(1).join(" ") || "GLOBAL BD"}
          </span>
        </div>
      )}
    </div>
  );
}
