import Link from "next/link";
import { getAllCatalogueItems, deleteCatalogueItem } from "@/lib/supabase/admin-queries";

export const metadata = { title: "Manage Catalogue | Admin" };

const statusColors: Record<string, string> = {
  published: "bg-green-400/20 text-green-400 border-green-400/30",
  draft: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
  archived: "bg-white/10 text-white/50 border-white/10",
};

const typeLabels: Record<string, string> = {
  service: "Service",
  product: "Product",
  resource: "Resource",
};

export default async function AdminCataloguePage() {
  const items = await getAllCatalogueItems();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Catalogue Items</h1>
          <p className="mt-1 text-sm text-white/60">
            {items.length} item{items.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/catalogue/new"
          className="sharp-button inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-0.5"
        >
          <i className="bi-plus-lg" aria-hidden="true" />
          New Item
        </Link>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/6">
              <th className="px-4 py-3 text-left font-bold text-white/60">Title</th>
              <th className="px-4 py-3 text-left font-bold text-white/60">Type</th>
              <th className="px-4 py-3 text-left font-bold text-white/60">Status</th>
              <th className="px-4 py-3 text-left font-bold text-white/60">Slug</th>
              <th className="px-4 py-3 text-right font-bold text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/6 transition-colors hover:bg-white/6"
              >
                <td className="px-4 py-3 font-semibold">{item.title}</td>
                <td className="px-4 py-3 text-white/60">
                  {typeLabels[item.item_type] ?? item.item_type}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`sharp-chip inline-block border px-2 py-0.5 text-xs font-bold uppercase ${
                      statusColors[item.status] ?? statusColors.draft
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-white/50">
                  {item.slug}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/catalogue/${item.id}/edit`}
                      className="sharp-button border border-white/12 bg-white/7 px-3 py-1.5 text-xs font-bold uppercase text-white/70 transition-colors hover:bg-white/12"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteCatalogueItem(item.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="sharp-button border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-bold uppercase text-red-400 transition-colors hover:bg-red-400/20"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-white/50">No catalogue items yet.</p>
            <Link
              href="/admin/catalogue/new"
              className="mt-4 inline-block text-sm font-bold text-primary underline"
            >
              Create your first item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
