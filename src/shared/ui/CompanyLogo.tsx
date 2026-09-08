import { CompanyMeta } from "@/types";

interface CompanyLogoProps {
  company: CompanyMeta;
  size?: "sm" | "md" | "lg" | "header";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-10 sm:h-11 w-auto max-w-[11rem] sm:max-w-[14rem]",
  md: "h-14 sm:h-16 w-auto max-w-[14rem] sm:max-w-[18rem]",
  lg: "h-20 sm:h-24 w-auto max-w-[16rem] sm:max-w-[20rem] md:max-w-[22rem]",
  /** Larger mark that overflows the bar slightly without stretching header height */
  header: "h-12 sm:h-[3.25rem] w-auto max-w-[12rem] sm:max-w-[15rem]",
};

const DEFAULT_LOGO = "/images/logo.png";

export default function CompanyLogo({
  company,
  size = "md",
  showText = false,
  className = "",
}: CompanyLogoProps) {
  const logoSrc = company.logo || DEFAULT_LOGO;

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <img
        src={logoSrc}
        alt={`${company.name} logo`}
        className={`${sizeClasses[size]} object-contain object-left transition-transform duration-500 group-hover:scale-[1.02]`}
      />
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
