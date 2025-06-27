import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((email) => email.includes("@"), "Email must contain @ symbol"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
