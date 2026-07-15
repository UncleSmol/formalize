import Link from "next/link";
import type { CatalogueItemWithRelations } from "@/lib/supabase/types";

const typeLabels: Record<string, string> = {
  service: "Service",
  product: "Product",
  resource: "Resource",
};

interface CatalogueCardProps {
  item: CatalogueItemWithRelations;
  variant?: "dark" | "light";
}

export function CatalogueCard({ item, variant = "dark" }: CatalogueCardProps) {
  const isLight = variant === "light";

  return (
    <article
      className={`group transition-colors ${
        isLight
          ? "bg-[#f8f5ed] hover:bg-[#08080c] hover:text-white"
          : "bg-white/6 hover:bg-white/10"
      } p-7`}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          <span
            className={`sharp-chip border px-3 py-1 text-xs font-black uppercase tracking-wide ${
              isLight
                ? "border-[#08080c]/10 text-[#08080c]/46 group-hover:border-white/12 group-hover:text-white/50"
                : "border-white/12 text-white/46"
            }`}
          >
            {typeLabels[item.item_type] ?? item.item_type}
          </span>
          {item.categories.slice(0, 2).map((cat) => (
            <span
              key={cat.id}
              className={`sharp-chip border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                isLight
                  ? "border-[#08080c]/10 text-[#08080c]/46 group-hover:border-white/12 group-hover:text-white/50"
                  : "border-white/12 text-white/46"
              }`}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <h2
        className={`mt-8 text-2xl font-black leading-tight ${
          isLight ? "text-[#08080c] group-hover:text-white" : "text-white"
        }`}
      >
        <Link href={`/catalogue/${item.slug}`}>
          <span className="absolute inset-0" />
          {item.title}
        </Link>
      </h2>

      <p
        className={`mt-4 text-sm leading-6 ${
          isLight
            ? "text-[#08080c]/58 group-hover:text-white/62"
            : "text-white/58"
        }`}
      >
        {item.short_description}
      </p>

      <div
        className={`mt-8 flex items-center justify-between border-t pt-5 ${
          isLight
            ? "border-[#08080c]/10 group-hover:border-white/12"
            : "border-white/10"
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {item.cta_label}
        </span>
        <i
          className="bi-arrow-up-right text-sm text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
