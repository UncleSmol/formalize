import { redirect } from "next/navigation";
import { getAllEnquiries, updateEnquiryStatus } from "@/lib/supabase/admin-queries";

export const metadata = { title: "Enquiries | Admin" };

const statusColors: Record<string, string> = {
  new: "bg-blue-400/20 text-blue-400 border-blue-400/30",
  contacted: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
  closed: "bg-white/10 text-white/50 border-white/10",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries();

  async function handleUpdate(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const admin_notes = formData.get("admin_notes") as string;

    if (!id || !status) return;

    try {
      await updateEnquiryStatus(
        id,
        status as "new" | "contacted" | "closed",
        admin_notes || undefined,
      );
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update enquiry.",
      );
    }

    redirect("/admin/enquiries");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Enquiries</h1>
        <p className="mt-1 text-sm text-white/60">
          {enquiries.length} enquiry{enquiries.length !== 1 ? "ies" : ""} total
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className="border border-white/10 bg-white/6 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-white">
                    {enquiry.profile_name ?? "Unknown"}
                  </p>
                  <span
                    className={`sharp-chip inline-block border px-2 py-0.5 text-xs font-bold uppercase ${
                      statusColors[enquiry.status] ?? statusColors.new
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </div>
                {enquiry.item_title && (
                  <p className="mt-1 text-sm text-white/50">
                    Regarding: {enquiry.item_title}
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {enquiry.message}
                </p>
                <p className="mt-2 text-xs text-white/30">
                  {new Date(enquiry.created_at).toLocaleString()}
                </p>
              </div>

              <form action={handleUpdate} className="flex flex-col gap-3 sm:w-64">
                <input type="hidden" name="id" value={enquiry.id} />

                <div>
                  <label
                    htmlFor={`status-${enquiry.id}`}
                    className="mb-1 block text-xs font-bold text-white/60"
                  >
                    Status
                  </label>
                  <select
                    id={`status-${enquiry.id}`}
                    name="status"
                    defaultValue={enquiry.status}
                    className="w-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`notes-${enquiry.id}`}
                    className="mb-1 block text-xs font-bold text-white/60"
                  >
                    Admin Notes
                  </label>
                  <textarea
                    id={`notes-${enquiry.id}`}
                    name="admin_notes"
                    rows={2}
                    defaultValue={enquiry.admin_notes ?? ""}
                    className="w-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
                    placeholder="Internal notes..."
                  />
                </div>

                <button
                  type="submit"
                  className="sharp-button border border-white/12 bg-primary px-4 py-2 text-xs font-black uppercase tracking-wide text-[#08080c] transition-colors hover:bg-primary/90"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {enquiries.length === 0 && (
        <div className="py-16 text-center text-white/50">
          No enquiries received yet.
        </div>
      )}
    </div>
  );
}
