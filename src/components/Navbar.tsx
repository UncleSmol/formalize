import Image from "next/image";
import Link from "next/link";
import { ServicesDropdown } from "./ServicesDropdown";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Who We Help", href: "/audience" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#17142a]/10 bg-[#fffaf1]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-[#17142a]/10"
        >
          <Image
            src="/Formalize-Logo.png"
            alt="Formalize"
            width={120}
            height={32}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-[#4c466b] transition-colors hover:bg-[#ff4fa3]/10 hover:text-[#17142a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fa3]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ServicesDropdown />
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[#17142a] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,79,163,0.25)] transition-colors hover:bg-[#ff4fa3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fa3] sm:inline-flex"
          >
            Get Started
          </Link>
          <MobileMenu navLinks={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
