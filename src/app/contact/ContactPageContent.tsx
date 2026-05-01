"use client";

import { Suspense } from "react";
import Image from "next/image";
import { Clock, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { CONTACT_PAGE_COPY } from "@/data/page-copy";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { ContactForm } from "./ContactForm";

const nextSteps = [
  ["01", "We connect", "I'll reach out to learn more."],
  ["02", "We plan", "We'll create the perfect plan."],
  ["03", "You relax", "I'll handle the rest and capture it all."],
] as const;

function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 10) {
    return phone;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function CurrentContactContent() {
  return (
    <>
      <section className="pt-hero pb-10 md:pb-12 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
              {CONTACT_PAGE_COPY.hero.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {CONTACT_PAGE_COPY.hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="bg-[var(--background-warm)] rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-heading font-semibold text-[var(--foreground)] mb-2">
                  {CONTACT_PAGE_COPY.form.title}
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  {CONTACT_PAGE_COPY.form.description}
                </p>
                <Suspense fallback={<div className="h-96" aria-hidden />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-6">
                    {CONTACT_PAGE_COPY.sidebar.contactTitle}
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center group-hover:bg-[var(--brand)] transition-colors duration-200">
                          <Mail className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.emailLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors duration-200">
                            {BUSINESS_INFO.email}
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[var(--brand)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.locationLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {BUSINESS_INFO.address.city},{" "}
                            {BUSINESS_INFO.address.state}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {CONTACT_PAGE_COPY.sidebar.serviceArea}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[var(--brand)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.availabilityLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {CONTACT_PAGE_COPY.sidebar.availability}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {CONTACT_PAGE_COPY.sidebar.availabilityDetail}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-4">
                    {CONTACT_PAGE_COPY.sidebar.followTitle}
                  </h3>
                  <div className="flex gap-3">
                    {BUSINESS_INFO.social.instagram && (
                      <a
                        href={BUSINESS_INFO.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center hover:bg-[var(--brand)] transition-colors duration-200 group"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                    {BUSINESS_INFO.social.facebook && (
                      <a
                        href={BUSINESS_INFO.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center hover:bg-[var(--brand)] transition-colors duration-200 group"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[var(--background-warm)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                    {CONTACT_PAGE_COPY.sidebar.serviceAreasTitle}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {CONTACT_PAGE_COPY.sidebar.serviceAreasDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] leading-relaxed">
              {CONTACT_PAGE_COPY.closing.title}
            </p>
            <p className="text-[var(--text-secondary)] mt-4">
              {CONTACT_PAGE_COPY.closing.signature}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function BoardContactContent() {
  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="mx-auto grid max-w-[1180px] bg-[var(--background)] md:grid-cols-[0.72fr_1.28fr]">
        <aside className="bg-[var(--brand-strong)] px-8 py-12 text-white md:px-12 md:py-16 lg:px-16">
          <h1 className="font-heading text-5xl font-semibold leading-[1.02] md:text-6xl">
            Let&apos;s start planning something beautiful.
          </h1>
          <div
            className="mt-8 h-5 w-40 bg-white/72"
            style={{
              clipPath:
                "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
            }}
            aria-hidden
          />
          <p className="mt-8 max-w-[310px] text-xl font-semibold leading-8 text-white/82">
            {CONTACT_PAGE_COPY.hero.description}
          </p>
          <p className="mt-9 max-w-[280px] font-heading text-2xl font-semibold italic leading-snug text-white/90">
            {CONTACT_PAGE_COPY.closing.title}
          </p>
          <p className="mt-8 font-heading text-4xl italic text-white">
            {CONTACT_PAGE_COPY.closing.signature}
          </p>
        </aside>

        <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
          <h2 className="sr-only">{CONTACT_PAGE_COPY.form.title}</h2>
          <p className="mb-8 max-w-xl text-base font-semibold leading-7 text-[var(--text-secondary)]">
            {CONTACT_PAGE_COPY.form.description}
          </p>
          <Suspense fallback={<div className="h-96" aria-hidden />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] border-t border-[var(--border)] bg-white md:grid-cols-[1fr_0.48fr]">
        <div className="px-7 py-11 md:px-12">
          <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
            What happens next
          </h2>
          <div className="mt-9 grid gap-8 md:grid-cols-3">
            {nextSteps.map(([number, title, description]) => (
              <div key={number}>
                <p className="font-heading text-4xl font-semibold text-[var(--brand-strong)]">
                  {number}
                </p>
                <div className="mt-4 h-px w-full bg-[var(--border)]" />
                <h3 className="mt-5 font-heading text-xl font-semibold text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/selfie.jpg"
            alt="Jenn behind the camera"
            fill
            sizes="(max-width: 768px) 100vw, 36vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] bg-[var(--background-warm)] px-7 py-9 md:px-12">
        <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
          Other ways to reach me
        </h2>
        <div className="mt-6 grid gap-7 md:grid-cols-3 md:divide-x md:divide-[var(--border)]">
          <div>
            <p className="font-heading text-xl font-semibold text-[var(--brand-strong)]">
              {CONTACT_PAGE_COPY.sidebar.emailLabel}
            </p>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="mt-2 block text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--brand-strong)]"
            >
              {BUSINESS_INFO.email}
            </a>
          </div>
          <div className="md:pl-9">
            <p className="font-heading text-xl font-semibold text-[var(--brand-strong)]">
              Phone
            </p>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="mt-2 block text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--brand-strong)]"
            >
              {formatPhoneNumber(BUSINESS_INFO.phone)}
            </a>
          </div>
          <div className="md:pl-9">
            <p className="font-heading text-xl font-semibold text-[var(--brand-strong)]">
              {CONTACT_PAGE_COPY.sidebar.followTitle}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">
              @iffers_pictures
            </p>
            <div className="mt-3 flex gap-3">
              {BUSINESS_INFO.social.instagram && (
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {BUSINESS_INFO.social.facebook && (
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ContactPageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function ContactPageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: ContactPageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? <BoardContactContent /> : <CurrentContactContent />;
}
