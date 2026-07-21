import { redirect } from "next/navigation";
import { createCatalogueItem } from "@/lib/supabase/admin-queries";
import { getCategories } from "@/lib/supabase/queries";
import { slugify } from "@/lib/utils";
import { CatalogueItemForm } from "@/components/admin/CatalogueItemForm";

export const metadata = { title: "New Catalogue Item | Admin" };

export default async function NewCatalogueItemPage() {
  const categories = await getCategories();

  async function handleCreate(_prev: unknown, formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const item_type = formData.get("item_type") as string;
    const status = formData.get("status") as string;
    const short_description = formData.get("short_description") as string;
    const long_description = formData.get("long_description") as string;
    const cta_label = formData.get("cta_label") as string;
    const hero_image_url = formData.get("hero_image_url") as string;
    const card_image_url = formData.get("card_image_url") as string;
    const cost_price = formData.get("cost_price") as string;
    const markup_percent = formData.get("markup_percent") as string;
    const selling_price = formData.get("selling_price") as string;
    const selling_price_overridden = formData.get("selling_price_overridden") === "true";
    const requires_shipping = formData.get("requires_shipping") === "true";
    const shipping_fee = formData.get("shipping_fee") as string;
    const shipping_overridden = formData.get("shipping_overridden") === "true";
    const sort_order = parseInt(formData.get("sort_order") as string, 10) || 0;
    const category_ids = formData.getAll("category_ids") as string[];

    if (!title || !slug || !short_description || !long_description) {
      return { error: "Title, slug, short description, and long description are required." };
    }

    try {
      await createCatalogueItem({
        slug: slugify(slug),
        title: title.trim(),
        short_description: short_description.trim(),
        long_description: long_description.trim(),
        item_type: item_type as "service" | "product" | "resource",
        status: status as "draft" | "published" | "archived",
        cta_label: cta_label || "Enquire",
        hero_image_url: hero_image_url || undefined,
        card_image_url: card_image_url || undefined,
        cost_price: cost_price ? parseFloat(cost_price) : undefined,
        markup_percent: markup_percent ? parseFloat(markup_percent) : undefined,
        selling_price: selling_price ? parseFloat(selling_price) : undefined,
        selling_price_overridden,
        requires_shipping,
        shipping_fee: shipping_fee ? parseFloat(shipping_fee) : 0,
        shipping_overridden,
        sort_order,
        category_ids,
      });

      redirect("/admin/catalogue");
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Failed to create item." };
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">New Catalogue Item</h1>
        <p className="mt-1 text-sm text-white/60">Add a new service, product, or resource.</p>
      </div>
      <CatalogueItemForm categories={categories} onSubmit={handleCreate} />
    </div>
  );
}
