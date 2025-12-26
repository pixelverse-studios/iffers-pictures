import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "warm";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

function Card({
  className,
  variant = "default",
  padding = "md",
  hover = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white",
    elevated: "bg-white shadow-lg",
    bordered: "bg-white border border-[var(--border)]",
    warm: "bg-[var(--background-warm)]",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-xl",
        variants[variant],
        paddings[padding],
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function CardTitle({
  className,
  as: Comp = "h3",
  children,
  ...props
}: CardTitleProps) {
  return (
    <Comp
      className={cn(
        "text-xl font-semibold text-[var(--foreground)]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-[var(--text-secondary)] mt-2", className)}
      {...props}
    >
      {children}
    </p>
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-[var(--border)]", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
