import Link from "next/link";

type SecuritySystem = {
  number: string;
  title: string;
  description: string;
  href: string;
  status: string;
  details: string[];
};

const systems: SecuritySystem[] = [
  {
    number: "01",
    title: "Identity Protection",
    description:
      "Protect accounts, sessions, devices, authentication, and recovery.",
    href: "/security/identity-protection",
    status: "Account not connected",
    details: ["Authentication", "Devices", "Sessions", "Recovery"],
  },
  {
    number: "02",
    title: "Compliance",
    description:
      "Coordinate identity requirements, sanctions checks, monitoring, and reviews.",
    href: "/security/compliance",
    status: "No review activity",
    details: ["KYC", "KYB", "Sanctions", "Monitoring"],
  },
  {
    number: "03",
    title: "Policy Engine",
    description:
      "Apply limits, permissions, approval requirements, and transaction rules.",
    href: "/security/policy",
    status: "No policies configured",
    details: ["Limits", "Approvals", "Velocity", "Permissions"],
  },
  {
    number: "04",
    title: "Verified Receipts",
    description:
      "Preserve trustworthy evidence from authorization through settlement.",
    href: "/security/verified-receipts",
    status: "No receipt records",
    details: ["Decision", "Execution", "Settlement", "Integrity"],
  },
  {
    number: "05",
    title: "Runtime Telemetry",
    description:
      "Observe orchestration health, engine activity, settlement, and resilience.",
    href: "/security/runtime-telemetry",
    status: "Runtime not connected",
    details: ["Engines", "Health", "Latency", "Resilience"],
  },
  {
    number: "06",
    title: "Security Center",
    description:
      "Review platform posture, notices, practices, and incident history.",
    href: "/security",
    status: "Public overview",
    details: ["Posture", "Notices", "Practices", "Incidents"],
  },
];

const runtimePath = [
  {
    label: "Identity",
    detail: "Participant resolved",
  },
  {
    label: "Compliance",
    detail: "Requirements checked",
  },
  {
    label: "Risk",
    detail: "Signals evaluated",
  },
  {
    label: "Policy",
    detail: "Rules enforced",
  },
  {
    label: "Settlement",
    detail: "Value transferred",
  },
  {
    label: "Verification",
    detail: "Receipt preserved",
  },
];

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

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

export function SecurityDashboardWorkspace() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
        <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Security command center
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Protection before value moves
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
                Identity, compliance, risk, policy, settlement, and
                verification work as one continuous decision path beneath
                every supported economic event.
              </p>
            </div>

            <span className="w-fit rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
              Platform overview
            </span>
          </div>
        </header>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-border-subtle p-5 sm:p-7 xl:border-b-0 xl:border-r">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Security systems",
                  value: "6",
                  detail: "Connected protection domains.",
                },
                {
                  label: "Active alerts",
                  value: "—",
                  detail: "Requires connected security activity.",
                },
                {
                  label: "Runtime status",
                  value: "—",
                  detail: "Requires a live Runtime connection.",
                },
              ].map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4"
                >
                  <p className="text-xs font-medium text-foreground-muted">
                    {metric.label}
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                    {metric.value}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                    {metric.detail}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-6 overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Runtime protection path
                  </p>

                  <p className="mt-1 text-xs leading-5 text-foreground-muted">
                    The coordinated evaluation applied before and during
                    settlement.
                  </p>
                </div>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Demonstration
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {runtimePath.map((step, index) => (
                    <article
                      key={step.label}
                      className="relative rounded-2xl border border-border-subtle bg-surface-glass p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-2.5 w-2.5 rounded-full bg-foreground-muted/30" />
                      </div>

                      <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">
                        {step.label}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-foreground-muted">
                        {step.detail}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border-default bg-surface-secondary p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-default bg-background/60 text-brand-secondary">
                    <ActivityIcon />
                  </span>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      No live economic event selected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      Decision timelines and engine results will appear after
                      Runtime telemetry is connected.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="bg-background/35 p-5 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              Security posture
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              Awaiting connected activity
            </h3>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              Security posture will reflect verified identity, policy,
              compliance, Runtime, and settlement records rather than
              manufactured readiness scores.
            </p>

            <div className="mt-6 flex items-center justify-center rounded-[1.7rem] border border-border-default bg-surface-glass px-5 py-10">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <ShieldIcon />
                </div>

                <p className="mt-5 text-4xl font-semibold tracking-[-0.055em]">
                  —
                </p>

                <p className="mt-2 text-sm text-foreground-muted">
                  No posture score available
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["Identity protection", "Not connected"],
                ["Compliance activity", "Not available"],
                ["Policy coverage", "Not configured"],
                ["Runtime telemetry", "Not connected"],
                ["Receipt verification", "No records"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-glass p-4"
                >
                  <span className="text-sm text-foreground-secondary">
                    {label}
                  </span>

                  <span className="text-xs font-medium text-foreground-muted">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {systems.map((system) => (
          <Link
            key={system.title}
            href={system.href}
            className="group rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-surface-elevated/60"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                {system.number}
              </span>

              <span className="text-foreground-muted transition group-hover:translate-x-1 group-hover:text-foreground">
                <ArrowIcon />
              </span>
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
              {system.title}
            </h2>

            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-foreground-secondary">
              {system.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {system.details.map((detail) => (
                <span
                  key={detail}
                  className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                >
                  {detail}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-border-subtle pt-4">
              <p className="text-xs text-foreground-muted">
                {system.status}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            eyebrow: "Before settlement",
            title: "Evaluate context before irreversibility.",
            body:
              "Identity, compliance, risk, and policy can be evaluated before a payment reaches a point where recovery becomes difficult.",
          },
          {
            eyebrow: "During execution",
            title: "Preserve continuity across the Runtime.",
            body:
              "Approval, orchestration, rail execution, resilience, and settlement can remain connected as one economic event.",
          },
          {
            eyebrow: "After completion",
            title: "Keep evidence available.",
            body:
              "Verified receipts and structured telemetry preserve what happened, why it happened, and how the event completed.",
          },
        ].map((item) => (
          <article
            key={item.eyebrow}
            className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              {item.eyebrow}
            </p>

            <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
              {item.title}
            </h2>

            <p className="mt-3 leading-7 text-foreground-secondary">
              {item.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
