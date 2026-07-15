import "server-only";

import { createServiceRoleClient } from "./client";
import type { CatalogueItemWithRelations, Category } from "./types";

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getPublishedCatalogueItems(filters?: {
  type?: string;
  categorySlug?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<CatalogueItemWithRelations>> {
  const supabase = createServiceRoleClient();

  const page = Math.max(1, filters?.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters?.pageSize ?? 9));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Resolve category slug to ID if provided
  let categoryId: string | undefined;
  if (filters?.categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categorySlug)
      .single();
    categoryId = cat?.id;
  }

  // Count query
  let countQuery = supabase
    .from("catalogue_items")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  if (filters?.type) {
    countQuery = countQuery.eq("item_type", filters.type);
  }

  if (categoryId) {
    countQuery = countQuery.contains("catalogue_item_categories", [
      { category_id: categoryId },
    ]);
  }

  const { count: total, error: countError } = await countQuery;

  if (countError) {
    throw new Error(`Failed to count catalogue items: ${countError.message}`);
  }

  // Data query
  let dataQuery = supabase
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
    .order("title", { ascending: true })
    .range(from, to);

  if (filters?.type) {
    dataQuery = dataQuery.eq("item_type", filters.type);
  }

  if (categoryId) {
    dataQuery = dataQuery.contains("catalogue_item_categories", [
      { category_id: categoryId },
    ]);
  }

  const { data, error } = await dataQuery;

  if (error) {
    throw new Error(`Failed to fetch catalogue items: ${error.message}`);
  }

  return {
    items: (data ?? []).map(normaliseItem),
    total: total ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((total ?? 0) / pageSize),
  };
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
