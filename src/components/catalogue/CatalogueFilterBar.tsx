"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Category } from "@/lib/supabase/types";

interface CatalogueFilterBarProps {
  categories: Category[];
  paramName?: string;
}

export function CatalogueFilterBar({
  categories,
  paramName = "category",
}: CatalogueFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = searchParams.get(paramName);

  function handleFilter(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleFilter(null)}
        className={`sharp-button px-5 py-3 text-sm font-black transition-colors ${
          active === null
            ? "bg-[#08080c] text-white"
            : "bg-white text-[#08080c]/58 hover:bg-primary hover:text-[#08080c]"
        }`}
        type="button"
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleFilter(cat.slug)}
          className={`sharp-button px-5 py-3 text-sm font-black transition-colors ${
            active === cat.slug
              ? "bg-[#08080c] text-white"
              : "bg-white text-[#08080c]/58 hover:bg-primary hover:text-[#08080c]"
          }`}
          type="button"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
