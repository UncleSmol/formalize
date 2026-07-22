"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/browser";
import { formatPrice } from "@/lib/pricing";

interface CartItem {
  id: string;
  title: string;
  slug: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string | null;
}

interface CartItemListProps {
  items: CartItem[];
}

export function CartItemList({ items: initialItems }: CartItemListProps) {
  const [items, setItems] = useState(initialItems);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const router = useRouter();

  async function updateQuantity(id: string, delta: number) {
    setPendingId(id);
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("profile_id", user.id)
        .eq("catalogue_item_id", id);

      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .eq("profile_id", user.id)
        .eq("catalogue_item_id", id);

      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
    }

    setPendingId(null);
    router.refresh();
  }

  async function removeItem(id: string) {
    setPendingId(id);
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("cart_items")
      .delete()
      .eq("profile_id", user.id)
      .eq("catalogue_item_id", id);

    setItems((prev) => prev.filter((i) => i.id !== id));
    setPendingId(null);
    router.refresh();
  }

  return (
    <div className="divide-y divide-white/10 border border-white/10">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4">
          <div className="min-w-0 flex-1">
            <Link href={`/catalogue/${item.slug}`} className="font-semibold text-white hover:text-primary">
              {item.title}
            </Link>
            <p className="mt-1 text-sm text-white/40">{formatPrice(item.unitPrice)} each</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              disabled={pendingId === item.id}
              className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/60 hover:border-white/40 disabled:opacity-30"
            >
              <i className="bi-dash" aria-hidden="true" />
            </button>
            <span className="w-8 text-center font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              disabled={pendingId === item.id}
              className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/60 hover:border-white/40 disabled:opacity-30"
            >
              <i className="bi-plus" aria-hidden="true" />
            </button>
          </div>

          <p className="w-24 text-right font-bold">{formatPrice(item.unitPrice * item.quantity)}</p>

          <button
            onClick={() => removeItem(item.id)}
            disabled={pendingId === item.id}
            className="text-white/30 hover:text-red-400 disabled:opacity-30"
            title="Remove"
          >
            <i className="bi-trash" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
