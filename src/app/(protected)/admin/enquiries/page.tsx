import { redirect } from "next/navigation";
import { getAllEnquiries, updateEnquiryStatus } from "@/lib/supabase/admin-queries";

export const metadata = { title: "Enquiries | Admin" };

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-300",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-300",
  closed: "bg-gray-100 text-gray-500 border-gray-300",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries();

  async function handleUpdate(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const admin_notes = formData.get("admin_notes") as string;

    if (!id || !status) return;

    await updateEnquiryStatus(id, status as "new" | "contacted" | "closed", admin_notes || undefined);
    redirect("/admin/enquiries");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          {enquiries.length} enquiry{enquiries.length !== 1 ? "ies" : ""}
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-bold text-gray-900">
                    {enquiry.profile_name || "Unknown"}
                  </p>
                  <span
                    className={`inline-block border px-2 py-0.5 text-xs font-bold uppercase ${
                      statusColors[enquiry.status] ?? statusColors.new
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {enquiry.item_title && (
                    <>Regarding: <span className="font-semibold text-gray-600">{enquiry.item_title}</span> &middot; </>
                  )}
                  {new Date(enquiry.created_at).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">{enquiry.message}</p>

            <form action={handleUpdate} className="mt-4 flex flex-wrap items-end gap-3 border-t border-gray-100 pt-4">
              <input type="hidden" name="id" value={enquiry.id} />

              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={enquiry.status}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="min-w-0 flex-[2]">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">
                  Admin Notes
                </label>
                <input
                  name="admin_notes"
                  defaultValue={enquiry.admin_notes ?? ""}
                  placeholder="Add notes..."
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-primary px-5 py-2 text-sm font-black uppercase tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Update
              </button>
            </form>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm">
            <p className="text-gray-500">No enquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
