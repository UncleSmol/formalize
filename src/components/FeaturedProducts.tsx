import Link from "next/link";
import { getPublishedCatalogueItems } from "@/lib/supabase/queries";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";

export async function FeaturedProducts() {
  const { items } = await getPublishedCatalogueItems({ type: "product", pageSize: 4 });
  const featured = items;

  if (featured.length === 0) return null;

  return (
    <section className="bg-[#08080c] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              IT Products
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-none text-balance sm:text-5xl">
              Tools to power your business
            </h2>
          </div>
          <Link
            href="/services/it-products"
            className="sharp-button inline-flex w-fit border border-white/12 bg-white/7 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-white/12"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <CatalogueCard key={item.id} item={item} variant="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
