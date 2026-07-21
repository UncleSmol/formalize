import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceRoleClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

export const metadata = { title: "Manage Users | Admin" };

async function getProfiles() {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (data ?? []) as Profile[];
}

async function updateRole(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = formData.get("id") as string;
  const role = formData.get("role") as string;

  if (!id || !role) return;

  const supabase = createServiceRoleClient();
  await supabase.from("profiles").update({ role: role as Profile["role"] }).eq("id", id);

  redirect("/admin/users");
}

export default async function AdminUsersPage() {
  const profiles = await getProfiles();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Users</h1>
        <p className="mt-1 text-sm text-gray-500">
          {profiles.length} user{profiles.length !== 1 ? "s" : ""} registered
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-bold text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Email</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Role</th>
              <th className="px-4 py-3 text-right font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr
                key={profile.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {profile.full_name || "—"}
                </td>
                <td className="px-4 py-3 text-gray-500">{profile.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block border px-2 py-0.5 text-xs font-bold uppercase ${
                      profile.role === "admin"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-gray-300 bg-gray-100 text-gray-500"
                    }`}
                  >
                    {profile.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={updateRole}>
                    <input type="hidden" name="id" value={profile.id} />
                    <input type="hidden" name="role" value={profile.role === "admin" ? "customer" : "admin"} />
                    <button
                      type="submit"
                      className={`rounded border px-3 py-1.5 text-xs font-bold uppercase shadow-sm transition-colors ${
                        profile.role === "admin"
                          ? "border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {profile.role === "admin" ? "Demote" : "Promote"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {profiles.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No users registered yet.
          </div>
        )}
      </div>
    </div>
  );
}
