"use client";

import { useState, useEffect } from "react";

const serviceHighlights = [
  "Finance",
  "Operations",
  "IT & Systems",
  "Marketing",
  "HR",
  "Office Setup",
];

export function InteractiveHeroMedia() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Auto-cycle through services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % serviceHighlights.length);
    }, 5000); // 5 seconds per service

    return () => clearInterval(interval);
  }, []);

  const currentService = serviceHighlights[currentServiceIndex];

  const handleServiceHover = (service: string) => {
    setHoveredService(service);
  };

  const handleMouseLeave = () => {
    setHoveredService(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12 isolate">
      {/* Unified Tab + Panel Container */}
      <div className="relative w-full max-w-4xl px-4 isolate">
        {/* Tab Navigation - Attached to Panel */}
        <div className="relative flex flex-wrap gap-0 justify-start pl-6 pb-0 border-b border-[#17142a]/8 isolate">
          {serviceHighlights.map((item) => {
            const isActive = hoveredService === item || (!hoveredService && currentService === item);
            return (
              <button
                key={item}
                onMouseEnter={() => handleServiceHover(item)}
                onMouseLeave={handleMouseLeave}
                className={`relative px-5 py-4 rounded-t-2xl font-semibold text-sm transition-all duration-300 will-change-transform -mb-px ${
                  isActive
                    ? "bg-white text-[#17142a] border border-[#17142a]/8 border-b-white shadow-[0_-4px_12px_rgba(23,20,42,0.06)] animate-pop-in"
                    : "bg-transparent text-[#4c466b] border border-transparent hover:bg-[#f7f4ff]/50 hover:border-[#ff4fa3]/20"
                }`}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? "bg-[#ff4fa3]" : "bg-[#17142a]/20"
                  }`} />
                  {item}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Panel - Attached to Tabs */}
        <div className="w-full bg-white rounded-b-3xl shadow-[0_24px_80px_rgba(23,20,42,0.12)] border border-t-0 border-[#17142a]/5 overflow-hidden isolate">
          {/* Top Decorative Bar */}
          <div className="h-1 bg-gradient-to-r from-[#ff4fa3] via-primary to-[#ff4fa3]" />

          {/* Content Area */}
          <div className="p-12 min-h-[320px] flex flex-col items-center justify-center isolate">
            <div className="relative z-10 text-center w-full space-y-6 overflow-hidden">
              {/* Playful Icon */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#ff4fa3]/20 rounded-full blur-lg" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#ff4fa3] to-[#ff6b9d] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    ✨
                  </div>
                </div>
              </div>

              {/* Service Title */}
              <div>

                <h2 className="text-5xl font-black text-[#17142a] leading-tight break-words max-w-full line-clamp-2">
                  {hoveredService || currentService}
                </h2>
              </div>

              {/* Description */}
              <p className="text-[#4c466b] font-medium">
                Explore what we offer in {hoveredService || currentService}
              </p>

              {/* Playful Badges */}
              <div className="flex gap-2 justify-center flex-wrap mt-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-[#f7f4ff] rounded-full text-xs font-semibold text-[#4c466b] border border-[#ff4fa3]/20"
                  >
                    {i === 1 && "Expert Team"}
                    {i === 2 && "Proven Results"}
                    {i === 3 && "Custom Solutions"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Counter */}
      <div className="mt-8 text-sm font-semibold text-[#4c466b] isolate">
        <span className="text-[#ff4fa3] font-bold">{serviceHighlights.indexOf(hoveredService || currentService) + 1}</span>
        <span className="mx-2">/</span>
        <span>{serviceHighlights.length}</span>
      </div>
    </div>
  );
}
