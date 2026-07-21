"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/browser";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { signupSchema } from "@/lib/validations/auth";

export function SignupForm() {
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setPending(true);

    try {
      const form = new FormData(e.currentTarget);
      const raw = {
        full_name: form.get("full_name"),
        email: form.get("email"),
        password: form.get("password"),
      };

      const result = signupSchema.safeParse(raw);

      if (!result.success) {
        const errors: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
          errors[key] = (msgs as string[])[0];
        }
        setFieldErrors(errors);
        setPending(false);
        return;
      }

      const { full_name, email, password } = result.data;

      const supabase = createBrowserClient();

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name },
        },
      });

      if (signUpError) {
        console.error("[signup] Supabase error:", {
          message: signUpError.message,
          status: (signUpError as { status?: number }).status,
          code: (signUpError as { code?: string }).code,
          name: signUpError.name,
        });
        setError(signUpError.message);
        setPending(false);
        return;
      }

      setCheckEmail(true);
    } catch (err) {
      console.error("[signup] Uncaught error:", err instanceof Error ? err.message : err);
      if (err instanceof Error && err.stack) console.error("[signup] Stack:", err.stack);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPending(false);
    }
  }

  if (checkEmail) {
    return (
      <div className="border border-primary/30 bg-primary/10 p-6 text-center">
        <i className="bi-envelope-check-fill text-3xl text-primary" aria-hidden="true" />
        <h3 className="mt-3 text-lg font-black text-primary">Check your email</h3>
        <p className="mt-2 text-sm text-white/70">
          We sent a confirmation link. Click it to activate your account, then sign in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm font-bold text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          required
          className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder="Doctor Khoza"
        />
        {fieldErrors.full_name && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.full_name}</p>
        )}
      </div>

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
          placeholder="you@company.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      <PasswordInput id="password" label="Password" placeholder="At least 8 characters" minLength={8} />
      {fieldErrors.password && (
        <p className="-mt-3 text-xs text-red-400">{fieldErrors.password}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-xs text-white/50">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
