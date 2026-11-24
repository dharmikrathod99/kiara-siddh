"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface MusicToggleProps {
  autoPlayTrigger?: boolean;
}

export function MusicToggle({ autoPlayTrigger }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio pointing directly to the video's soundtrack (lazy load: zero initial download)
  useEffect(() => {
    const audio = new Audio(weddingConfig.music.src || "/videos/background-video.mp4");
    audio.loop = true;
    audio.preload = "none"; // Defer audio stream download until user interaction
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    audio.preload = "auto";
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        let vol = audio.volume;
        fadeIntervalRef.current = setInterval(() => {
          vol += 0.05;
          if (vol >= 0.5) {
            audio.volume = 0.5;
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          } else {
            audio.volume = Math.min(0.5, vol);
          }
        }, 80);
      })
      .catch((err) => {
        // Autoplay may be restricted until first direct user click
        console.warn("Audio autoplay pending user gesture:", err);
      });
  }, []);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    let vol = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      vol -= 0.08;
      if (vol <= 0.05) {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = Math.max(0, vol);
      }
    }, 60);
  }, []);

  // When user clicks "Open Invitation", start the video song
  useEffect(() => {
    if (autoPlayTrigger && !hasStartedOnce) {
      setHasStartedOnce(true);
      startPlayback();
    }
  }, [autoPlayTrigger, hasStartedOnce, startPlayback]);

  const toggleMusic = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3">
      {/* Track title indicator on active playback */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:flex flex-col items-end text-right pr-1 pointer-events-none select-none"
          >
            <span className="font-editorial text-[9px] tracking-[0.25em] text-[#C9A96E]/80 uppercase">
              Melody
            </span>
            <span className="font-display italic text-xs text-[#E6D9C6]/90 max-w-[200px] truncate">
              {weddingConfig.music.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute website music" : "Play website music"}
        className="w-11 h-11 rounded-full border border-[#C9A96E]/40 hover:border-[#C9A96E] bg-[#14110F]/85 hover:bg-[#14110F] backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E] shadow-lg cursor-pointer"
      >
        <div className="flex items-end gap-[3px] h-4">
          {[0.6, 1, 0.4, 0.8].map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-[#C9A96E] rounded-full"
              animate={
                isPlaying
                  ? {
                      height: ["25%", "100%", "40%", "85%", "25%"],
                    }
                  : {
                      height: "25%",
                    }
              }
              transition={
                isPlaying
                  ? {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.18,
                    }
                  : { duration: 0.3 }
              }
              style={{ minHeight: "3px" }}
            />
          ))}
        </div>
      </button>
    </div>
  );
}
