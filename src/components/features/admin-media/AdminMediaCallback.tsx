"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Link as LinkIcon, Loader2, TriangleAlert } from "lucide-react";
import { completeMediaAdminSignIn } from "@/lib/media/client";
import { MediaApiError } from "@/lib/media/errors";

type CallbackState = "loading" | "success" | "error";
type CallbackRecovery = "new-link" | "try-manager";

function getCallbackError(error: unknown): {
  message: string;
  recovery: CallbackRecovery;
} {
  if (error instanceof MediaApiError) {
    if (error.status === 410) {
      return {
        message: "This sign-in link expired or was already used.",
        recovery: "new-link",
      };
    }

    if (error.status === 401) {
      return {
        message: "This sign-in link is invalid.",
        recovery: "new-link",
      };
    }

    if (error.status === 403) {
      return {
        message: "This email is no longer approved for media admin access.",
        recovery: "new-link",
      };
    }

    if (error.status === 502 || error.status === 503 || error.status === 504) {
      return {
        message:
          "The sign-in check timed out. It may have still completed, so try opening the media manager before requesting another link.",
        recovery: "try-manager",
      };
    }

    return { message: error.message, recovery: "new-link" };
  }

  return {
    message: "We could not finish signing you in.",
    recovery: "new-link",
  };
}

export function AdminMediaCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const missingToken = !token;
  const [state, setState] = useState<CallbackState>(
    missingToken ? "error" : "loading",
  );
  const [message, setMessage] = useState(
    missingToken
      ? "This sign-in link is missing a token."
      : "Finishing sign in...",
  );
  const [recovery, setRecovery] = useState<CallbackRecovery>("new-link");

  useEffect(() => {
    if (!token) return;

    let canceled = false;

    completeMediaAdminSignIn(token)
      .then(() => {
        if (canceled) return;
        setState("success");
        setMessage("Signed in. Opening the media manager...");
        window.setTimeout(() => router.replace("/admin/media"), 450);
      })
      .catch((error) => {
        if (canceled) return;
        const nextError = getCallbackError(error);
        setState("error");
        setMessage(nextError.message);
        setRecovery(nextError.recovery);
      });

    return () => {
      canceled = true;
    };
  }, [router, token]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)] md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl place-items-center">
        <section className="w-full max-w-xl border border-[var(--border)] bg-white p-7 shadow-sm md:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-strong)] text-white">
              {state === "error" ? (
                <TriangleAlert className="h-5 w-5" aria-hidden />
              ) : state === "success" ? (
                <LinkIcon className="h-5 w-5" aria-hidden />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                Iffer&apos;s Pictures
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold text-[var(--foreground)]">
                {state === "error" ? "Sign-in link problem" : "Link opened"}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {message}
              </p>
              {state === "loading" && (
                <div className="mt-6 h-2 overflow-hidden bg-[var(--background-warm)]">
                  <div className="h-full w-2/3 animate-pulse bg-[var(--brand-strong)]" />
                </div>
              )}
              {state === "error" && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {recovery === "try-manager" && (
                    <Link
                      href="/admin/media"
                      className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white"
                    >
                      Open media manager
                    </Link>
                  )}
                  {recovery === "new-link" && (
                    <Link
                      href="/admin/media"
                      className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white"
                    >
                      Send a new link
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[var(--border)] px-5 text-sm font-bold text-[var(--brand-strong)]"
                  >
                    Return to website
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
