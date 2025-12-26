"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "coral";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-medium",
      "rounded-full transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      fullWidth && "w-full"
    );

    const variants = {
      primary: cn(
        "bg-[var(--teal)] text-white",
        "hover:bg-[var(--teal-dark)]",
        "focus-visible:ring-[var(--teal)]",
        "shadow-sm hover:shadow-md"
      ),
      secondary: cn(
        "bg-[var(--background-warm)] text-[var(--foreground)]",
        "hover:bg-neutral-200",
        "focus-visible:ring-neutral-400"
      ),
      outline: cn(
        "border-2 border-[var(--teal)] text-[var(--teal)]",
        "hover:bg-[var(--teal)] hover:text-white",
        "focus-visible:ring-[var(--teal)]"
      ),
      ghost: cn(
        "text-[var(--foreground)]",
        "hover:bg-[var(--background-warm)]",
        "focus-visible:ring-neutral-400"
      ),
      coral: cn(
        "bg-[var(--coral)] text-white",
        "hover:bg-[#e5673d]",
        "focus-visible:ring-[var(--coral)]",
        "shadow-sm hover:shadow-md"
      ),
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    // If asChild is true, we render the child directly with our styles
    if (asChild && children) {
      // Clone the child element and pass our className
      const child = children as React.ReactElement<{ className?: string }>;
      return (
        <span className={combinedClassName}>
          {child}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
