import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    avatar: z
      .any()
      .refine((files) => files?.length === 1, "Image is required")
      .refine((files) => files?.[0]?.size <= 2_000_000, "Max 2MB image")
      .refine(
        (files) =>
          ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
        "Only JPG, PNG, WEBP allowed"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
