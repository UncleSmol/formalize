import { z } from "zod/v3";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(5000, "Message is too long."),
});

export type ContactInput = z.infer<typeof contactSchema>;
