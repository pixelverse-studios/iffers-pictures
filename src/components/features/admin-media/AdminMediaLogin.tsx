"use client";

import type { FormEvent } from "react";
import { TextInput } from "@mantine/core";
import Link from "next/link";
import { Check, CircleAlert, Loader2, Lock, Mail, Send, ShieldCheck } from "lucide-react";

interface AdminMediaLoginProps {
  email: string;
  error: string;
  isSending: boolean;
  message: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AdminMediaLogin({
  email,
  error,
  isSending,
  message,
  onEmailChange,
  onSubmit,
}: AdminMediaLoginProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8 text-[var(--foreground)] md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <section className="hidden min-h-[720px] overflow-hidden bg-[var(--background-warm)] md:flex">
          <div className="flex w-full flex-col justify-center px-12">
            <p className="font-heading text-3xl font-semibold text-[var(--foreground)]">
              Iffer&apos;s Pictures
            </p>
            <div className="mt-5 h-px w-16 bg-[var(--accent-strong)]" />
            <h1 className="mt-8 font-heading text-5xl font-semibold text-[var(--brand-strong)]">
              Media Admin
            </h1>
            <p className="mt-5 max-w-sm text-lg leading-8 text-[var(--text-secondary)]">
              Manage portfolio images, drafts, and published galleries.
            </p>
            <div className="mt-12 grid gap-7">
              {[
                ["Upload images", "Add new images and keep them private until ready."],
                ["Edit image details", "Add image descriptions, set categories, and update status."],
                ["Archive safely", "Remove images from public view without deleting."],
              ].map(([title, copy]) => (
                <div key={title} className="flex gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 text-[var(--brand-strong)]" />
                  <div>
                    <p className="font-bold text-[var(--foreground)]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl border border-[var(--border)] bg-white p-7 shadow-sm md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
            Iffer&apos;s Pictures
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)]">
            Get a secure sign-in link
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            Enter the approved email address and we&apos;ll send a one-time link to open
            the media manager.
          </p>

          <form className="mt-7 space-y-5" onSubmit={onSubmit}>
            <TextInput
              type="email"
              label="Email address"
              value={email}
              onChange={(event) => onEmailChange(event.currentTarget.value)}
              placeholder="jenn@ifferspictures.com"
              rightSection={<Mail className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />}
              required
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff" },
              }}
            />

            {message && (
              <div className="flex gap-3 border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                <Check className="h-4 w-4" aria-hidden />
                {message}
              </div>
            )}
            {error && (
              <div className="flex gap-3 border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                <CircleAlert className="h-4 w-4" aria-hidden />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 text-sm font-bold text-white transition hover:bg-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4" aria-hidden />
              )}
              Send sign-in link
            </button>
            <Link
              href="/"
              className="inline-flex text-sm font-semibold text-[var(--brand-strong)] underline underline-offset-4"
            >
              Return to website
            </Link>
          </form>
          <p className="mt-8 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Lock className="h-4 w-4" aria-hidden />
            No password needed. Links expire after 15 minutes.
          </p>
        </section>
      </div>
    </main>
  );
}
