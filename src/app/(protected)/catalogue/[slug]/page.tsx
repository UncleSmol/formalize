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
      <section className="video-section premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/catalogue"
            className="sharp-button inline-flex items-center gap-2 border border-white/12 bg-white/6 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <i className="bi-arrow-left" aria-hidden="true" />
            All catalogue
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="sharp-chip border border-white/12 px-3 py-1 text-xs font-black uppercase tracking-wide text-white/50">
              {typeLabels[item.item_type] ?? item.item_type}
            </span>
            {item.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue?category=${cat.slug}`}
                className="sharp-chip border border-white/12 px-3 py-1 text-xs font-black uppercase tracking-wide text-primary transition-colors hover:bg-white/10"
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
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                {item.long_description}
              </p>
            </div>

            {item.hero_image_url && (
              <div className="sharp-frame overflow-hidden border border-white/10 bg-white/6">
                <img
                  src={item.hero_image_url}
                  alt={item.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
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
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-none text-balance sm:text-5xl">
              {item.cta_label} about {item.title.toLowerCase()}.
            </h2>
          </div>
          <Link
            href="/contact"
            className="sharp-button inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
