import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceRoleClient } from "@/lib/supabase/client";

interface ConfirmationPageProps {
  params: Promise<{ orderRef: string }>;
}

export const metadata = { title: "Order Confirmed | Formalize" };

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderRef } = await params;

  const supabase = createServiceRoleClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id, order_ref, total, created_at, status")
    .eq("order_ref", orderRef)
    .single();

  if (!order) notFound();

  return (
    <main className="px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <i className="bi-check-circle-fill text-4xl text-primary" aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-4xl font-black">Order Confirmed</h1>
        <p className="mt-4 text-white/60">
          Thank you for your order. Your reference number is:
        </p>

        <div className="mt-4 inline-block border border-white/20 bg-white/[0.03] px-6 py-3">
          <code className="text-xl font-black tracking-widest text-primary">
            {order.order_ref}
          </code>
        </div>

        <div className="mt-8 rounded border border-primary/30 bg-primary/10 p-6 text-left">
          <h3 className="font-black text-primary">How to Complete Your Payment</h3>
          <ol className="mt-3 space-y-2 text-sm text-white/70">
            <li>1. Make an EFT to the banking details below.</li>
            <li>2. Use <strong className="text-primary">{order.order_ref}</strong> as your payment reference.</li>
            <li>3. Email your proof of payment to <strong className="text-primary">inquiries@formalize.co.za</strong> with the reference as the subject.</li>
            <li>4. We will confirm receipt and begin processing your order.</li>
          </ol>

          <div className="mt-4 rounded border border-white/10 bg-white/[0.03] p-4 text-sm">
            <p className="font-bold text-white">Banking Details</p>
            <p className="mt-2 text-white/60">Bank: First National Bank</p>
            <p className="text-white/60">Account Holder: Formalize (Pty) Ltd</p>
            <p className="text-white/60">Account: 628 4157 2391</p>
            <p className="text-white/60">Branch: 255 005</p>
            <p className="mt-2 text-primary">Reference: {order.order_ref}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/account/orders"
            className="bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c]"
          >
            View my orders
          </Link>
          <Link
            href="/catalogue"
            className="border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/80"
          >
            Continue browsing
          </Link>
        </div>
      </div>
    </main>
  );
}
