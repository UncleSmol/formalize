"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import laptopHeroImage from "@/assets/laptop-hero-image.png";
import financeHeroImage from "@/assets/finance-hero-image.png";
import processesHeroImage from "@/assets/processes-hero-image.png";
import hrHeroImage from "@/assets/hr-hero-image.png";
import apparelsHeroImage from "@/assets/apparels-hero-image.png";

const heroImages = [
  { src: laptopHeroImage, label: "IT & Systems" },
  { src: financeHeroImage, label: "Finance" },
  { src: processesHeroImage, label: "Operations" },
  { src: hrHeroImage, label: "HR" },
  { src: apparelsHeroImage, label: "Office Setup" },
];

export function HeroImageRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[440px] flex items-center justify-center pointer-events-auto">
      <div className="relative w-full h-[440px] flex items-center justify-center">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-white/5 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.label}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Image Label */}
        <div className="absolute bottom-6 left-6 right-6 z-10 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3">
          <p className="text-center text-white font-semibold text-sm sm:text-base transition-opacity duration-700">
            {heroImages[currentIndex].label}
          </p>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to ${heroImages[index].label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
