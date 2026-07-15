import Link from "next/link";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "bi-speedometer2" },
  { label: "Catalogue", href: "/admin/catalogue", icon: "bi-box-seam" },
  { label: "Categories", href: "/admin/categories", icon: "bi-tags" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "bi-envelope" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-[#0d0d14] p-6 lg:block">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-primary">
          Admin
        </p>
        <nav className="flex flex-col gap-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded px-3 py-2 text-sm font-semibold text-white/60 transition-colors hover:bg-white/8 hover:text-white"
            >
              <i className={item.icon} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
