"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig, WeddingEvent } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SANSKRIT_SUBTITLES: Record<string, string> = {
  haldi: "हरिद्रा लेपनम् · Auspicious Turmeric Blessing",
  mehendi: "मेहंदी उत्सव · Intricate Henna Soirée",
  sangeet: "संगीत संध्या · Musical Celebration & Sangeet",
  wedding: "शुभ विवाह · The Pheras & Sacred Vows",
  reception: "अभिनंदन समारोह · Grand Royal Gala Dinner",
};

export function Section5_WeddingEvents() {
  const containerRef = useRef<HTMLElement | null>(null);

  // GSAP Stacking Cards Pinning Effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".event-stack-card");

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return; // Don't animate the last card

          gsap.to(card, {
            scale: 0.94 + index * 0.01,
            filter: "brightness(0.7)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 70%",
              end: "top 15%",
              scrub: 1,
            },
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const generateSingleEventIcs = (event: WeddingEvent) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sidharth & Kiara//Event//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} - ${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.venueName}, ${event.address}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.id}-celebration.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative w-full py-16 sm:py-28 md:py-40 text-[#F7F1E8] overflow-hidden bg-[#0D0A08] z-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header - Royal Frosted Dark Card */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20 md:mb-28 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-8 px-6 sm:px-10 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-2 sm:mb-3 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            The Festivities
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Wedding Itinerary
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-4 sm:mb-6" />
          <p className="font-sans-body text-xs sm:text-base text-[#F3EDE2] font-normal leading-relaxed px-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            Two families, five sacred ceremonies, and an unforgettable weekend along the shores of Lake Pichola.
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="relative space-y-8 sm:space-y-12 lg:space-y-24">
          {weddingConfig.events.map((event, idx) => {
            return (
              <div
                key={event.id}
                className="event-stack-card lg:sticky lg:top-28 w-full bg-[#120E0C] text-[#F7F1E8] border-2 border-[#C9A96E]/40 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all"
                style={{
                  zIndex: idx + 10,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[520px]">
                  {/* Event Image */}
                  <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#0A0807]">
                    <PlaceholderImage
                      src={event.image}
                      alt={event.title}
                      fill
                      priority={true}
                      label={`EVENT 0${idx + 1}`}
                      className="w-full h-full object-cover"
                      imageClassName="object-cover object-[center_20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent lg:hidden" />
                  </div>

                  {/* Event Details */}
                  <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#1A1410] via-[#14100E] to-[#0E0B09] relative">
                    <div>
                      {/* Counter & Category */}
                      <div className="flex items-center justify-between mb-6 border-b border-[#C9A96E]/30 pb-4">
                        <span className="font-editorial text-xs tracking-[0.3em] uppercase text-[#DFC48E] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          Ceremony 0{idx + 1}
                        </span>
                        <span className="font-editorial text-xs tracking-[0.2em] uppercase text-[#DFC48E]/80 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          Udaipur
                        </span>
                      </div>

                      {/* Event Title */}
                      <span className="font-editorial text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DFC48E] block mb-2 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {SANSKRIT_SUBTITLES[event.id] || "Celebration"}
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {event.title}
                      </h3>

                      {/* Date, Time & Venue Card */}
                      <div className="space-y-2 mb-6 bg-[#0A0807]/90 p-4 sm:p-5 rounded-xl border border-[#C9A96E]/30 shadow-inner">
                        <p className="font-editorial text-xs sm:text-sm tracking-[0.25em] uppercase text-[#DFC48E] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {event.date}
                        </p>
                        <p className="font-editorial text-xs sm:text-sm tracking-[0.2em] uppercase text-[#FFF8EE] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {event.time}
                        </p>
                        <p className="font-sans-body text-xs sm:text-sm text-[#E6D9C6] font-normal pt-1 border-t border-[#C9A96E]/20">
                          {event.venueName} · {event.address}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-sans-body text-sm sm:text-base text-[#F7F1E8] font-normal leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {event.description}
                      </p>

                      {/* Dress Code Tag */}
                      {event.dressCode && (
                        <div className="inline-flex items-center gap-2.5 py-2 px-4 rounded-full border border-[#DFC48E]/40 bg-[#DFC48E]/15 mb-8 shadow-sm backdrop-blur-sm">
                          <span className="w-2 h-2 rounded-full bg-[#DFC48E]" />
                          <span className="font-editorial text-[11px] tracking-[0.2em] uppercase text-[#FFF8EE] font-medium">
                            Attire: {event.dressCode}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions: Add to Calendar & Directions */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#C9A96E]/30">
                      <button
                        type="button"
                        onClick={() => generateSingleEventIcs(event)}
                        className="font-editorial text-xs tracking-[0.2em] uppercase text-[#DFC48E] hover:text-white bg-[#1A1410] hover:bg-[#261B15] px-4 py-2.5 rounded-lg border border-[#C9A96E]/40 flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                        </svg>
                        Add to Calendar
                      </button>

                      <a
                        href={weddingConfig.venue.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-editorial text-xs tracking-[0.2em] uppercase text-[#DFC48E] hover:text-white bg-[#1A1410] hover:bg-[#261B15] px-4 py-2.5 rounded-lg border border-[#C9A96E]/40 flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Directions
                      </a>
                    </div>
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
