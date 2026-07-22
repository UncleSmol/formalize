"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";

interface AddToCartButtonProps {
  itemId: string;
  label?: string;
}

export function AddToCartButton({ itemId, label = "Add to Cart" }: AddToCartButtonProps) {
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  async function handleAdd() {
    setPending(true);

    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .upsert(
        { profile_id: user.id, catalogue_item_id: itemId, quantity: 1 },
        { onConflict: "profile_id,catalogue_item_id", ignoreDuplicates: false },
      );

    setPending(false);

    if (error) return;

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    router.refresh();
  }

  return (
    <button
      onClick={handleAdd}
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-wide transition-all ${
        added
          ? "bg-green-500 text-white"
          : "bg-primary text-[#08080c] hover:opacity-90"
      } disabled:opacity-50`}
    >
      <i className={`${added ? "bi-check-lg" : "bi-cart-plus"} text-base`} aria-hidden="true" />
      {pending ? "Adding..." : added ? "Added!" : label}
    </button>
  );
}
