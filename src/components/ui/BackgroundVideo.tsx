"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Immediately play the video when any user opens the site
    const startPlayback = () => {
      video
        .play()
        .then(() => setIsLoaded(true))
        .catch(() => {
          // If browser policy requires first touch/gesture on mobile
          const handleFirstTouch = () => {
            video.play().then(() => setIsLoaded(true)).catch(() => {});
            window.removeEventListener("touchstart", handleFirstTouch);
            window.removeEventListener("click", handleFirstTouch);
            window.removeEventListener("scroll", handleFirstTouch);
          };
          window.addEventListener("touchstart", handleFirstTouch, { passive: true });
          window.addEventListener("click", handleFirstTouch, { passive: true });
          window.addEventListener("scroll", handleFirstTouch, { passive: true });
        });
    };

    startPlayback();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 w-full h-[100svh] min-h-screen pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/videos/background-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full min-w-full min-h-full object-cover origin-center scale-100"
      />

      {/* Cinematic Darkening Scrim (ensures white & gold typography is 100% visible over bright white/cream clothing in video) */}
      <div className="absolute inset-0 bg-[#0E0B09]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0B09]/70 via-transparent to-[#0E0B09]/70 pointer-events-none" />
    </motion.div>
  );
}
