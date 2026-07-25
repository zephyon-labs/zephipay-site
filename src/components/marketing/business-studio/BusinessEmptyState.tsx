import Link from "next/link";

type BusinessEmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

function BusinessIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V8h16v12" />
      <path d="m3 8 2-4h14l2 4" />
      <path d="M8 12h3v8M15 12h3v4h-3z" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function BusinessEmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: BusinessEmptyStateProps) {
  return (
    <section className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
        <BusinessIcon />
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
        <Link
          href={actionHref}
          className="mt-7 inline-flex rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground transition hover:bg-surface-elevated"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
