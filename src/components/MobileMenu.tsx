"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  return (
    <div className="relative z-[1001] md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[1002] border border-white/12 bg-white/6 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:bg-white/10"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <div className="flex h-6 w-6 flex-col gap-1.5">
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[980] cursor-pointer bg-[#08080c]/72 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <button
                onClick={() => setIsOpen(false)}
                className="fixed right-6 top-6 z-[1010] border border-white/12 bg-white/6 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:bg-white/10"
                aria-label="Close menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                type="button"
              >
                <div className="flex h-6 w-6 flex-col gap-1.5">
                  <span className="h-0.5 w-full translate-y-2 rotate-45 bg-white transition-all duration-300" />
                  <span className="h-0.5 w-full opacity-0 bg-white transition-all duration-300" />
                  <span className="h-0.5 w-full -translate-y-2 -rotate-45 bg-white transition-all duration-300" />
                </div>
              </button>

              <div
                id="mobile-navigation"
                className="fixed inset-0 z-[990] overflow-y-auto bg-[#101018]/94 backdrop-blur-2xl hide-scrollbar"
              >
                <div className="flex min-h-full flex-col px-3 pb-3 pt-24">
                  <div className="flex flex-1 flex-col overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,24,0.98),rgba(10,10,16,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
                    <div className="border-b border-white/10 px-6 py-5">
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">
                        Navigation
                      </p>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-white/56">
                        Explore Formalize services, team story, and contact points.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 px-3 py-3">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="border border-white/8 bg-white/[0.03] px-5 py-4 text-base font-semibold text-white/72 transition-colors hover:bg-white/8 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}

                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex w-full items-center justify-between border border-white/8 bg-white/[0.03] px-5 py-4 text-base font-semibold text-white/72 transition-colors hover:bg-white/8 hover:text-white"
                        type="button"
                      >
                        Services
                        <i
                          className={`bi-chevron-down text-sm transition-transform duration-300 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isServicesOpen && (
                        <div className="mx-1 flex flex-col gap-2 border border-white/8 bg-white/[0.04] p-2">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.id}
                              href={service.href}
                              onClick={() => {
                                setIsServicesOpen(false);
                                setIsOpen(false);
                              }}
                              className="px-4 py-3 text-sm font-semibold text-white/60 transition-colors hover:translate-x-1 hover:bg-white/8 hover:text-primary"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
