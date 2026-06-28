"use client";

import { useState } from "react";
import Image from "next/image";
import laptopHeroImage from "@/assets/laptop-hero-image.png";

interface ServiceMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

const serviceMediaMap: Record<string, ServiceMedia> = {
  Finance: {
    type: "image",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    alt: "Finance and charts",
  },
  Operations: {
    type: "image",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "Team operations",
  },
  "IT & Systems": {
    type: "image",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    alt: "IT systems and technology",
  },
  Marketing: {
    type: "image",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "Marketing strategy",
  },
  HR: {
    type: "image",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "HR and team management",
  },
  "Office Setup": {
    type: "image",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "Office workspace",
  },
};

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
  const [showingImage, setShowingImage] = useState(false);

  const handleServiceHover = (service: string) => {
    setHoveredService(service);
    setShowingImage(false);
    // Delay image show for animation effect
    const timer = setTimeout(() => setShowingImage(true), 800);
    return () => clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    setHoveredService(null);
    setShowingImage(false);
  };

  return (
    <div className="relative min-h-[440px]">
      {/* Main Image Box */}
      <div className="absolute right-0 top-8 w-[86%] rounded-[2rem] bg-white p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/50 overflow-hidden">
        {/* Animated Text */}
        {hoveredService && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f7f4ff] to-[#fffaf1] rounded-[1.5rem] z-10 transition-all duration-500 ${
              showingImage ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className={`text-center transition-all duration-500 ${
              showingImage ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}>
              <p className="text-sm font-semibold text-[#4c466b] mb-2">
                We handle
              </p>
              <p className="text-3xl font-bold text-[#ff4fa3]">
                {hoveredService}
              </p>
            </div>
          </div>
        )}

        {/* Media Content */}
        <div
          className={`transition-opacity duration-700 ${
            hoveredService && showingImage ? "opacity-100" : "opacity-100"
          }`}
        >
          {hoveredService && serviceMediaMap[hoveredService] ? (
            <div
              className={`transition-opacity duration-700 ${
                showingImage ? "opacity-100" : "opacity-0"
              }`}
            >
              {serviceMediaMap[hoveredService].type === "image" ? (
                <Image
                  src={serviceMediaMap[hoveredService].src}
                  alt={serviceMediaMap[hoveredService].alt}
                  width={800}
                  height={600}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              ) : (
                <video
                  src={serviceMediaMap[hoveredService].src}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                  autoPlay
                  muted
                  loop
                />
              )}
            </div>
          ) : (
            <Image
              src={laptopHeroImage}
              alt="Formalize business dashboard mockup"
              className="h-auto w-full rounded-[1.5rem]"
              priority
            />
          )}
        </div>
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
            className="flex items-center justify-between rounded-2xl bg-[#f7f4ff] px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer hover:bg-[#ff4fa3]/10 hover:scale-105"
          >
            {item}
            <i className="bi-check-circle-fill text-[#00b8d9]" />
          </div>
        ))}
      </div>
    </div>
  );
}
