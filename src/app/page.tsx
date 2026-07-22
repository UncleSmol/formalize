import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { TeamImageRotator } from "@/components/TeamImageRotator";

const proofPoints = [
  { value: "06", label: "connected business functions" },
  { value: "01", label: "operating partner across the stack" },
  { value: "360", label: "degree view of business friction" },
];

const operatingRhythm = [
  "Audit where momentum is being lost",
  "Design the operating model around the real work",
  "Install the systems, assets, and accountabilities",
  "Keep refining what the business can now sustain",
];

export default function Home() {
  return (
    <main className="text-white">
      <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-visible px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-reveal-up max-w-2xl">
            <h1 className="section-heading mt-6 text-4xl font-black leading-none sm:text-5xl lg:text-6xl xl:text-7xl">
              Structure that makes a company feel under control.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Formalize installs the operating layer behind growing businesses,
              so finance, operations, systems, people, and delivery move like
              one business instead of six disconnected ones.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
              >
                Explore capabilities
                <i className="bi-arrow-up-right" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Start an enquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 hidden w-1/2 justify-center xl:flex">
          <TeamImageRotator />
        </div>
      </section>

      <section className="relative border-y border-gray-200 bg-white px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.label}>
              <p className="text-5xl font-black text-primary sm:text-6xl">
                {point.value}
              </p>
              <p className="mt-2 max-w-[18ch] text-sm font-semibold uppercase tracking-[0.16em] text-gray-600">
                {point.label}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-[-5px] right-0 translate-x-[30px] xl:hidden">
          <TeamImageRotator />
        </div>
      </section>

      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <h2 className="section-heading text-4xl font-black leading-none sm:text-5xl">
                One operating partner across the areas that usually break apart.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/50">
                The work is not to add more noise. It is to make the business
                easier to run, easier to trust, and easier to grow.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {SERVICES.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="bg-[#08080c] p-7 transition-colors hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-black text-white/30">
                      0{index + 1}
                    </span>
                    <i
                      className={`${service.icon} text-2xl text-white/30`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-10 text-2xl font-black text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/50">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="bg-background px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-2xl">
            <h2 className="section-heading text-4xl font-black leading-none sm:text-5xl">
              A cleaner business is built in a sequence, not a scramble.
            </h2>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-8">
            <div className="space-y-3">
              {operatingRhythm.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start justify-between gap-6 border-b border-white/5 py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <p className="max-w-xl text-base font-semibold leading-7 text-white/70">
                    {item}
                  </p>
                  <span className="text-sm font-black text-primary">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
              >
                Speak to Formalize
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Why this works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="section-heading max-w-4xl text-4xl font-black leading-none sm:text-6xl">
              If growth is ahead of structure, the operating layer is the work.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
