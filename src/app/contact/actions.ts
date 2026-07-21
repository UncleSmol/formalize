"use server";

import { createServiceRoleClient } from "@/lib/supabase/client";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations/contact";

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

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, subject, message } = result.data;

  try {
    const supabase = createServiceRoleClient();

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, subject, message });

    if (dbError) {
      console.error("[contact] DB insert error:", dbError);
      return { error: "Failed to save your message. Please try again." };
    }

    console.log("[contact] DB saved, sending email...");
    await sendContactEmail({ name, email, subject, message });
    console.log("[contact] Email sent successfully");

    return { success: true };
  } catch (err) {
    console.error("[contact] Error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
