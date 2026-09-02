import type { CompanyMap } from "@/types/site";

interface MapLocationInput {
  address: string;
  map?: CompanyMap;
}

function normalizeAddress(address: string): string {
  return address
    .replace(/House:\s*/gi, "House ")
    .replace(/Road:\s*/gi, "Road ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildGoogleMapsEmbedUrl({ address, map }: MapLocationInput): string {
  if (map?.embedUrl) {
    return map.embedUrl;
  }

  const zoom = map?.zoom ?? 17;
  const query =
    map?.lat != null && map?.lng != null
      ? `${map.lat},${map.lng}`
      : normalizeAddress(address);

  const params = new URLSearchParams({
    q: query,
    hl: "en",
    z: String(zoom),
    t: "m",
    output: "embed",
  });

  if (map?.lat != null && map?.lng != null) {
    params.set("ll", `${map.lat},${map.lng}`);
  }

  return `https://maps.google.com/maps?${params.toString()}`;
}

export function buildGoogleMapsLink({ address, map }: MapLocationInput): string {
  if (map?.lat != null && map?.lng != null) {
    const query = map.label
      ? `${map.lat},${map.lng} (${map.label})`
      : `${map.lat},${map.lng}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizeAddress(address))}`;
}
