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
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-700">{state.error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-bold text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={item?.title ?? ""}
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Financial Dashboard"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-bold text-gray-700">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={item?.slug ?? ""}
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. financial-dashboard"
          />
          <p className="mt-1 text-xs text-gray-500">
            URL-friendly identifier. Use lowercase with hyphens.
          </p>
        </div>

        {/* Type + Status row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="item_type" className="mb-1 block text-sm font-bold text-gray-700">
              Type
            </label>
            <select
              id="item_type"
              name="item_type"
              required
              defaultValue={item?.item_type ?? "product"}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="resource">Resource</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-bold text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={item?.status ?? "draft"}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Pricing fields */}
        <div className="rounded border border-gray-200 bg-gray-50 p-5">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">Pricing</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="cost_price" className="mb-1 block text-sm font-bold text-gray-700">
                Cost Price (ZAR)
              </label>
              <input
                id="cost_price"
                name="cost_price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={item?.cost_price ?? ""}
                className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. 500.00"
              />
            </div>

            <div>
              <label htmlFor="markup_percent" className="mb-1 block text-sm font-bold text-gray-700">
                Markup (%)
              </label>
              <input
                id="markup_percent"
                name="markup_percent"
                type="number"
                step="0.01"
                min="0"
                defaultValue={item?.markup_percent ?? 35}
                className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-gray-500">
                Default 35%. Selling price = cost × (1 + markup/100).
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              id="selling_price_overridden"
              name="selling_price_overridden"
              type="checkbox"
              value="true"
              defaultChecked={item?.selling_price_overridden ?? false}
              className="h-4 w-4 accent-primary"
            />
            <label htmlFor="selling_price_overridden" className="text-sm font-bold text-gray-700">
              Override selling price manually
            </label>
          </div>

          <div className="mt-3">
            <label htmlFor="selling_price" className="mb-1 block text-sm font-bold text-gray-700">
              Selling Price (ZAR)
            </label>
            <input
              id="selling_price"
              name="selling_price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={item?.selling_price ?? ""}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Leave blank to auto-calculate from cost + markup"
            />
          </div>
        </div>

        {/* Shipping fields */}
        <div className="rounded border border-gray-200 bg-gray-50 p-5">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">Shipping</p>

          <div className="flex items-center gap-3">
            <input
              id="requires_shipping"
              name="requires_shipping"
              type="checkbox"
              value="true"
              defaultChecked={item?.requires_shipping ?? false}
              className="h-4 w-4 accent-primary"
            />
            <label htmlFor="requires_shipping" className="text-sm font-bold text-gray-700">
              This item requires shipping
            </label>
          </div>

          <div className="mt-4">
            <label htmlFor="shipping_fee" className="mb-1 block text-sm font-bold text-gray-700">
              Shipping Fee (ZAR)
            </label>
            <input
              id="shipping_fee"
              name="shipping_fee"
              type="number"
              step="0.01"
              min="0"
              defaultValue={item?.shipping_fee ?? ""}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. 150.00"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              id="shipping_overridden"
              name="shipping_overridden"
              type="checkbox"
              value="true"
              defaultChecked={item?.shipping_overridden ?? false}
              className="h-4 w-4 accent-primary"
            />
            <label htmlFor="shipping_overridden" className="text-sm font-bold text-gray-700">
              Override shipping fee manually
            </label>
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label htmlFor="short_description" className="mb-1 block text-sm font-bold text-gray-700">
            Short Description
          </label>
          <textarea
            id="short_description"
            name="short_description"
            required
            rows={3}
            defaultValue={item?.short_description ?? ""}
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="long_description" className="mb-1 block text-sm font-bold text-gray-700">
            Long Description
          </label>
          <textarea
            id="long_description"
            name="long_description"
            required
            rows={6}
            defaultValue={item?.long_description ?? ""}
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Image URLs */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="hero_image_url" className="mb-1 block text-sm font-bold text-gray-700">
              Hero Image URL
            </label>
            <input
              id="hero_image_url"
              name="hero_image_url"
              type="url"
              defaultValue={item?.hero_image_url ?? ""}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="card_image_url" className="mb-1 block text-sm font-bold text-gray-700">
              Card Image URL
            </label>
            <input
              id="card_image_url"
              name="card_image_url"
              type="url"
              defaultValue={item?.card_image_url ?? ""}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* CTA + Sort Order */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="cta_label" className="mb-1 block text-sm font-bold text-gray-700">
              CTA Label
            </label>
            <input
              id="cta_label"
              name="cta_label"
              defaultValue={item?.cta_label ?? "Enquire"}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="sort_order" className="mb-1 block text-sm font-bold text-gray-700">
              Sort Order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              min="0"
              defaultValue={item?.sort_order ?? 0}
              className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
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

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="bg-primary px-8 py-3 text-sm font-black uppercase tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50"
          >
            {pending ? "Saving..." : item ? "Update Item" : "Create Item"}
          </button>
          <Link
            href="/admin/catalogue"
            className="text-sm font-bold text-gray-500 underline transition-colors hover:text-gray-700"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
