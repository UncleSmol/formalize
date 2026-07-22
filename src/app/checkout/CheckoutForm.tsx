"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "./actions";
import { formatPrice } from "@/lib/pricing";

interface CheckoutItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

interface CheckoutFormProps {
  items: CheckoutItem[];
  subtotal: number;
  profile: {
    full_name: string;
    email: string;
    company_name: string;
    phone: string;
  };
}

export function CheckoutForm({ items, subtotal, profile }: CheckoutFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitOrder(formData);

    setPending(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.orderRef) {
      router.push(`/checkout/confirmation/${result.orderRef}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm font-bold text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
          Items
        </h3>
        <div className="divide-y divide-white/10">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span className="text-sm text-white/80">
                {item.title} <span className="text-white/40">×{item.quantity}</span>
              </span>
              <span className="text-sm font-bold">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3">
          <span className="font-bold">Total</span>
          <span className="text-xl font-black text-primary">{formatPrice(subtotal)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
          Your Details
        </h3>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
            Name
          </label>
          <input
            name="name"
            defaultValue={profile.full_name}
            readOnly
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
            Email
          </label>
          <input
            name="email"
            defaultValue={profile.email}
            readOnly
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
            Company (optional)
          </label>
          <input
            name="company"
            defaultValue={profile.company_name}
            readOnly
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/50"
          />
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
            Order Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="Any special instructions..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit Order"}
      </button>

      <p className="text-center text-xs text-white/40">
        By submitting, you agree to our terms and will receive an invoice with banking details for EFT payment.
      </p>
    </form>
  );
}
