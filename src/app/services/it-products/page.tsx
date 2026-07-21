import { Suspense } from "react";
import Link from "next/link";
import { getPublishedCatalogueItems, getCategories } from "@/lib/supabase/queries";
import { CatalogueGrid } from "@/components/catalogue/CatalogueGrid";
import { CatalogueFilterBar } from "@/components/catalogue/CatalogueFilterBar";
import { Pagination } from "@/components/catalogue/Pagination";

interface ITProductsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function ITProducts({ searchParams }: ITProductsPageProps) {
  const { category: categorySlug, page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const [result, categories] = await Promise.all([
    getPublishedCatalogueItems({
      type: "product",
      categorySlug,
      page,
      pageSize: 9,
    }),
    getCategories(),
  ]);

  return (
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="section-heading text-4xl font-black sm:text-5xl lg:text-6xl">
              Technology products with an implementation brain.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/60">
            Browse the systems, devices, and infrastructure we can supply,
            configure, and support as part of a complete business operating
            stack.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/40">
              Filter catalogue
            </p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-12" />}>
                <CatalogueFilterBar categories={categories} />
              </Suspense>
            </div>
          </div>

          <CatalogueGrid
            items={result.items}
            variant="dark"
            emptyMessage="No products found in this category."
          />

          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            total={result.total}
            pageSize={result.pageSize}
          />
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="section-heading max-w-4xl text-4xl font-black leading-none">
            Need the full stack scoped, supplied, and installed?
          </h2>
          <Link
            href="/contact"
            className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
