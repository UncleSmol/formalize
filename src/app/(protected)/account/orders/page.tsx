import Link from "next/link";
import { redirect } from "next/navigation";
import { createClientWithCookies, createServiceRoleClient } from "@/lib/supabase/client";

export const metadata = { title: "My Orders | Formalize" };

const statusLabels: Record<string, string> = {
  pending_payment: "Pending Payment",
  paid: "Paid",
  processing: "Processing",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

const statusColors: Record<string, string> = {
  pending_payment: "text-yellow-400 border-yellow-400/30",
  paid: "text-blue-400 border-blue-400/30",
  processing: "text-purple-400 border-purple-400/30",
  fulfilled: "text-green-400 border-green-400/30",
  cancelled: "text-gray-500 border-gray-500/30",
};

export default async function AccountOrdersPage() {
  const supabase = await createClientWithCookies();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const adminClient = createServiceRoleClient();

  const { data: orders } = await adminClient
    .from("orders")
    .select("id, order_ref, status, total, created_at")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black">My Orders</h1>
        <p className="mt-2 text-sm text-white/60">
          {orders?.length ?? 0} order{(orders?.length ?? 0) !== 1 ? "s" : ""}
        </p>
      </div>

      {(!orders || orders.length === 0) ? (
        <div className="rounded border border-white/10 bg-white/[0.03] py-16 text-center">
          <i className="bi-box-seam text-4xl text-white/20" aria-hidden="true" />
          <p className="mt-3 text-white/50">No orders yet.</p>
          <Link
            href="/catalogue"
            className="mt-4 inline-block bg-primary px-6 py-3 text-sm font-black uppercase tracking-wide text-[#08080c]"
          >
            Browse catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <code className="font-mono text-sm font-bold text-primary">
                    {order.order_ref}
                  </code>
                  <p className="mt-1 text-xs text-white/40">
                    {new Date(order.created_at).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`inline-block border px-3 py-1 text-xs font-bold uppercase ${
                    statusColors[order.status] ?? "text-gray-400"
                  }`}
                >
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <p className="text-lg font-black text-white">
                  R{Number(order.total).toFixed(2)}
                </p>
                <Link
                  href={`/api/invoice/${order.id}`}
                  className="text-xs font-bold uppercase tracking-wide text-primary underline"
                >
                  View Invoice
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
