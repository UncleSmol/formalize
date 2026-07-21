const audience = [
  {
    title: "Owner-led companies",
    text: "You are still the center of every decision, and the business needs a stronger rhythm around you.",
    signal: "Founder dependent",
  },
  {
    title: "Growing teams",
    text: "Work is happening, but not always in the same place, process, or standard.",
    signal: "Scaling pressure",
  },
  {
    title: "Professionalizing brands",
    text: "You need the business to look and operate with the same confidence you sell with.",
    signal: "Market ready",
  },
];

export default function Audience() {
  return (
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="section-heading max-w-5xl text-4xl font-black sm:text-5xl lg:text-6xl">
            For businesses where growth has started to outrun structure.
          </h1>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
          {audience.map((item, index) => (
            <article key={item.title} className="bg-[#08080c] p-8 sm:p-10">
              <p className="text-sm font-black text-white/30">0{index + 1}</p>
              <h2 className="mt-10 text-4xl font-black leading-none text-white">
                {item.title}
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/50">
                {item.text}
              </p>
              <p className="mt-10 inline-block border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/40">
                {item.signal}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
