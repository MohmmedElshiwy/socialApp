// Schema/user.ts
import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
email: z
  .string().email()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    dateOfBirth: z.coerce.date().min(1, "Date of Birth is required").refine((v)=>{
        const userAge = v.getFullYear();
        const now = new Date().getFullYear();
        const age = now - userAge;
        return age >= 18;
    },{message: "You must be at least 18 years old"}), 
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });





//   login 
export const loginSchema = z.object({
  email: z
    .string().email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});

