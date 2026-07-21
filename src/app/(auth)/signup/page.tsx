import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create Account | Formalize" };

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-white">Create account</h1>
        <p className="mt-2 text-sm text-white/60">Join the Formalize platform.</p>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
