import type { CatalogueItemWithRelations } from "@/lib/supabase/types";
import { CatalogueGrid } from "./CatalogueGrid";

interface RelatedItemsProps {
  items: CatalogueItemWithRelations[];
}

export function RelatedItems({ items }: RelatedItemsProps) {
  if (items.length === 0) return null;

  return (
    <section className="bg-[#08080c] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
          Related
        </p>
        <h2 className="mt-5 max-w-3xl text-4xl font-black leading-none text-balance sm:text-5xl">
          Explore more from the catalogue
        </h2>
        <div className="mt-12">
          <CatalogueGrid items={items} variant="dark" />
        </div>
      </div>
    </section>
  );
}
