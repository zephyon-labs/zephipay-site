import type { Metadata } from "next";

import {
  ComplianceWorkspace,
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Compliance | ZephiPay Security",
  description:
    "Coordinate KYC, KYB, sanctions screening, transaction monitoring, jurisdictional requirements, and review workflows.",
};

export default function CompliancePage() {
  return (
    <SecurityStudioPageShell
      title="Compliance"
      description="Coordinate verification, screening, monitoring, jurisdictional requirements, and human review as part of the payment lifecycle."
    >
      <ComplianceWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Before settlement
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Evaluate requirements before value moves.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Verification, sanctions screening, jurisdictional rules, and
            monitoring signals can be coordinated before settlement
            becomes difficult to reverse.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Ongoing context
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Treat compliance as a continuous process.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Participant status, transaction behavior, jurisdiction, and
            review outcomes should remain connected throughout the
            economic relationship.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Explainable review
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve why a decision was made.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Automated checks and human review can remain attached to the
            same event so approvals, holds, and escalations retain their
            context.
          </p>
        </article>
      </section>
    </SecurityStudioPageShell>
  );
}
