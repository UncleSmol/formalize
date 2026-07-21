"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  authLinks?: NavLink[];
}

export function MobileMenu({ navLinks, authLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[1020] flex h-10 w-10 items-center justify-center text-white"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <div className="flex h-5 w-5 flex-col gap-1">
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[1005] bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="mobile-navigation"
            className="fixed inset-y-0 right-0 z-[1010] w-full max-w-sm overflow-y-auto bg-[#101018] px-6 pb-6 pt-20 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {authLinks && (
                <>
                  <div className="flex gap-2 px-4 pb-4">
                    {authLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex-1 px-4 py-3 text-center text-sm font-black uppercase tracking-wide ${
                          link.href === "/signup"
                            ? "bg-primary text-[#08080c]"
                            : "border border-white/20 text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <hr className="mx-4 border-white/10" />
                </>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-white/5 px-4 py-4 text-base font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex w-full items-center justify-between border-b border-white/5 px-4 py-4 text-base font-semibold text-white/70 transition-colors hover:text-white"
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
                <div className="flex flex-col gap-1 pl-4">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 text-sm font-semibold text-white/50 transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
