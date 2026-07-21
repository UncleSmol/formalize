import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createServiceRoleClient } from "@/lib/supabase/client";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Profile | Formalize" };

async function getProfile() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_PUBLIC_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/login");

  const adminClient = createServiceRoleClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return { user, profile, avatarUrl };
}

export default async function ProfilePage() {
  const { user, profile, avatarUrl } = await getProfile();

  async function updateProfile(_prev: unknown, formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_PUBLIC_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      },
    );

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      return { error: "Not authenticated" };
    }

    const full_name = formData.get("full_name") as string;
    const company_name = formData.get("company_name") as string;
    const phone = formData.get("phone") as string;
    const avatar_url = formData.get("avatar_url") as string;

    const adminClient = createServiceRoleClient();

    const { error: updateError } = await adminClient
      .from("profiles")
      .update({
        full_name: full_name.trim() || null,
        company_name: company_name.trim() || null,
        phone: phone.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentUser.id);

    if (updateError) {
      return { error: updateError.message };
    }

    const { error: metadataError } = await adminClient.auth.admin.updateUserById(
      currentUser.id,
      {
        user_metadata: {
          ...currentUser.user_metadata,
          avatar_url: avatar_url.trim() || null,
        },
      },
    );

    if (metadataError) {
      return { error: metadataError.message };
    }

    redirect("/account/profile");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black">Profile</h1>
        <p className="mt-1 text-sm text-white/60">
          Manage your account information
        </p>
        {profile?.role === "admin" && (
          <a
            href="/admin"
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary underline"
          >
            <i className="bi-speedometer2" aria-hidden="true" />
            Admin Dashboard
          </a>
        )}
      </div>

      <div className="rounded border border-white/10 bg-white/[0.03] p-6">
        <ProfileForm
          profile={profile}
          userEmail={user.email ?? ""}
          avatarUrl={avatarUrl}
          onSubmit={updateProfile}
        />
      </div>
    </div>
  );
}
