import "server-only";

import { createServiceRoleClient } from "./client";
import type { CatalogueItemWithRelations, Category } from "./types";

export async function getPublishedCatalogueItems(filters?: {
  type?: string;
  categoryId?: string;
}): Promise<CatalogueItemWithRelations[]> {
  const supabase = createServiceRoleClient();

  let query = supabase
    .from("catalogue_items")
    .select(
      `
        *,
        categories:catalogue_item_categories(
          category:categories(*)
        ),
        sections:catalogue_item_sections(*)
      `,
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (filters?.type) {
    query = query.eq("item_type", filters.type);
  }

  if (filters?.categoryId) {
    query = query.contains("catalogue_item_categories", [
      { category_id: filters.categoryId },
    ]);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch catalogue items: ${error.message}`);
  }

  return (data ?? []).map(normaliseItem);
}

export async function getCatalogueItemBySlug(
  slug: string,
): Promise<CatalogueItemWithRelations | null> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("catalogue_items")
    .select(
      `
        *,
        categories:catalogue_item_categories(
          category:categories(*)
        ),
        sections:catalogue_item_sections(*)
      `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch catalogue item: ${error.message}`);
  }

  return normaliseItem(data);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return data ?? [];
}

export async function getRelatedItems(
  itemId: string,
  categoryIds: string[],
  limit = 3,
): Promise<CatalogueItemWithRelations[]> {
  if (categoryIds.length === 0) return [];

  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("catalogue_items")
    .select(
      `
        *,
        categories:catalogue_item_categories(
          category:categories(*)
        ),
        sections:catalogue_item_sections(*)
      `,
    )
    .eq("status", "published")
    .neq("id", itemId)
    .in("catalogue_item_categories.category_id", categoryIds)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch related items: ${error.message}`);
  }

  return (data ?? []).map(normaliseItem);
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("catalogue_items")
    .select("slug")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch slugs: ${error.message}`);
  }

  return (data ?? []).map((item) => item.slug);
}

function normaliseItem(raw: Record<string, unknown>): CatalogueItemWithRelations {
  const rawCategories = raw.categories as
    | { category: Record<string, unknown> }[]
    | undefined;

  const rawSections = raw.sections as Record<string, unknown>[] | undefined;

  return {
    ...(raw as unknown as CatalogueItemWithRelations),
    categories: (rawCategories ?? []).map(
      (jc) => jc.category as unknown as CatalogueItemWithRelations["categories"][0],
    ),
    sections: (rawSections ?? []) as unknown as CatalogueItemWithRelations["sections"],
  };
}
