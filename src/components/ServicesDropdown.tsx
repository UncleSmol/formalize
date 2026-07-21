"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-background/60 transition-colors hover:text-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(640px,calc(100vw-2rem))] border border-white/10 bg-[#101018] shadow-2xl">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="bg-[#101018] p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-white/10 text-lg text-primary">
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{service.title}</h3>
                    <p className="mt-1 text-xs leading-4 text-white/50">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
