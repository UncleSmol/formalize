import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import financeHeroImage from "@/assets/finance-hero-image.png";
import laptopHeroImage from "@/assets/laptop-hero-image.png";
import processesHeroImage from "@/assets/processes-hero-image.png";
import websitePackage from "@/assets/website-package.png";
import businessPhonePackage from "@/assets/business-phone-package.png";
import displaySetPackage from "@/assets/display-set-package.png";

const metrics = [
  { value: "06", label: "business functions unified" },
  { value: "01", label: "operating partner" },
  { value: "360", label: "degree business support" },
];

const process = [
  "Diagnose the friction",
  "Design the operating model",
  "Install the systems",
  "Measure and improve",
];

export default function Home() {
  return (
    <main className="text-white">
      <section className="video-section premium-grid relative min-h-screen overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(var(--primary-rgb),0.18),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(119,106,255,0.24),transparent_30%),linear-gradient(180deg,rgba(8,8,12,0.08),#08080c_86%)]" />
        <div className="absolute left-1/2 top-28 h-px w-[90vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="video-copy video-panel animate-reveal-up rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
            <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary backdrop-blur">
              Formalize / Business Operating Systems
            </p>
            <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.9] tracking-normal text-balance sm:text-7xl lg:text-8xl">
              Business chaos, redesigned into momentum.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              We build the structure behind growing companies: finance,
              operations, technology, brand, people, and workspace systems that
              feel clear, premium, and usable.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
              >
                Start the build
                <i
                  className="bi-arrow-up-right transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/7 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition-colors hover:bg-white/12"
              >
                View capabilities
              </Link>
            </div>
          </div>

          <div className="relative min-h-[620px] lg:min-h-[680px]">
            <div className="absolute right-0 top-0 w-[78%] overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <Image
                src={laptopHeroImage}
                alt="Formalize digital systems preview"
                className="h-auto w-full rounded-[1.35rem]"
                priority
              />
            </div>
            <div className="animate-drift absolute left-0 top-24 w-[58%] overflow-hidden rounded-[1.5rem] border border-white/12 bg-primary p-3 shadow-[0_30px_90px_rgba(var(--primary-rgb),0.16)]">
              <Image
                src={financeHeroImage}
                alt="Finance systems preview"
                className="h-auto w-full rounded-[1.05rem]"
                priority
              />
            </div>
            <div className="absolute bottom-10 right-8 w-[54%] overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#11111a] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
              <Image
                src={processesHeroImage}
                alt="Operations systems preview"
                className="h-auto w-full rounded-[1.05rem]"
              />
            </div>
            <div className="absolute bottom-24 left-4 max-w-[250px] rounded-[1.5rem] border border-white/12 bg-white/10 p-5 backdrop-blur-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/52">
                Live operating layer
              </p>
              <div className="mt-5 space-y-3">
                {SERVICES.slice(0, 4).map((service, index) => (
                  <div key={service.id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-white/78">
                      {service.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d14] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-end gap-4">
              <p className="text-6xl font-black text-primary">
                {metric.value}
              </p>
              <p className="pb-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#5d4dff]">
                Capabilities
              </p>
              <h2 className="mt-5 text-5xl font-black leading-none text-balance sm:text-6xl">
                One partner for the parts that usually drift apart.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[#08080c]/10 bg-[#08080c]/10 md:grid-cols-2">
              {SERVICES.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group bg-[#f8f5ed] p-7 transition-colors hover:bg-[#08080c] hover:text-white"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-black text-[#5d4dff] group-hover:text-primary">
                      0{index + 1}
                    </span>
                    <i
                      className={`${service.icon} text-2xl text-[#08080c]/40 group-hover:text-primary`}
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

      <section className="video-section overflow-hidden px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="video-copy max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
                Featured outputs
              </p>
              <h2 className="mt-5 max-w-3xl text-5xl font-black leading-none text-balance sm:text-6xl">
                Tangible systems, tools, and brand assets that ship.
              </h2>
            </div>
            <Link
              href="/services/it-products"
              className="inline-flex w-fit rounded-full border border-white/12 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white/70 transition-colors hover:bg-white hover:text-[#08080c]"
            >
              Browse IT catalogue
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[websitePackage, businessPhonePackage, displaySetPackage].map(
              (image, index) => (
                <div
                  key={image.src}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5"
                >
                  <div className="overflow-hidden rounded-[1.35rem] bg-[#f3f0e8]">
                    <Image
                      src={image}
                      alt={`Formalize output preview ${index + 1}`}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-white/46">
                    Output 0{index + 1}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <h2 className="text-5xl font-black leading-none text-balance sm:text-7xl">
            A sharper company starts with a sharper operating system.
          </h2>
          <div>
            <div className="space-y-3">
              {process.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#08080c]/20 py-4"
                >
                  <span className="text-lg font-black">{item}</span>
                  <span className="text-sm font-black">0{index + 1}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-9 inline-flex rounded-full bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1"
            >
              Formalize the business
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
