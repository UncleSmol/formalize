import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCatalogueItemBySlug,
  getAllPublishedSlugs,
  getRelatedItems,
} from "@/lib/supabase/queries";
import { CatalogueSections } from "@/components/catalogue/CatalogueSections";
import { RelatedItems } from "@/components/catalogue/RelatedItems";
import { calculateDisplayPrice, formatPrice, getShippingText } from "@/lib/pricing";

interface CatalogueDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CatalogueDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCatalogueItemBySlug(slug);

  if (!item) return { title: "Not Found | Formalize" };

  return {
    title: `${item.title} | Formalize Catalogue`,
    description: item.short_description,
  };
}

const typeLabels: Record<string, string> = {
  service: "Service",
  product: "Product",
  resource: "Resource",
};

export default async function CatalogueDetailPage({
  params,
}: CatalogueDetailPageProps) {
  const { slug } = await params;
  const item = await getCatalogueItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const categoryIds = item.categories.map((cat) => cat.id);
  const relatedItems = await getRelatedItems(item.id, categoryIds);

  return (
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <i className="bi-arrow-left" aria-hidden="true" />
            All catalogue
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-white/40">
              {typeLabels[item.item_type] ?? item.item_type}
            </span>
            {item.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue?category=${cat.slug}`}
                className="border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-primary transition-colors hover:bg-white/10"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h1 className="section-heading text-5xl font-black sm:text-6xl lg:text-7xl">
                {item.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                {item.long_description}
              </p>

              {(() => {
                const price = calculateDisplayPrice(item);
                if (price == null) return null;
                const shipping = getShippingText(item);
                return (
                  <div className="mt-8">
                    <p className="text-4xl font-black text-primary">{formatPrice(price)}</p>
                    {shipping && (
                      <p className="mt-1 text-sm text-white/40">{shipping}</p>
                    )}
                  </div>
                );
              })()}
            </div>

            {item.hero_image_url && (
              <div className="overflow-hidden border border-white/10 bg-white/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.hero_image_url}
                  alt={item.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>

          {item.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-black uppercase tracking-wide text-white/40">
                Gallery
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.images.map((img) => (
                  <div
                    key={img.id}
                    className="overflow-hidden border border-white/10 bg-white/[0.03]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt_text || item.title}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CatalogueSections sections={item.sections} />

      <RelatedItems items={relatedItems} />

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em]">
              Interested?
            </p>
            <h2 className="section-heading mt-4 max-w-3xl text-4xl font-black leading-none sm:text-5xl">
              {item.cta_label} about {item.title.toLowerCase()}.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
