const principles = [
  "Structure the messy parts",
  "Make the next step obvious",
  "Keep business support human",
];

export default function About() {
  return (
    <main className="bg-transparent">
      <section id="about" className="bg-[#fffaf1] px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#ff4fa3]">
              What We Do
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#17142a] sm:text-6xl">
              We turn business chaos into a system people can actually use.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#4c466b]">
              Formalize is a business support and systems company for growing
              teams that need structure without losing momentum. We connect the
              everyday parts of your company into one practical operating plan.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#17142a] p-6 text-white shadow-[0_28px_80px_rgba(23,20,42,0.22)]">
            <div className="grid gap-4">
              {principles.map((principle, index) => (
                <div
                  key={principle}
                  className="rounded-[1.25rem] bg-white/10 p-5 ring-1 ring-white/10"
                >
                  <p className="text-sm font-bold text-[#ffe84f]">
                    0{index + 1}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{principle}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
