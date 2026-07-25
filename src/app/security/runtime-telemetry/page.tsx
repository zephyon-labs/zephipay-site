import type { Metadata } from "next";

import {
  RuntimeTelemetryWorkspace,
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Runtime Telemetry | ZephiPay Security",
  description:
    "Observe Zephyon Runtime engines, economic-event timelines, settlement, resilience, and infrastructure health.",
};

export default function RuntimeTelemetryPage() {
  return (
    <SecurityStudioPageShell
      title="Runtime Telemetry"
      description="Observe the engines, decisions, settlement, resilience, and infrastructure coordinating every supported economic event."
    >
      <RuntimeTelemetryWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Coordinated execution
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Observe the entire Runtime path.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Identity, compliance, risk, policy, orchestration,
            settlement, treasury, and telemetry can remain visible as
            one connected economic event.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Operational resilience
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve attempts, retries, and recovery.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Successful execution, recovered failures, non-retryable
            errors, and exhausted attempts can remain visible instead
            of disappearing behind a final status.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Explainable infrastructure
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Connect system health to economic outcomes.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Runtime environments, RPC endpoints, adapters, settlement,
            and verification records can be evaluated together when an
            event succeeds or fails.
          </p>
        </article>
      </section>
    </SecurityStudioPageShell>
  );
}
