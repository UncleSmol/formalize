"use client";

import { useState } from "react";
import Link from "next/link";
import { IT_PRODUCTS, IT_CATEGORIES } from "@/lib/it-products";

export default function ITProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? IT_PRODUCTS.filter((product) => product.category === selectedCategory)
    : IT_PRODUCTS;

  return (
    <main className="bg-[#08080c] text-white">
      <section className="premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              IT Catalogue
            </p>
            <h1 className="section-heading mt-5 text-5xl font-black sm:text-6xl lg:text-7xl">
              Technology products with an implementation brain.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/62">
            Browse the systems, devices, and infrastructure we can supply,
            configure, and support as part of a complete business operating
            stack.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#5d4dff]">
              Filter catalogue
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`sharp-button px-5 py-3 text-sm font-black transition-colors ${
                  selectedCategory === null
                    ? "bg-[#08080c] text-white"
                    : "bg-white text-[#08080c]/58 hover:bg-primary hover:text-[#08080c]"
                }`}
                type="button"
              >
                All Products
              </button>
              {IT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`sharp-button px-5 py-3 text-sm font-black transition-colors ${
                    selectedCategory === category
                      ? "bg-[#08080c] text-white"
                      : "bg-white text-[#08080c]/58 hover:bg-primary hover:text-[#08080c]"
                  }`}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#08080c]/10 bg-[#08080c]/10 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group bg-[#f8f5ed] p-7 transition-colors hover:bg-[#08080c] hover:text-white"
              >
                <div className="flex items-start justify-between gap-6">
                  <div
                    className={`flex h-14 w-14 items-center justify-center bg-gradient-to-br ${product.color} text-2xl text-white`}
                  >
                    <i className={product.icon} aria-hidden="true" />
                  </div>
                  <p className="sharp-chip border border-[#08080c]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#08080c]/46 group-hover:border-white/12 group-hover:text-white/50">
                    {product.category}
                  </p>
                </div>
                <h2 className="mt-12 text-3xl font-black leading-tight">
                  {product.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#08080c]/58 group-hover:text-white/62">
                  {product.details}
                </p>
                <ul className="mt-6 grid gap-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm font-semibold text-[#08080c]/58 group-hover:text-white/66"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5d4dff] group-hover:bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-[#08080c]/10 pt-5 group-hover:border-white/12">
                  <span className="text-sm font-black text-[#5d4dff] group-hover:text-primary">
                    {product.price}
                  </span>
                  <Link
                    href="/contact"
                    className="sharp-button bg-[#08080c] px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors group-hover:bg-primary group-hover:text-[#08080c]"
                  >
                    Inquire
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-[#08080c]/58">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-4xl text-5xl font-black leading-none text-balance">
            Need the full stack scoped, supplied, and installed?
          </h2>
          <Link
            href="/contact"
            className="sharp-button inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
