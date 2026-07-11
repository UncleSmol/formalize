import Link from "next/link";

const contactSteps = ["Tell us what feels messy", "We map the business", "We build the operating plan"];

export default function Contact() {
  return (
    <main className="text-white">
      <section id="contact" className="video-section premium-grid px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 xl:grid-cols-[1fr_0.78fr] xl:items-end">
          <div className="video-copy video-panel sharp-panel px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Start here
            </p>
            <h1 className="section-heading mt-5 text-5xl font-black sm:text-6xl lg:text-7xl xl:text-8xl">
              Build a business that feels controlled.
            </h1>
          </div>
          <div className="video-copy sharp-card border border-white/10 bg-[#08080c]/62 p-6 backdrop-blur-xl">
            <p className="text-lg leading-8 text-white/68">
              If the work is scattered, the next move is structure. Send us a
              note and we will help identify the operating gaps worth fixing
              first.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="mailto:hello@formalize.co.za"
                className="sharp-button inline-flex justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-transform hover:-translate-y-1"
              >
                Email Formalize
              </a>
              <Link
                href="/services"
                className="sharp-button inline-flex justify-center border border-white/12 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/70 transition-colors hover:bg-white hover:text-[#08080c]"
              >
                Review services
              </Link>
            </div>
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
