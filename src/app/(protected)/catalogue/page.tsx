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
      <section className="video-section premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="video-copy video-panel sharp-panel px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Catalogue
            </p>
            <h1 className="section-heading mt-5 text-5xl font-black sm:text-6xl lg:text-7xl">
              Everything a business needs to operate better.
            </h1>
          </div>
          <p className="video-copy max-w-2xl text-lg leading-8 text-white/62">
            Browse services, products, and resources we supply, configure, and
            support as part of a complete business operating stack.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#5d4dff]">
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
            variant="light"
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
          <h2 className="max-w-4xl text-5xl font-black leading-none text-balance">
            Need help choosing the right solution?
          </h2>
          <a
            href="mailto:hello@formalize.co.za"
            className="sharp-button inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
