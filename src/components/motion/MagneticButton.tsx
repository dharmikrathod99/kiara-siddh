"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  href,
  target,
  rel,
  download,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Subtle magnetic strength
    x.set(distanceX * 0.28);
    y.set(distanceY * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center overflow-hidden transition-all duration-500 rounded-full group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E]";

  const variantStyles = {
    primary:
      "border border-[#C9A96E] text-[#C9A96E] hover:text-[#14110F] px-8 py-4 font-editorial tracking-[0.25em] text-xs uppercase",
    secondary:
      "border border-[#C9A96E]/40 text-[#E6D9C6] hover:text-[#14110F] hover:border-[#C9A96E] px-6 py-3 font-editorial tracking-[0.2em] text-[11px] uppercase",
    subtle:
      "border border-transparent text-[#C9A96E] hover:text-[#A8854A] px-4 py-2 font-editorial tracking-[0.2em] text-[10px] uppercase",
  };

  const content = (
    <>
      {/* Background fill sliding up */}
      {variant !== "subtle" && (
        <span
          className="absolute inset-0 bg-[#C9A96E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300">
        {children}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          aria-label={ariaLabel}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
