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
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="section-heading text-4xl font-black sm:text-5xl lg:text-6xl">
              We design the operating layer behind ambitious businesses.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/60">
            Formalize is built for companies that are growing faster than their
            internal structure. We translate scattered work into systems that
            make the business easier to run, easier to sell, and easier to
            scale.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="overflow-hidden border border-white/10 bg-white/[0.03]">
            <Image
              src={processesHeroImage}
              alt="Operational systems preview"
              className="block h-auto w-full"
              priority
            />
          </div>
          <div className="grid gap-8">
            {principles.map((principle, index) => (
              <article key={principle.title} className="border-b border-white/10 pb-6">
                <p className="text-sm font-black text-white/30">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="max-w-2xl">
            <h2 className="section-heading text-4xl font-black leading-none">
              Premium structure still needs to feel human.
            </h2>
          </div>
          <div className="overflow-hidden border border-white/10 bg-white/[0.03]">
            <Image
              src={hrInfoImage}
              alt="Human resources information preview"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
