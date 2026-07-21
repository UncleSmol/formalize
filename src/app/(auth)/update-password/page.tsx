"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { updatePasswordSchema } from "@/lib/validations/auth";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldError("");
    setPending(true);

    const form = new FormData(e.currentTarget);
    const raw = { password: form.get("password") };

    const result = updatePasswordSchema.safeParse(raw);

    if (!result.success) {
      setFieldError(result.error.flatten().fieldErrors.password?.[0] ?? "Invalid password.");
      setPending(false);
      return;
    }

    const { password } = result.data;

    const supabase = createBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setPending(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-white">Set new password</h1>
        <p className="mt-2 text-sm text-white/60">Choose a new password for your account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="border border-red-400/30 bg-red-400/10 p-4">
              <p className="text-sm font-bold text-red-400">{error}</p>
            </div>
          )}

          <div>
            <PasswordInput id="password" label="New Password" minLength={6} />
            {fieldError && (
              <p className="mt-1 text-xs text-red-400">{fieldError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
