const audience = [
  {
    icon: "bi-shop",
    label: "Small to Medium Businesses",
    description: "Build the operating foundation before complexity piles up.",
    color: "bg-[#ffe84f]",
  },
  {
    icon: "bi-graph-up-arrow",
    label: "Growing Companies",
    description: "Replace daily chaos with systems your team can repeat.",
    color: "bg-[#7df3ff]",
  },
  {
    icon: "bi-rocket-takeoff",
    label: "Scale-Ready Businesses",
    description: "Create the structure needed for bigger clients and teams.",
    color: "bg-[#ff4fa3]",
  },
];

export default function Audience() {
  return (
    <main className="bg-transparent">
      <section id="audience" className="bg-[#f7f4ff] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-[#ff4fa3]">
              Who We Help
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#17142a] sm:text-6xl">
              Built for businesses ready to look as sharp as they operate.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#4c466b]">
              We work with companies that know there is a better way to run the
              back office, serve clients, and prepare for growth.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audience.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] bg-white p-8 shadow-sm ring-1 ring-[#17142a]/10"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-2xl text-[#17142a]`}
                >
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-[#17142a]">
                  {item.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#4c466b]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
