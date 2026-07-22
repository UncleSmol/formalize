import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceRoleClient } from "@/lib/supabase/client";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Order Detail | Admin" };

const statusOptions = [
  { value: "pending_payment", label: "Pending Payment" },
  { value: "paid", label: "Paid" },
  { value: "processing", label: "Processing" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
];

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const supabase = createServiceRoleClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email, company_name, phone), payments(*)")
    .eq("id", id)
    .single();

  if (!order) notFound();

  const { data: orderItems } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  async function updateOrderStatus(formData: FormData) {
    "use server";

    await requireAdmin();

    const newStatus = formData.get("status") as string;
    const popReference = formData.get("pop_reference") as string;
    const adminNotes = formData.get("notes") as string;

    const client = createServiceRoleClient();

    if (newStatus === "paid" && popReference) {
      await client.from("payments").update({ status: "paid", pop_reference: popReference, paid_at: new Date().toISOString() }).eq("order_id", id);
    }

    await client.from("orders").update({
      status: newStatus as "pending_payment" | "paid" | "processing" | "fulfilled" | "cancelled",
      notes: adminNotes || null,
    }).eq("id", id);

    redirect("/admin/orders");
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/orders" className="text-sm font-bold text-primary underline">&larr; Back to orders</Link>
        <h1 className="mt-2 text-3xl font-black">{order.order_ref}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Placed {new Date(order.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Customer</h2>
          <div className="mt-3 space-y-1 text-sm">
            <p className="font-semibold text-gray-900">{order.profiles?.full_name}</p>
            <p className="text-gray-500">{order.profiles?.email}</p>
            {order.profiles?.phone && <p className="text-gray-500">{order.profiles.phone}</p>}
            {order.profiles?.company_name && <p className="text-gray-500">{order.profiles.company_name}</p>}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Payment</h2>
          <div className="mt-3 space-y-1 text-sm">
            <p className="text-gray-900">R{Number(order.total).toFixed(2)} total</p>
            {order.payments?.[0] && (
              <>
                <p className="text-gray-500">Method: {order.payments[0].method?.toUpperCase()}</p>
                <p className="text-gray-500">Status: {order.payments[0].status}</p>
                {order.payments[0].pop_reference && (
                  <p className="text-gray-500">POP Ref: {order.payments[0].pop_reference}</p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Items</h2>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-2 font-bold text-gray-500">Item</th>
                <th className="pb-2 text-center font-bold text-gray-500">Qty</th>
                <th className="pb-2 text-right font-bold text-gray-500">Price</th>
                <th className="pb-2 text-right font-bold text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {(orderItems ?? []).map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2 font-semibold text-gray-900">{item.title}</td>
                  <td className="py-2 text-center text-gray-500">{item.quantity}</td>
                  <td className="py-2 text-right text-gray-500">R{Number(item.unit_price).toFixed(2)}</td>
                  <td className="py-2 text-right font-bold">R{(item.quantity * Number(item.unit_price)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Update Status</h2>
          <form action={updateOrderStatus} className="mt-4 flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">Status</label>
              <select
                name="status"
                defaultValue={order.status}
                className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0 flex-1">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">POP Reference</label>
              <input
                name="pop_reference"
                defaultValue={order.payments?.[0]?.pop_reference ?? ""}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none"
                placeholder="e.g. EFT12345"
              />
            </div>

            <div className="min-w-0 flex-1">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">Notes</label>
              <input
                name="notes"
                defaultValue={order.notes ?? ""}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none"
                placeholder="Admin notes..."
              />
            </div>

            <button
              type="submit"
              className="bg-primary px-5 py-2 text-sm font-black uppercase tracking-wide text-white shadow-sm"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
