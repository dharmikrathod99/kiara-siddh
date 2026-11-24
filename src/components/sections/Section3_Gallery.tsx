"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig, GalleryItem } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MobileReelCard({
  item,
  index,
  total,
  onOpenFullscreen,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onOpenFullscreen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        width: "290px",
        minWidth: "290px",
        maxWidth: "290px",
        height: "515px",
        minHeight: "515px",
        maxHeight: "515px",
        aspectRatio: "9/16",
        borderRadius: "36px",
        padding: "10px",
        background: "linear-gradient(180deg, #352820 0%, #1A1410 50%, #2B1F17 100%)",
        border: "2px solid rgba(223, 196, 142, 0.45)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.95)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflow: "hidden",
        userSelect: "none",
      }}
      className="mobile-reel-chassis snap-center transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Smartphone Inner Screen - PURE VIDEO ONLY */}
      <div
        onClick={togglePlay}
        onDoubleClick={onOpenFullscreen}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
          cursor: "pointer",
        }}
      >
        {/* Video Player */}
        {item.videoSrc ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            {/* Ambient Background Glow for videos */}
            <video
              src={item.videoSrc}
              loop
              muted
              playsInline
              autoPlay
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(20px)",
                opacity: 0.35,
                transform: "scale(1.2)",
                pointerEvents: "none",
              }}
            />

            {/* Main Video - Pure Edge-to-Edge */}
            <video
              ref={videoRef}
              src={item.videoSrc}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={item.src}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 10,
              }}
            />
          </div>
        ) : (
          <PlaceholderImage
            src={item.src}
            alt={item.alt}
            fill
            label={`FRAME 0${index + 1}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Center Play Indicator (Only flashes when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#120E0C]/90 border-2 border-[#DFC48E] text-[#DFC48E] flex items-center justify-center shadow-2xl pl-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Section3_Gallery() {
  const containerRef = useRef<HTMLElement | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Smooth carousel scroll helper
  const scrollTrack = (direction: "left" | "right") => {
    const track = horizontalTrackRef.current;
    if (!track) return;
    const amount = direction === "left" ? -340 : 340;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % weddingConfig.gallery.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length
            : 0
        );
      }
    },
    [selectedPhotoIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activePhoto: GalleryItem | null =
    selectedPhotoIndex !== null ? weddingConfig.gallery[selectedPhotoIndex] : null;

  const reelItems = weddingConfig.gallery.filter((item) => !!item.videoSrc);
  const photoItems = weddingConfig.gallery.filter((item) => !item.videoSrc);

  return (
    <section
      ref={containerRef}
      id="gallery"
      style={{
        backgroundColor: "#0D0A08",
        position: "relative",
        width: "100%",
        zIndex: 20,
      }}
      className="text-[#F7F1E8] overflow-hidden py-20 md:py-32"
    >
      {/* Gallery Header - Royal Frosted Card */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-12 md:mb-20 bg-[#120E0C]/90 border border-[#C9A96E]/40 rounded-2xl py-8 px-6 sm:px-10 backdrop-blur-md shadow-2xl">
        <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-3 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Visual Symphony
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Timeless Moments
        </h2>
        <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-5" />
        <p className="font-sans-body text-sm md:text-base text-[#F3EDE2] font-normal max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
          Unscripted glances, shared sunsets, and quiet promises preserved in editorial light.
        </p>
      </div>

      {/* PART A: RESPONSIVE HORIZONTAL REELS STRIP */}
      <div className="horizontal-gallery-wrapper relative w-full mb-16 sm:mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-xs sm:text-sm tracking-[0.25em] text-[#DFC48E] uppercase font-medium bg-[#120E0C]/90 px-3.5 py-1.5 rounded-lg border border-[#C9A96E]/30 shadow-md">
              Collection I · Wedding Reels Series
            </span>
            <span className="font-editorial text-[10px] tracking-[0.15em] text-[#DFC48E]/70 uppercase hidden sm:inline-block">
              ({reelItems.length} Celebration Moments)
            </span>
          </div>

          {/* Left & Right Smooth Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTrack("left")}
              aria-label="Scroll left"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9A96E]/40 hover:border-[#DFC48E] bg-[#120E0C]/90 hover:bg-[#1E1713] text-[#DFC48E] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollTrack("right")}
              aria-label="Scroll right"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9A96E]/40 hover:border-[#DFC48E] bg-[#120E0C]/90 hover:bg-[#1E1713] text-[#DFC48E] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Reels Track - Smooth Momentum Scroll */}
        <div
          ref={horizontalTrackRef}
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            padding: "16px 24px 36px 24px",
            minHeight: "560px",
            alignItems: "center",
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          className="no-scrollbar"
        >
          {reelItems.map((item, idx) => (
            <MobileReelCard
              key={idx}
              item={item}
              index={idx}
              total={reelItems.length}
              onOpenFullscreen={() => {
                const originalIndex = weddingConfig.gallery.indexOf(item);
                setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : idx);
              }}
            />
          ))}
        </div>
      </div>

      {/* PART B: EDITORIAL MASONRY / ASYMMETRIC GRID */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex items-center justify-between">
          <span className="font-editorial text-xs tracking-[0.25em] text-[#C9A96E]/60 uppercase">
            Collection II · Curated Memories
          </span>
          <span className="font-editorial text-[11px] tracking-[0.2em] text-[#E6D9C6]/50 uppercase">
            Click to expand
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {photoItems.map((item, idx) => {
            const actualIndex = weddingConfig.gallery.indexOf(item);
            const isTall = idx % 2 === 0;

            return (
              <div
                key={actualIndex}
                onClick={() => setSelectedPhotoIndex(actualIndex)}
                data-cursor="view"
                className={`group relative overflow-hidden bg-[#1E1916] border border-[#C9A96E]/20 cursor-pointer ${
                  isTall ? "aspect-[3/4]" : "aspect-[4/3] sm:aspect-square"
                }`}
              >
                <PlaceholderImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  label={`ARCHIVE · 0${actualIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                  <span className="font-editorial text-[10px] tracking-[0.25em] text-[#C9A96E] uppercase mb-1">
                    0{actualIndex + 1}
                  </span>
                  <p className="font-display italic text-base text-[#F7F1E8]">
                    {item.caption || item.alt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL (Framer Motion) */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#14110F]/95 backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-10 select-none"
          >
            {/* Top Bar with Counter and Close */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="font-editorial text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C9A96E]">
                0{selectedPhotoIndex + 1} / 0{weddingConfig.gallery.length}
              </span>

              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full border border-[#C9A96E]/40 hover:border-[#C9A96E] flex items-center justify-center text-[#C9A96E] transition-colors focus:outline-none"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Main Center Video / Image */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl max-h-[72vh] w-full h-[70vh] my-auto flex items-center justify-center overflow-hidden border-2 border-[#C9A96E]/40 rounded-2xl bg-black shadow-2xl"
            >
              {activePhoto.videoSrc ? (
                <video
                  src={activePhoto.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[70vh] object-contain rounded-xl"
                />
              ) : (
                <PlaceholderImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  priority
                  label={`0${selectedPhotoIndex + 1} · FULLSCREEN`}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>

            {/* Bottom Caption and Prev/Next Navigation */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 z-10 max-w-4xl">
              <p className="font-display italic text-base sm:text-lg text-[#E6D9C6] text-center sm:text-left">
                {activePhoto.caption || activePhoto.alt}
              </p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length
                        : 0
                    )
                  }
                  aria-label="Previous photograph"
                  className="px-4 py-2 border border-[#C9A96E]/40 hover:border-[#C9A96E] font-editorial text-xs tracking-[0.2em] uppercase text-[#C9A96E] transition-colors"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null ? (prev + 1) % weddingConfig.gallery.length : 0
                    )
                  }
                  aria-label="Next photograph"
                  className="px-4 py-2 border border-[#C9A96E]/40 hover:border-[#C9A96E] font-editorial text-xs tracking-[0.2em] uppercase text-[#C9A96E] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
