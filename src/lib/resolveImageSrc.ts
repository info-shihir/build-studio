export type ImageFallbackType = "rect" | "circle" | "profile" | "hero";

export function buildPicsumUrl(
  fallbackText: string,
  fallbackType: ImageFallbackType = "rect",
): string {
  const seedName = fallbackText
    ? encodeURIComponent(fallbackText.toLowerCase().replace(/[^a-z0-9]/g, "-"))
    : "architecture";

  let fallbackSeed = `arch-${seedName}`;
  if (fallbackType === "profile" || fallbackType === "circle") {
    fallbackSeed = `avatar-${seedName}`;
  } else if (fallbackType === "hero") {
    fallbackSeed = `hero-${seedName}`;
  }

  const width =
    fallbackType === "profile" ? 400 : fallbackType === "hero" ? 1600 : 800;
  const height =
    fallbackType === "profile" ? 400 : fallbackType === "hero" ? 900 : 600;

  return `https://picsum.photos/seed/${fallbackSeed}/${width}/${height}`;
}

export function resolveImageSrc(
  src: string | undefined,
  _fallbackText: string,
  _fallbackType: ImageFallbackType = "rect",
): string | undefined {
  if (!src) {
    return undefined;
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Legacy Vite asset paths -> Next.js public folder.
  if (src.startsWith("/src/assets/images/")) {
    return src.replace("/src/assets/images/", "/images/");
  }

  if (src.startsWith("/src/assets/")) {
    return src.replace("/src/assets/", "/");
  }

  return src;
}
