import Link from "next/link";
import { redirect } from "next/navigation";
import { createClientWithCookies, createServiceRoleClient } from "@/lib/supabase/client";
import { calculateDisplayPrice, formatPrice } from "@/lib/pricing";
import { CartItemList } from "./CartItemList";
import type { CatalogueItem } from "@/lib/supabase/types";

export const metadata = { title: "Cart | Formalize" };

export default async function CartPage() {
  const supabase = await createClientWithCookies();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const adminClient = createServiceRoleClient();

  const { data: cartItems } = await adminClient
    .from("cart_items")
    .select("catalogue_item_id, quantity")
    .eq("profile_id", user.id);

  let items: { id: string; title: string; slug: string; quantity: number; unitPrice: number; imageUrl: string | null }[] = [];

  if (cartItems && cartItems.length > 0) {
    const { data: catalogue } = await adminClient
      .from("catalogue_items")
      .select("id, slug, title, card_image_url, cost_price, markup_percent, selling_price, selling_price_overridden")
      .in("id", cartItems.map((c) => c.catalogue_item_id))
      .is("deleted_at", null);

    if (catalogue) {
      items = cartItems.map((ci) => {
        const item = (catalogue as CatalogueItem[]).find((c) => c.id === ci.catalogue_item_id);
        return {
          id: ci.catalogue_item_id,
          title: item?.title ?? "Unknown",
          slug: item?.slug ?? "",
          quantity: ci.quantity,
          unitPrice: item ? calculateDisplayPrice(item) ?? 0 : 0,
          imageUrl: item?.card_image_url ?? null,
        };
      });
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <main className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black">Cart</h1>
        <p className="mt-2 text-sm text-white/60">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <i className="bi-cart3 text-5xl text-white/20" aria-hidden="true" />
            <p className="mt-4 text-white/50">Your cart is empty.</p>
            <Link
              href="/catalogue"
              className="mt-6 inline-block bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c]"
            >
              Browse catalogue
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <CartItemList items={items} />

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-lg text-white/60">Subtotal</p>
                <p className="text-2xl font-black">{formatPrice(subtotal)}</p>
              </div>
              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
