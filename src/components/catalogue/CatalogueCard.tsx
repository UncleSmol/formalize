"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
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
  const imageUrl = item.card_image_url ?? item.hero_image_url ?? item.images[0]?.url;
  const displayPrice = calculateDisplayPrice(item);
  const shippingText = getShippingText(item);
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  async function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPending(true);

    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    await supabase.from("cart_items").upsert(
      { profile_id: user.id, catalogue_item_id: item.id, quantity: 1 },
      { onConflict: "profile_id,catalogue_item_id", ignoreDuplicates: false },
    );

    setPending(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }

  return (
  <article
  className={`group relative transition-colors ${
  isLight
  ? "bg-white hover:bg-[#08080c] hover:text-white"
  : "bg-[#08080c] hover:bg-white/5"
  } p-7`}
  >
  {imageUrl && (
  <div className="relative mb-6 overflow-hidden border border-white/10 bg-white">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
  src={imageUrl}
  alt={item.title}
  className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
  loading="lazy"
  />
  <button
  onClick={handleQuickAdd}
  disabled={pending}
  className={`absolute bottom-2 right-2 z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wide shadow-lg transition-all duration-200 ${
  added
  ? "bg-green-500 text-white"
  : "bg-primary text-[#08080c] opacity-0 group-hover:opacity-100"
  } disabled:opacity-50`}
  >
  <i className={`${added ? "bi-check-lg" : "bi-cart-plus"} text-sm`} aria-hidden="true" />
  {pending ? "..." : added ? "Added" : "Quick Add"}
  </button>
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
