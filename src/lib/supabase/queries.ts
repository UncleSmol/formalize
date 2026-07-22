import "server-only";

import { unstable_cache } from "next/cache";
import { createServiceRoleClient } from "./client";
import type { CatalogueItemWithRelations, Category } from "./types";

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const getPublishedCatalogueItemsImpl = unstable_cache(
  async (filters?: { type?: string; categorySlug?: string; page?: number; pageSize?: number }) => {
    const supabase = createServiceRoleClient();

    const page = Math.max(1, filters?.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, filters?.pageSize ?? 9));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let filteredItemIds: string[] | undefined;
    if (filters?.categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", filters.categorySlug)
        .single();

      if (cat) {
        const { data: jc } = await supabase
          .from("catalogue_item_categories")
          .select("catalogue_item_id")
          .eq("category_id", cat.id);

        filteredItemIds = (jc ?? []).map((r) => r.catalogue_item_id);
        if (filteredItemIds.length === 0) {
          return { items: [], total: 0, page, pageSize, totalPages: 0 };
        }
      }
    }

    let countQuery = supabase
      .from("catalogue_items")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .is("deleted_at", null);

    if (filters?.type) countQuery = countQuery.eq("item_type", filters.type);
    if (filteredItemIds) countQuery = countQuery.in("id", filteredItemIds);

    const { count: total, error: countError } = await countQuery;
    if (countError) throw new Error(`Failed to count catalogue items: ${countError.message}`);

    let dataQuery = supabase
      .from("catalogue_items")
      .select(
        `*,
        categories:catalogue_item_categories(category:categories(*)),
        sections:catalogue_item_sections(*),
        images:catalogue_item_images(*)`,
      )
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true })
      .range(from, to);

    if (filters?.type) dataQuery = dataQuery.eq("item_type", filters.type);
    if (filteredItemIds) dataQuery = dataQuery.in("id", filteredItemIds);

    const { data, error } = await dataQuery;
    if (error) throw new Error(`Failed to fetch catalogue items: ${error.message}`);

    return {
      items: (data ?? []).map(normaliseItem),
      total: total ?? 0,
      page,
      pageSize,
      totalPages: Math.ceil((total ?? 0) / pageSize),
    };
  },
  ["catalogue-items"],
  { revalidate: 60, tags: ["catalogue"] },
);

export const getPublishedCatalogueItems = getPublishedCatalogueItemsImpl;

const getCatalogueItemBySlugImpl = unstable_cache(
  async (slug: string) => {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("catalogue_items")
      .select(
        `*,
        categories:catalogue_item_categories(category:categories(*)),
        sections:catalogue_item_sections(*),
        images:catalogue_item_images(*)`,
      )
      .eq("slug", slug)
      .eq("status", "published")
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to fetch catalogue item: ${error.message}`);
    }

    return normaliseItem(data);
  },
  ["catalogue-item"],
  { revalidate: 60, tags: ["catalogue"] },
);

export const getCatalogueItemBySlug = getCatalogueItemBySlugImpl;

const getCategoriesImpl = unstable_cache(
  async (): Promise<Category[]> => {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data ?? [];
  },
  ["categories"],
  { revalidate: 60, tags: ["catalogue"] },
);

export const getCategories = getCategoriesImpl;

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
        sections:catalogue_item_sections(*),
        images:catalogue_item_images(*)
      `,
    )
    .eq("status", "published")
    .is("deleted_at", null)
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
    .is("deleted_at", null)
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

  const rawImages = raw.images as Record<string, unknown>[] | undefined;

  return {
    ...(raw as unknown as CatalogueItemWithRelations),
    categories: (rawCategories ?? []).map(
      (jc) => jc.category as unknown as CatalogueItemWithRelations["categories"][0],
    ),
    sections: (rawSections ?? []) as unknown as CatalogueItemWithRelations["sections"],
    images: (rawImages ?? [])
      .sort((a, b) => (a.sort_order as number) - (b.sort_order as number))
      .map((img) => img as unknown as CatalogueItemWithRelations["images"][0]),
  };
}
