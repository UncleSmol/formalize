import { z } from "zod/v3";

export const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .max(100, "Name is too long."),
  company_name: z
    .string()
    .trim()
    .max(200, "Company name is too long.")
    .optional()
    .default(""),
  phone: z
    .string()
    .trim()
    .max(50, "Phone number is too long.")
    .optional()
    .default(""),
});

export type ProfileInput = z.infer<typeof profileSchema>;
