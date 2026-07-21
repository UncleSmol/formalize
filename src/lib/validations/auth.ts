import { z } from "zod/v3";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required."),
});

export const signupSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password is too long."),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password is too long."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
