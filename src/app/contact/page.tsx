import Link from "next/link";

export default function Contact() {
  return (
    <main className="bg-transparent">
      <section id="contact" className="bg-[#f7f4ff] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#17142a] px-6 py-16 text-center text-white shadow-[0_28px_80px_rgba(23,20,42,0.22)] sm:px-12">
          <p className="text-sm font-bold uppercase text-[#ffe84f]">
            Get Started
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
            Ready to make your business feel easier to run?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Stop losing money to disorganization. Let us build the systems your
            business needs to run properly, with everything connected in one
            place.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:hello@formalize.co.za"
              className="rounded-full bg-[#ffe84f] px-8 py-4 text-lg font-bold text-[#17142a] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe84f]"
            >
              Email Us
            </a>
            <Link
              href="/services"
              className="rounded-full bg-white/10 px-8 py-4 text-lg font-bold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
