import { cn } from "@/lib/utils";

export interface BoardProcessStep {
  label: string;
  title: string;
  description?: string;
}

interface BoardProcessStepsProps {
  steps: BoardProcessStep[];
  className?: string;
}

export function BoardProcessSteps({ steps, className }: BoardProcessStepsProps) {
  return (
    <ol className={cn("grid gap-px bg-[var(--border)] md:grid-cols-4", className)}>
      {steps.map((step, index) => (
        <li key={`${step.label}-${index}`} className="bg-[var(--background)] p-6">
          <p className="font-heading text-2xl text-[var(--brand)]">
            {step.label}
          </p>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
            {step.title}
          </h3>
          {step.description && (
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {step.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
