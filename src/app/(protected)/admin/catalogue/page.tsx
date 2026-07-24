import Link from "next/link";
import { getAllCatalogueItems, deleteCatalogueItem } from "@/lib/supabase/admin-queries";

export const metadata = { title: "Manage Catalogue | Admin" };

const statusColors: Record<string, string> = {
  published: "bg-green-100 text-green-700 border-green-300",
  draft: "bg-yellow-100 text-yellow-700 border-yellow-300",
  archived: "bg-gray-100 text-gray-500 border-gray-300",
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Catalogue Items</h1>
          <p className="text-xs text-gray-500">
            {items.length} item{items.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/catalogue/new"
          className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <i className="bi-plus-lg" aria-hidden="true" />
          New Item
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-1.5 text-left text-xs font-bold text-gray-500">Title</th>
              <th className="px-3 py-1.5 text-left text-xs font-bold text-gray-500">Type</th>
              <th className="px-3 py-1.5 text-left text-xs font-bold text-gray-500">Status</th>
              <th className="px-3 py-1.5 text-left text-xs font-bold text-gray-500">Slug</th>
              <th className="px-3 py-1.5 text-right text-xs font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-3 py-1.5 text-sm font-semibold text-gray-900">{item.title}</td>
                <td className="px-3 py-1.5 text-xs text-gray-500">
                  {typeLabels[item.item_type] ?? item.item_type}
                </td>
                <td className="px-3 py-1.5">
                  <span
                    className={`inline-block border px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none ${
                      statusColors[item.status] ?? statusColors.draft
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="max-w-[160px] truncate px-3 py-1.5 font-mono text-[10px] text-gray-400">
                  {item.slug}
                </td>
                <td className="px-3 py-1.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/catalogue/${item.id}/edit`}
                      className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold uppercase text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
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
                        className="rounded border border-red-300 bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-600 transition-colors hover:bg-red-100"
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
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">No catalogue items yet.</p>
            <Link
              href="/admin/catalogue/new"
              className="mt-2 inline-block text-xs font-bold text-primary underline"
            >
              Create your first item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
