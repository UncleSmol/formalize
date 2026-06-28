import { SERVICES } from "@/lib/services";

export default function Services() {
  return (
    <main className="bg-transparent">
      <section id="services" className="bg-[#fffaf1] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-[#ff4fa3]">
                Our Services
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight text-[#17142a] sm:text-6xl">
                Six business departments, one coordinated support team.
              </h1>
            </div>
            <p className="text-lg leading-8 text-[#4c466b]">
              Choose one area or let us connect them all. Each service is built
              to make your company clearer, more professional, and easier to
              manage.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="group rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-[#17142a]/10 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.color} text-2xl text-[#17142a]`}
                >
                  <i className={service.icon} aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-[#17142a]">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#4c466b]">
                  {service.description}
                </p>
                <ul className="mt-6 grid gap-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-full bg-[#f7f4ff] px-4 py-2 text-sm font-semibold text-[#4c466b]"
                    >
                      <i
                        className="bi-check2-circle text-[#00a6c8]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
