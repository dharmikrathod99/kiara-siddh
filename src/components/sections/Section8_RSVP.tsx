"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { weddingConfig } from "@/config/wedding";
import { MagneticButton } from "@/components/motion/MagneticButton";

interface RSVPFormData {
  name: string;
  attending: "yes" | "no";
  guests: number;
  events: string[];
  message: string;
}

export function Section8_RSVP() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    attending: "yes",
    guests: 1,
    events: weddingConfig.events.map((e) => e.id),
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((id) => id !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const handleGuestChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(weddingConfig.rsvp.maxGuests, Math.max(1, prev.guests + delta)),
    }));
  };

  const generateWhatsAppUrl = () => {
    const selectedEventTitles = weddingConfig.events
      .filter((e) => formData.events.includes(e.id))
      .map((e) => e.title)
      .join(", ");

    const text = encodeURIComponent(
      `${weddingConfig.rsvp.whatsappMessagePrefix}\n\n` +
        `• Guest Name: ${formData.name}\n` +
        `• Status: ${formData.attending === "yes" ? "Joyfully Accepting ✨" : "Regretfully Declining"}\n` +
        (formData.attending === "yes"
          ? `• Number of Guests: ${formData.guests}\n• Events Attending: ${selectedEventTitles}\n`
          : "") +
        (formData.message ? `• Note: "${formData.message}"\n` : "")
    );

    return `https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: "Kindly provide your full name" });
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Optional POST to Google Apps Script endpoint if present
    if (weddingConfig.rsvp.googleAppsScriptEndpoint) {
      try {
        await fetch(weddingConfig.rsvp.googleAppsScriptEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          mode: "no-cors",
        });
      } catch (err) {
        console.warn("Could not post to Google Script, continuing with WhatsApp RSVP:", err);
      }
    }

    // Trigger subtle golden confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#C9A96E", "#E6D9C6", "#A8854A", "#F7F1E8"],
      });
    } catch {}

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="relative w-full py-28 md:py-40 bg-[#14110F]/65 backdrop-blur-[2px] text-[#F7F1E8] overflow-hidden flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-editorial text-[11px] tracking-[0.4em] uppercase text-[#C9A96E]/80 block mb-2">
            || अतिथिदेवो भव ||
          </span>
          <span className="font-editorial text-xs md:text-sm tracking-[0.35em] text-[#C9A96E] uppercase block mb-3">
            Grace Us With Your Presence
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F7F1E8] font-light mb-4">
            RSVP
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A96E]/50 mx-auto mb-6" />
          <p className="font-sans-body text-xs sm:text-sm text-[#E6D9C6]/70 uppercase tracking-[0.2em]">
            Kindly respond by {weddingConfig.rsvp.deadline}
          </p>
        </div>

        {/* RSVP FORM CONTAINER */}
        <div className="relative border border-[#C9A96E]/30 bg-[#1A1614]/80 backdrop-blur-md p-6 sm:p-12 md:p-14 shadow-2xl">
          {/* Inner hairline */}
          <div className="absolute inset-2 border border-[#C9A96E]/15 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8 relative z-10"
              >
                {/* Attendance Radio Buttons */}
                <div>
                  <label className="block font-editorial text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-4">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, attending: "yes" }))}
                      className={`min-h-[50px] p-4 text-center border font-editorial text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                        formData.attending === "yes"
                          ? "border-[#C9A96E] bg-[#C9A96E]/15 text-[#F7F1E8]"
                          : "border-[#C9A96E]/20 text-[#E6D9C6]/60 hover:border-[#C9A96E]/50"
                      }`}
                    >
                      Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, attending: "no" }))}
                      className={`min-h-[50px] p-4 text-center border font-editorial text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                        formData.attending === "no"
                          ? "border-[#C9A96E] bg-[#C9A96E]/15 text-[#F7F1E8]"
                          : "border-[#C9A96E]/20 text-[#E6D9C6]/60 hover:border-[#C9A96E]/50"
                      }`}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </div>

                {/* Name Input with Underline Style */}
                <div className="relative">
                  <label
                    htmlFor="fullName"
                    className="block font-editorial text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-2"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, name: e.target.value }));
                      if (errors.name) setErrors({});
                    }}
                    placeholder="e.g. Adv. Rohit Mehra"
                    className="w-full bg-transparent border-b border-[#C9A96E]/40 focus:border-[#C9A96E] py-3 text-base text-[#F7F1E8] placeholder-[#E6D9C6]/30 focus:outline-none transition-colors min-h-[48px]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#E8C9C1] font-sans-body mt-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Conditional Fields if Attending */}
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8 overflow-hidden"
                  >
                    {/* Number of Guests Stepper */}
                    <div>
                      <label className="block font-editorial text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-3">
                        Total Guests Attending
                      </label>
                      <div className="flex items-center gap-6">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(-1)}
                          disabled={formData.guests <= 1}
                          aria-label="Decrease guests"
                          className="w-11 h-11 rounded-full border border-[#C9A96E]/40 hover:border-[#C9A96E] flex items-center justify-center text-lg disabled:opacity-30 disabled:cursor-not-allowed text-[#C9A96E]"
                        >
                          -
                        </button>
                        <span className="font-display text-3xl text-[#F7F1E8] w-8 text-center">
                          {formData.guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGuestChange(1)}
                          disabled={formData.guests >= weddingConfig.rsvp.maxGuests}
                          aria-label="Increase guests"
                          className="w-11 h-11 rounded-full border border-[#C9A96E]/40 hover:border-[#C9A96E] flex items-center justify-center text-lg disabled:opacity-30 disabled:cursor-not-allowed text-[#C9A96E]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Events Checkboxes */}
                    <div>
                      <label className="block font-editorial text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-3">
                        Ceremonies You Will Join
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {weddingConfig.events.map((evt) => {
                          const isSelected = formData.events.includes(evt.id);
                          return (
                            <button
                              key={evt.id}
                              type="button"
                              onClick={() => handleEventToggle(evt.id)}
                              className={`p-3 text-left border flex items-center gap-3 transition-colors min-h-[48px] ${
                                isSelected
                                  ? "border-[#C9A96E] bg-[#C9A96E]/10 text-[#F7F1E8]"
                                  : "border-[#C9A96E]/20 text-[#E6D9C6]/60"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                                  isSelected
                                    ? "border-[#C9A96E] bg-[#C9A96E]"
                                    : "border-[#C9A96E]/40"
                                }`}
                              >
                                {isSelected && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#14110F" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-editorial text-xs tracking-[0.15em] uppercase">
                                {evt.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Optional Message */}
                <div>
                  <label
                    htmlFor="rsvpMessage"
                    className="block font-editorial text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-2"
                  >
                    Wishes for the Couple (Optional)
                  </label>
                  <textarea
                    id="rsvpMessage"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Leave a heartfelt note or dietary preferences..."
                    className="w-full bg-transparent border-b border-[#C9A96E]/40 focus:border-[#C9A96E] py-2 text-sm text-[#F7F1E8] placeholder-[#E6D9C6]/30 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                  <MagneticButton variant="primary">
                    <span className="tracking-[0.3em]">
                      {isSubmitting ? "Confirming..." : "Submit Response"}
                    </span>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              /* Success State with WhatsApp confirmation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6 relative z-10"
              >
                <div className="w-16 h-16 rounded-full border border-[#C9A96E] mx-auto flex items-center justify-center text-[#C9A96E]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-[#F7F1E8] font-light">
                  Thank You, {formData.name}
                </h3>

                <p className="font-sans-body text-sm text-[#E6D9C6]/80 font-light max-w-md mx-auto leading-relaxed">
                  Your response has been registered. You can also send a direct instant confirmation message to the family via WhatsApp below.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full font-editorial text-xs tracking-[0.2em] uppercase transition-colors min-h-[48px]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
                    </svg>
                    Confirm on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="font-editorial text-xs tracking-[0.2em] uppercase text-[#C9A96E] hover:text-[#E6D9C6] transition-colors py-3 px-6"
                  >
                    Edit Response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
