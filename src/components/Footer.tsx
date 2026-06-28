import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      { label: "Finance", href: "/services" },
      { label: "Operations", href: "/services" },
      { label: "IT & Systems", href: "/services" },
      { label: "Marketing & Branding", href: "/services" },
      { label: "HR Management", href: "/services" },
      { label: "Office Setup", href: "/services" },
    ],
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
    <footer className="border-t border-[#17142a]/10 bg-[#17142a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block rounded-full bg-white px-4 py-3"
            >
              <Image
                src="/Formalize-Logo.png"
                alt="Formalize"
                width={120}
                height={32}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Business structure with color, clarity, and momentum. Finance,
              operations, systems, marketing, HR, and office setup in one place.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#ffe84f]">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-[#7df3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7df3ff]"
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
