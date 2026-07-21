import { redirect } from "next/navigation";
import { createCategory, updateCategory, deleteCategory } from "@/lib/supabase/admin-queries";
import { getCategories } from "@/lib/supabase/queries";
import { slugify } from "@/lib/utils";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export const metadata = { title: "Manage Categories | Admin" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  async function handleCreate(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await createCategory({ slug: slugify(name), name: name.trim(), description: description.trim() || undefined });
    redirect("/admin/categories");
  }

  async function handleUpdate(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    if (!id) return;

    await updateCategory(id, {
      slug: slugify(name),
      name: name.trim(),
      description: description.trim() || undefined,
    });
    redirect("/admin/categories");
  }

  async function handleDelete(id: string) {
    "use server";

    await deleteCategory(id);
    redirect("/admin/categories");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Categories</h1>
        <p className="mt-1 text-sm text-gray-500">
          {categories.length} categor{categories.length === 1 ? "y" : "ies"} total
        </p>
      </div>

      <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-black uppercase tracking-wide text-gray-700">New Category</h2>
        <form action={handleCreate} className="flex flex-wrap items-end gap-3">
          <div className="flex-1">
            <input
              name="name"
              placeholder="Category name"
              required
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              name="description"
              placeholder="Description (optional)"
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Add
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-bold text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Slug</th>
              <th className="px-4 py-3 text-left font-bold text-gray-500">Description</th>
              <th className="px-4 py-3 text-right font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-400">{cat.slug}</td>
                <td className="px-4 py-3 text-gray-500">{cat.description ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteCategoryButton deleteAction={handleDelete.bind(null, cat.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No categories yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
