"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

export function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
  }

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  return (
    <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p className="text-sm text-[#08080c]/50">
        Showing {from}–{to} of {total} items
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="sharp-button flex h-10 w-10 items-center justify-center border border-[#08080c]/12 bg-white text-sm font-black text-[#08080c]/50 transition-colors hover:bg-[#08080c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          type="button"
          aria-label="Previous page"
        >
          <i className="bi-chevron-left" aria-hidden="true" />
        </button>

        {generatePageNumbers(currentPage, totalPages).map((page, i) =>
          page === null ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-6 items-center justify-center text-sm text-[#08080c]/30"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`sharp-button flex h-10 w-10 items-center justify-center text-sm font-black transition-colors ${
                page === currentPage
                  ? "bg-[#08080c] text-white"
                  : "border border-[#08080c]/12 bg-white text-[#08080c]/50 hover:bg-[#08080c] hover:text-white"
              }`}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="sharp-button flex h-10 w-10 items-center justify-center border border-[#08080c]/12 bg-white text-sm font-black text-[#08080c]/50 transition-colors hover:bg-[#08080c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          type="button"
          aria-label="Next page"
        >
          <i className="bi-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function generatePageNumbers(
  current: number,
  total: number,
): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];

  pages.push(1);

  if (current > 3) {
    pages.push(null);
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push(null);
  }

  pages.push(total);

  return pages;
}
