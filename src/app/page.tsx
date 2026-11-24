"use client";

import { useState } from "react";
import { useLenisGSAP } from "@/hooks/useLenisGSAP";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { NavigationDots } from "@/components/ui/NavigationDots";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

import dynamic from "next/dynamic";

import { Section0_Hero } from "@/components/sections/Section0_Hero";
import { Section1_LoveStory } from "@/components/sections/Section1_LoveStory";
import { Section4_InvitationCard } from "@/components/sections/Section4_InvitationCard";
import { Section6_Countdown } from "@/components/sections/Section6_Countdown";
import { Section9_FinalEmotional } from "@/components/sections/Section9_FinalEmotional";

// Progressively lazy-load heavy media sections on scroll (Code-Splitting for Blazing Mobile Speeds)
const Section2_CinematicFilm = dynamic(
  () => import("@/components/sections/Section2_CinematicFilm").then((mod) => mod.Section2_CinematicFilm),
  { ssr: true }
);
const Section3_Gallery = dynamic(
  () => import("@/components/sections/Section3_Gallery").then((mod) => mod.Section3_Gallery),
  { ssr: true }
);
const Section5_WeddingEvents = dynamic(
  () => import("@/components/sections/Section5_WeddingEvents").then((mod) => mod.Section5_WeddingEvents),
  { ssr: true }
);

export default function WeddingPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initialize Lenis smooth scroll and sync with GSAP ticker & ScrollTrigger
  useLenisGSAP();

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <main className="relative w-full bg-[#14110F] selection:bg-[#C9A96E] selection:text-[#14110F]">
      {/* Luxury Custom Cursor (Desktop only, springs to View / Play on interaction) */}
      <CustomCursor />

      {/* Floating Audio Sound-bars Toggle (Triggered on Gate Unlock) */}
      <MusicToggle autoPlayTrigger={isUnlocked} />

      {/* Floating Section Navigation Dots */}
      <NavigationDots />

      {/* 0. Preloader + Opening Gate */}
      <Section0_Hero onUnlock={handleUnlock} isUnlocked={isUnlocked} />

      {/* Background Video (plays across website except Hero section) */}
      <BackgroundVideo />

      {/* 1. Pinned Scroll Love Story */}
      <Section1_LoveStory />

      {/* 2. Full-Screen Cinematic Film with Scrubbed Zoom & Letterbox */}
      <Section2_CinematicFilm />

      {/* 3. Horizontal Scroll Strip + Masonry Gallery + Lightbox */}
      <Section3_Gallery />

      {/* 4. The Digital Invitation Card with 3D Tilt, Petals & .ICS Export */}
      <Section4_InvitationCard />

      {/* 5. Editorial Stacking Panels for Ceremonies */}
      <Section5_WeddingEvents />

      {/* 6. Live Asia/Kolkata Countdown with Rolling Digits */}
      <Section6_Countdown />

      {/* 8. Final Emotional Portrait & Monogram */}
      <Section9_FinalEmotional />
    </main>
  );
}
