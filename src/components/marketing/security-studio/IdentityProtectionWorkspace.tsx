"use client";

import { useMemo, useState } from "react";

type ProtectionView =
  | "overview"
  | "authentication"
  | "devices"
  | "sessions"
  | "recovery"
  | "alerts";

type ProtectionViewDefinition = {
  id: ProtectionView;
  label: string;
  description: string;
  emptyTitle: string;
};

const views: ProtectionViewDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Review the current state of account access, authentication, devices, and recovery.",
    emptyTitle: "Account protection is not connected",
  },
  {
    id: "authentication",
    label: "Authentication",
    description:
      "Manage passwords, passkeys, multifactor authentication, and sign-in requirements.",
    emptyTitle: "No authentication methods available",
  },
  {
    id: "devices",
    label: "Devices",
    description:
      "Review browsers, phones, computers, and other devices connected to the account.",
    emptyTitle: "No trusted devices recorded",
  },
  {
    id: "sessions",
    label: "Sessions",
    description:
      "See active and recent account sessions across connected devices.",
    emptyTitle: "No session history available",
  },
  {
    id: "recovery",
    label: "Recovery",
    description:
      "Prepare secure account-recovery methods before access is lost.",
    emptyTitle: "No recovery methods configured",
  },
  {
    id: "alerts",
    label: "Alerts",
    description:
      "Review unusual sign-ins, device changes, recovery events, and security notices.",
    emptyTitle: "No security alerts",
  },
];

const metrics = [
  {
    label: "Authentication",
    value: "—",
    detail: "Requires a connected account.",
  },
  {
    label: "Trusted devices",
    value: "—",
    detail: "Devices approved for account access.",
  },
  {
    label: "Active sessions",
    value: "—",
    detail: "Current authenticated sessions.",
  },
  {
    label: "Security alerts",
    value: "—",
    detail: "Requires connected access history.",
  },
];

const readinessItems = [
  {
    label: "Primary sign-in",
    status: "Not connected",
  },
  {
    label: "Passkey",
    status: "Not configured",
  },
  {
    label: "Multifactor authentication",
    status: "Not configured",
  },
  {
    label: "Recovery method",
    status: "Not configured",
  },
  {
    label: "Trusted device review",
    status: "Not available",
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
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  );
}

function KeyIcon() {
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
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8" />
      <path d="m16 7 2 2" />
      <path d="m14 9 2 2" />
    </svg>
  );
}

function DeviceIcon() {
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
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

function SessionIcon() {
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
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function RecoveryIcon() {
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
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 5v7h7" />
    </svg>
  );
}

function AlertIcon() {
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
      <path d="M12 3 2.8 19h18.4L12 3Z" />
      <path d="M12 9v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

const featureCards = [
  {
    title: "Authentication",
    description:
      "Passwords, passkeys, multifactor authentication, and sign-in requirements.",
    icon: <KeyIcon />,
  },
  {
    title: "Device protection",
    description:
      "Review and revoke devices that are authorized to access the account.",
    icon: <DeviceIcon />,
  },
  {
    title: "Session control",
    description:
      "Understand where the account is active and end access when necessary.",
    icon: <SessionIcon />,
  },
  {
    title: "Account recovery",
    description:
      "Establish recovery methods before credentials or devices are lost.",
    icon: <RecoveryIcon />,
  },
];

export function IdentityProtectionWorkspace() {
  const [activeView, setActiveView] =
    useState<ProtectionView>("overview");

  const activeDefinition = useMemo(
    () =>
      views.find((view) => view.id === activeView) ??
      views[0],
    [activeView],
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Identity protection workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Protect access to every account
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Manage authentication, trusted devices, sessions,
              recovery, and security alerts without mixing account
              protection with identity verification or trust scoring.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
            Account not connected
          </span>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Identity protection views"
        >
          {views.map((view) => {
            const isActive = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(view.id)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {view.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid xl:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-border-subtle p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
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
                  {activeDefinition.label}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-foreground-muted">
                  {activeDefinition.description}
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                No connected records
              </span>
            </div>

            <div className="flex min-h-[24rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                {activeView === "alerts" ? (
                  <AlertIcon />
                ) : (
                  <ShieldIcon />
                )}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {activeDefinition.emptyTitle}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                Sign in and connect an account to review authentication
                methods, trusted devices, active sessions, recovery
                options, and security history.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Passkey ready",
                  "MFA capable",
                  "Session control",
                  "Recovery aware",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border-default bg-surface-glass p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  {feature.icon}
                </span>

                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </section>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Protection readiness
          </p>

          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
            No account security posture yet
          </h3>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            Readiness will be based on real authentication, device,
            session, recovery, and access-history records.
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
                No protection score available
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {readinessItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-glass p-4"
              >
                <span className="text-sm text-foreground-secondary">
                  {item.label}
                </span>

                <span className="text-xs font-medium text-foreground-muted">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                <AlertIcon />
              </span>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Access history
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Sign-ins and security events
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border-subtle bg-background/45 p-5 text-center">
              <p className="text-sm font-medium text-foreground">
                No access records
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                Recent sign-ins, device changes, recovery activity,
                and account-security events will appear after connection.
              </p>
            </div>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground opacity-55"
            >
              Review devices
            </button>

            <button
              type="button"
              disabled
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Secure account
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-foreground-muted">
            Security controls activate after account authentication is connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
