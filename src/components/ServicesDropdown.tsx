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
        className="rounded-full px-3 py-2 text-sm font-semibold text-[#4c466b] transition-colors hover:bg-[#ff4fa3]/10 hover:text-[#17142a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fa3]"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[600px] rounded-2xl bg-white/95 backdrop-blur-sm shadow-[0_28px_80px_rgba(23,20,42,0.12)] ring-1 ring-[#17142a]/10 overflow-hidden z-50">
          <div className="grid grid-cols-2 gap-3 p-4">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="group rounded-xl p-4 transition-colors hover:bg-[#f7f4ff]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${service.color} text-lg text-[#17142a]`}
                  >
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17142a] group-hover:text-[#ff4fa3]">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs leading-4 text-[#4c466b]">
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
