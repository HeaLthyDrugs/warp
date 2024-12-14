import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const parseStringify = (value: any) => {
  if (!value) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.error('Parse Error:', error);
    return null;
  }
};

export const authFormSchema = (type: string) => z.object({
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(2, 'First name is required'),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});