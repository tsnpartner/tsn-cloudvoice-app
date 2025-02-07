import { z } from "zod";

// SIGNUP VALIDATION
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(2, "Username must be at least 2 characters."),
  mobileNumber: z
    .string()
    .regex(/^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/, "Invalid mobile number (10 digits)."),
  // email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["User", "Administration"], {
    errorMap: () => ({ message: "Role must be User or Administration." }),
  }),
});

// LOGIN VALIDATION
// export const loginSchema = z.object({
//   email: z.string().email("Invalid email address."),
//   password: z.string().min(6, "Password must be at least 6 characters."),
// });
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

// FORGOT PASSWORD VALIDATION
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address."),
});

// RESET PASSWORD VALIDATION
export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// VERIFY EMAIL VALIDATION (if needed)
export const verifyEmailSchema = z.object({
  code: z.string().min(6, "Verification code must be at least 6 characters."),
});
