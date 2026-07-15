"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { CatalogueItem, Category } from "@/lib/supabase/types";

interface CatalogueItemFormProps {
  item?: CatalogueItem | null;
  categories: Category[];
  selectedCategoryIds?: string[];
  onSubmit: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<{ error?: string } | undefined>;
}

export function CatalogueItemForm({
  item,
  categories,
  selectedCategoryIds = [],
  onSubmit,
}: CatalogueItemFormProps) {
  const [state, formAction, pending] = useActionState(onSubmit, undefined);

  return (
    <form action={formAction} className="max-w-3xl">
      {state?.error && (
        <div className="mb-6 border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm font-bold text-red-400">{state.error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-bold text-white/80">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={item?.title ?? ""}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="e.g. Financial Dashboard"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-bold text-white/80">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={item?.slug ?? ""}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm font-mono text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="e.g. financial-dashboard"
          />
          <p className="mt-1 text-xs text-white/40">
            URL-friendly identifier. Use lowercase with hyphens.
          </p>
        </div>

        {/* Type + Status row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="item_type" className="mb-1 block text-sm font-bold text-white/80">
              Type
            </label>
            <select
              id="item_type"
              name="item_type"
              required
              defaultValue={item?.item_type ?? "product"}
              className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="resource">Resource</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-bold text-white/80">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={item?.status ?? "draft"}
              className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="short_description" className="mb-1 block text-sm font-bold text-white/80">
            Short Description
          </label>
          <textarea
            id="short_description"
            name="short_description"
            required
            rows={2}
            defaultValue={item?.short_description ?? ""}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="Brief summary shown in cards"
          />
        </div>

        {/* Long Description */}
        <div>
          <label htmlFor="long_description" className="mb-1 block text-sm font-bold text-white/80">
            Long Description
          </label>
          <textarea
            id="long_description"
            name="long_description"
            required
            rows={5}
            defaultValue={item?.long_description ?? ""}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="Detailed description shown on the item page"
          />
        </div>

        {/* CTA Label */}
        <div>
          <label htmlFor="cta_label" className="mb-1 block text-sm font-bold text-white/80">
            CTA Label
          </label>
          <input
            id="cta_label"
            name="cta_label"
            defaultValue={item?.cta_label ?? "Enquire"}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Hero Image URL */}
        <div>
          <label htmlFor="hero_image_url" className="mb-1 block text-sm font-bold text-white/80">
            Hero Image URL
          </label>
          <input
            id="hero_image_url"
            name="hero_image_url"
            defaultValue={item?.hero_image_url ?? ""}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sort_order" className="mb-1 block text-sm font-bold text-white/80">
            Sort Order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={item?.sort_order ?? 0}
            className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div>
          <p className="mb-2 text-sm font-bold text-white/80">Categories</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center gap-3 border border-white/10 bg-white/6 px-4 py-3 text-sm transition-colors hover:bg-white/10"
              >
                <input
                  type="checkbox"
                  name="category_ids"
                  value={cat.id}
                  defaultChecked={selectedCategoryIds.includes(cat.id)}
                  className="h-4 w-4 accent-primary"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="sharp-button bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {pending ? "Saving..." : item ? "Update Item" : "Create Item"}
        </button>
        <Link
          href="/admin/catalogue"
          className="text-sm font-bold text-white/60 underline transition-colors hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
