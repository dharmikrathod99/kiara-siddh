"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { RoyalPalaceGate } from "@/components/ui/RoyalPalaceGate";

interface HeroSectionProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export function Section0_Hero({ onUnlock, isUnlocked }: HeroSectionProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // Progressive Preloader: accelerates dynamically as fonts and assets load
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setPreloaderDone(true), 200);
      }
      setProgress(currentProgress);
    }, 28);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (currentProgress < 85) {
          currentProgress = 85;
          setProgress(85);
        }
      });
    }

    return () => clearInterval(interval);
  }, []);

  // Intentional scroll/wheel gesture trigger
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!isUnlocked && e.deltaY > 30) {
        onUnlock();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isUnlocked) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 50) {
          onUnlock();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isUnlocked, onUnlock]);

  const handleOpenInvitation = () => {
    onUnlock();
    // Smoothly scroll down to our love story
    const el = document.getElementById("love-story");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 0A. PRELOADER OVERLAY */}
      <AnimatePresence>
        {!preloaderDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] bg-[#14110F] flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Elegant Monogram SVG Stroke Draw Animation */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full text-[#C9A96E]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Thin outer circular hairline */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="74"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="465"
                  initial={{ strokeDashoffset: 465 }}
                  animate={{ strokeDashoffset: 465 - (465 * progress) / 100 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                />

                {/* Delicate inner decorative circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="67"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                  strokeDasharray="421"
                  initial={{ strokeDashoffset: 421 }}
                  animate={{ strokeDashoffset: 421 - (421 * progress) / 100 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                />

                {/* Classical Monogram Typography */}
                <text
                  x="80"
                  y="92"
                  textAnchor="middle"
                  className="font-script text-4xl fill-[#E6D9C6]"
                  style={{ fontFamily: "var(--font-pinyon), cursive" }}
                >
                  S & K
                </text>
              </svg>
            </div>

            {/* Subtle Progress Track & Counter */}
            <div className="w-48 flex flex-col items-center gap-3">
              <div className="w-full h-[1px] bg-[#C9A96E]/20 overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#C9A96E]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between w-full text-[10px] font-editorial tracking-[0.25em] text-[#C9A96E]/70 uppercase">
                <span>The Celebration</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 0B. FULL SCREEN HERO & OPENING GATE */}
      <section
        id="hero"
        className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-transparent flex items-center justify-center select-none"
      >
        {/* Soft atmospheric gradient to ensure complete text readability over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#14110F]/75 via-[#14110F]/45 to-[#14110F]/85 pointer-events-none" />

        {/* Editorial Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Sacred Sanskrit Invocation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-3"
          >
            <span className="font-editorial text-[11px] sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#DFC48E] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              || श्री गणेशाय नमः ||
            </span>
          </motion.div>

          {/* Subtle line above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <span className="w-6 sm:w-12 h-[1px] bg-[#C9A96E]/70" />
            <p className="font-editorial text-[9px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Together with our families
            </p>
            <span className="w-6 sm:w-12 h-[1px] bg-[#C9A96E]/70" />
          </motion.div>

          {/* Couple's Names - Masked Editorial Typography */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={preloaderDone ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.98] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
            >
              <span>{weddingConfig.couple.groom.firstName}</span>{" "}
              <span
                className="font-script text-[#DFC48E] text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl px-1 sm:px-2 font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                style={{ fontFamily: "var(--font-pinyon), cursive" }}
              >
                &
              </span>{" "}
              <span>{weddingConfig.couple.bride.firstName}</span>
            </motion.h1>
          </div>

          {/* Subtitle / Date & Destination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-6 text-white font-medium text-[11px] sm:text-sm font-editorial tracking-[0.25em] uppercase mb-8 sm:mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            <span>{weddingConfig.venue.city}, {weddingConfig.venue.country}</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            <span>December 12, 2026</span>
          </motion.div>

          {/* Gate Trigger / Open Invitation CTA */}
          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <MagneticButton onClick={handleOpenInvitation} variant="primary">
                  <span className="tracking-[0.25em] text-xs sm:text-sm">Open Invitation</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform group-hover:translate-y-1 animate-pulse"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlocked Scroll Indicator */}
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.6 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
              className="flex flex-col items-center gap-2 text-[#C9A96E]/70"
            >
              <span className="font-editorial text-[10px] tracking-[0.3em] uppercase">
                Scroll to explore
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#C9A96E] to-transparent" />
            </motion.div>
          )}
        </div>

        {/* 0C. ROYAL PALACE GATE 3D OPENING DOORS */}
        <RoyalPalaceGate isUnlocked={isUnlocked} onUnlock={onUnlock} />
      </section>
    </>
  );
}
