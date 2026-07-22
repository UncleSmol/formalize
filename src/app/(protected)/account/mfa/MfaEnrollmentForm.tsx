"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

type MfaState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "enrolled"; qrCode: string; secret: string }
  | { phase: "verify"; factorId: string; qrCode: string }
  | { phase: "done" }
  | { phase: "error"; message: string };

export function MfaEnrollmentForm() {
  const [state, setState] = useState<MfaState>({ phase: "idle" });
  const [pending, setPending] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  async function handleEnroll() {
    setPending(true);
    setState({ phase: "loading" });
    const supabase = createBrowserClient();

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      issuer: "Formalize",
      friendlyName: "Authenticator App",
    });

    if (error || !data) {
      setPending(false);
      setState({ phase: "error", message: error?.message ?? "Failed to enroll." });
      return;
    }

    setPending(false);
    setState({
      phase: "verify",
      factorId: data.id,
      qrCode: data.totp.qr_code,
    });
  }

  async function handleVerify() {
    if (state.phase !== "verify") return;
    setPending(true);
    setState({ phase: "loading" });

    const supabase = createBrowserClient();

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: state.factorId,
    });

    if (challengeError || !challenge) {
      setState({ phase: "error", message: challengeError?.message ?? "Challenge failed." });
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: state.factorId,
      challengeId: challenge.id,
      code: verifyCode,
    });

    if (verifyError) {
      setPending(false);
      setState({ phase: "error", message: verifyError.message });
      return;
    }

    setPending(false);
    setState({ phase: "done" });
  }

  if (state.phase === "done") {
    return (
      <div className="text-center">
        <i className="bi-shield-check text-4xl text-green-400" aria-hidden="true" />
        <h3 className="mt-3 text-lg font-black text-green-400">Two-factor enabled</h3>
        <p className="mt-2 text-sm text-white/60">
          Your account is now protected with two-factor authentication.
        </p>
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className="text-center">
        <p className="text-sm text-red-400">{state.message}</p>
        <button
          onClick={() => setState({ phase: "idle" })}
          className="mt-4 bg-primary px-5 py-3 text-sm font-black uppercase tracking-wide text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (state.phase === "verify" || state.phase === "enrolled") {
    return (
      <div className="space-y-5">
        <p className="text-sm text-white/60">
          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):
        </p>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={state.qrCode} alt="QR Code" className="h-48 w-48" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
            Verification Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-center text-lg tracking-[0.3em] text-white focus:border-primary focus:outline-none"
            placeholder="000000"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={verifyCode.length !== 6 || pending}
          className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Verifying..." : "Verify & Enable"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-white/60">
        Two-factor authentication adds an extra layer of security by requiring a
        verification code from your authenticator app when you sign in.
      </p>
        <button
          onClick={handleEnroll}
          disabled={pending}
          className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Setting up..." : "Enable two-factor auth"}
      </button>
    </div>
  );
}
