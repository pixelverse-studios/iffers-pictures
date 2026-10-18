"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle } from "lucide-react";
import { Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { contactSchema, toContactSubmissionData, type ContactFormData } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import {
  trackFormStart,
  trackFormSubmitAttempt,
  trackFormSubmitError,
  trackLeadGenerated,
  type LeadFormAnalyticsParams,
} from "@/lib/analytics";

const serviceOptions = [
  ...SERVICES.map((service) => ({
    value: service.id,
    label: service.name,
  })),
  { value: "custom", label: "Custom" },
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
  const requestedSession = searchParams.get("session") ?? "";
  const preselectedSession = requestedSession === "other" ? "custom" : requestedSession;
  const hasStartedRef = useRef(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: preselectedSession,
      eventDate: "",
      eventTime: "",
    },
  });

  const isCustomSession = useWatch({ control, name: "service" }) === "custom";
  const isOtherReferral = useWatch({ control, name: "referralSource" }) === "Other";

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
        body: JSON.stringify(toContactSubmissionData(data)),
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

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              label="Event Date"
              placeholder="Select a date"
              valueFormat="MMMM D, YYYY"
              firstDayOfWeek={0}
              value={field.value || null}
              onChange={(value) => {
                handleFormChange();
                field.onChange(value ?? "");
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              withAsterisk
              aria-required
              error={errors.eventDate?.message}
            />
          )}
        />
        <Controller
          name="eventTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              label="Event Time"
              format="12h"
              withDropdown
              value={field.value ?? ""}
              onChange={(value) => {
                handleFormChange();
                field.onChange(value);
              }}
              onBlur={field.onBlur}
              name={field.name}
              hoursRef={field.ref}
              hoursInputLabel="Event time hours"
              minutesInputLabel="Event time minutes"
              amPmInputLabel="Event time AM or PM"
              withAsterisk
              aria-required
              error={errors.eventTime?.message}
            />
          )}
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
              clearErrors("message");
            }}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            withAsterisk
            error={errors.service?.message}
          />
        )}
      />

      <div className={`grid gap-4 md:gap-5 ${isOtherReferral ? "md:grid-cols-2" : ""}`}>
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
                if (value !== "Other") {
                  setValue("referralSourceOther", "");
                  clearErrors("referralSourceOther");
                }
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              clearable
              error={errors.referralSource?.message}
            />
          )}
        />

        {isOtherReferral && (
          <TextInput
            label="How did you hear about me? Please specify"
            placeholder="Website, publication, event, or another source"
            withAsterisk
            aria-required
            {...register("referralSourceOther")}
            error={errors.referralSourceOther?.message}
          />
        )}
      </div>

      <Textarea
        label={isCustomSession ? "Tell me about your custom session" : "Message"}
        placeholder={isCustomSession ? "Briefly describe the type of session you have in mind..." : "Tell me what you're planning..."}
        description={isCustomSession ? "What would you like photographed? A brief description will help me understand what you're looking for." : "What are you celebrating? Who will be there? What moments matter most to you? Approximately how many guests? Feel free to include anything you think is important for me to know"}
        withAsterisk={isCustomSession}
        aria-required={isCustomSession}
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
