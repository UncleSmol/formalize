import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import processesHeroImage from "@/assets/processes-hero-image.png";
import laptopHeroImage from "@/assets/laptop-hero-image.png";
import { OurClientsRotator } from "@/components/OurClientsRotator";
import type { Client } from "@/components/OurClientsRotator";
import drTalaneLogo from "@/assets/our-clients/dr-talane-and-associates.png";
import drKySepengLogo from "@/assets/our-clients/dr-ky-sepeng.png";
import tshepoYaRonaLogo from "@/assets/our-clients/tshepo-ya-rona.png";
import angelRivoniLogo from "@/assets/our-clients/angel-rivoni.png";
import mphakathiLogo from "@/assets/our-clients/mphakathi-funeral-home.png";
import ilangaLinyeLogo from "@/assets/our-clients/ilanga-linye.png";
import mementoesLogo from "@/assets/our-clients/mementoes.png";
import elomkProjectsLogo from "@/assets/our-clients/elomk-projects.png";

export const metadata: Metadata = {
 title: "About | Formalize",
 description:
 "We design the operating layer behind ambitious businesses. Formalize helps growing companies structure finance, operations, systems, marketing, HR, and office setup.",
};

const principles = [
 {
 title: "Structure before scale",
 text: "We map the way work actually moves, then rebuild it into a cleaner operating model.",
 },
 {
 title: "Systems people use",
 text: "No overbuilt manuals. We install practical tools, rituals, and workflows your team can repeat.",
 },
 {
 title: "One connected partner",
 text: "Finance, operations, IT, marketing, HR, and workspace decisions move from the same source of truth.",
 },
];

const clients: Client[] = [
 {
 name: "Dr Talane & Associates",
 description:
 "Dr Talane & Associates is a dental practice based in eMalahleni that provides general and aesthetic dental care. The practice focuses on patient comfort, gentle treatment, and modern dental solutions. Its services are designed to support healthy smiles through practical, professional care.",
 logo: drTalaneLogo.src,
 website: "drtalanesmile.co.za",
 },
 {
 name: "Dr K.Y. Sepeng",
 description:
 "Dr K.Y. Sepeng is a dental practice led by Dr Kgomotso Sepeng. The practice is focused on oral health and professional patient care. It maintains a clear presence across professional and social platforms.",
 logo: drKySepengLogo.src,
 },
 {
 name: "Tshepo Ya Rona",
 description:
 "Tshepo Ya Rona is a South African construction and engineering company founded in 2005. The business delivers infrastructure and project solutions with a focus on quality and compliance. It is a 100% black woman-owned company with a strong track record in the industry.",
 logo: tshepoYaRonaLogo.src,
 website: "tshepoyarona.co.za",
 },
 {
 name: "Angel Rivoni",
 description:
 "Angel Rivoni is a beauty and personal care business based in eMalahleni. The brand offers professional services with a focus on quality, presentation, and client convenience. Its online presence reflects a service-led business with a clear beauty and grooming focus.",
 logo: angelRivoniLogo.src,
 website: "angelrivoni.co.za",
 facebook: "https://www.facebook.com/angelrivoninails",
 instagram: "https://www.instagram.com/angelrivoni/",
 },
 {
 name: "Mphakathi Funeral Home",
 description:
 "Mphakathi Funeral Home provides funeral services with dignity, compassion, and care. The business supports families with practical arrangements and respectful service during difficult times. Its work is centered on helping people honour loved ones in a thoughtful and professional way.",
 logo: mphakathiLogo.src,
 facebook: "https://www.facebook.com/mphakathifuneralhomesa",
 },
 {
 name: "Ilanga Linye",
 description:
 "Ilanga Linye is a financial services business that helps clients with debt review and credit-related support. The company\u2019s work is focused on helping people manage financial pressure and improve their financial standing. Its services are practical, direct, and support-driven.",
 logo: ilangaLinyeLogo.src,
 website: "ilangalinye.co.za",
 facebook: "https://www.facebook.com/Ilangalinyeholdings",
 },
 {
 name: "Mementoes",
 description:
 "Mementoes is a South African company providing logistics, waste management, infrastructure maintenance, and mobile office solutions. The business is known for handling waste tyre transportation responsibly and supporting environmentally conscious operations. Its work is practical, reliable, and service-driven.",
 logo: mementoesLogo.src,
 website: "mementoes.co.za",
 },
 {
 name: "Elomk Projects",
 description:
 "Elomk Projects is a technical and security services company offering solutions such as CCTV, electric fencing, gate automation, and plumbing. The business focuses on dependable installations and practical support for properties and businesses. It presents a straightforward, service-led approach to technical work.",
 logo: elomkProjectsLogo.src,
 website: "elomkprojects.co.za",
 },
];

