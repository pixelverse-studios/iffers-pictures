"use client";

import { CircleAlert, X } from "lucide-react";

interface AdminMediaNoticeProps {
  catalogError: string;
  notice: string;
  onClear: () => void;
}

export function AdminMediaNotice({
  catalogError,
  notice,
  onClear,
}: AdminMediaNoticeProps) {
  return (
    <div
      className={`flex items-start gap-3 border px-4 py-3 text-sm font-semibold ${
        catalogError
          ? "border-red-100 bg-red-50 text-red-700"
          : "border-[var(--brand-soft)] bg-[var(--background-warm)] text-[var(--brand-strong)]"
      }`}
    >
      <CircleAlert className="mt-0.5 h-4 w-4" aria-hidden />
      <span>{catalogError || notice}</span>
      <button type="button" onClick={onClear} className="ml-auto" aria-label="Dismiss">
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
