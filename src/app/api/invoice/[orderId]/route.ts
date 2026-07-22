import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/client";
import { generateInvoiceHtml } from "@/lib/invoice";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;
  const supabase = createServiceRoleClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email, company_name)")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const { data: orderItems } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  const html = generateInvoiceHtml({
    orderRef: order.order_ref,
    createdAt: order.created_at,
    customerName: order.profiles?.full_name ?? "Customer",
    customerEmail: order.profiles?.email ?? "",
    customerCompany: order.profiles?.company_name ?? null,
    items: (orderItems ?? []).map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
    })),
    subtotal: Number(order.subtotal),
    shippingFee: Number(order.shipping_fee),
    total: Number(order.total),
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `inline; filename="invoice-${order.order_ref}.html"`,
    },
  });
}
