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
    <header className="fixed inset-x-0 top-0 z-[1000]">
      <nav className="mx-auto mt-4 flex h-16 max-w-7xl items-center justify-between border border-white/10 bg-[#08080c]/72 px-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 bg-white px-3 py-2 shadow-sm ring-1 ring-white/20"
        >
          <Image
            src="/Formalize-Logo.png"
            alt="Formalize"
            width={120}
            height={32}
            priority
            style={{ height: "auto" }}
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-white/68 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ServicesDropdown />
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden bg-primary px-5 py-2 text-sm font-bold text-[#08080c] shadow-[0_10px_34px_rgba(var(--primary-rgb),0.22)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:inline-flex"
          >
            Get Started
          </Link>
          <MobileMenu navLinks={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
