"use client";

import { useEffect, useState } from "react";
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

export function CartSidebar() {
 const [open, setOpen] = useState(false);
 const [items, setItems] = useState<CartItem[]>([]);
 const [pendingId, setPendingId] = useState<string | null>(null);

 useEffect(() => {
 function onToggle() { setOpen((prev) => !prev); }
 window.addEventListener("cart-toggle", onToggle);
 return () => window.removeEventListener("cart-toggle", onToggle);
 }, []);

 useEffect(() => {
 if (!open) return;

 let cancelled = false;

 async function load() {
 const supabase = createBrowserClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user || cancelled) { if (!cancelled) setItems([]); return; }

 const { data: cartItems } = await supabase
 .from("cart_items")
 .select("catalogue_item_id, quantity")
 .eq("profile_id", user.id);

 if (!cartItems || cartItems.length === 0) { if (!cancelled) setItems([]); return; }

 const { data: catalogue } = await supabase
 .from("catalogue_items")
 .select("id, slug, title, card_image_url, cost_price, markup_percent, selling_price, selling_price_overridden")
 .in("id", cartItems.map((c) => c.catalogue_item_id))
 .is("deleted_at", null);

 if (!catalogue || cancelled) { if (!cancelled) setItems([]); return; }

 const mapped = cartItems.map((ci) => {
 const item = catalogue.find((c: Record<string, unknown>) => c.id === ci.catalogue_item_id) as Record<string, unknown> | undefined;
 const cost = item?.cost_price as number | null;
 const markup = (item?.markup_percent as number) ?? 35;
 const sellingOverridden = item?.selling_price_overridden as boolean;
 const selling = item?.selling_price as number | null;
 const unitPrice = sellingOverridden && selling != null ? selling : (cost != null ? cost * (1 + markup / 100) : 0);
 return {
 id: ci.catalogue_item_id,
 title: (item?.title as string) ?? "Unknown",
 slug: (item?.slug as string) ?? "",
 quantity: ci.quantity,
 unitPrice: Math.round(unitPrice * 100) / 100,
 imageUrl: (item?.card_image_url as string | null) ?? null,
 };
 });

 if (!cancelled) setItems(mapped);
 }

 load();
 return () => { cancelled = true; };
 }, [open]);

 async function updateQuantity(id: string, delta: number) {
 setPendingId(id);
 const supabase = createBrowserClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) { setPendingId(null); return; }

 const item = items.find((i) => i.id === id);
 if (!item) { setPendingId(null); return; }

 const newQty = item.quantity + delta;

 if (newQty <= 0) {
 await supabase.from("cart_items").delete().eq("profile_id", user.id).eq("catalogue_item_id", id);
 setItems((prev) => prev.filter((i) => i.id !== id));
 } else {
 await supabase.from("cart_items").update({ quantity: newQty }).eq("profile_id", user.id).eq("catalogue_item_id", id);
 setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
 }

 setPendingId(null);
 window.dispatchEvent(new CustomEvent("cart-updated"));
 }

 async function removeItem(id: string) {
 setPendingId(id);
 const supabase = createBrowserClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) { setPendingId(null); return; }

 await supabase.from("cart_items").delete().eq("profile_id", user.id).eq("catalogue_item_id", id);
 setItems((prev) => prev.filter((i) => i.id !== id));
 setPendingId(null);
 window.dispatchEvent(new CustomEvent("cart-updated"));
 }

 const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

 return (
 <>
 {open && (
 <div
 className="fixed inset-0 z-[1030] bg-black/60"
 onClick={() => setOpen(false)}
 />
 )}

 <div
 className={`fixed inset-y-0 right-0 z-[1040] flex flex-col bg-[#101018] shadow-2xl transition-transform duration-300 ${
 open ? "translate-x-0" : "translate-x-full"
 } w-full sm:max-w-lg`}
 >
 <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
 <h2 className="text-lg font-black">Cart</h2>
 <button
 onClick={() => setOpen(false)}
 className="flex h-8 w-8 cursor-pointer items-center justify-center text-white/40 hover:text-white"
 aria-label="Close cart"
 >
 <i className="bi-x-lg" aria-hidden="true" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto px-6 py-4">
 {items.length === 0 ? (
 <div className="mt-20 text-center">
 <i className="bi-cart3 text-4xl text-white/20" aria-hidden="true" />
 <p className="mt-4 text-sm text-white/40">Your cart is empty.</p>
 <Link
 href="/catalogue"
 onClick={() => setOpen(false)}
 className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-black uppercase tracking-wide text-[#08080c]"
 >
 Browse catalogue
 </Link>
 </div>
 ) : (
 <div className="divide-y divide-white/10">
 {items.map((item) => (
 <div key={item.id} className="flex items-center gap-3 py-4">
 <div className="min-w-0 flex-1">
 <Link
 href={`/catalogue/${item.slug}`}
 onClick={() => setOpen(false)}
 className="text-sm font-semibold text-white hover:text-primary"
 >
 {item.title}
 </Link>
 <p className="mt-0.5 text-xs text-white/40">{formatPrice(item.unitPrice)} each</p>
 </div>

 <div className="flex items-center gap-1">
 <button
 onClick={() => updateQuantity(item.id, -1)}
 disabled={pendingId === item.id}
 className="flex h-7 w-7 items-center justify-center border border-white/20 text-xs text-white/60 hover:border-white/40 disabled:opacity-30"
 >
 <i className="bi-dash" aria-hidden="true" />
 </button>
 <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
 <button
 onClick={() => updateQuantity(item.id, 1)}
 disabled={pendingId === item.id}
 className="flex h-7 w-7 items-center justify-center border border-white/20 text-xs text-white/60 hover:border-white/40 disabled:opacity-30"
 >
 <i className="bi-plus" aria-hidden="true" />
 </button>
 </div>

 <p className="w-20 text-right text-sm font-bold">{formatPrice(item.unitPrice * item.quantity)}</p>

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
 )}
 </div>

 {items.length > 0 && (
 <div className="border-t border-white/10 px-6 py-5">
 <div className="flex items-center justify-between">
 <p className="text-sm text-white/60">Subtotal</p>
 <p className="text-lg font-black">{formatPrice(subtotal)}</p>
 </div>
 <Link
 href="/checkout"
 onClick={() => setOpen(false)}
 className="mt-4 flex w-full justify-center bg-primary px-6 py-3 text-xs font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
 >
 Proceed to Checkout
 </Link>
 </div>
 )}
 </div>
 </>
 );
}
