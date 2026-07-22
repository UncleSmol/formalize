"use server";

import { createServiceRoleClient } from "@/lib/supabase/client";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { stripHtml } from "@/lib/sanitize";

export interface ContactFormState {
  success?: boolean;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  _prev: ContactFormState | undefined,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const captchaToken = formData.get("captcha_token") as string | null;

  if (!captchaToken) {
    return { error: "Please complete the security check." };
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: captchaToken,
        }),
      },
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return { error: "Security check failed. Please try again." };
    }
  }

  const emailRaw = formData.get("email") as string;
  const { allowed } = await rateLimit(`contact:${emailRaw}`, {
    maxRequests: 3,
    windowMs: 300_000,
  });
  if (!allowed) {
    return { error: "Too many submissions. Please try again later." };
  }

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, subject, message } = result.data;
  const sanitized = {
    name: stripHtml(name),
    email: stripHtml(email),
    subject: stripHtml(subject),
    message: stripHtml(message),
  };

  try {
    const supabase = createServiceRoleClient();

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert(sanitized);

    if (dbError) {
      console.error("[contact] DB insert error:", dbError);
      return { error: "Failed to save your message. Please try again." };
    }

    await sendContactEmail(sanitized);

    return { success: true };
  } catch (err) {
    console.error("[contact] Error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
