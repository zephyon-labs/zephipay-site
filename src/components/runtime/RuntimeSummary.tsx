type RuntimeSummaryProps = {
  executionTime: string;
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const summaryFields = [
  ["Decision", "Approved"],
  ["Settlement", "Completed"],
  ["Receipt", "Deterministic"],
  ["Verification", "Ready"],
];

export function RuntimeSummary({ executionTime }: RuntimeSummaryProps) {
  return (
    <div
      className="animate-[runtimeReveal_500ms_ease-out_both] rounded-3xl border border-brand-primary/25 bg-surface-elevated/55 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:p-8"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/40 bg-brand-primary/12 text-brand-secondary">
          <CheckIcon />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
            Runtime complete
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
            Transaction approved.
          </h3>
        </div>
      </div>

      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2">
        {summaryFields.map(([label, value]) => (
          <div
            key={label}
            className="bg-background/70 px-5 py-4"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
              {label}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {value}
            </p>
          </div>
        ))}

        <div className="bg-background/70 px-5 py-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
            Simulated execution time
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {executionTime}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-foreground-secondary">
        This demonstration uses a local interface simulation. Live runtime
        telemetry and settlement data will replace the simulated results as
        public infrastructure becomes available.
      </p>
    </div>
  );
}
