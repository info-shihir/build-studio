import type { ElementType, ReactNode } from "react";

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Full-width layout with responsive side padding — no fixed max-width cap on large screens. */
export const siteContainerClass =
  "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-[max(2rem,5vw)]";

export default function SiteContainer({
  children,
  className = "",
  as: Tag = "div",
}: SiteContainerProps) {
  return <Tag className={`${siteContainerClass} ${className}`.trim()}>{children}</Tag>;
}
