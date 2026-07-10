import Image from "next/image";
import processesHeroImage from "@/assets/processes-hero-image.png";
import hrInfoImage from "@/assets/hr-info.png";

const principles = [
  {
    title: "Structure before scale",
    text: "We map the way work actually moves, then rebuild it into a cleaner operating model.",
  },
  {
    title: "Systems people use",
    text: "No overbuilt manuals. We install practical tools, rituals, and workflows your team can repeat.",
  },
  {
    title: "One connected partner",
    text: "Finance, operations, IT, marketing, HR, and workspace decisions move from the same source of truth.",
  },
];

export default function About() {
  return (
    <main className="text-white">
      <section className="video-section premium-grid relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(var(--primary-rgb),0.15),transparent_30%),linear-gradient(180deg,transparent,#08080c_82%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="video-copy video-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              About Formalize
            </p>
            <h1 className="mt-5 text-6xl font-black leading-none text-balance sm:text-7xl">
              We design the operating layer behind ambitious businesses.
            </h1>
          </div>
          <p className="video-copy max-w-2xl text-lg leading-8 text-white/72">
            Formalize is built for companies that are growing faster than their
            internal structure. We translate scattered work into systems that
            make the business easier to run, easier to sell, and easier to
            scale.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#11111a] p-4">
            <Image
              src={processesHeroImage}
              alt="Operational systems preview"
              className="h-auto w-full rounded-[1.35rem]"
              priority
            />
          </div>
          <div className="grid gap-6">
            {principles.map((principle, index) => (
              <article
                key={principle.title}
                className="border-b border-[#08080c]/12 pb-6"
              >
                <p className="text-sm font-black text-[#5d4dff]">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-3xl font-black">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#08080c]/58">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="video-section px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="video-copy max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Human systems
            </p>
            <h2 className="mt-5 text-5xl font-black leading-none text-balance">
              Premium structure still needs to feel human.
            </h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-4">
            <Image
              src={hrInfoImage}
              alt="Human resources information preview"
              className="h-auto w-full rounded-[1.35rem]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
