"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export function Section6_Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingConfig.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full py-16 sm:py-28 md:py-36 text-[#F7F1E8] overflow-hidden flex items-center justify-center"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header - Royal Frosted Dark Card */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-14 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-6 px-8 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-2 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Until Forever Begins
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            The Countdown
          </h2>
        </div>

        {!mounted ? (
          // Initial hydration placeholder matching dimensions
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto opacity-0">
            <div className="h-32" />
          </div>
        ) : timeLeft.isPassed ? (
          <div className="py-12 px-8 border border-[#C9A96E]/40 bg-[#120E0C]/90 backdrop-blur-md max-w-lg mx-auto rounded-2xl shadow-2xl">
            <span className="font-editorial text-sm tracking-[0.3em] uppercase text-[#DFC48E] block mb-2 font-medium">
              Today Is The Day
            </span>
            <p className="font-display text-3xl sm:text-4xl text-white">
              We are celebrating our forever today!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="relative flex flex-col items-center justify-center p-4 sm:p-6 border border-[#C9A96E]/35 bg-[#120E0C]/85 backdrop-blur-md rounded-xl shadow-2xl"
              >
                {/* Hairline corner markers */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#C9A96E]/40" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#C9A96E]/40" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#C9A96E]/40" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#C9A96E]/40" />

                {/* Animated rolling / flipping number */}
                <div className="h-16 sm:h-20 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={unit.value}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-[#F7F1E8] leading-none"
                    >
                      {String(unit.value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <span className="font-editorial text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C9A96E] mt-3">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex items-center justify-center gap-4 text-xs font-editorial tracking-[0.2em] text-[#E6D9C6]/60 uppercase">
          <span>December 12, 2026</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
          <span>Lake Pichola, Udaipur</span>
        </div>
      </div>
    </section>
  );
}
