import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminMediaCallback } from "@/components/features/admin-media/AdminMediaCallback";

export const metadata: Metadata = {
  title: "Signing in | Iffer's Pictures",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMediaCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <AdminMediaCallback />
    </Suspense>
  );
}
