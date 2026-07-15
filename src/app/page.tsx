import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import financeHeroImage from "@/assets/finance-hero-image.png";
import laptopHeroImage from "@/assets/laptop-hero-image.png";
import processesHeroImage from "@/assets/processes-hero-image.png";

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

const featuredDomains = [
  "Finance visibility and controls",
  "Operations rhythm and SOPs",
  "IT systems, devices, and infrastructure",
  "Brand, people, and workspace execution",
];

export default function Home() {
  return (
    <main className="text-white">
      <section className="video-section premium-grid relative overflow-hidden px-6 pb-24 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(var(--primary-rgb),0.18),transparent_26%),linear-gradient(180deg,rgba(8,8,12,0.12),#08080c_84%)]" />
        <div className="absolute left-1/2 top-28 h-px w-[90vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-center">
          <div className="video-copy animate-reveal-up">
            <p className="sharp-tag inline-flex border border-white/12 bg-white/7 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary backdrop-blur">
              Formalize / Business Operating Systems
            </p>
            <h1 className="section-heading mt-7 max-w-[11ch] text-5xl font-black sm:text-6xl lg:text-7xl xl:text-[6.7rem]">
              Structure that makes a company feel under control.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8 lg:text-xl">
              Formalize installs the operating layer behind growing businesses,
              so finance, operations, systems, people, and delivery move like
              one business instead of six disconnected ones.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="sharp-button group inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
              >
                Explore capabilities
                <i
                  className="bi-arrow-up-right transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="sharp-button inline-flex items-center justify-center border border-white/14 bg-white/7 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition-colors hover:bg-white/12"
              >
                Start an enquiry
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {featuredDomains.map((domain) => (
                <div
                  key={domain}
                  className="border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/72"
                >
                  {domain}
                </div>
              ))}
            </div>
          </div>

          <div className="relative xl:min-h-[680px]">
            <div className="grid gap-4 md:grid-cols-[1.1fr_0.72fr] xl:block">
              <div className="sharp-frame overflow-hidden border border-white/12 bg-white/7 p-2 shadow-[0_32px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl xl:absolute xl:right-0 xl:top-0 xl:w-[78%]">
                <Image
                  src={laptopHeroImage}
                  alt="Formalize systems dashboard preview"
                  className="aspect-[16/11] h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="sharp-frame animate-drift overflow-hidden border border-white/12 bg-primary p-2 shadow-[0_24px_70px_rgba(var(--primary-rgb),0.16)] xl:absolute xl:left-0 xl:top-24 xl:w-[46%]">
                <Image
                  src={financeHeroImage}
                  alt="Finance controls preview"
                  className="aspect-[4/5] h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="sharp-card border border-white/12 bg-[#101018]/88 p-5 backdrop-blur-2xl xl:absolute xl:bottom-12 xl:right-10 xl:max-w-[310px]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Operating focus
                </p>
                <div className="mt-5 space-y-4">
                  {SERVICES.slice(0, 4).map((service, index) => (
                    <div
                      key={service.id}
                      className="flex items-start gap-3 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-white/12 bg-white/7 text-xs font-bold text-primary">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {service.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/52">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sharp-frame overflow-hidden border border-white/10 bg-[#11111a] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.3)] xl:absolute xl:bottom-0 xl:left-24 xl:w-[38%]">
                <Image
                  src={processesHeroImage}
                  alt="Operations systems preview"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d14] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.label} className="border-l border-white/10 pl-5">
              <p className="text-5xl font-black text-primary sm:text-6xl">
                {point.value}
              </p>
              <p className="mt-2 max-w-[18ch] text-sm font-semibold uppercase tracking-[0.16em] text-white/48">
                {point.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
                Capability map
              </p>
              <h2 className="mt-5 text-5xl font-black leading-none text-balance sm:text-6xl">
                One operating partner across the areas that usually break apart.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#08080c]/62">
                The work is not to add more noise. It is to make the business
                easier to run, easier to trust, and easier to grow.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[#08080c]/10 bg-[#08080c]/10 md:grid-cols-2">
              {SERVICES.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group bg-[#f8f5ed] p-7 transition-colors hover:bg-[#08080c] hover:text-white"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-black text-[#08080c]/36 group-hover:text-primary">
                      0{index + 1}
                    </span>
                    <i
                      className={`${service.icon} text-2xl text-[#08080c]/38 group-hover:text-primary`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-10 text-2xl font-black">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#08080c]/58 group-hover:text-white/62">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="video-section px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="video-copy max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              How it moves
            </p>
            <h2 className="mt-5 text-5xl font-black leading-none text-balance sm:text-6xl">
              A cleaner business is built in a sequence, not a scramble.
            </h2>
          </div>

          <div className="border border-white/10 bg-white/6 p-6 sm:p-8">
            <div className="space-y-3">
              {operatingRhythm.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start justify-between gap-6 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <p className="max-w-xl text-base font-semibold leading-7 text-white/76">
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
                className="sharp-button inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
              >
                Speak to Formalize
              </Link>
              <Link
                href="/about"
                className="sharp-button inline-flex items-center justify-center border border-white/12 bg-white/7 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/12"
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
            <p className="text-sm font-black uppercase tracking-[0.24em]">
              Next move
            </p>
            <h2 className="mt-5 max-w-4xl text-5xl font-black leading-none text-balance sm:text-7xl">
              If growth is ahead of structure, the operating layer is the work.
            </h2>
          </div>
          <Link
            href="/contact"
            className="sharp-button inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
