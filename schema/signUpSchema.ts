import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string({message: "Name is required"}).min(2, "Name must be minumum 2 characters"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});
export type RegisterFormType = z.infer<typeof signUpSchema>;