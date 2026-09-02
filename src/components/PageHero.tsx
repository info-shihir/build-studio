import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SiteContainer from "./SiteContainer";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative pt-8 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-30 blur-[100px] pointer-events-none liquid-orb-dark-1" />
      <SiteContainer className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center flex-wrap gap-1.5 mb-6 text-xs font-mono text-gray-500">
            <Link href="/" className="hover:text-[#c5a880] transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#c5a880] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#c5a880]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-[1px] w-8 bg-[#c5a880]" />
            <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 font-light text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </SiteContainer>
    </section>
  );
}
