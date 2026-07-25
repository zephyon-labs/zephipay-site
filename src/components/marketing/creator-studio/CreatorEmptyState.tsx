import { Button } from "@/components/ui/Button";

import type { CreatorEmptyStateProps } from "./types";

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

export function CreatorEmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: CreatorEmptyStateProps) {
  return (
    <section className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
        <SparkIcon />
      </div>

      <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl leading-7 text-foreground-secondary">
        {description}
      </p>

      {actionLabel && actionHref ? (
        <div className="mt-7">
          <Button
            href={actionHref}
            variant="outline"
          >
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
