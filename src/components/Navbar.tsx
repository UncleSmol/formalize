import Image from "next/image";
import Link from "next/link";
import { ServicesDropdown } from "./ServicesDropdown";
import { MobileMenu } from "./MobileMenu";
import { AuthNavItem } from "./auth/AuthNavItem";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Who We Help", href: "/audience" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "/contact" },
];

const AUTH_LINKS = [
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/signup" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-black/5 bg-foreground">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/Formalize-Logo.png"
            alt="Formalize"
            width={110}
            height={30}
            priority
            style={{ height: "auto" }}
          />
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-background/60 transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ServicesDropdown />
          </li>
          <AuthNavItem />
        </ul>

        <MobileMenu navLinks={NAV_LINKS} authLinks={AUTH_LINKS} />
      </nav>
    </header>
  );
}
