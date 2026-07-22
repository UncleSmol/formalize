import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Formalize",
  description: "Formalize privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">1. Information We Collect</h2>
          <p>
            We collect information you provide directly: name, email address, phone number,
            company details, and any messages you submit through our contact or enquiry forms.
            When you place an order, we collect billing and shipping information necessary to
            fulfil that order.
          </p>
          <p className="mt-2">
            We automatically collect certain technical data when you visit our site, including
            IP address, browser type, device information, and pages visited. This helps us
            monitor performance and improve our service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
          <p>
            We use your information to respond to enquiries, process orders, deliver services,
            send administrative communications, and improve our website. We may also use
            aggregated, anonymised data for analytics and reporting.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">3. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with trusted third-party
            service providers who assist us in operating our website and fulfilling orders
            (e.g., hosting, payment processing, email delivery). These providers are bound by
            confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">4. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as
            needed to provide you services, comply with legal obligations, resolve disputes,
            and enforce our agreements.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">5. Your Rights (POPIA)</h2>
          <p>
            Under the Protection of Personal Information Act (POPIA), you have the right to
            access, correct, or delete your personal data. You may also object to certain
            processing activities. To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@formalize.biz" className="text-primary underline">privacy@formalize.biz</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">6. Contact</h2>
          <p>
            If you have questions about this policy, please reach out to{" "}
            <a href="mailto:privacy@formalize.biz" className="text-primary underline">privacy@formalize.biz</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
