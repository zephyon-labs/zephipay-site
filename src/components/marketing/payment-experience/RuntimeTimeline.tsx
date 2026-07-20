import { CheckIcon } from "./ExperienceIcons";
import type { PaymentStep } from "./types";

type RuntimeTimelineProps = {
  eyebrow?: string;
  steps: PaymentStep[];
};

export function RuntimeTimeline({
  eyebrow = "What happens underneath",
  steps,
}: RuntimeTimelineProps) {
  return (
    <article className="payment-flow-enter rounded-[2rem] border border-border-default bg-background/65 p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
        {eyebrow}
      </p>

      <div className="mt-7">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="payment-flow-step relative grid grid-cols-[2.5rem_1fr] gap-4 pb-7 last:pb-0"
            style={{
              animationDelay: `${180 + index * 150}ms`,
            }}
          >
            {index < steps.length - 1 ? (
              <span
                className="payment-flow-line absolute left-[1.18rem] top-9 h-[calc(100%-1rem)] w-px bg-border-default"
                style={{
                  animationDelay: `${300 + index * 150}ms`,
                }}
              />
            ) : null}

            <span
              className="payment-flow-node relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-background text-xs font-medium text-brand-secondary shadow-[var(--shadow-soft)]"
              style={{
                animationDelay: `${220 + index * 150}ms`,
              }}
            >
              {index === steps.length - 1 ? (
                <CheckIcon />
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </span>

            <div className="pt-1">
              <h3 className="font-semibold text-foreground">{step.label}</h3>

              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
