import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: SERVICES.map((service) => ({ label: service.title, href: service.href })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Who We Help", href: "/audience" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08080c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 overflow-hidden border-y border-white/10 py-6">
          <div className="animate-marquee flex w-max gap-10 text-4xl font-black uppercase text-white/12 sm:text-6xl">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-10">
                <span>Structure</span>
                <span>Systems</span>
                <span>Momentum</span>
                <span>Formalize</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block bg-white px-4 py-3"
            >
              <Image
                src="/Formalize-Logo.png"
                alt="Formalize"
                width={120}
                height={32}
                style={{ height: "auto" }}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premium business infrastructure across finance, operations,
              systems, marketing, HR, and workspace setup.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/62 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Formalize. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
