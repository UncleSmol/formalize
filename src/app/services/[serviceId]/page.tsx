import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById, SERVICES } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ serviceId: service.id }));
}

interface ServicePageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#08080c] text-white">
      <section className="premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <Link
              href="/services"
              className="sharp-button inline-flex items-center gap-2 border border-white/12 bg-white/6 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <i className="bi-arrow-left" aria-hidden="true" />
              All services
            </Link>
            <div className={`mt-8 flex h-16 w-16 items-center justify-center ${service.color} text-3xl text-[#08080c]`}>
              <i className={service.icon} aria-hidden="true" />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-primary">
              {service.title}
            </p>
            <h1 className="section-heading mt-5 max-w-4xl text-5xl font-black sm:text-6xl lg:text-7xl">
              {service.summary}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/62">
            {service.intro}
          </p>
        </div>
      </section>

      <section className="bg-[#f3f0e8] px-6 py-28 text-[#08080c]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="sharp-card bg-[#f8f5ed] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#5d4dff]">
              Focus areas
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="border border-[#08080c]/10 bg-white px-5 py-4 text-sm font-bold text-[#08080c]/72"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="sharp-card bg-[#08080c] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              What we deliver
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.details.map((detail) => (
                <div
                  key={detail}
                  className="flex gap-3 border border-white/10 bg-white/6 px-5 py-4"
                >
                  <span className="mt-2 h-2 w-2 flex-shrink-0 bg-primary" />
                  <span className="text-sm leading-6 text-white/74">{detail}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#08080c] px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border border-white/10 bg-white/6 p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Next step
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-none text-balance sm:text-5xl">
              Scope a {service.title.toLowerCase()} system that fits the business.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="sharp-button inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
            >
              Start now
            </Link>
            <Link
              href="/services"
              className="sharp-button inline-flex items-center justify-center border border-white/12 bg-white/7 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/12"
            >
              Compare all services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}