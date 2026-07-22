"use client";

import { useState, useCallback } from "react";
import { submitContactForm } from "@/app/contact/actions";
import { TurnstileWidget } from "@/components/auth/TurnstileWidget";

interface ContactFormPrefill {
  item: string;
  title: string;
}

interface ContactFormProps {
  prefill?: ContactFormPrefill;
}

export function ContactForm({ prefill }: ContactFormProps) {
  const [state, setState] = useState<{
    success?: boolean;
    error?: string;
    errors?: Record<string, string[]>;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(null);

    if (!captchaToken) {
      setState({ error: "Please complete the security check." });
      setPending(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("captcha_token", captchaToken);

    const result = await submitContactForm(undefined, formData);
    setState(result);
    setPending(false);

    if (result.success) {
      form.reset();
    }
  }

  function fieldError(field: string) {
    return state?.errors?.[field]?.[0];
  }

  if (state?.success) {
    return (
      <div className="border border-green-400/30 bg-green-400/10 p-6 text-center">
        <i className="bi-check-circle-fill text-3xl text-green-400" aria-hidden="true" />
        <h3 className="mt-3 text-lg font-black text-green-400">Message sent!</h3>
        <p className="mt-2 text-sm text-green-300/80">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {state?.error && !state?.errors && (
        <div className="border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm font-bold text-red-400">{state.error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder="Your full name"
        />
        {fieldError("name") && (
          <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder="your@email.com"
        />
        {fieldError("email") && (
          <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          defaultValue={prefill ? `Enquiry about ${prefill.title}` : ""}
          className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder="How can we help?"
        />
        {fieldError("subject") && (
          <p className="mt-1 text-xs text-red-400">{fieldError("subject")}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={prefill ? `Hi, I'm interested in ${prefill.title} and would like to learn more.\n\nhttps://formalize.co.za/catalogue/${prefill.item}` : ""}
          className="w-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder="Tell us about your business needs..."
        />
        {fieldError("message") && (
          <p className="mt-1 text-xs text-red-400">{fieldError("message")}</p>
        )}
      </div>

      <div className="flex justify-center">
        <TurnstileWidget onVerify={handleCaptchaVerify} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full justify-center bg-primary px-7 py-4 text-sm font-black uppercase tracking-wide text-[#08080c] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
