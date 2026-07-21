import Link from "next/link";
import type { CatalogueItemWithRelations } from "@/lib/supabase/types";
import { calculateDisplayPrice, formatPrice, getShippingText } from "@/lib/pricing";

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
  const imageUrl = item.card_image_url ?? item.hero_image_url;
  const displayPrice = calculateDisplayPrice(item);
  const shippingText = getShippingText(item);

  return (
    <article
      className={`group relative transition-colors ${
        isLight
          ? "bg-white hover:bg-[#08080c] hover:text-white"
          : "bg-[#08080c] hover:bg-white/5"
      } p-7`}
    >
      {imageUrl && (
        <div className="mb-6 overflow-hidden border border-white/10 bg-white/[0.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={item.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          <span
            className={`border px-3 py-1 text-xs font-black uppercase tracking-wide ${
              isLight
                ? "border-black/10 text-black/40 group-hover:border-white/20 group-hover:text-white/50"
                : "border-white/10 text-white/40"
            }`}
          >
            {typeLabels[item.item_type] ?? item.item_type}
          </span>
          {item.categories.slice(0, 2).map((cat) => (
            <span
              key={cat.id}
              className={`border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                isLight
                  ? "border-black/10 text-black/40 group-hover:border-white/20 group-hover:text-white/50"
                  : "border-white/10 text-white/40"
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
            ? "text-black/50 group-hover:text-white/60"
            : "text-white/50"
        }`}
      >
        {item.short_description}
      </p>

      {displayPrice != null && (
        <p className="mt-4 text-xl font-black text-primary">
          {formatPrice(displayPrice)}
          {shippingText && (
            <span className="ml-2 text-xs font-semibold text-white/40">
              {shippingText}
            </span>
          )}
        </p>
      )}

      <div
        className={`mt-8 flex items-center justify-between border-t pt-5 ${
          isLight
            ? "border-black/10 group-hover:border-white/20"
            : "border-white/10"
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {item.cta_label}
        </span>
        <i
          className="bi-arrow-up-right text-sm text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
