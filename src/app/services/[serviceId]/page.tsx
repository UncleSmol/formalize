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
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <i className="bi-arrow-left" aria-hidden="true" />
            All services
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="flex h-16 w-16 items-center justify-center bg-white/10 text-3xl text-primary">
                <i className={service.icon} aria-hidden="true" />
              </div>
              <h1 className="section-heading mt-8 max-w-4xl text-4xl font-black sm:text-5xl lg:text-6xl">
                {service.summary}
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/60">
              {service.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/40">
              Focus areas
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="border border-white/10 px-5 py-4 text-sm font-bold text-white/60"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              What we deliver
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.details.map((detail) => (
                <div
                  key={detail}
                  className="flex gap-3 border border-white/10 px-5 py-4"
                >
                  <span className="mt-2 h-2 w-2 flex-shrink-0 bg-primary" />
                  <span className="text-sm leading-6 text-white/60">{detail}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border border-white/10 bg-white/[0.03] p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <h2 className="section-heading max-w-3xl text-3xl font-black leading-none sm:text-4xl">
              Scope a {service.title.toLowerCase()} system that fits the business.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
            >
              Start now
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Compare all services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
