import type { CompanyMap } from "@/types/site";
import { buildGoogleMapsEmbedUrl, buildGoogleMapsLink } from "@/lib/maps";

interface GoogleMapEmbedProps {
  address: string;
  map?: CompanyMap;
  title?: string;
  className?: string;
  showOpenLink?: boolean;
  id?: string;
  layout?: "video" | "fill";
}

export default function GoogleMapEmbed({
  address,
  map,
  title = "Office location on Google Maps",
  className = "",
  showOpenLink = true,
  id,
  layout = "video",
}: GoogleMapEmbedProps) {
  const embedUrl = buildGoogleMapsEmbedUrl({ address, map });
  const mapsLink = buildGoogleMapsLink({ address, map });

  const mapFrameClass =
    layout === "fill"
      ? "flex-1 min-h-[280px] lg:min-h-0 w-full rounded-2xl overflow-hidden border shadow-2xl relative bg-[#0a0a0a] border-white/10"
      : "aspect-video w-full rounded-2xl overflow-hidden border shadow-2xl relative bg-[#0a0a0a] border-white/10";

  return (
    <div
      id={id}
      className={`${layout === "fill" ? "flex h-full flex-col" : ""} ${className}`.trim()}
    >
      <div className={mapFrameClass}>
        <iframe
          title={title}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {showOpenLink && (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-3 text-xs font-mono uppercase tracking-widest text-[#c5a880] hover:text-white transition-colors"
        >
          Open in Google Maps
        </a>
      )}
    </div>
  );
}
