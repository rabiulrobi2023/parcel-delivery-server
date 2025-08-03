import z from "zod";

import { Role } from "./user.interface";

const createUserValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 character is required")
    .max(30, "Name must be maximum 30 character"),
  email: z.email("Input must be email"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Invalid Bangladeshi phone number (must start with 01 and be 11 digits)",
    })
    .optional(),
  address: z.string(),
  role: z.enum(Object.values(Role)),
});

export const UserValidation = {
  createUserValidationSchema,
};
