"use client";

import { useState } from "react";
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  eventDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--teal)]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[var(--teal)]" />
        </div>
        <h3 className="text-2xl font-heading font-semibold text-[var(--foreground)] mb-3">
          Thank You!
        </h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Your message has been sent successfully. I&apos;ll get back to you within
          24 hours.
        </p>
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          placeholder="Jane Doe"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(201) 555-1234"
          {...register("phone")}
          error={errors.phone?.message}
        />
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
              "focus:outline-none focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20"
            )}
          />
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="service"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Type of Event <span className="text-[var(--coral)]">*</span>
        </label>
        <select
          id="service"
          {...register("service")}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white border border-[var(--border)]",
            "text-[var(--foreground)]",
            "transition-all duration-200",
            "focus:outline-none focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20",
            errors.service && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
          )}
        >
          <option value="">Select a service...</option>
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

      <Textarea
        label="Tell Me About Your Event"
        placeholder="Share details about your event, location preferences, number of guests, and any specific shots or moments you'd like captured..."
        required
        rows={5}
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-[var(--text-muted)]">
          I&apos;ll respond within 24 hours
        </p>
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
