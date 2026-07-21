import Link from "next/link";
import { getPublishedCatalogueItems } from "@/lib/supabase/queries";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";

export async function FeaturedProducts() {
  const { items } = await getPublishedCatalogueItems({ type: "product", pageSize: 4 });
  const featured = items;

  if (featured.length === 0) return null;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="section-heading max-w-3xl text-3xl font-black leading-none sm:text-4xl">
              Tools to power your business
            </h2>
          </div>
          <Link
            href="/services/it-products"
            className="inline-flex w-fit border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
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
