"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    const supabase = createBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setPending(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <main className="flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-sm text-center">
          <i className="bi-envelope-check-fill text-3xl text-primary" aria-hidden="true" />
          <h1 className="mt-3 text-lg font-black text-white">Check your email</h1>
          <p className="mt-2 text-sm text-white/60">
            If an account exists, we sent a password reset link.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-white">Reset password</h1>
        <p className="mt-2 text-sm text-white/60">
          Enter your email and we will send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="border border-red-400/30 bg-red-400/10 p-4">
              <p className="text-sm font-bold text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </main>
  );
}
