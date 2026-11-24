"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Section9_FinalEmotional() {
  return (
    <footer
      id="final"
      className="relative w-full min-h-[100svh] text-[#F7F1E8] overflow-hidden flex flex-col justify-between py-12 sm:py-20 px-4 sm:px-6 select-none"
    >
      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/60 to-[#14110F]/80 pointer-events-none" />
      <div className="cinematic-vignette absolute inset-0 pointer-events-none" />

      {/* Top Monogram Seal */}
      <div className="relative z-10 text-center pt-4">
        <div className="inline-block w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#C9A96E]/40 p-1.5 sm:p-2">
          <div className="w-full h-full rounded-full border border-[#C9A96E]/20 flex items-center justify-center font-script text-lg sm:text-xl text-[#C9A96E]">
            {weddingConfig.couple.initials}
          </div>
        </div>
      </div>

      {/* Center Emotional Statement - Royal Frosted Dark Card */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto px-6 sm:px-12 py-10 sm:py-14 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl backdrop-blur-md shadow-2xl">
        <span className="font-editorial text-[10px] sm:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-4 sm:mb-6 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          The Journey Continues
        </span>

        <h2 className="font-display italic text-2xl sm:text-4xl md:text-5xl text-white font-light leading-snug mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          &ldquo;Our forever begins here. We cannot wait to celebrate this beautiful moment with you.&rdquo;
        </h2>

        <div className="w-16 sm:w-20 h-[1px] bg-[#C9A96E] mx-auto mb-6 sm:mb-8" />

        {/* Couple Names Reveal */}
        <p className="font-display text-3xl sm:text-5xl text-white font-light mb-3 sm:mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
          {weddingConfig.couple.groom.firstName}{" "}
          <span className="font-script text-[#DFC48E] text-2xl sm:text-4xl px-2">
            &
          </span>{" "}
          {weddingConfig.couple.bride.firstName}
        </p>

        {/* Wedding Hashtag */}
        <span className="font-editorial text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#DFC48E] font-medium bg-[#14110F]/80 px-3 py-1 rounded-full border border-[#C9A96E]/30 inline-block shadow-md">
          {weddingConfig.couple.hashtag}
        </span>
      </div>

      {/* Bottom Families Credit & Copyright */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-12 border-t border-[#C9A96E]/20 text-center space-y-2">
        <p className="font-editorial text-xs tracking-[0.3em] uppercase text-[#C9A96E]/80 mb-2">
          || सदा सर्वदा शुभम् भवतु ||
        </p>
        <p className="font-display italic text-base text-[#E6D9C6]/90">
          With all our love, {weddingConfig.families.groomFamily} & {weddingConfig.families.brideFamily}
        </p>
        <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-[#E6D9C6]/40">
          December 12, 2026 · The Leela Palace, Udaipur
        </p>
      </div>
    </footer>
  );
}
