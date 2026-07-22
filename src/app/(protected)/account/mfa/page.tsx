import { redirect } from "next/navigation";
import { createClientWithCookies } from "@/lib/supabase/client";
import { MfaEnrollmentForm } from "./MfaEnrollmentForm";

export const metadata = { title: "Two-Factor Authentication | Formalize" };

export default async function MfaPage() {
  const supabase = await createClientWithCookies();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) redirect("/login");

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black">Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-white/60">
          Add an extra layer of security to your account.
        </p>
      </div>
      <div className="rounded border border-white/10 bg-white/[0.03] p-6">
        <MfaEnrollmentForm />
      </div>
    </div>
  );
}
