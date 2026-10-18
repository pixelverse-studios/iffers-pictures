import { z } from "zod";

const requiredFieldsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().optional(),
  eventDate: z.iso.date("Please select a valid event date"),
  eventTime: z.string({ error: "Event time is required" }).min(1, "Event time is required"),
  eventLocation: z.string().trim().min(1, "Event location is required"),
  socialHandle: z.string().optional(),
});

// Validate conditional fields independently of unrelated missing required fields.
const sessionDetailsSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  referralSource: z.string().optional(),
  referralSourceOther: z.string().trim().optional(),
  message: z.string().trim().optional(),
}).superRefine((data, ctx) => {
  if (data.service === "custom" && !data.message) {
    ctx.addIssue({
      code: "custom",
      path: ["message"],
      message: "Please briefly describe the custom session you have in mind",
    });
  }
  if (data.referralSource === "Other" && !data.referralSourceOther) {
    ctx.addIssue({
      code: "custom",
      path: ["referralSourceOther"],
      message: "Please tell me how you heard about me",
    });
  }
});

export const contactSchema = z.intersection(requiredFieldsSchema, sessionDetailsSchema);

export type ContactFormData = z.infer<typeof contactSchema>;

export function toContactSubmissionData(data: ContactFormData) {
  return {
    ...data,
    referralSourceOther:
      data.referralSource === "Other" ? data.referralSourceOther : undefined,
  };
}
