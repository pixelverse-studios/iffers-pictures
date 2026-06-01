"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Select, Textarea, TextInput } from "@mantine/core";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import {
  trackFormStart,
  trackFormSubmitAttempt,
  trackFormSubmitError,
  trackLeadGenerated,
  type LeadFormAnalyticsParams,
} from "@/lib/analytics";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  socialHandle: z.string().optional(),
  referralSource: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  ...SERVICES.map((service) => ({
    value: service.id,
    label: service.name,
  })),
  { value: "other", label: "Other / Not Sure" },
];

const referralOptions = [
  "Instagram",
  "Google",
  "Facebook",
  "Referral",
  "Returning client",
  "Other",
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedSession = searchParams.get("session") ?? "";
  const hasStartedRef = useRef(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: preselectedSession,
    },
  });

  const getAnalyticsParams = (
    data?: Partial<ContactFormData>
  ): LeadFormAnalyticsParams => ({
    service: data?.service || preselectedSession || undefined,
    referral_source: data?.referralSource,
    event_date_provided: Boolean(data?.eventDate),
    event_location_provided: Boolean(data?.eventLocation),
  });

  const handleFormChange = () => {
    setSubmitError(null);

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackFormStart(getAnalyticsParams());
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    trackFormSubmitAttempt(getAnalyticsParams(data));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        trackLeadGenerated(getAnalyticsParams(data));
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
      trackFormSubmitError({
        ...getAnalyticsParams(data),
        status_code: response.status,
        error_type: response.status >= 500 ? "server_error" : "submission_error",
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      trackFormSubmitError({
        ...getAnalyticsParams(data),
        error_type: "network_error",
      });
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
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <TextInput
          label="First Name"
          placeholder="Jane"
          withAsterisk
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          placeholder="Doe"
          withAsterisk
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <TextInput
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        withAsterisk
        {...register("email")}
        error={errors.email?.message}
      />

      <TextInput
        label="Phone Number"
        type="tel"
        placeholder="(201) 555-1234"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <TextInput
          label="Event Date"
          type="date"
          withAsterisk
          {...register("eventDate")}
          error={errors.eventDate?.message}
        />
        <TextInput
          label="Event Time"
          type="time"
          withAsterisk
          {...register("eventTime")}
          error={errors.eventTime?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <TextInput
          label="Event Location"
          placeholder="Venue, town, or not sure yet"
          withAsterisk
          {...register("eventLocation")}
          error={errors.eventLocation?.message}
        />
        <TextInput
          label="I'd love to tag you in your photos!"
          placeholder="Instagram handle or Facebook name"
          {...register("socialHandle")}
          error={errors.socialHandle?.message}
        />
      </div>

      <Controller
        name="service"
        control={control}
        render={({ field }) => (
          <Select
            label="Session Type"
            placeholder="Select a session type..."
            data={serviceOptions}
            value={field.value || null}
            onChange={(value) => {
              handleFormChange();
              field.onChange(value ?? "");
            }}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            withAsterisk
            error={errors.service?.message}
          />
        )}
      />

      <Controller
        name="referralSource"
        control={control}
        render={({ field }) => (
          <Select
            label="How did you hear about me?"
            placeholder="Select an option..."
            data={referralOptions}
            value={field.value || null}
            onChange={(value) => {
              handleFormChange();
              field.onChange(value ?? "");
            }}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            clearable
            error={errors.referralSource?.message}
          />
        )}
      />

      <Textarea
        label="Message"
        placeholder="Tell me what you're planning..."
        description="What are you celebrating? Who will be there? What moments matter most to you? Approximately how many guests? Feel free to include anything you think is important for me to know"
        rows={4}
        {...register("message")}
        error={errors.message?.message}
      />

      {submitError && (
        <p className="text-sm text-red-600 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">
          {submitError}
        </p>
      )}

      <div className="flex justify-end pt-1">
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
