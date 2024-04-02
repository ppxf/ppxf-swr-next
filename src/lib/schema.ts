import { z } from "zod"

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
})

export const updateSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z
    .string()
    .refine((value) => {
      const regex =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
      return regex.test(value)
    })
    .optional()
    .nullable(),
})
