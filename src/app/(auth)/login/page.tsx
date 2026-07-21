import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign In | Formalize" };

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-white">Sign in</h1>
        <p className="mt-2 text-sm text-white/60">Access your admin dashboard.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
