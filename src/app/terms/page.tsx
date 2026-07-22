import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Formalize",
  description: "Formalize terms and conditions governing the use of our website and services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-black">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">1. Acceptance</h2>
          <p>
            By accessing or using the Formalize website and services, you agree to be bound
            by these Terms of Service. If you do not agree, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">2. Services</h2>
          <p>
            Formalize provides business infrastructure services including finance, operations,
            systems, marketing, HR, and workspace setup as described on our website. We reserve
            the right to modify, suspend, or discontinue any service at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">3. Orders &amp; Payment</h2>
          <p>
            All orders are subject to acceptance and availability. Prices are quoted in South
            African Rand (ZAR) and exclude VAT unless stated otherwise. Payment is due before
            service delivery unless alternative arrangements are agreed in writing. EFT payments
            must reference your order number.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the
            property of Formalize (Pty) Ltd and is protected by applicable copyright and
            trademark law. You may not reproduce, distribute, or create derivative works without
            our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">5. Limitation of Liability</h2>
          <p>
            Formalize shall not be liable for any indirect, incidental, or consequential damages
            arising from the use or inability to use our services. Our total liability is
            limited to the amount paid by you for the specific service giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">6. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Republic of South Africa. Any disputes
            shall be submitted to the jurisdiction of the courts of South Africa.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">7. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:legal@formalize.biz" className="text-primary underline">legal@formalize.biz</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
