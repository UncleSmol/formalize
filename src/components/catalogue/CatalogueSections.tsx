import type { CatalogueItemSection } from "@/lib/supabase/types";

interface CatalogueSectionsProps {
  sections: CatalogueItemSection[];
}

export function CatalogueSections({ sections }: CatalogueSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16">
          {sections
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((section) => (
              <article
                key={section.id}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
              >
                <div>
                  {section.heading && (
                    <h2 className="text-4xl font-black leading-tight text-white">
                      {section.heading}
                    </h2>
                  )}
                </div>
                <div>
                  {section.body && (
                    <div className="text-base leading-7 text-white/60 whitespace-pre-line">
                      {section.body}
                    </div>
                  )}
                  {section.media_url && (
                    <div className="mt-6 overflow-hidden border border-white/10 bg-white/[0.03]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.media_url}
                        alt={section.heading ?? ""}
                        className="h-auto w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
