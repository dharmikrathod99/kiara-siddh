"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Section1_LoveStory() {
  const containerRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical drawing line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.8,
            },
          }
        );
      }

      // MatchMedia for Desktop pinning & parallax vs Mobile stacked flow
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop: Subtle parallax and reveals on chapters
        const chapters = gsap.utils.toArray<HTMLElement>(".story-chapter");
        chapters.forEach((chapter) => {
          const img = chapter.querySelector(".story-image-wrap");
          const text = chapter.querySelector(".story-text-wrap");

          if (img) {
            gsap.fromTo(
              img,
              { y: 60, opacity: 0.6 },
              {
                y: -40,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 85%",
                  end: "bottom 15%",
                  scrub: 1,
                },
              }
            );
          }

          if (text) {
            gsap.fromTo(
              text,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile: Gentle fade up without heavy parallax
        const chapters = gsap.utils.toArray<HTMLElement>(".story-chapter");
        chapters.forEach((chapter) => {
          gsap.fromTo(
            chapter,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="love-story"
      className="relative w-full py-16 sm:py-28 md:py-40 text-[#F7F1E8] overflow-hidden"
    >
      {/* Decorative vertical timeline center line */}
      <div className="absolute left-1/2 top-48 bottom-48 w-[1px] -translate-x-1/2 hidden md:block pointer-events-none">
        <div className="w-full h-full bg-[#C9A96E]/20" />
        <div
          ref={lineRef}
          className="absolute inset-0 w-full bg-[#C9A96E] origin-top scale-y-0"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Opening Quote - Royal Frosted Dark Card */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 md:mb-32 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-8 px-6 sm:px-10 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-3 sm:mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-medium">
            Chapter by Chapter
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Our Love Story
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-4 sm:mb-6" />
          <p className="font-display italic text-base sm:text-xl text-[#F3EDE2] leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] px-2">
            &ldquo;Every love story is beautiful, but ours is our favourite.&rdquo;
          </p>
        </div>

        {/* Chapters */}
        <div className="space-y-16 sm:space-y-28 md:space-y-44">
          {weddingConfig.loveStory.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={chapter.year}
                className={`story-chapter relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Column */}
                <div
                  className={`story-image-wrap relative group ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                  data-cursor="view"
                >
                  {/* Varied editorial mask frame */}
                  <div
                    className={`relative overflow-hidden bg-[#1A1614] transition-transform duration-700 group-hover:scale-[1.01] ${
                      index % 3 === 0
                        ? "rounded-t-full aspect-[4/5] border border-[#C9A96E]/35 p-2 shadow-2xl"
                        : index % 3 === 1
                        ? "rounded-2xl aspect-[4/5] border border-[#C9A96E]/35 p-2 shadow-2xl"
                        : "rounded-2xl aspect-[4/5] border-l-2 border-r border-[#C9A96E]/50 p-2 shadow-2xl"
                    }`}
                  >
                    <div
                      className={`relative w-full h-full overflow-hidden ${
                        index % 3 === 0 ? "rounded-t-full" : "rounded-xl"
                      }`}
                    >
                      <PlaceholderImage
                        src={chapter.image}
                        alt={`${chapter.title} - ${chapter.year}`}
                        fill
                        priority={index <= 1}
                        label={`STORY · ${chapter.year}`}
                        className="w-full h-full"
                        imageClassName="object-cover object-[center_15%] transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Corner Accent Hairline */}
                  <div
                    className={`absolute -bottom-4 w-20 h-20 border-b border-[#C9A96E]/40 pointer-events-none hidden md:block ${
                      isEven ? "-right-4 border-r" : "-left-4 border-l"
                    }`}
                  />
                </div>

                {/* Text Content Column - Royal Card with 100% Contrast & Text Legibility */}
                <div
                  className={`story-text-wrap relative bg-[#120E0C]/90 md:bg-[#120E0C]/85 border border-[#C9A96E]/35 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* Oversized Outlined Year Numeral Behind Text */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-2 md:-top-14 md:-right-4 font-display text-7xl md:text-8xl text-transparent font-light select-none pointer-events-none opacity-20"
                    style={{
                      WebkitTextStroke: "1px #C9A96E",
                    }}
                  >
                    {chapter.year}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-editorial text-xs tracking-[0.25em] text-[#DFC48E] uppercase font-medium">
                        {chapter.year}
                      </span>
                      {chapter.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
                          <span className="font-editorial text-xs tracking-[0.2em] text-[#F3EDE2]/80 uppercase">
                            {chapter.location}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-light leading-snug mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {chapter.title}
                    </h3>

                    <p className="font-sans-body text-sm sm:text-base text-[#F3EDE2] font-normal leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      {chapter.text}
                    </p>

                    <div className="w-12 h-[1px] bg-[#C9A96E]/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
