"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for fluid, luxurious feel
  const springX = useSpring(cursorX, { stiffness: 450, damping: 35, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 35, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element for custom cursor triggers
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(type.toUpperCase());
        setIsPointer(true);
      } else {
        const interactive = target.closest("button, a, input, select, textarea, [role='button']");
        setIsPointer(!!interactive);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isBadge = cursorText.length > 0;

  return (
    <motion.div
      className="fixed pointer-events-none z-[99999] top-0 left-0 hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{
          width: isBadge ? 72 : isPointer ? 32 : 10,
          height: isBadge ? 72 : isPointer ? 32 : 10,
          backgroundColor: isBadge
            ? "rgba(20, 17, 15, 0.85)"
            : isPointer
            ? "rgba(201, 169, 110, 0.2)"
            : "#C9A96E",
          borderColor: isBadge
            ? "rgba(201, 169, 110, 1)"
            : isPointer
            ? "rgba(201, 169, 110, 0.8)"
            : "rgba(201, 169, 110, 0)",
          borderWidth: isBadge || isPointer ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="rounded-full flex items-center justify-center backdrop-blur-[2px] transition-colors"
      >
        {isBadge && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-editorial text-[9px] tracking-[0.2em] text-[#C9A96E] font-medium"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
