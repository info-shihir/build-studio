"use client";

import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";
import {
  buildPicsumUrl,
  resolveImageSrc,
  type ImageFallbackType,
} from "@/lib/resolveImageSrc";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackType?: ImageFallbackType;
  fallbackText?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  fallbackType = "rect",
  fallbackText = "",
  ...props
}: SafeImageProps) {
  const resolvedSrc = resolveImageSrc(src, fallbackText, fallbackType);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolveImageSrc(src, fallbackText, fallbackType));
    setHasError(false);
    setIsLoading(true);
  }, [src, fallbackText, fallbackType]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, [currentSrc]);

  const handleError = () => {
    const picsumUrl = buildPicsumUrl(fallbackText, fallbackType);

    if (currentSrc !== picsumUrl) {
      setCurrentSrc(picsumUrl);
      return;
    }

    setHasError(true);
    setIsLoading(false);
  };

  if (hasError || !currentSrc) {
    const initials = fallbackText
      ? fallbackText
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "";

    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-tr from-[#0a0a0a] via-[#121212] to-[#1c1c1e] border border-white/5 text-[#c5a880] overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#c5a880]/5 via-transparent to-transparent opacity-40 pointer-events-none" />
        <div className="z-10 flex flex-col items-center p-4 text-center space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">
            {initials || "ARSHIA"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#121212]/40 backdrop-blur-md animate-pulse z-10" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        {...props}
      />
    </div>
  );
}
