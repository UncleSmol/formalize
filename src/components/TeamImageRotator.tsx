"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import wonder from "@/assets/meet-the-team/Wonder_Hlatshwayo.png";
import tintswalo from "@/assets/meet-the-team/Tintswalo_Makhubela.png";
import ntsako from "@/assets/meet-the-team/Ntsako_Khoza.png";
import lindokuhle from "@/assets/meet-the-team/Lindokuhle_Masilela.png";
import sizwe from "@/assets/meet-the-team/Sizwe_Hlatshwayo.png";

const teamMembers = [
  { src: sizwe, name: "Sizwe Hlatshwayo", role: "Team Lead" },
  { src: wonder, name: "Wonder Hlatshwayo", role: "Billing" },
  { src: tintswalo, name: "Tintswalo Makhubela", role: "Payments Management" },
  { src: lindokuhle, name: "Lindokuhle Masilela", role: "Accounts Recovery" },
  { src: ntsako, name: "Ntsako Khoza", role: "HR & IT Support" },
];

export function TeamImageRotator({ variant }: { variant?: "default" | "mobile" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const advance = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(advance, 18000);
    return () => clearInterval(interval);
  }, [advance]);

  useEffect(() => {
    if (prevIndex === null) return;
    const timer = setTimeout(() => setPrevIndex(null), 800);
    return () => clearTimeout(timer);
  }, [prevIndex]);

  const current = teamMembers[currentIndex];

  function imageModifier(i: number) {
    if (variant !== "mobile") return "";
    if (i === 0) return "scale-x-[-1] -translate-x-[30%]";
    if (i === 3) return "scale-x-[-1] -translate-x-[30%]";
    if (i === 4) return "scale-x-[-1] -translate-x-[20%]";
    if (i === 2) return "-translate-x-[30%]";
    return "-translate-x-[20%]";
  }

  function imageClasses(i: number) {
    if (i === currentIndex) return "translate-x-0 opacity-100 z-10";
    if (i === prevIndex) return "-translate-x-12 opacity-0 z-20";
    return "translate-x-12 opacity-0";
  }

  return (
    <div className="relative h-[29.5rem] w-[19.5rem] sm:h-[35.25rem] sm:w-[28.9rem]">
      {teamMembers.map((m, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${imageClasses(i)}`}
        >
          <Image
            src={m.src}
            alt={m.name}
            fill
            className={`object-contain ${imageModifier(i)}`}
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-4 z-30 rounded-full border border-white/10 bg-black/70 px-5 py-2 backdrop-blur-sm">
        <p className="text-sm font-black leading-none text-white">{current.name}</p>
        <p className="mt-0.5 text-[11px] font-semibold leading-none text-primary">{current.role}</p>
      </div>
    </div>
  );
}
