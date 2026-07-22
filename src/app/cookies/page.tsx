import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Formalize",
  description: "How Formalize uses cookies and similar tracking technologies.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-black">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">1. What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device by your web browser. They help
            websites remember your preferences, authenticate your session, and understand how
            you interact with the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">2. How We Use Cookies</h2>
          <p>
            We use essential cookies for authentication and security (e.g., maintaining your
            logged-in session). We also use analytics cookies to understand page usage and
            improve our website. We do not use advertising or third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">3. Managing Cookies</h2>
          <p>
            You can control cookie preferences through your browser settings. Disabling
            essential cookies may affect the functionality of our website, particularly
            features that require you to be logged in.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">4. Changes</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">5. Contact</h2>
          <p>
            If you have questions about our use of cookies, contact us at{" "}
            <a href="mailto:privacy@formalize.biz" className="text-primary underline">privacy@formalize.biz</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
