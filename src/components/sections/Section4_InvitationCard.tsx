"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Section4_InvitationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    damping: 25,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // IntersectionObserver to pause floating petals when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ICS Calendar generation
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sidharth & Kiara//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:wedding-sidharth-kiara-20261212@sidharthandkiara.com",
      "DTSTAMP:20261116T000000Z",
      "DTSTART:20261212T120000Z", // 17:30 IST is 12:00 UTC
      "DTEND:20261212T183000Z",
      `SUMMARY:${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}'s Wedding Celebrations`,
      `DESCRIPTION:${weddingConfig.families.invitationMessage}\\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.venue.address}`,
      `LOCATION:${weddingConfig.venue.name}, ${weddingConfig.venue.address}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Sidharth_and_Kiara_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={containerRef}
      id="card"
      className="relative w-full py-16 sm:py-28 md:py-40 text-[#3B2F2A] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6"
    >
      {/* Floating Petals (Limited to 12 elements for performance) */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${(i * 9 + 4) % 100}vw`,
                y: -40,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                y: "110vh",
                x: `${((i * 9 + 4) % 100) + ((i % 2 === 0 ? 1 : -1) * 8)}vw`,
                rotate: 360,
                opacity: [0, 0.45, 0.45, 0],
              }}
              transition={{
                duration: 14 + (i % 6) * 3,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
              className="absolute w-3 h-5 rounded-full bg-gradient-to-tr from-[#E8C9C1]/40 via-[#C9A96E]/30 to-transparent blur-[0.5px]"
            />
          ))}
        </div>
      )}

      {/* Section Title - Royal Frosted Dark Card */}
      <div className="text-center mb-16 z-10 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-6 px-8 sm:px-12 backdrop-blur-md shadow-2xl max-w-xl mx-auto">
        <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-2 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          The Formal Request
        </span>
        <h2 className="font-display text-3xl sm:text-5xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          The Wedding Invitation
        </h2>
      </div>

      {/* 3D TILT INVITATION CARD */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-2xl bg-[#F7F1E8] p-6 sm:p-14 md:p-16 shadow-2xl z-10 border border-[#C9A96E]/40"
      >
        {/* Double Hairline Gold Border */}
        <div className="absolute inset-2 sm:inset-5 border border-[#C9A96E]/60 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-6 border border-[#C9A96E]/25 pointer-events-none" />

        {/* Delicate Floral Corner SVGs */}
        <svg
          viewBox="0 0 80 80"
          className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 sm:w-16 h-8 sm:h-16 text-[#C9A96E]/70 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M10 70 C10 30, 30 10, 70 10 M10 70 C20 40, 40 20, 70 10 M10 40 C20 25, 25 20, 40 10 M40 70 C45 55, 55 45, 70 40" />
        </svg>

        <svg
          viewBox="0 0 80 80"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 sm:w-16 h-8 sm:h-16 text-[#C9A96E]/70 pointer-events-none scale-x-[-1]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M10 70 C10 30, 30 10, 70 10 M10 70 C20 40, 40 20, 70 10 M10 40 C20 25, 25 20, 40 10 M40 70 C45 55, 55 45, 70 40" />
        </svg>

        <svg
          viewBox="0 0 80 80"
          className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-8 sm:w-16 h-8 sm:h-16 text-[#C9A96E]/70 pointer-events-none scale-y-[-1]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M10 70 C10 30, 30 10, 70 10 M10 70 C20 40, 40 20, 70 10 M10 40 C20 25, 25 20, 40 10 M40 70 C45 55, 55 45, 70 40" />
        </svg>

        <svg
          viewBox="0 0 80 80"
          className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-8 sm:w-16 h-8 sm:h-16 text-[#C9A96E]/70 pointer-events-none scale-[-1]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M10 70 C10 30, 30 10, 70 10 M10 70 C20 40, 40 20, 70 10 M10 40 C20 25, 25 20, 40 10 M40 70 C45 55, 55 45, 70 40" />
        </svg>

        {/* Card Content Body */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Royal Wax Seal Medallion */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B1E1E] to-[#5C1010] shadow-md border-2 border-[#C9A96E] flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full border border-[#C9A96E]/50 flex items-center justify-center font-script text-2xl text-[#E6D9C6]">
                {weddingConfig.couple.initials}
              </div>
            </div>
            {/* Wax seal ribbon tails */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
              <span className="w-2 h-4 bg-[#8B1E1E] rotate-[-12deg] rounded-b-sm shadow-sm" />
              <span className="w-2 h-4 bg-[#8B1E1E] rotate-[12deg] rounded-b-sm shadow-sm" />
            </div>
          </div>

          {/* Sanskrit Blessing Header */}
          <span className="font-editorial text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#A8854A] mb-4 font-medium">
            || मंगलम् भगवान विष्णुः मङ्गलाय तनो हरिः ||
          </span>

          {/* Parents / Families Header */}
          <p className="font-editorial text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#3B2F2A]/70 mb-2">
            {weddingConfig.couple.groom.parents}
          </p>
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] mb-2">
            &
          </p>
          <p className="font-editorial text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#3B2F2A]/70 mb-6">
            {weddingConfig.couple.bride.parents}
          </p>

          <p className="font-display italic text-sm sm:text-base text-[#3B2F2A]/85 max-w-md mx-auto leading-relaxed mb-8">
            {weddingConfig.couple.invitationSubtitle}
          </p>

          {/* Couple Names */}
          <div className="my-2">
            <h3 className="font-display text-4xl sm:text-6xl text-[#14110F] font-light leading-none">
              {weddingConfig.couple.groom.fullName}
            </h3>
            <span className="font-script text-3xl sm:text-5xl text-[#C9A96E] block my-2">
              and
            </span>
            <h3 className="font-display text-4xl sm:text-6xl text-[#14110F] font-light leading-none">
              {weddingConfig.couple.bride.fullName}
            </h3>
          </div>

          <div className="w-24 h-[1px] bg-[#C9A96E]/50 my-8" />

          {/* Date, Time, Venue */}
          <p className="font-editorial text-xs sm:text-sm tracking-[0.25em] uppercase text-[#14110F] font-medium mb-2">
            {weddingConfig.displayDate}
          </p>
          <p className="font-editorial text-xs tracking-[0.25em] uppercase text-[#A8854A] mb-4">
            At {weddingConfig.mainTime}
          </p>

          <p className="font-display italic text-base text-[#3B2F2A] font-light">
            {weddingConfig.venue.name}
          </p>
          <p className="font-sans-body text-xs text-[#3B2F2A]/70 font-light max-w-sm mt-1">
            {weddingConfig.venue.address}
          </p>
        </div>
      </motion.div>

      {/* Save The Date .ICS Button */}
      <div className="mt-12 z-10">
        <MagneticButton onClick={downloadIcs} variant="primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="tracking-[0.25em]">Save to Calendar (.ics)</span>
        </MagneticButton>
      </div>
    </section>
  );
}
