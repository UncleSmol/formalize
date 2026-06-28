"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES } from "@/lib/services";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="md:hidden relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-[#17142a] transition-colors hover:bg-[#ff4fa3]/10"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5 w-6 h-6">
          <span
            className={`h-0.5 w-full bg-[#17142a] transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-[#17142a] transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-[#17142a] transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Full-screen Menu */}
          <div className="fixed inset-0 top-16 bg-white/98 backdrop-blur-xl z-50 overflow-y-auto">
            <div className="flex flex-col divide-y divide-[#17142a]/10">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-5 text-base font-semibold text-[#4c466b] transition-colors hover:bg-[#ff4fa3]/10 hover:text-[#17142a]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown */}
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="px-6 py-5 text-base font-semibold text-[#4c466b] transition-colors hover:bg-[#ff4fa3]/10 hover:text-[#17142a] flex items-center justify-between w-full"
              >
                Services
                <i
                  className={`bi-chevron-down text-sm transition-transform duration-300 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Services Submenu */}
              {isServicesOpen && (
                <div className="bg-[#f7f4ff] px-0 py-2 flex flex-col gap-0">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsOpen(false);
                      }}
                      className="px-6 py-4 text-sm font-semibold text-[#4c466b] transition-colors hover:bg-white hover:text-[#ff4fa3] hover:translate-x-1"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Get Started Button */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-[#17142a] px-6 py-5 text-base font-semibold text-white transition-colors hover:bg-[#ff4fa3] text-center m-6 rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
