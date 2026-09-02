import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface OverviewLinkProps {
  href: string;
  label: string;
}

export default function OverviewLink({ href, label }: OverviewLinkProps) {
  return (
    <div className="flex justify-center pb-20 -mt-8">
      <Link
        href={href}
        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-[#c5a880]/30 text-[#c5a880] font-display text-xs tracking-widest uppercase font-bold hover:bg-[#c5a880] hover:text-[#0a0a0a] transition-all duration-300 group"
      >
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
