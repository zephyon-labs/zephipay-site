import type { RuntimeStage } from "./runtime-data";

export type RuntimeStageStatus = "pending" | "running" | "complete";

type RuntimeEngineProps = {
  stage: RuntimeStage;
  status: RuntimeStageStatus;
  isLast: boolean;
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function RuntimeEngine({
  stage,
  status,
  isLast,
}: RuntimeEngineProps) {
  const statusLabel =
    status === "complete"
      ? stage.result
      : status === "running"
        ? "Processing"
        : "Waiting";

  return (
    <div className="relative">
      <div
        className={[
          "group relative overflow-hidden rounded-2xl border px-5 py-5 transition-all duration-500 sm:px-6",
          status === "running"
            ? "border-brand-primary/45 bg-brand-primary/[0.08] shadow-[0_0_40px_rgba(86,180,255,0.08)]"
            : status === "complete"
              ? "border-brand-primary/20 bg-surface-elevated/55"
              : "border-border-subtle bg-surface-elevated/25",
        ].join(" ")}
      >
        {status === "running" ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-[runtimeSweep_1.35s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent" />
          </div>
        ) : null}

        <div className="relative flex items-start gap-4">
          <div
            className={[
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-[0.12em] transition-all duration-500",
              status === "complete"
                ? "border-brand-primary/35 bg-brand-primary/12 text-brand-secondary"
                : status === "running"
                  ? "border-brand-primary/55 bg-brand-primary/15 text-brand-secondary shadow-[0_0_22px_rgba(86,180,255,0.22)]"
                  : "border-border-subtle bg-background/35 text-foreground-tertiary",
            ].join(" ")}
          >
            {status === "complete" ? <CheckIcon /> : stage.number}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-medium tracking-[-0.02em]">
                {stage.title}
              </h3>

              <span
                className={[
                  "text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-500",
                  status === "running" || status === "complete"
                    ? "text-brand-secondary"
                    : "text-foreground-tertiary",
                ].join(" ")}
              >
                {statusLabel}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              {stage.description}
            </p>
          </div>
        </div>
      </div>

      {!isLast ? (
        <div className="ml-10 flex h-7 items-center sm:ml-11">
          <div
            className={[
              "h-full w-px transition-colors duration-500",
              status === "complete"
                ? "bg-brand-primary/50"
                : "bg-border-subtle",
            ].join(" ")}
          />
        </div>
      ) : null}
    </div>
  );
}
