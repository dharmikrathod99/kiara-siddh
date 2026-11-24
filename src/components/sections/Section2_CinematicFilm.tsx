"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Section2_CinematicFilm() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isNearViewport, setIsNearViewport] = useState(false);

  // IntersectionObserver: only load video stream when user scrolls near this section
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { rootMargin: "350px 0px", threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP scrubbed scale and text threshold reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pin section and scrub scale from 1.2 to 1.0
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Video scale scrub (preserving 100% crisp sharpness without blur)
        if (videoWrapperRef.current) {
          tl.fromTo(
            videoWrapperRef.current,
            { scale: 1.05 },
            { scale: 1.0, ease: "power2.out", duration: 1 }
          );
        }

        // Cinematic lines reveal at thresholds
        tl.to(".film-text-1", { opacity: 1, y: 0, duration: 0.5 })
          .to(".film-text-1", { opacity: 0, y: -20, duration: 0.4 }, "+=0.4")
          .to(".film-text-2", { opacity: 1, y: 0, duration: 0.5 })
          .to(".film-text-2", { opacity: 0, y: -20, duration: 0.4 }, "+=0.4")
          .to(".film-text-3", { opacity: 1, y: 0, duration: 0.5 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      id="film"
      className="relative w-full h-screen bg-[#14110F] text-[#F7F1E8] overflow-hidden flex items-center justify-center"
    >
      {/* Letterbox Bars Top and Bottom for Film Aesthetic */}
      <div className="absolute top-0 left-0 right-0 h-10 md:h-14 bg-[#14110F] z-20 pointer-events-none border-b border-[#C9A96E]/10" />
      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14 bg-[#14110F] z-20 pointer-events-none border-t border-[#C9A96E]/10" />

      {/* Video Container with scrubbed scale & blur */}
      <div
        ref={videoWrapperRef}
        className="relative w-full h-full overflow-hidden"
      >
        {/* Background Visual: Video (if present) or High-Res Wedding Photo */}
        {weddingConfig.videos.storyVideo.src ? (
          <video
            ref={videoRef}
            src={weddingConfig.videos.storyVideo.src}
            poster={weddingConfig.videos.storyVideo.poster || "/media/cinematic-film-bg.jpg"}
            muted={isMuted}
            playsInline
            loop
            preload={isNearViewport ? "auto" : "none"}
            className="w-full h-full object-cover opacity-100"
          />
        ) : (
          <Image
            src="/media/cinematic-film-bg.jpg"
            alt="Sidharth & Kiara · The Sacred Vows"
            fill
            priority
            quality={100}
            className="w-full h-full object-cover object-[center_35%]"
          />
        )}

        {/* Soft Vignette and Film Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-[#14110F]/80 pointer-events-none" />
        <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
      </div>

      {/* Cinematic Overlays (fading in and out at scroll thresholds) - High Contrast Cards */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <div className="film-text-1 absolute max-w-2xl opacity-0 translate-y-6 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-6 px-8 sm:px-12 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs tracking-[0.35em] uppercase text-[#DFC48E] block mb-3 font-medium">
          </span>
          <p className="font-display italic text-2xl sm:text-4xl md:text-5xl text-white font-light leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            &ldquo;Haldi:22/1/2025.&rdquo;
          </p>
        </div>

        <div className="film-text-2 absolute max-w-2xl opacity-0 translate-y-6 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-6 px-8 sm:px-12 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs tracking-[0.35em] uppercase text-[#DFC48E] block mb-3 font-medium">
          </span>
          <p className="font-display italic text-2xl sm:text-4xl md:text-5xl text-white font-light leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            &ldquo;Sangeet: 23/1/2025.&rdquo;
          </p>
        </div>

        <div className="film-text-3 absolute max-w-2xl opacity-0 translate-y-6 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-6 px-8 sm:px-12 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs tracking-[0.35em] uppercase text-[#DFC48E] block mb-3 font-medium">
            
          </span>
          <p className="font-display italic text-2xl sm:text-4xl md:text-5xl text-white font-light leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            &ldquo;Wedding: 24/1/2025.&rdquo;
          </p>
        </div>
      </div>

      {/* Custom Circular Play/Pause & Mute Controls (shown when video is active) */}
      {weddingConfig.videos.storyVideo.src ? (
        <div className="absolute bottom-16 right-6 md:right-12 z-30 flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause film" : "Play film"}
            className="w-12 h-12 rounded-full border border-[#C9A96E]/50 bg-[#14110F]/80 hover:bg-[#C9A96E] hover:text-[#14110F] text-[#C9A96E] backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none"
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute film audio" : "Mute film audio"}
            className="w-12 h-12 rounded-full border border-[#C9A96E]/50 bg-[#14110F]/80 hover:bg-[#C9A96E] hover:text-[#14110F] text-[#C9A96E] backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none"
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
}
