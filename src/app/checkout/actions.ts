"use server";

import { createClientWithCookies, createServiceRoleClient } from "@/lib/supabase/client";
import { getCart, clearCartAction } from "@/lib/cart";
import { sendOrderEmails } from "@/lib/email";

function generateOrderRef(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FML-${y}${m}${d}-${rand}`;
}

export interface CheckoutState {
  success?: boolean;
  error?: string;
  orderRef?: string;
  orderId?: string;
}

export async function submitOrder(formData: FormData): Promise<CheckoutState> {
  const supabase = await createClientWithCookies();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in to place an order." };

  const cart = await getCart(user.id);
  if (cart.length === 0) return { error: "Your cart is empty." };

  const notes = formData.get("notes") as string || "";

  const subtotal = cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const adminClient = createServiceRoleClient();

  const { data: profile } = await adminClient
    .from("profiles")
    .select("full_name, email, company_name, phone")
    .eq("id", user.id)
    .single();

  const orderRef = generateOrderRef();
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const { data: order, error: orderError } = await adminClient
    .from("orders")
    .insert({
      order_ref: orderRef,
      profile_id: user.id,
      status: "pending_payment",
      subtotal,
      shipping_fee: shippingFee,
      total,
      notes: notes || null,
    })
    .select("id")
    .single();

  if (orderError || !order) return { error: "Failed to create order. Please try again." };

  const { error: itemsError } = await adminClient
    .from("order_items")
    .insert(
      cart.map((item) => ({
        order_id: order.id,
        catalogue_item_id: item.catalogue_item_id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
    );

  if (itemsError) return { error: "Failed to save order items." };

  await adminClient.from("payments").insert({
    order_id: order.id,
    method: "eft",
    status: "pending",
    amount: total,
  });

  await clearCartAction(user.id);

  await sendOrderEmails({
    orderRef,
    customerName: profile?.full_name || "Customer",
    customerEmail: profile?.email || user.email || "",
    customerPhone: profile?.phone || "",
    items: cart,
    subtotal,
    shippingFee,
    total,
  });

  return { success: true, orderRef, orderId: order.id };
}
