"use client";

import Link from "next/link";
import { IT_PRODUCTS } from "@/lib/it-products";

export function FeaturedProducts() {
  const featuredProducts = IT_PRODUCTS.slice(0, 4);

  return (
    <div>
      <div className="mb-12">
        <p className="text-sm font-semibold text-[#2aa19d] uppercase tracking-wide">
          IT Products
        </p>
        <h3 className="mt-3 text-3xl font-bold text-[#17142a]">
          Tools to power your business
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg bg-white p-6 border border-[#e0dce6] hover:border-[#2aa19d] transition-colors"
          >
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5f5f5] text-xl"
            >
              <i className={product.icon} aria-hidden="true" />
            </div>

            <h4 className="mt-4 font-semibold text-[#17142a]">{product.name}</h4>
            <p className="mt-2 text-sm text-[#4c466b]">{product.description}</p>

            <div className="mt-4 border-t border-[#e0dce6] pt-4">
              <span className="text-sm font-medium text-[#2aa19d]">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/services/it-products"
          className="inline-block px-6 py-3 bg-[#2aa19d] text-white font-medium rounded-lg hover:bg-[#229385] transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
