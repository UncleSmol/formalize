"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/browser";

export function CartNavItem() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const supabase = createBrowserClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("profile_id", user.id);

      if (data) {
        setCount(data.reduce((sum, i) => sum + i.quantity, 0));
      }
    }

    load();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    function onCartUpdated() { load(); }
    window.addEventListener("cart-updated", onCartUpdated);

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="relative flex items-center px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-background/60 transition-colors hover:text-background"
    >
      <i className="bi-cart3 text-base" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
