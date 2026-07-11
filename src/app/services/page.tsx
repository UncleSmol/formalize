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
      <section id="services" className="video-section premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <div className="video-copy video-panel sharp-panel px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Services
            </p>
            <h1 className="section-heading mt-5 text-5xl font-black sm:text-6xl lg:text-7xl">
              A complete operating stack for modern businesses.
            </h1>
          </div>
          <p className="video-copy max-w-2xl text-lg leading-8 text-white/72">
            Each capability can stand alone, but the real value appears when
            the systems work together: money, process, technology, brand,
            people, and workspace.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-[#08080c]/10 bg-[#08080c]/10">
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="group grid gap-8 bg-[#f8f5ed] p-7 transition-colors hover:bg-[#08080c] hover:text-white lg:grid-cols-[0.18fr_0.32fr_1fr]"
              >
                <div className="flex items-start justify-between lg:block">
                  <p className="text-sm font-black text-[#5d4dff] group-hover:text-primary">
                    0{index + 1}
                  </p>
                  <div
                    className={`mt-0 flex h-14 w-14 items-center justify-center ${service.color} text-2xl text-[#08080c] lg:mt-10`}
                  >
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black leading-none">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#08080c]/58 group-hover:text-white/58">
                    {service.description}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border-t border-[#08080c]/10 py-4 group-hover:border-white/12"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#5d4dff] group-hover:bg-primary" />
                      <span className="text-sm font-bold text-[#08080c]/66 group-hover:text-white/72">
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

      <section className="video-section px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="video-copy max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
                Service proof
              </p>
              <h2 className="mt-5 max-w-3xl text-5xl font-black leading-none text-balance">
                Strategy is only useful when it becomes a working asset.
              </h2>
            </div>
            <Link
              href="/services/it-products"
              className="sharp-button inline-flex w-fit bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
            >
              IT product catalogue
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredImages.map((item) => (
              <div
                key={item.alt}
                className="sharp-frame overflow-hidden border border-white/10 bg-white/6 p-4"
              >
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
          <h2 className="max-w-4xl text-5xl font-black leading-none text-balance sm:text-6xl">
            Bring the disconnected parts of the business into one operating
            model.
          </h2>
          <Link
            href="/contact"
            className="sharp-button inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
          >
            Start now
          </Link>
        </div>
      </section>
    </main>
  );
}
