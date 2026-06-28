import Image from "next/image";
import Link from "next/link";
import websitePackage from "@/assets/website-package.png";
import businessPhonePackage from "@/assets/business-phone-package.png";
import { InteractiveHeroMedia } from "@/components/InteractiveHeroMedia";

const problemSolutions = [
  {
    problem: "Scattered systems",
    solution: "Connected operations",
    icon: "bi-diagram-3",
  },
  {
    problem: "Disconnected teams",
    solution: "Unified strategy",
    icon: "bi-people-fill",
  },
  {
    problem: "Reactive decisions",
    solution: "Proactive growth",
    icon: "bi-lightning-charge-fill",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-transparent">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#17142a] shadow-sm ring-1 ring-white/40">
              Business structure, minus the boardroom boredom
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Formalize your business without making it feel stiff.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              We help growing companies organize finance, operations, systems,
              marketing, HR, and office setup into one clear, colorful operating
              rhythm.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#ffe84f] px-7 py-4 text-base font-bold text-[#17142a] shadow-[0_18px_40px_rgba(255,232,79,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe84f]"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-white/12 px-7 py-4 text-base font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative min-h-[440px]">
            <InteractiveHeroMedia />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ff] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="text-sm font-bold uppercase text-[#ff4fa3]">
              One operating partner
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#17142a] sm:text-5xl">
              Your business pieces should click together.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4c466b]">
              Formalize turns scattered tasks into connected systems, so the
              same plan guides your money, people, tools, brand, and workspace.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {problemSolutions.map((item) => (
                <div key={item.problem} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <i className={`${item.icon} text-2xl text-[#ff4fa3]`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4c466b]">
                      {item.problem}
                    </p>
                    <div className="my-2">
                      <i className="bi-arrow-right text-[#ff4fa3]" />
                    </div>
                    <p className="text-base font-bold text-[#17142a]">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full bg-[#17142a] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#ff4fa3]"
            >
              Meet Formalize
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[websitePackage, businessPhonePackage].map((image, index) => (
              <div
                key={image.src}
                className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#17142a]/10"
              >
                <Image
                  src={image}
                  alt={
                    index === 0
                      ? "Website service package"
                      : "Business phone service package"
                  }
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
