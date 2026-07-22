"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { loginSchema } from "@/lib/validations/auth";
import { TurnstileWidget } from "@/components/auth/TurnstileWidget";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setPending(true);

    if (!captchaToken) {
      setError("Please complete the security check.");
      setPending(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const raw = {
      email: form.get("email"),
      password: form.get("password"),
    };

    const result = loginSchema.safeParse(raw);

    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        errors[key] = (msgs as string[])[0];
      }
      setFieldErrors(errors);
      setPending(false);
      return;
    }

    const { email, password } = result.data;

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });

    setPending(false);

    if (authError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="you@company.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <PasswordInput id="password" label="Password" placeholder="Your password" />
        {fieldErrors.password && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
        )}
      </div>

      <div className="flex justify-center">
        <TurnstileWidget onVerify={handleCaptchaVerify} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex items-center justify-between text-xs">
        <Link href="/signup" className="font-bold text-white/50 underline hover:text-white">
          Create an account
        </Link>
        <Link href="/reset-password" className="font-bold text-white/50 underline hover:text-white">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
