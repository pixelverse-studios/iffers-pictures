"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import {
  trackCtaClick,
  trackOutboundClick,
  type CtaClickAnalyticsParams,
} from "@/lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    children: ReactNode;
    tracking: CtaClickAnalyticsParams;
  };

interface TrackedOutboundLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  tracking: {
    link_location: string;
    link_text?: string;
    link_type?: string;
  };
}

export function TrackedLink({
  children,
  tracking,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCtaClick(tracking);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export function TrackedOutboundLink({
  children,
  tracking,
  onClick,
  href,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        trackOutboundClick({
          link_url: href,
          ...tracking,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
