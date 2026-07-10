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
        className="rounded-full px-3 py-2 text-sm font-semibold text-white/68 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[640px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101018]/96 shadow-[0_28px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-3 p-4">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="group rounded-2xl p-4 transition-colors hover:bg-white/8"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${service.color} text-lg text-[#17142a]`}
                  >
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17142a] group-hover:text-[#ff4fa3]">
                      <span className="text-white group-hover:text-primary">
                        {service.title}
                      </span>
                    </h3>
                    <p className="mt-1 text-xs leading-4 text-white/55">
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
