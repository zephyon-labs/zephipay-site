"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/utils/cn";

type RuntimeStage = {
  label: string;
  description: string;
};

const stages: RuntimeStage[] = [
  {
    label: "Payment request",
    description: "A user or service initiates a payment.",
  },
  {
    label: "Identity",
    description: "The participant and account context are resolved.",
  },
  {
    label: "Compliance",
    description: "Applicable verification and compliance rules are evaluated.",
  },
  {
    label: "Risk",
    description: "Transaction signals and risk conditions are assessed.",
  },
  {
    label: "Policy",
    description: "Runtime policy determines whether execution may continue.",
  },
  {
    label: "Settlement",
    description: "The approved payment is routed to the selected rail.",
  },
  {
    label: "Verified receipt",
    description: "A deterministic record is generated for the completed flow.",
  },
];

const STEP_DURATION_MS = 1100;

export function RuntimeFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= stages.length - 1) {
          setIsPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, STEP_DURATION_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying]);

  const progress = useMemo(
    () => ((activeIndex + 1) / stages.length) * 100,
    [activeIndex],
  );

  const animateFlow = () => {
    if (activeIndex >= stages.length - 1) {
      setActiveIndex(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((current) => !current);
  };

  const restart = () => {
    setActiveIndex(0);
    setIsPlaying(true);
  };

  return (
    <section
      aria-labelledby="runtime-flow-heading"
      className={cn(
        "overflow-hidden rounded-[2rem]",
        "border border-border-default",
        "bg-surface-glass",
        "shadow-[var(--shadow-medium)]",
        "backdrop-blur-2xl",
      )}
    >
      <div className="grid gap-8 border-b border-border-subtle px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-secondary">
            Powered by Zephyon Runtime
          </p>

          <h2
            id="runtime-flow-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl"
          >
            Simple on the surface. Coordinated underneath.
          </h2>

          <p className="mt-5 text-base leading-7 text-foreground-secondary sm:text-lg">
            ZephiPay keeps infrastructure out of the user&apos;s way while the
            runtime coordinates the checks, decisions, settlement, and receipt
            lifecycle behind each payment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={animateFlow}
            className={cn(
              "inline-flex h-10 items-center justify-center",
              "rounded-full border border-border-default",
              "bg-surface-secondary px-4",
              "text-sm font-medium text-foreground-secondary",
              "transition-all duration-200",
              "hover:border-border-strong hover:text-foreground",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-primary/45",
            )}
          >
            {isPlaying ? "Pause flow" : "Animate flow"}
          </button>

          <button
            type="button"
            onClick={restart}
            className={cn(
              "inline-flex h-10 items-center justify-center",
              "rounded-full border border-border-default",
              "bg-transparent px-4",
              "text-sm font-medium text-foreground-secondary",
              "transition-all duration-200",
              "hover:border-border-strong hover:text-foreground",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-primary/45",
            )}
          >
            Restart
          </button>
        </div>
      </div>

      <div className="px-6 py-7 sm:px-8">
        <div
          className="h-1 overflow-hidden rounded-full bg-surface-secondary"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-brand-primary transition-[width] duration-700 ease-out shadow-[0_0_18px_var(--glow-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="mt-8 grid gap-3 lg:grid-cols-7">
          {stages.map((stage, index) => {
            const isComplete = index < activeIndex;
            const isActive = index === activeIndex;
            const isPending = index > activeIndex;

            return (
              <li
                key={stage.label}
                className={cn(
                  "relative rounded-2xl border p-4",
                  "transition-all duration-500",
                  isComplete &&
                    "border-success/35 bg-success/5",
                  isActive &&
                    "border-brand-primary/60 bg-brand-primary/10 shadow-[0_12px_34px_var(--glow-primary)]",
                  isPending &&
                    "border-border-subtle bg-surface-secondary opacity-55",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center",
                      "rounded-full border text-xs font-semibold",
                      isComplete &&
                        "border-success/50 bg-success/10 text-success",
                      isActive &&
                        "border-brand-primary bg-brand-primary text-brand-contrast",
                      isPending &&
                        "border-border-default text-foreground-muted",
                    )}
                  >
                    {isComplete ? "✓" : index + 1}
                  </span>

                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isActive
                        ? "text-foreground"
                        : "text-foreground-secondary",
                    )}
                  >
                    {stage.label}
                  </p>
                </div>

                <p className="mt-4 text-xs leading-5 text-foreground-muted">
                  {stage.description}
                </p>

                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-2 top-1/2 hidden h-px w-4",
                      "lg:block",
                      index < activeIndex
                        ? "bg-brand-primary"
                        : "bg-border-default",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-7 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
              Current stage
            </p>

            <p
              className="mt-1 font-mono text-sm text-brand-primary"
              aria-live="polite"
            >
              {stages[activeIndex].label}
            </p>
          </div>

          <p className="max-w-xl text-sm leading-6 text-foreground-secondary">
            Architecture demonstration only. Live execution status will be
            connected to verified runtime telemetry during the active beta.
          </p>
        </div>
      </div>
    </section>
  );
}
