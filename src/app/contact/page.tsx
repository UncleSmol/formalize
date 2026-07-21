import { ContactForm } from "@/components/ContactForm";

const contactSteps = ["Tell us what feels messy", "We map the business", "We build the operating plan"];

export default function Contact() {
  return (
    <main className="text-white">
      <section className="px-6 pb-24 pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-start">
          <div>
            <h1 className="section-heading text-4xl font-black sm:text-5xl lg:text-6xl xl:text-7xl">
              Build a business that feels controlled.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              If the work is scattered, the next move is structure. Send us a
              note and we will help identify the operating gaps worth fixing
              first.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-[#08080c]">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em]">
            Engagement flow
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {contactSteps.map((step, index) => (
              <div key={step} className="border-t border-[#08080c]/20 pt-5">
                <p className="text-sm font-black">0{index + 1}</p>
                <h2 className="mt-8 text-3xl font-black leading-tight">
                  {step}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
