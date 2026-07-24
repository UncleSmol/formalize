"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import { SERVICES } from "@/lib/services";
import type { User } from "@supabase/supabase-js";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  authLinks?: NavLink[];
}

export function MobileMenu({ navLinks, authLinks }: MobileMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient();

    function refreshUser() {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data?.user ?? null);
        setLoading(false);
      });
    }

    refreshUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    window.addEventListener("user-metadata-updated", refreshUser);

    return () => {
      listener?.subscription.unsubscribe();
      window.removeEventListener("user-metadata-updated", refreshUser);
    };
  }, []);

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

  async function handleSignOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[1020] flex h-10 w-10 items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <div className="flex h-5 w-5 flex-col gap-1">
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              isOpen ? "translate-y-1.5 rotate-45 bg-primary" : "bg-black"
            }`}
          />
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              isOpen ? "opacity-0 bg-primary" : "bg-black"
            }`}
          />
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              isOpen ? "-translate-y-1.5 -rotate-45 bg-primary" : "bg-black"
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
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center justify-between px-4 pb-4">
                      <Link
                        href="/account/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2"
                      >
                        {(() => {
                          const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
                          const initial = (user.user_metadata?.full_name as string)?.charAt(0)?.toUpperCase()
                            ?? user.email?.charAt(0).toUpperCase()
                            ?? "?";
                          return avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full border border-white/20 object-cover" />
                          ) : (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-black text-primary">
                              {initial}
                            </span>
                          );
                        })()}
                        <span className="text-sm font-semibold text-white/70">Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-3 text-sm font-black uppercase tracking-wide text-red-400 transition-colors hover:bg-white/5"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : authLinks ? (
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
                  ) : null}
                  {user && <hr className="mx-4 border-white/10" />}
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
