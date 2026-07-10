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
      <section className="video-section premium-grid px-6 pb-24 pt-36">
        <div className="video-copy video-panel mx-auto max-w-4xl rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
            Who We Help
          </p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black leading-none text-balance sm:text-7xl">
            For businesses where growth has started to outrun structure.
          </h1>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-[#08080c]/10 bg-[#08080c]/10 lg:grid-cols-3">
          {audience.map((item, index) => (
            <article key={item.title} className="bg-[#f8f5ed] p-8 sm:p-10">
              <p className="text-sm font-black text-[#5d4dff]">0{index + 1}</p>
              <h2 className="mt-10 text-4xl font-black leading-none">
                {item.title}
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#08080c]/58">
                {item.text}
              </p>
              <p className="mt-10 rounded-full border border-[#08080c]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#08080c]/52">
                {item.signal}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
