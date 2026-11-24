"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Invitation" },
  { id: "love-story", label: "Our Story" },
  { id: "film", label: "Cinematic Film" },
  { id: "gallery", label: "Moments" },
  { id: "card", label: "The Card" },
  { id: "events", label: "Celebrations" },
  { id: "countdown", label: "Countdown" },
  { id: "final", label: "Forever" },
];

export function NavigationDots() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
    >
      <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-[#C9A96E]/30" />

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Label tooltip */}
            <motion.div
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 16 : 8,
                pointerEvents: isHovered ? "auto" : "none",
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-full pl-2 whitespace-nowrap"
            >
              <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] bg-[#14110F]/90 px-2 py-1 rounded border border-[#C9A96E]/20 backdrop-blur-sm shadow-sm">
                {sec.label}
              </span>
            </motion.div>

            <button
              type="button"
              onClick={() => scrollTo(sec.id)}
              aria-label={`Scroll to ${sec.label}`}
              className="relative p-1 focus:outline-none"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.5 : 1,
                  backgroundColor: isActive ? "#C9A96E" : "rgba(201, 169, 110, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="block w-1.5 h-1.5 rounded-full border border-[#C9A96E]/50"
              />
            </button>
          </div>
        );
      })}

      <div className="w-[1px] h-8 bg-gradient-to-t from-transparent to-[#C9A96E]/30" />
    </nav>
  );
}
