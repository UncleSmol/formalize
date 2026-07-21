import type { CatalogueItem } from "@/lib/supabase/types";

export function calculateDisplayPrice(item: CatalogueItem): number | null {
  if (item.cost_price == null) return null;

  if (item.selling_price_overridden && item.selling_price != null) {
    return item.selling_price;
  }

  return item.cost_price * (1 + item.markup_percent / 100);
}

export function formatPrice(price: number): string {
  return `R${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function getShippingText(item: CatalogueItem): string | null {
  if (!item.requires_shipping) return null;

  const fee = item.shipping_overridden ? item.shipping_fee : item.shipping_fee;
  if (fee > 0) return `+ ${formatPrice(fee)} shipping`;
  return "Shipping available";
}
