import type { CompanyMap } from "@/types/site";

interface MapLocationInput {
  address: string;
  map?: CompanyMap;
}

export function buildGoogleMapsEmbedUrl({ address, map }: MapLocationInput): string {
  const zoom = map?.zoom ?? 16;

  if (map?.lat != null && map?.lng != null) {
    const query = map.label
      ? `${map.lat},${map.lng} (${map.label})`
      : `${map.lat},${map.lng}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=${zoom}&hl=en&output=embed`;
}

export function buildGoogleMapsLink({ address, map }: MapLocationInput): string {
  if (map?.lat != null && map?.lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${map.lat},${map.lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
