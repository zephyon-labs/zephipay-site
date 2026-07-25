import type { Metadata } from "next";

import {
  PolicyEngineWorkspace,
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Policy Engine | ZephiPay Security",
  description:
    "Define transaction rules, approval workflows, limits, regional requirements, velocity controls, and Runtime permissions.",
};

export default function PolicyEnginePage() {
  return (
    <SecurityStudioPageShell
      title="Policy Engine"
      description="Turn economic requirements into executable rules that guide approvals, limits, permissions, and Runtime decisions before value moves."
    >
      <PolicyEngineWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Deterministic decisions
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Turn requirements into executable policy.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Limits, approvals, permissions, regions, and behavioral
            controls can become structured Runtime instructions instead
            of disconnected documentation.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Runtime coordination
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Evaluate policy during the economic event.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Policy can execute alongside identity, compliance, risk,
            settlement, and treasury rather than being reviewed only
            after value has moved.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Explainable outcomes
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve why an event was approved or stopped.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Every approval, hold, rejection, or escalation can retain
            the policy conditions that produced the outcome.
          </p>
        </article>
      </section>
    </SecurityStudioPageShell>
  );
}
