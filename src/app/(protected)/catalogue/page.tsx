import { Suspense } from "react";
import { getPublishedCatalogueItems, getCategories } from "@/lib/supabase/queries";
import { CatalogueGrid } from "@/components/catalogue/CatalogueGrid";
import { CatalogueFilterBar } from "@/components/catalogue/CatalogueFilterBar";
import { Pagination } from "@/components/catalogue/Pagination";

interface CataloguePageProps {
  searchParams: Promise<{
    category?: string;
    type?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: "Catalogue | Formalize",
  description:
    "Browse our complete catalogue of services, products, and resources designed to structure and grow your business.",
};

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const { category: categorySlug, type, page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const [result, categories] = await Promise.all([
    getPublishedCatalogueItems({
      type: type as "service" | "product" | "resource" | undefined,
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
              Everything a business needs to operate better.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/60">
            Browse services, products, and resources we supply, configure, and
            support as part of a complete business operating stack.
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
            emptyMessage="No items match the selected filter."
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
            Need help choosing the right solution?
          </h2>
          <a
            href="mailto:hello@formalize.co.za"
            className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
