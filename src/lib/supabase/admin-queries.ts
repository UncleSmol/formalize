import "server-only";

import { revalidatePath } from "next/cache";
import { createServiceRoleClient } from "./client";
import type {
  CatalogueItem,
  CatalogueItemType,
  CatalogueStatus,
  Enquiry,
  EnquiryStatus,
} from "./types";

/* ─── Catalogue Items ────────────────────────────────────── */

export async function getAllCatalogueItems(): Promise<CatalogueItem[]> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("catalogue_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) throw new Error(`Failed to fetch items: ${error.message}`);
  return data ?? [];
}

export async function getCatalogueItemById(
  id: string,
): Promise<CatalogueItem | null> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch item: ${error.message}`);
  }
  return data;
}

export interface CreateItemInput {
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  item_type: CatalogueItemType;
  status: CatalogueStatus;
  cta_label?: string;
  hero_image_url?: string;
  sort_order?: number;
  category_ids?: string[];
}

export async function createCatalogueItem(input: CreateItemInput) {
  const supabase = createServiceRoleClient();

  const { category_ids, ...itemData } = input;

  const { data, error } = await supabase
    .from("catalogue_items")
    .insert({
      ...itemData,
      cta_label: itemData.cta_label ?? "Enquire",
      sort_order: itemData.sort_order ?? 0,
      metadata: {},
    })
    .select("id")
    .single();

  if (error) throw new Error(`Failed to create item: ${error.message}`);

  if (category_ids && category_ids.length > 0) {
    const { error: jcError } = await supabase
      .from("catalogue_item_categories")
      .insert(
        category_ids.map((category_id) => ({
          catalogue_item_id: data.id,
          category_id,
        })),
      );

    if (jcError)
      throw new Error(`Failed to link categories: ${jcError.message}`);
  }

  revalidatePath("/admin/catalogue");
  return data.id;
}

export async function updateCatalogueItem(
  id: string,
  input: Partial<CreateItemInput>,
) {
  const supabase = createServiceRoleClient();

  const { category_ids, ...itemData } = input;

  const { error } = await supabase
    .from("catalogue_items")
    .update(itemData)
    .eq("id", id);

  if (error) throw new Error(`Failed to update item: ${error.message}`);

  if (category_ids !== undefined) {
    await supabase
      .from("catalogue_item_categories")
      .delete()
      .eq("catalogue_item_id", id);

    if (category_ids.length > 0) {
      const { error: jcError } = await supabase
        .from("catalogue_item_categories")
        .insert(
          category_ids.map((category_id) => ({
            catalogue_item_id: id,
            category_id,
          })),
        );

      if (jcError)
        throw new Error(`Failed to update categories: ${jcError.message}`);
    }
  }

  revalidatePath("/admin/catalogue");
  revalidatePath("/catalogue");
}

export async function deleteCatalogueItem(id: string) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase
    .from("catalogue_items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Failed to delete item: ${error.message}`);

  revalidatePath("/admin/catalogue");
  revalidatePath("/catalogue");
}

/* ─── Categories ──────────────────────────────────────────── */

export async function createCategory(input: {
  slug: string;
  name: string;
  description?: string;
}) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("categories").insert(input);

  if (error) throw new Error(`Failed to create category: ${error.message}`);

  revalidatePath("/admin/categories");
  revalidatePath("/catalogue");
}

export async function updateCategory(id: string, input: Partial<{ slug: string; name: string; description: string }>) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("categories").update(input).eq("id", id);

  if (error) throw new Error(`Failed to update category: ${error.message}`);

  revalidatePath("/admin/categories");
  revalidatePath("/catalogue");
}

export async function deleteCategory(id: string) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete category: ${error.message}`);

  revalidatePath("/admin/categories");
  revalidatePath("/catalogue");
}

/* ─── Enquiries ───────────────────────────────────────────── */

export async function getAllEnquiries(): Promise<
  (Enquiry & { profile_name?: string; item_title?: string })[]
> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("enquiries")
    .select("*, profiles(full_name), catalogue_items(title)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch enquiries: ${error.message}`);

  return (data ?? []).map((e: Record<string, unknown>) => ({
    ...e,
    profile_name:
      (e.profiles as Record<string, unknown> | null)?.full_name ?? null,
    item_title:
      (e.catalogue_items as Record<string, unknown> | null)?.title ?? null,
  })) as (Enquiry & { profile_name?: string; item_title?: string })[];
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  admin_notes?: string,
) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase
    .from("enquiries")
    .update({ status, ...(admin_notes !== undefined ? { admin_notes } : {}) })
    .eq("id", id);

  if (error) throw new Error(`Failed to update enquiry: ${error.message}`);

  revalidatePath("/admin/enquiries");
}
