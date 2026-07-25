"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import formalizeLogo from "@/assets/Formalize-Logo.png";
import { ServicesDropdown } from "./ServicesDropdown";
import { MobileMenu } from "./MobileMenu";
import { AuthNavItem } from "./auth/AuthNavItem";
import { CartNavItem } from "./catalogue/CartNavItem";
import { CartSidebar } from "./catalogue/CartSidebar";

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

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
  <header className="fixed inset-x-0 top-0 z-[1000] border-b border-black/5 bg-foreground">
  <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
  <Link href="/" className="flex items-center">
  <Image
  src={formalizeLogo}
  alt="Formalize"
  width={170}
  height={46}
  priority
  />
  </Link>

  <ul className="hidden items-center gap-2 md:flex">
  {NAV_LINKS.map((link) => {
    const active = isActive(link.href, pathname);
    return (
    <li key={link.href}>
    <Link
    href={link.href}
    className={`px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:text-background ${
      active ? "text-background" : "text-background/60"
    }`}
    >
    {link.label}
    {active && <span className="mt-0.5 block h-0.5 w-full bg-primary" />}
    </Link>
    </li>
    );
  })}
  <li>
  <ServicesDropdown />
  </li>
  <li>
  <CartNavItem />
  </li>
  <AuthNavItem />
  </ul>

  <div className="flex items-center gap-1 md:hidden">
  <CartNavItem />
  <MobileMenu navLinks={NAV_LINKS} authLinks={AUTH_LINKS} />
  </div>
  </nav>
  <CartSidebar />
  </header>
  );
}
