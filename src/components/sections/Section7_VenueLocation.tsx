"use client";

import { useState, useEffect, useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Section7_VenueLocation() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="venue"
      className="relative w-full py-16 sm:py-28 md:py-40 text-[#F7F1E8] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header - Royal Frosted Dark Card */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 md:mb-24 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl py-8 px-6 sm:px-10 backdrop-blur-md shadow-2xl">
          <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#DFC48E] uppercase block mb-2 sm:mb-3 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            The Destination
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Venue & Surroundings
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-4 sm:mb-6" />
          <p className="font-display italic text-base sm:text-lg text-[#F3EDE2] font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            &ldquo;{weddingConfig.venue.tagline}&rdquo;
          </p>
        </div>

        {/* Content Layout: Details + Asymmetrical Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Venue details & Airport Note - Protected Card */}
          <div className="lg:col-span-5 space-y-6 bg-[#120E0C]/85 border border-[#C9A96E]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div>
              <span className="font-editorial text-xs tracking-[0.25em] text-[#DFC48E] uppercase block mb-2 font-medium">
                Palace On The Lake
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-light mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {weddingConfig.venue.name}
              </h3>
              <p className="font-sans-body text-sm sm:text-base text-[#F3EDE2] font-normal leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                {weddingConfig.venue.address}
              </p>
            </div>

            <div className="p-5 border-l-2 border-[#C9A96E] bg-[#1A1614]/90 border border-[#C9A96E]/20 rounded-r-xl">
              <span className="font-editorial text-xs tracking-[0.2em] text-[#DFC48E] uppercase block mb-2 font-medium">
                Travel & Transfers
              </span>
              <p className="font-sans-body text-xs sm:text-sm text-[#F3EDE2] font-normal leading-relaxed">
                {weddingConfig.venue.airportNote}
              </p>
            </div>

            <div className="pt-2">
              <MagneticButton
                href={weddingConfig.venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="tracking-[0.25em]">Get Directions</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Asymmetrical Collage of Venue Photos */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
            <div className="col-span-8 aspect-[4/5] relative border border-[#C9A96E]/30 bg-[#1A1614]">
              <PlaceholderImage
                src={weddingConfig.venue.photos[0] || "/media/venue-01.jpg"}
                alt="Venue Exterior by the Lake"
                fill
                label="PALACE EXTERIOR"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="col-span-4 flex flex-col gap-4">
              <div className="aspect-square relative border border-[#C9A96E]/30 bg-[#1A1614]">
                <PlaceholderImage
                  src={weddingConfig.venue.photos[1] || "/media/venue-02.jpg"}
                  alt="Courtyard and Arches"
                  fill
                  label="COURTYARD"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="aspect-[3/4] relative border border-[#C9A96E]/30 bg-[#1A1614]">
                <PlaceholderImage
                  src={weddingConfig.venue.photos[2] || "/media/venue-03.jpg"}
                  alt="Lake View at Sunset"
                  fill
                  label="LAKE SUNSET"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Custom Warm-Toned Google Maps Frame (Lazy-Loaded when in viewport) */}
        <div
          ref={mapContainerRef}
          className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] border border-[#C9A96E]/40 rounded-xl overflow-hidden shadow-xl bg-[#14110F] flex items-center justify-center"
        >
          <div className="absolute inset-0 pointer-events-none border border-[#C9A96E]/20 m-2 z-10" />

          {loadMap ? (
            <iframe
              src={weddingConfig.venue.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map showing The Leela Palace Udaipur"
              className="w-full h-full grayscale contrast-[0.9] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center p-6">
              <span className="font-editorial text-xs tracking-[0.25em] text-[#C9A96E] uppercase">
                Interactive Palace Map
              </span>
              <p className="font-sans-body text-xs text-[#E6D9C6]/60">
                Loading GPS location...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
