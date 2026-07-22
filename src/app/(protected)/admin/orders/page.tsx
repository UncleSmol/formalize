import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceRoleClient } from "@/lib/supabase/client";

export const metadata = { title: "Orders | Admin" };

const statusColors: Record<string, string> = {
  pending_payment: "bg-yellow-100 text-yellow-700 border-yellow-300",
  paid: "bg-blue-100 text-blue-700 border-blue-300",
  processing: "bg-purple-100 text-purple-700 border-purple-300",
  fulfilled: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-gray-100 text-gray-500 border-gray-300",
};

export default async function AdminOrdersPage() {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          {orders?.length ?? 0} order{(orders?.length ?? 0) !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-bold text-gray-500">Order Ref</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Customer</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Status</th>
              <th className="px-4 py-3 text-right font-bold text-gray-500">Total</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Date</th>
              <th className="px-4 py-3 text-right font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold">{order.order_ref}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{order.profiles?.full_name ?? "Unknown"}</p>
                  <p className="text-xs text-gray-400">{order.profiles?.email ?? ""}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block border px-2 py-0.5 text-xs font-bold uppercase ${
                    statusColors[order.status] ?? "bg-gray-100 text-gray-500"
                  }`}>
                    {order.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-bold">
                  R{Number(order.total).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString("en-ZA")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!orders || orders.length === 0) && (
          <div className="py-16 text-center">
            <p className="text-gray-500">No orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
