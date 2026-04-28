"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  eventLocation: z.string().optional(),
  socialHandle: z.string().optional(),
  referralSource: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedSession = searchParams.get("session") ?? "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: preselectedSession,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setIsSubmitted(true);
        reset();
        return;
      }

      const result = await response.json();
      setSubmitError(
        result.errors?.[0]?.msg ||
          result.error ||
          "Something went wrong. Please try again."
      );
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--brand)]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[var(--brand)]" />
        </div>
        <h3 className="text-2xl font-heading font-semibold text-[var(--foreground)] mb-3">
          Thank you so much for reaching out — I&apos;m so excited to hear from you!
        </h3>
        <div className="space-y-4 text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
          <p>
            I&apos;ll be in touch within 24–48 hours to learn more about your
            vision and next steps.
          </p>
          <p>
            In the meantime, feel free to explore more of my work or connect
            with me on Instagram.
          </p>
          <p>I can&apos;t wait to connect with you 🤍</p>
          <p className="font-heading text-[var(--foreground)]">— Jenn</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={() => setSubmitError(null)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          placeholder="Jane"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(201) 555-1234"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Event Location"
          placeholder="Venue, town, or not sure yet"
          {...register("eventLocation")}
          error={errors.eventLocation?.message}
        />
        <Input
          label="Event Time"
          type="time"
          {...register("eventTime")}
          error={errors.eventTime?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full">
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            {...register("eventDate")}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white border border-[var(--border)]",
              "text-[var(--foreground)]",
              "transition-all duration-200",
              "focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
            )}
          />
        </div>
        <Input
          label="I'd love to tag you in your photos!"
          placeholder="Instagram handle or Facebook name"
          {...register("socialHandle")}
          error={errors.socialHandle?.message}
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="service"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Session Type <span className="text-[var(--accent)]">*</span>
        </label>
        <select
          id="service"
          {...register("service")}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white border border-[var(--border)]",
            "text-[var(--foreground)]",
            "transition-all duration-200",
            "focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20",
            errors.service && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
          )}
        >
          <option value="">Select a session type...</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
          <option value="other">Other / Not Sure</option>
        </select>
        {errors.service && (
          <p className="mt-1.5 text-sm text-red-500">{errors.service.message}</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="referralSource"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          How did you hear about me?
        </label>
        <select
          id="referralSource"
          {...register("referralSource")}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white border border-[var(--border)]",
            "text-[var(--foreground)]",
            "transition-all duration-200",
            "focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
          )}
        >
          <option value="">Select an option...</option>
          <option value="Instagram">Instagram</option>
          <option value="Google">Google</option>
          <option value="Facebook">Facebook</option>
          <option value="Referral">Referral</option>
          <option value="Returning client">Returning client</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Textarea
        label="Message"
        placeholder="Tell me what you're planning..."
        helperText="What are you celebrating? Who will be there? What moments matter most to you? Approximately how many guests? Feel free to include anything you think is important for me to know"
        required
        rows={5}
        {...register("message")}
        error={errors.message?.message}
      />

      {submitError && (
        <p className="text-sm text-red-600 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">
          {submitError}
        </p>
      )}

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          isLoading={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
