import type { Metadata } from "next";
import Link from "next/link";

import {
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Security Center | ZephiPay",
  description:
    "Review ZephiPay security practices, account guidance, Runtime safeguards, incident resources, and responsible disclosure information.",
};

const securityAreas = [
  {
    eyebrow: "Account protection",
    title: "Secure access before activity begins.",
    description:
      "Authentication, passkeys, multifactor protection, device visibility, active sessions, and recovery controls are designed to protect account access.",
    href: "/security/identity-protection",
    action: "Open Identity Protection",
  },
  {
    eyebrow: "Compliance",
    title: "Coordinate responsible payment activity.",
    description:
      "Verification, sanctions screening, monitoring, jurisdictional requirements, and review workflows can operate before settlement.",
    href: "/security/compliance",
    action: "Open Compliance",
  },
  {
    eyebrow: "Policy",
    title: "Define how value may move.",
    description:
      "Rules, approvals, limits, geography, velocity, and permissions can become executable Runtime policy.",
    href: "/security/policy",
    action: "Open Policy Engine",
  },
  {
    eyebrow: "Evidence",
    title: "Preserve what happened.",
    description:
      "Verified receipts can retain Runtime decisions, identifiers, settlement details, and integrity evidence as one connected record.",
    href: "/security/verified-receipts",
    action: "Open Verified Receipts",
  },
  {
    eyebrow: "Observability",
    title: "See the system behind the payment.",
    description:
      "Runtime telemetry can expose engine readiness, economic-event timelines, settlement, resilience, and infrastructure health.",
    href: "/security/runtime-telemetry",
    action: "Open Runtime Telemetry",
  },
];

const practices = [
  {
    title: "Least-privilege access",
    description:
      "People, businesses, applications, and agents should receive only the permissions necessary for their intended purpose.",
  },
  {
    title: "Layered evaluation",
    description:
      "Identity, compliance, risk, and policy are intended to work together rather than as isolated checks.",
  },
  {
    title: "Visible outcomes",
    description:
      "Security decisions, settlement results, and system behavior should remain explainable and reviewable.",
  },
  {
    title: "Resilient execution",
    description:
      "Retries, recoveries, non-retryable failures, and exhausted attempts should be preserved rather than hidden.",
  },
  {
    title: "Controlled integrations",
    description:
      "External providers, payment rails, APIs, and connected services should be evaluated and restricted deliberately.",
  },
  {
    title: "Continuous improvement",
    description:
      "Security controls, incident procedures, dependencies, and infrastructure should evolve as ZephiPay approaches production.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12m-4-4 4 4-4 4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function SecurityCenterPage() {
  return (
    <SecurityStudioPageShell
      title="Security Center"
      description="Review ZephiPay security practices, protection workspaces, incident resources, and the controls being developed around every supported economic event."
    >
      <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
        <div className="grid xl:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-border-subtle p-6 sm:p-8 xl:border-b-0 xl:border-r">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Platform security
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em]">
              Security is part of the economic event—not an afterthought.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-foreground-secondary">
              ZephiPay is being designed so identity, compliance, risk,
              policy, execution, settlement, resilience, and verification
              remain coordinated from intent creation through final evidence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Production status", "Pre-launch"],
                ["Security posture", "In development"],
                ["Incident history", "No public incidents recorded"],
                ["Responsible disclosure", "Program being prepared"],
              ].map(([label, value]) => (
                <article
                  key={label}
                  className="rounded-2xl border border-border-default bg-surface-glass p-5"
                >
                  <p className="text-xs text-foreground-muted">
                    {label}
                  </p>

                  <p className="mt-2 text-sm font-medium text-foreground">
                    {value}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="bg-background/35 p-6 sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
              <ShieldIcon />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
              Report a security concern
            </h2>

            <p className="mt-4 text-sm leading-6 text-foreground-secondary">
              A dedicated vulnerability-reporting and responsible-disclosure
              channel will be published before production launch.
            </p>

            <div className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-5">
              <p className="text-sm font-medium text-foreground">
                Pre-launch guidance
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                Do not submit sensitive credentials, private keys, recovery
                phrases, production customer data, or exploit details through
                public social channels.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Disclosure channel coming soon
            </button>
          </aside>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {securityAreas.map((area) => (
          <Link
            key={area.title}
            href={area.href}
            className="group rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-surface-elevated/60"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              {area.eyebrow}
            </p>

            <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
              {area.title}
            </h2>

            <p className="mt-3 min-h-[5rem] text-sm leading-6 text-foreground-secondary">
              {area.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              {area.action}
              <span className="transition group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-14">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Security practices
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
            Principles guiding the platform.
          </h2>

          <p className="mt-4 leading-7 text-foreground-secondary">
            These principles describe the intended security direction of
            ZephiPay during development. They are not certifications,
            guarantees, or claims of completed production controls.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((practice) => (
            <article
              key={practice.title}
              className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold tracking-[-0.025em]">
                {practice.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                {practice.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Privacy
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Understand how information is handled.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Review ZephiPay&apos;s pre-launch privacy framework, data
            categories, intended uses, retention principles, and user controls.
          </p>

          <Link
            href="/privacy"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
          >
            Review Privacy
            <ArrowIcon />
          </Link>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Terms
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Review platform responsibilities.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Review the pre-launch framework covering eligibility, accounts,
            acceptable use, payments, risks, suspension, and service limits.
          </p>

          <Link
            href="/terms"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
          >
            Review Terms
            <ArrowIcon />
          </Link>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Service status
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Public status reporting is planned.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Runtime, API, settlement, provider, and infrastructure status
            reporting will be added as production services become available.
          </p>

          <button
            type="button"
            disabled
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground-muted"
          >
            Status page coming soon
          </button>
        </article>
      </section>
    </SecurityStudioPageShell>
  );
}
