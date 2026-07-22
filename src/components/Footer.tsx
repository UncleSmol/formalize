import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      { label: "Catalogue", href: "/catalogue" },
      ...SERVICES.map((service) => ({ label: service.title, href: service.href })),
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
    <footer className="border-t border-black/5 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/Formalize-Logo.png"
                alt="Formalize"
                width={170}
                height={46}
                style={{ height: "auto" }}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/50">
              Premium business infrastructure across finance, operations,
              systems, marketing, HR, and workspace setup.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/40">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/50 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-black/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-background/30">
              &copy; {new Date().getFullYear()} Formalize. All rights reserved.
            </p>
            <nav className="flex gap-4 text-sm text-background/30">
              <Link href="/privacy" className="transition-colors hover:text-background/60">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-background/60">
                Terms of Service
              </Link>
              <Link href="/cookies" className="transition-colors hover:text-background/60">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
