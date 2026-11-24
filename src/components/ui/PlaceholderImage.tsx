"use client";

import { useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  category?: string;
  label?: string;
  aspectRatio?: string;
  asBackground?: boolean;
}

export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  imageClassName = "",
  category = "Editorial Asset",
  label,
  aspectRatio,
  asBackground = false,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine specific royal artwork based on label or src
  const lowerLabel = (label || alt || src || "").toLowerCase();

  const getArtwork = () => {
    if (lowerLabel.includes("haldi")) {
      return (
        // Auspicious Marigold & Turmeric Mandala
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="14" fill="#C9A96E" fillOpacity="0.2" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M50 20 C46 32, 54 32, 50 20"
              transform={`rotate(${i * 45} 50 50)`}
              strokeWidth="1.2"
            />
          ))}
          <circle cx="50" cy="50" r="4" fill="#C9A96E" />
        </svg>
      );
    }

    if (lowerLabel.includes("mehendi")) {
      return (
        // Henna Paisley Motif
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 15 C30 25, 20 45, 25 65 C30 80, 50 85, 65 75 C80 65, 80 40, 65 30 C55 22, 52 16, 50 15 Z" />
          <path d="M50 30 C40 38, 35 50, 38 60 C42 70, 55 72, 62 65 C70 58, 68 42, 58 35 Z" strokeDasharray="2 2" />
          <circle cx="50" cy="52" r="5" fill="#C9A96E" fillOpacity="0.3" />
          <path d="M22 62 C15 65, 12 72, 16 78 C20 84, 28 82, 30 76" />
        </svg>
      );
    }

    if (lowerLabel.includes("sangeet")) {
      return (
        // Sitar & Musical Raga Motif
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="65" r="22" />
          <line x1="50" y1="12" x2="50" y2="43" strokeWidth="1.5" />
          <line x1="44" y1="18" x2="56" y2="18" />
          <line x1="44" y1="24" x2="56" y2="24" />
          <line x1="44" y1="30" x2="56" y2="30" />
          <circle cx="50" cy="65" r="10" strokeDasharray="2 2" />
          <path d="M25 35 Q50 20 75 35" strokeDasharray="1 3" />
        </svg>
      );
    }

    if (lowerLabel.includes("wedding") || lowerLabel.includes("phera")) {
      return (
        // Sacred Agni & Mandap Arch
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 85 L80 85 M28 85 L28 40 Q50 15 72 40 L72 85" strokeWidth="1.2" />
          <path d="M50 50 C45 60, 42 68, 48 76 C52 79, 58 78, 60 74 C63 68, 55 60, 50 50 Z" fill="#C9A96E" fillOpacity="0.25" />
          <circle cx="50" cy="30" r="3" fill="#C9A96E" />
        </svg>
      );
    }

    if (lowerLabel.includes("venue") || lowerLabel.includes("palace") || lowerLabel.includes("courtyard")) {
      return (
        // Rajasthani Jharokha Palace Arch
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 85 L20 45 C20 30, 35 20, 50 15 C65 20, 80 30, 80 45 L80 85" strokeWidth="1.2" />
          <path d="M28 85 L28 48 C28 35, 40 28, 50 24 C60 28, 72 35, 72 48 L72 85" strokeDasharray="3 2" />
          <line x1="15" y1="85" x2="85" y2="85" strokeWidth="1.5" />
          <circle cx="50" cy="15" r="2.5" fill="#C9A96E" />
        </svg>
      );
    }

    // Default: Royal Monogram Emblem with Floral Halo
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C9A96E]/80 mb-4" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="50" cy="50" r="44" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="38" strokeWidth="1" />
        <path d="M50 12 L50 20 M50 80 L50 88 M12 50 L20 50 M80 50 L88 50" strokeWidth="1" />
        <text x="50" y="56" textAnchor="middle" className="font-script text-xl fill-[#E6D9C6]" style={{ fontFamily: "var(--font-pinyon), cursive" }}>
          S & K
        </text>
      </svg>
    );
  };

  if (hasError || !src) {
    if (asBackground) {
      return (
        <div
          className={`relative overflow-hidden bg-gradient-to-b from-[#1C1714] via-[#14110F] to-[#14110F] ${
            fill ? "w-full h-full absolute inset-0" : ""
          } ${className}`}
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          {/* Soft ambient golden light at top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Subtle royal Jali lattice pattern */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Palace Arch Silhouette Watermark (Centered, 5% opacity, no text) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <svg viewBox="0 0 200 200" className="w-80 h-80 sm:w-96 sm:h-96 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth="0.8">
              <path d="M40 170 L40 90 C40 60, 70 40, 100 30 C130 40, 160 60, 160 90 L160 170 Z" />
              <path d="M55 170 L55 95 C55 70, 78 55, 100 48 C122 55, 145 70, 145 95 L145 170" strokeDasharray="3 3" />
              <circle cx="100" cy="30" r="4" fill="currentColor" />
            </svg>
          </div>

          {/* Hairline Border Frame */}
          <div className="absolute inset-4 sm:inset-8 border border-[#C9A96E]/15 pointer-events-none" />
        </div>
      );
    }

    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-b from-[#1C1714] via-[#14110F] to-[#221C18] border border-[#C9A96E]/30 flex flex-col items-center justify-center p-8 text-center select-none shadow-inner ${
          fill ? "w-full h-full absolute inset-0" : ""
        } ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {/* Subtle geometric Indian Jali lattice pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Double inner hairline gold frame */}
        <div className="absolute inset-3 border border-[#C9A96E]/20 pointer-events-none" />
        <div className="absolute inset-4 border border-[#C9A96E]/10 pointer-events-none" />

        {/* Delicate Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C9A96E]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C9A96E]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C9A96E]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C9A96E]/60 pointer-events-none" />

        {/* Dynamic Royal SVG Artwork */}
        {getArtwork()}

        {/* Tiny All-Caps Label */}
        <span className="font-editorial text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#C9A96E] mb-2 font-medium">
          {label || category}
        </span>

        {/* Headline Description */}
        <p className="font-display italic text-base sm:text-lg text-[#F7F1E8] max-w-xs leading-snug mb-3">
          {alt || "Celebration Moment"}
        </p>

        {/* Subtle Royal Blessing / Subtext */}
        <span className="font-editorial text-[9px] tracking-[0.25em] text-[#C9A96E]/50 uppercase">
          The Leela Palace · Udaipur
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "w-full h-full" : ""
      } ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width || 1200 : undefined}
        height={!fill ? height || 800 : undefined}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        unoptimized={true}
        quality={100}
        sizes="100vw"
        className={`w-full h-full object-cover object-top ${imageClassName}`}
        style={{ imageRendering: "auto" }}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
