export default function CatalogueLoading() {
  return (
    <main className="text-white">
      <section className="premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="sharp-panel bg-white/6 px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-3 h-4 w-24 animate-pulse bg-white/10" />
            <div className="h-16 w-3/4 animate-pulse bg-white/10 sm:h-20" />
          </div>
          <div className="h-12 w-full animate-pulse bg-white/10" />
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="mb-6 h-4 w-32 animate-pulse bg-[#08080c]/10" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-24 animate-pulse bg-[#08080c]/10"
                />
              ))}
            </div>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#08080c]/10 bg-[#08080c]/10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#f8f5ed] p-7">
                <div className="mb-6 h-5 w-20 animate-pulse bg-[#08080c]/10" />
                <div className="mb-4 h-8 w-3/4 animate-pulse bg-[#08080c]/10" />
                <div className="mb-4 h-12 w-full animate-pulse bg-[#08080c]/10" />
                <div className="h-10 w-full animate-pulse bg-[#08080c]/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
