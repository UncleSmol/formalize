import { redirect } from "next/navigation";
import { getCategories } from "@/lib/supabase/queries";
import {
  createCategory,
  deleteCategory,
} from "@/lib/supabase/admin-queries";
import { slugify } from "@/lib/utils";

export const metadata = { title: "Manage Categories | Admin" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  async function handleCreate(formData: FormData) {
    "use server";

    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();

    if (!name) return;

    try {
      await createCategory({
        slug: slugify(name),
        name,
        description: description || undefined,
      });
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create category.",
      );
    }

    redirect("/admin/categories");
  }

  async function handleDelete(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    if (!id) return;

    try {
      await deleteCategory(id);
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete category.",
      );
    }

    redirect("/admin/categories");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Categories</h1>
        <p className="mt-1 text-sm text-white/60">
          Organise catalogue items into categories.
        </p>
      </div>

      <div className="mb-10 border border-white/10 bg-white/6 p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/70">
          New Category
        </h2>
        <form action={handleCreate} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="name" className="mb-1 block text-xs font-bold text-white/60">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
              placeholder="e.g. Finance"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="description" className="mb-1 block text-xs font-bold text-white/60">
              Description
            </label>
            <input
              id="description"
              name="description"
              className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
              placeholder="e.g. Financial systems and tools"
            />
          </div>
          <button
            type="submit"
            className="sharp-button shrink-0 bg-primary px-5 py-3 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-0.5"
          >
            Add
          </button>
        </form>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border border-white/10 bg-white/6 px-5 py-4"
          >
            <div>
              <p className="font-bold text-white">{cat.name}</p>
              {cat.description && (
                <p className="mt-0.5 text-xs text-white/50">{cat.description}</p>
              )}
              <p className="mt-0.5 font-mono text-[10px] text-white/30">
                /{cat.slug}
              </p>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={cat.id} />
              <button
                type="submit"
                className="sharp-button border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-bold uppercase text-red-400 transition-colors hover:bg-red-400/20"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="py-16 text-center text-white/50">
          No categories yet. Create one above.
        </div>
      )}
    </div>
  );
}
