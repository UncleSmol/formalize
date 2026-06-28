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
    <div className="relative min-h-[440px]">
      {/* Main Text Box */}
      <div className="absolute right-0 top-8 w-[86%] rounded-[2rem] bg-white p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/50 overflow-hidden min-h-[300px] flex items-center justify-center">
        {/* Animated Text */}
        {(hoveredService || currentService) && (
          <div className="text-center">
            <p className="text-sm font-semibold text-[#4c466b] mb-4">
              We handle
            </p>
            <p className="text-5xl font-bold text-[#ff4fa3]">
              {hoveredService || currentService}
            </p>
          </div>
        )}
      </div>

      {/* Top Badge */}
      <div className="absolute left-0 top-0 w-52 rounded-3xl bg-[#ff4fa3] p-5 text-white shadow-2xl">
        <p className="text-sm font-semibold text-white/75">Today</p>
        <p className="mt-2 text-3xl font-bold">Systems aligned</p>
      </div>

      {/* Interactive Service Items */}
      <div className="absolute bottom-6 left-8 grid w-72 gap-2 rounded-3xl bg-white p-4 text-[#17142a] shadow-2xl">
        {serviceHighlights.slice(0, 4).map((item) => (
          <div
            key={item}
            onMouseEnter={() => handleServiceHover(item)}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
              hoveredService === item || (!hoveredService && currentService === item)
                ? "bg-[#ff4fa3]/20 scale-105"
                : "bg-[#f7f4ff] hover:bg-[#ff4fa3]/10 hover:scale-105"
            }`}
          >
            {item}
            {hoveredService === item || (!hoveredService && currentService === item) ? (
              <i className="bi-check-circle-fill text-[#ff4fa3]" />
            ) : (
              <i className="bi-check-circle-fill text-[#00b8d9]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
