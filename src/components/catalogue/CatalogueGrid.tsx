import type { CatalogueItemWithRelations } from "@/lib/supabase/types";
import { CatalogueCard } from "./CatalogueCard";

interface CatalogueGridProps {
  items: CatalogueItemWithRelations[];
  variant?: "dark" | "light";
  emptyMessage?: string;
}

export function CatalogueGrid({
  items,
  variant = "dark",
  emptyMessage = "No catalogue items found.",
}: CatalogueGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold text-white/58">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CatalogueCard key={item.id} item={item} variant={variant} />
      ))}
    </div>
  );
}
