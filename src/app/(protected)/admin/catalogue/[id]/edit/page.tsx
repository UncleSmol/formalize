import { notFound, redirect } from "next/navigation";
import {
  getCatalogueItemById,
  getCatalogueItemImages,
  updateCatalogueItem,
} from "@/lib/supabase/admin-queries";
import { getCategories } from "@/lib/supabase/queries";
import { slugify } from "@/lib/utils";
import { CatalogueItemForm } from "@/components/admin/CatalogueItemForm";
import { createServiceRoleClient } from "@/lib/supabase/client";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Catalogue Item | Admin" };

export default async function EditCatalogueItemPage({ params }: EditPageProps) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    getCatalogueItemById(id),
    getCategories(),
  ]);

  if (!item) notFound();

  const supabase = createServiceRoleClient();

  // Fetch selected category IDs
  const { data: itemCats } = await supabase
    .from("catalogue_item_categories")
    .select("category_id")
    .eq("catalogue_item_id", id);

  const selectedCategoryIds = (itemCats ?? []).map((jc) => jc.category_id);

  // Fetch existing gallery images
  const existingImages = await getCatalogueItemImages(id);

  async function handleUpdate(_prev: unknown, formData: FormData) {
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
    const image_urls = formData.getAll("image_urls").filter(Boolean) as string[];

    if (!title || !slug || !short_description || !long_description) {
      return {
        error:
          "Title, slug, short description, and long description are required.",
      };
    }

    try {
      await updateCatalogueItem(id, {
        slug: slugify(slug),
        title: title.trim(),
        short_description: short_description.trim(),
        long_description: long_description.trim(),
        item_type: item_type as "service" | "product" | "resource",
        status: status as "draft" | "published" | "archived",
        cta_label: cta_label || "Enquire",
        hero_image_url: hero_image_url || undefined,
        card_image_url: card_image_url || undefined,
        image_urls,
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
      return {
        error: err instanceof Error ? err.message : "Failed to update item.",
      };
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Edit: {item.title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Update the details of this catalogue item.
        </p>
      </div>
      <CatalogueItemForm
        item={item}
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        itemImages={existingImages}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
