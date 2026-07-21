import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import financeInfoImage from "@/assets/finance-info.png";
import itSolutionsImage from "@/assets/IT-solutions.png";
import hrSolutionsImage from "@/assets/hr-solutions.png";

const featuredImages = [
  { image: financeInfoImage, alt: "Finance service interface" },
  { image: itSolutionsImage, alt: "IT solutions service interface" },
  { image: hrSolutionsImage, alt: "HR solutions service interface" },
];

export default function Services() {
  return (
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="section-heading text-4xl font-black sm:text-5xl lg:text-6xl">
              A complete operating stack for modern businesses.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/60">
            Each capability can stand alone, but the real value appears when
            the systems work together: money, process, technology, brand,
            people, and workspace.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="group grid gap-8 bg-[#08080c] p-8 transition-colors hover:bg-white/5 lg:grid-cols-[0.18fr_0.32fr_1fr]"
              >
                <div className="flex items-start justify-between lg:block">
                  <p className="text-sm font-black text-white/30">
                    0{index + 1}
                  </p>
                  <div className="mt-0 flex h-14 w-14 items-center justify-center bg-white/10 text-2xl text-primary lg:mt-10">
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black leading-none text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-white/50">
                    {service.description}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border-t border-white/10 py-4"
                    >
                      <span className="h-2 w-2 bg-primary" />
                      <span className="text-sm font-bold text-white/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="section-heading max-w-3xl text-4xl font-black leading-none">
                Strategy is only useful when it becomes a working asset.
              </h2>
            </div>
            <Link
              href="/services/it-products"
              className="inline-flex w-fit border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              IT product catalogue
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredImages.map((item) => (
              <div key={item.alt} className="overflow-hidden border border-white/10 bg-white/[0.03]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="section-heading max-w-4xl text-4xl font-black leading-none sm:text-5xl">
            Bring the disconnected parts of the business into one operating
            model.
          </h2>
          <Link
            href="/contact"
            className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Start now
          </Link>
        </div>
      </section>
    </main>
  );
}
