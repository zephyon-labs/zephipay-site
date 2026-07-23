import { agentExperienceDemo } from "./demoData";
import type { AgentWorkflowStatus } from "./types";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ActivityDot() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-3 w-3 items-center justify-center"
    >
      <span className="absolute h-3 w-3 animate-ping rounded-full bg-brand-primary/35" />
      <span className="relative h-2 w-2 rounded-full bg-brand-secondary" />
    </span>
  );
}

function StepIndicator({
  status,
}: {
  status: AgentWorkflowStatus;
}) {
  if (status === "active" || status === "searching") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10">
        <ActivityDot />
      </span>
    );
  }

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-primary/25 bg-background text-brand-secondary">
      <CheckIcon />
    </span>
  );
}

export function AgentWorkflow() {
  const { workflow } = agentExperienceDemo;

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass p-5 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-brand-secondary/5 blur-3xl"
      />

      <div className="relative">
        <header className="flex items-start justify-between gap-5 border-b border-border-subtle pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-sm font-semibold text-brand-secondary">
              RA
            </span>

            <div className="min-w-0">
              <p className="truncate font-semibold tracking-[-0.02em]">
                {workflow.agentName}
              </p>

              <p className="mt-1 truncate text-xs text-foreground-muted">
                {workflow.task}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
            <ActivityDot />
            Active
          </div>
        </header>

        <section className="mt-5 rounded-[1.35rem] border border-border-subtle bg-surface-secondary/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Provider search
              </p>

              <p className="mt-2 text-sm font-medium text-foreground-secondary">
                Comparing verified sources
              </p>
            </div>

            <span className="rounded-full border border-border-subtle bg-background/65 px-3 py-1 text-xs text-foreground-muted">
              {workflow.providers.length} found
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {workflow.providers.map((provider) => (
              <div
                key={provider.name}
                className={[
                  "flex items-center justify-between gap-4 rounded-xl border px-3.5 py-3",
                  provider.selected
                    ? "border-brand-primary/30 bg-brand-primary/10"
                    : "border-border-subtle bg-background/45",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {provider.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-foreground-muted">
                    {provider.detail}
                  </p>
                </div>

                {provider.selected ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-secondary">
                    <CheckIcon />
                  </span>
                ) : (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-border-default" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <div className="space-y-1">
            {workflow.steps.map((step, index) => (
              <div
                key={step.label}
                className="relative flex gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-surface-secondary/35"
              >
                {index < workflow.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.34rem] top-10 h-[calc(100%-0.75rem)] w-px bg-border-subtle"
                  />
                ) : null}

                <div className="relative z-10 shrink-0">
                  <StepIndicator status={step.status} />
                </div>

                <div className="min-w-0 pt-0.5">
                  <p
                    className={[
                      "text-sm font-medium",
                      step.status === "active"
                        ? "text-foreground"
                        : "text-foreground-secondary",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-foreground-muted">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-5 grid grid-cols-3 gap-3 border-t border-border-subtle pt-5">
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
              Amount
            </p>
            <p className="mt-2 text-sm font-semibold">{workflow.amount}</p>
          </div>

          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
              Policy
            </p>
            <p className="mt-2 text-sm font-semibold">Approved</p>
          </div>

          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
              Receipt
            </p>
            <p className="mt-2 text-sm font-semibold text-brand-secondary">
              Verified
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}
