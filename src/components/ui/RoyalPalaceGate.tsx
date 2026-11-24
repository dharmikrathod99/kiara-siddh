"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface RoyalPalaceGateProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export function RoyalPalaceGate({ isUnlocked, onUnlock }: RoyalPalaceGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Trigger opening sequence
  const handleOpen = () => {
    if (isOpening || isUnlocked) return;
    setIsOpening(true);

    // Golden & Rose ceremonial confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#C9A96E", "#DFC48E", "#F7F1E8", "#E6A15C", "#D4AF37", "#F0C080"],
        zIndex: 10001,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: 0.6 },
          colors: ["#C9A96E", "#DFC48E", "#D4AF37"],
          zIndex: 10001,
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: 0.6 },
          colors: ["#C9A96E", "#DFC48E", "#D4AF37"],
          zIndex: 10001,
        });
      }, 250);
    } catch {
      // Graceful fallback if canvas is not ready
    }

    // Call parent unlock callback to start music and unveil hero
    onUnlock();

    // After the 3D doors swing fully open, dismiss gate overlay
    setTimeout(() => {
      setIsDismissed(true);
    }, 1900);
  };

  // If already unlocked elsewhere (e.g. external trigger), dismiss
  useEffect(() => {
    if (isUnlocked && !isOpening) {
      setIsOpening(true);
      setTimeout(() => setIsDismissed(true), 1900);
    }
  }, [isUnlocked, isOpening]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden select-none ${
        isOpening ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{ perspective: "1500px" }}
    >
      {/* Ambient Ceremony Glow & Floating Vignette */}
      <div className="absolute inset-0 bg-[#0A0706]/60 pointer-events-none z-10" />

      {/* Radiant Golden Light Flare bursting through center seam when opening */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isOpening ? { opacity: [0, 1, 0.8, 0], scaleX: [0, 4, 12, 20] } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#FFF7E6] to-transparent z-40 blur-md pointer-events-none"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          LEFT PALACE GATE DOOR (3D Swing Left)
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? {
                rotateY: -105,
                x: "-15%",
                opacity: 0,
              }
            : {
                rotateY: 0,
                x: "0%",
                opacity: 1,
              }
        }
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#140E0B] via-[#1E1612] to-[#2B1F18] border-r-2 border-[#C9A96E]/50 z-20 shadow-[20px_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden cursor-pointer"
        onClick={handleOpen}
      >
        {/* Wood Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 8px), repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 20px)`,
          }}
        />

        {/* Double Gold Filigree Outer Door Border */}
        <div className="absolute inset-3 sm:inset-6 border-2 border-[#C9A96E]/40 pointer-events-none" />
        <div className="absolute inset-5 sm:inset-8 border border-[#C9A96E]/20 pointer-events-none" />

        {/* Top Ornate Rajasthani Mehrab Arch (Left Half) */}
        <div className="relative w-full pt-4 sm:pt-6">
          <svg viewBox="0 0 200 120" className="w-full max-w-[280px] text-[#C9A96E] ml-auto" fill="none" stroke="currentColor">
            {/* Cusped multi-foil arch */}
            <path
              d="M10 120 L10 70 C30 65, 50 50, 70 30 C110 5, 170 0, 200 0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 120 L20 75 C38 70, 56 56, 74 38 C112 15, 170 8, 200 8"
              strokeWidth="0.8"
              strokeDasharray="4 2"
              strokeOpacity="0.7"
            />
            {/* Hanging temple bell / kalash motif */}
            <circle cx="90" cy="55" r="3" fill="#C9A96E" />
            <line x1="90" y1="35" x2="90" y2="52" strokeWidth="1" />
          </svg>
        </div>

        {/* Center Jali Pattern & Brass Studs (Khunti) */}
        <div className="relative my-auto w-full flex flex-col items-end pr-2 sm:pr-8">
          {/* Traditional Brass Studs Grid */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 my-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#DFC48E] via-[#C9A96E] to-[#7A5B2B] shadow-[0_2px_8px_rgba(0,0,0,0.9)] border border-[#FFE8B8]/60 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFE8B8] shadow-inner opacity-75" />
              </div>
            ))}
          </div>

          {/* Left Brass Door Ring Knocker */}
          <div className="relative mt-4 mr-4 sm:mr-10 flex flex-col items-center">
            {/* Lion Mount / Lotus Mount */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#DFC48E] to-[#8C6D37] border-2 border-[#FFE8B8]/50 shadow-xl flex items-center justify-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-[#1E1612] bg-[#3B291D]" />
            </div>
            {/* Hanging Brass Ring */}
            <div className="w-12 h-14 sm:w-16 sm:h-20 -mt-2 rounded-b-full border-4 border-[#C9A96E] shadow-2xl bg-transparent" />
          </div>
        </div>

        {/* Bottom Haveli Carved Base Panel */}
        <div className="relative w-full pb-4 border-t border-[#C9A96E]/30 pt-3 flex justify-end">
          <span className="font-editorial text-[9px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A96E]/70 mr-4">
            || राज महल द्वार ||
          </span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          RIGHT PALACE GATE DOOR (3D Swing Right)
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? {
                rotateY: 105,
                x: "15%",
                opacity: 0,
              }
            : {
                rotateY: 0,
                x: "0%",
                opacity: 1,
              }
        }
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#140E0B] via-[#1E1612] to-[#2B1F18] border-l-2 border-[#C9A96E]/50 z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden cursor-pointer"
        onClick={handleOpen}
      >
        {/* Wood Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 8px), repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 20px)`,
          }}
        />

        {/* Double Gold Filigree Outer Door Border */}
        <div className="absolute inset-3 sm:inset-6 border-2 border-[#C9A96E]/40 pointer-events-none" />
        <div className="absolute inset-5 sm:inset-8 border border-[#C9A96E]/20 pointer-events-none" />

        {/* Top Ornate Rajasthani Mehrab Arch (Right Half - Symmetrical) */}
        <div className="relative w-full pt-4 sm:pt-6">
          <svg viewBox="0 0 200 120" className="w-full max-w-[280px] text-[#C9A96E] mr-auto scale-x-[-1]" fill="none" stroke="currentColor">
            <path
              d="M10 120 L10 70 C30 65, 50 50, 70 30 C110 5, 170 0, 200 0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 120 L20 75 C38 70, 56 56, 74 38 C112 15, 170 8, 200 8"
              strokeWidth="0.8"
              strokeDasharray="4 2"
              strokeOpacity="0.7"
            />
            <circle cx="90" cy="55" r="3" fill="#C9A96E" />
            <line x1="90" y1="35" x2="90" y2="52" strokeWidth="1" />
          </svg>
        </div>

        {/* Center Jali Pattern & Brass Studs (Khunti) */}
        <div className="relative my-auto w-full flex flex-col items-start pl-2 sm:pl-8">
          {/* Traditional Brass Studs Grid */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 my-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#DFC48E] via-[#C9A96E] to-[#7A5B2B] shadow-[0_2px_8px_rgba(0,0,0,0.9)] border border-[#FFE8B8]/60 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFE8B8] shadow-inner opacity-75" />
              </div>
            ))}
          </div>

          {/* Right Brass Door Ring Knocker */}
          <div className="relative mt-4 ml-4 sm:ml-10 flex flex-col items-center">
            {/* Lion Mount / Lotus Mount */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#DFC48E] to-[#8C6D37] border-2 border-[#FFE8B8]/50 shadow-xl flex items-center justify-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-[#1E1612] bg-[#3B291D]" />
            </div>
            {/* Hanging Brass Ring */}
            <div className="w-12 h-14 sm:w-16 sm:h-20 -mt-2 rounded-b-full border-4 border-[#C9A96E] shadow-2xl bg-transparent" />
          </div>
        </div>

        {/* Bottom Haveli Carved Base Panel */}
        <div className="relative w-full pb-4 border-t border-[#C9A96E]/30 pt-3 flex justify-start">
          <span className="font-editorial text-[9px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A96E]/70 ml-4">
            || शुभ विवाह उत्सव ||
          </span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CENTER GRAND GOLDEN ROYAL SEAL & MONOGRAM
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          isOpening
            ? { scale: 1.25, opacity: 0, y: -20 }
            : { scale: 1, opacity: 1, y: 0 }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-auto"
      >
        {/* Pulsating Golden Aura */}
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-[#C9A96E]/20 via-[#FFE8B8]/30 to-[#C9A96E]/20 blur-2xl animate-pulse pointer-events-none" />

        {/* Grand Circular Monogram Emblem */}
        <div
          onClick={handleOpen}
          className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-[#2D211A] via-[#150F0C] to-[#2D211A] border-4 border-[#DFC48E] shadow-[0_0_60px_rgba(201,169,110,0.6)] p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-500 hover:scale-105"
        >
          {/* Outer Sunburst & Pearl Halo Ring */}
          <div className="absolute inset-1.5 sm:inset-2 border-2 border-dashed border-[#C9A96E]/60 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-[#C9A96E]/30 rounded-full pointer-events-none" />

          {/* Sacred Vedic Sanskrit Blessing */}
          <span className="font-editorial text-[9px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.35em] text-[#DFC48E] uppercase mb-1 font-medium drop-shadow-md">
            || श्री गणेशाय नमः ||
          </span>

          {/* Royal S & K Monogram */}
          <span
            className="font-script text-4xl sm:text-6xl md:text-7xl text-[#FFE8B8] leading-none my-0.5 sm:my-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "var(--font-pinyon), cursive" }}
          >
            S & K
          </span>

          {/* Couple Subtitle */}
          <span className="font-editorial text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#DFC48E] uppercase mt-1 font-medium">
            Sidharth & Kiara
          </span>

          {/* Royal Union Subtext */}
          <span className="font-editorial text-[7px] sm:text-[9px] tracking-[0.2em] text-[#DFC48E]/70 uppercase mt-0.5">
            The Royal Palace · Udaipur
          </span>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            LUXURY INTERACTIVE "OPEN GATE" BUTTON
           ═════════════════════════════════════════════════════════════════════ */}
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 sm:mt-8 relative group overflow-hidden px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#DFC48E] via-[#FFE8B8] to-[#C9A96E] text-[#140E0B] font-editorial text-xs sm:text-sm tracking-[0.3em] uppercase font-bold shadow-[0_10px_35px_rgba(201,169,110,0.5)] border border-[#FFE8B8] flex items-center gap-3 cursor-pointer"
        >
          {/* Shimmer sweep animation */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          {/* Golden Gate Key Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#140E0B] transition-transform group-hover:rotate-45 duration-300"
          >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
          </svg>

          <span>OPEN PALACE GATE</span>

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-[#140E0B] transition-transform group-hover:translate-x-1 duration-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Gentle Pulse Prompt */}
        <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-[#DFC48E]/80 mt-3 animate-pulse">
          Tap anywhere or press to enter
        </span>
      </motion.div>
    </div>
  );
}
