import { z } from 'zod'

export const contactInquiryDefaults = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^\d{10}$/.test(value.replace(/\D/g, '')), 'Phone number must be 10 digits'),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be at most 200 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be at most 2000 characters'),
})

export function normalizeContactInquiry(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone ? values.phone.replace(/\D/g, '') : undefined,
    subject: values.subject.trim(),
    message: values.message.trim(),
  }
}