export default function About() {
 return (
 <main className="text-white">
      <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-visible px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="animate-reveal-up">
              <h2 className="section-heading text-4xl font-black leading-none sm:text-5xl lg:text-6xl xl:text-7xl">
                We design the operating layer behind ambitious businesses.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Formalize is built for companies that are growing faster than their
                internal structure. We translate scattered work into systems that
                make the business easier to run, easier to sell, and easier to
                scale.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90"
                >
                  Explore capabilities
                  <i className="bi-arrow-up-right" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Start an enquiry
                </Link>
              </div>
            </div>
            <div className="animate-reveal-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <h1
                  className="invisible select-none font-[family-name:var(--font-league-spartan)] text-7xl font-black leading-none tracking-tight sm:text-8xl lg:text-9xl"
                  style={{ color: '#121212' }}
                  aria-hidden="true"
                >
                  formal
                  <span className="relative">
                    ı
                    <span className="animate-dot-bounce absolute -right-1 top-0 h-3 w-[0.28em] bg-primary sm:h-4" style={{ borderRadius: '50%' }} />
                  </span>
                  ze
                  <span className="animate-dot-bounce text-primary">.</span>
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={laptopHeroImage}
                    alt=""
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 <section className="bg-primary px-6 py-24 text-[#08080c]">
 <div className="mx-auto max-w-3xl text-center">
 <p className="text-sm font-black uppercase tracking-[0.24em] text-[#08080c]/50">
 Who we are
 </p>
 <p className="mt-8 text-lg leading-8 text-[#08080c]/80 sm:text-xl sm:leading-9">
 We are Formalize, a business support company based in eMalahleni,
 and we&rsquo;re here to help organisations run more smoothly. We
 work across finance, operations, HR, marketing, and IT, offering
 practical support that is shaped around the real needs of each
 client. Our approach is hands-on, professional, and focused on
 making everyday business tasks easier to manage. We believe good
 support should create clarity, improve efficiency, and give
 businesses the confidence to keep moving forward.
 </p>
 </div>
 </section>

 <section className="px-6 py-24">
 <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
 <div className="overflow-hidden border border-white/10 bg-white/[0.03]">
 <Image
 src={processesHeroImage}
 alt="Operational systems preview"
 className="block h-auto w-full"
 priority
 />
 </div>
 <div className="grid gap-8">
 {principles.map((principle, index) => (
 <article key={principle.title} className="border-b border-white/10 pb-6">
 <p className="text-sm font-black text-white/30">
 0{index + 1}
 </p>
 <h2 className="mt-3 text-3xl font-black text-white">
 {principle.title}
 </h2>
 <p className="mt-3 text-sm leading-6 text-white/50">
 {principle.text}
 </p>
 </article>
 ))}
 </div>
 </div>
 </section>

 <section className="relative z-10 bg-background px-6 py-24">
 <div className="mx-auto max-w-7xl">
 <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">
 Our network
 </p>
 <h2 className="section-heading mt-4 text-4xl font-black leading-none sm:text-5xl">
 Clients we work with.
 </h2>
 </div>
 <div className="mx-auto mt-16 max-w-7xl">
 <OurClientsRotator clients={clients} />
 </div>
 </section>

  <section className="bg-primary px-6 py-24 text-[#08080c]">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="section-heading max-w-4xl text-4xl font-black leading-none sm:text-6xl">
          Ready to work with us?
        </h2>
      </div>
      <Link
        href="/contact"
        className="inline-flex w-fit bg-[#08080c] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
      >
        Start the conversation
      </Link>
    </div>
  </section>
 </main>
 );
}
