import "server-only";

import type { CatalogueItem } from "@/lib/supabase/types";
import { createServiceRoleClient } from "@/lib/supabase/client";
import { calculateDisplayPrice } from "@/lib/pricing";

type CatalogueItemRow = Pick<CatalogueItem,
  | "id" | "slug" | "title" | "card_image_url"
  | "cost_price" | "markup_percent" | "selling_price"
  | "selling_price_overridden" | "requires_shipping"
  | "shipping_fee" | "shipping_overridden"
>;

export interface CartItem {
  catalogue_item_id: string;
  title: string;
  quantity: number;
  unit_price: number;
  image_url: string | null;
  slug: string;
}

export async function getCart(userId: string): Promise<CartItem[]> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity, catalogue_item_id")
    .eq("profile_id", userId);

  if (error || !data || data.length === 0) return [];

  const itemIds = data.map((d) => d.catalogue_item_id);

  const { data: catalogueItems, error: itemsError } = await supabase
    .from("catalogue_items")
    .select("id, slug, title, card_image_url, cost_price, markup_percent, selling_price, selling_price_overridden, requires_shipping, shipping_fee, shipping_overridden")
    .in("id", itemIds)
    .is("deleted_at", null);

  if (itemsError || !catalogueItems) return [];

  const items = catalogueItems as CatalogueItemRow[];
  const priceMap = new Map(items.map((i) => [i.id, calculateDisplayPrice(i as CatalogueItem)]));

  return data.map((d) => {
    const item = items.find((i) => i.id === d.catalogue_item_id);
    return {
      catalogue_item_id: d.catalogue_item_id,
      title: item?.title ?? "Unknown",
      quantity: d.quantity,
      unit_price: priceMap.get(d.catalogue_item_id) ?? 0,
      image_url: item?.card_image_url ?? null,
      slug: item?.slug ?? "",
    };
  });
}

export async function addToCartAction(userId: string, catalogueItemId: string, quantity: number) {
  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("profile_id", userId)
    .eq("catalogue_item_id", catalogueItemId)
    .single();

  if (existing) {
    await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("profile_id", userId)
      .eq("catalogue_item_id", catalogueItemId);
  } else {
    await supabase
      .from("cart_items")
      .insert({ profile_id: userId, catalogue_item_id: catalogueItemId, quantity });
  }
}

export async function removeFromCartAction(userId: string, catalogueItemId: string) {
  const supabase = createServiceRoleClient();
  await supabase
    .from("cart_items")
    .delete()
    .eq("profile_id", userId)
    .eq("catalogue_item_id", catalogueItemId);
}

export async function updateCartQuantityAction(userId: string, catalogueItemId: string, quantity: number) {
  const supabase = createServiceRoleClient();

  if (quantity <= 0) {
    await removeFromCartAction(userId, catalogueItemId);
    return;
  }

  await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("profile_id", userId)
    .eq("catalogue_item_id", catalogueItemId);
}

export async function clearCartAction(userId: string) {
  const supabase = createServiceRoleClient();
  await supabase.from("cart_items").delete().eq("profile_id", userId);
}
