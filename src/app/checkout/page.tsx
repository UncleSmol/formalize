import { redirect } from "next/navigation";
import { createClientWithCookies, createServiceRoleClient } from "@/lib/supabase/client";
import { calculateDisplayPrice } from "@/lib/pricing";
import { CheckoutForm } from "./CheckoutForm";
import type { CatalogueItem } from "@/lib/supabase/types";

export const metadata = { title: "Checkout | Formalize" };

export default async function CheckoutPage() {
  const supabase = await createClientWithCookies();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const adminClient = createServiceRoleClient();

  const { data: profile } = await adminClient
    .from("profiles")
    .select("full_name, email, company_name, phone")
    .eq("id", user.id)
    .single();

  const { data: cartItems } = await adminClient
    .from("cart_items")
    .select("catalogue_item_id, quantity")
    .eq("profile_id", user.id);

  if (!cartItems || cartItems.length === 0) redirect("/cart");

  const { data: catalogue } = await adminClient
    .from("catalogue_items")
    .select("id, slug, title, card_image_url, cost_price, markup_percent, selling_price, selling_price_overridden")
    .in("id", cartItems.map((c) => c.catalogue_item_id))
    .is("deleted_at", null);

  const items = (cartItems ?? []).map((ci) => {
    const item = (catalogue as CatalogueItem[] | null)?.find((c) => c.id === ci.catalogue_item_id);
    return {
      id: ci.catalogue_item_id,
      title: item?.title ?? "Unknown",
      quantity: ci.quantity,
      unitPrice: calculateDisplayPrice(item as CatalogueItem) ?? 0,
    };
  });

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <main className="px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-black">Checkout</h1>
        <p className="mt-2 text-sm text-white/60">Review your order and submit.</p>

        <div className="mt-8 rounded border border-white/10 bg-white/[0.03] p-6">
          <CheckoutForm
            items={items}
            subtotal={subtotal}
            profile={{
              full_name: profile?.full_name ?? "",
              email: profile?.email ?? user.email ?? "",
              company_name: profile?.company_name ?? "",
              phone: profile?.phone ?? "",
            }}
          />
        </div>
      </div>
    </main>
  );
}
