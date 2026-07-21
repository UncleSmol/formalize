import Link from "next/link";

export const metadata = { title: "Verify Email | Formalize" };

export default function VerifyEmailPage() {
  return (
    <main className="flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm text-center">
        <i className="bi-envelope-check-fill text-3xl text-primary" aria-hidden="true" />
        <h1 className="mt-3 text-lg font-black text-white">Verify your email</h1>
        <p className="mt-2 text-sm text-white/60">
          We sent a confirmation link. Check your inbox and click the link to activate your account.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-bold text-primary underline"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
