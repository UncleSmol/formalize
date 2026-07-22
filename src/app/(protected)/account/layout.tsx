import Link from "next/link";

const ACCOUNT_NAV = [
  { label: "Profile", href: "/account/profile", icon: "bi-person" },
  { label: "My Orders", href: "/account/orders", icon: "bi-box-seam" },
  { label: "Two-Factor Auth", href: "/account/mfa", icon: "bi-shield-check" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-0 lg:flex-row lg:px-6">
      <aside className="w-full border-b border-white/10 px-6 pb-0 lg:w-56 lg:border-b-0 lg:border-r lg:px-0 lg:pb-0 lg:pt-12">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {ACCOUNT_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-xs font-bold uppercase tracking-wider text-white/40 transition-colors hover:text-white lg:border-b-0 lg:border-r-2 lg:px-4 lg:py-2"
            >
              <i className={item.icon} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
