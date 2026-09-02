import type { ReactNode } from "react";
import {
  Building,
  HardHat,
  Ship,
  Package,
  Route,
  Briefcase,
} from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  Building: <Building className="w-full h-full" />,
  HardHat: <HardHat className="w-full h-full" />,
  Ship: <Ship className="w-full h-full" />,
  Package: <Package className="w-full h-full" />,
  Route: <Route className="w-full h-full" />,
  Briefcase: <Briefcase className="w-full h-full" />,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export default function ServiceIcon({ name, className = "w-6 h-6" }: ServiceIconProps) {
  return (
    <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
      {iconMap[name] ?? iconMap.Building}
    </span>
  );
}
