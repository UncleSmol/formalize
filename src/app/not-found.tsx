import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black text-primary">404</h1>
      <p className="mt-4 text-lg text-gray-500">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-black uppercase tracking-wide text-[#08080c] transition-all hover:opacity-90"
      >
        <i className="bi-arrow-left text-base" aria-hidden="true" />
        Go Home
      </Link>
    </div>
  );
}
