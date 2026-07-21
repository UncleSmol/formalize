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

  const emailRaw = formData.get("email") as string;
  const { allowed } = rateLimit(`contact:${emailRaw}`, {
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
