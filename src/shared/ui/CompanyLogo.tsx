import { CompanyMeta } from "@/types";

interface CompanyLogoProps {
  company: CompanyMeta;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-14 sm:h-16 md:h-[4.25rem] w-auto",
  md: "h-20 sm:h-24 md:h-28 w-auto",
  lg: "h-28 sm:h-32 md:h-36 w-auto",
};

const maxWidthClasses = {
  sm: "max-w-[13rem] sm:max-w-[16rem] md:max-w-[18rem]",
  md: "max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]",
  lg: "max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem]",
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
        className={`${sizeClasses[size]} ${maxWidthClasses[size]} object-contain object-left transition-transform duration-500 group-hover:scale-[1.02]`}
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
