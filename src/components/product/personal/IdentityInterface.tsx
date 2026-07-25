"use client";

import Link from "next/link";
import { useState } from "react";

type IdentityTab =
  | "Overview"
  | "Verification"
  | "Trust"
  | "Points"
  | "Security";

const tabs: IdentityTab[] = [
  "Overview",
  "Verification",
  "Trust",
  "Points",
  "Security",
];

const identitySignals = [
  {
    label: "Identity verification",
    value: "Not connected",
    description:
      "Verification status will appear after an authenticated identity session is available.",
  },
  {
    label: "Connected wallets",
    value: "0",
    description:
      "Wallets linked to the participant identity will appear here.",
  },
  {
    label: "Linked accounts",
    value: "0",
    description:
      "Supported bank or payment accounts will appear after connection.",
  },
  {
    label: "Trusted devices",
    value: "0",
    description:
      "Recognized devices will appear after secure account activity.",
  },
];

const verificationSteps = [
  {
    title: "Create account",
    description:
      "Establish the participant profile used across ZephiPay.",
  },
  {
    title: "Verify identity",
    description:
      "Complete the applicable identity checks required for supported features.",
  },
  {
    title: "Connect accounts",
    description:
      "Link supported wallets, bank accounts, and payment methods.",
  },
  {
    title: "Establish trusted activity",
    description:
      "Build an account history through verified participation and reliable transactions.",
  },
];

const trustSignals = [
  "Verified identity",
  "Successful transactions",
  "Verified receipt history",
  "Account longevity",
  "Settlement reliability",
  "Consistent participation",
];

const pointSources = [
  "Complete eligible participation milestones",
  "Use supported ZephiPay features",
  "Maintain reliable transaction activity",
  "Support creators and ecosystem participants",
  "Contribute to future community programs",
];

const securityItems = [
  {
    title: "Trusted devices",
    description:
      "Review devices recognized through authenticated account activity.",
    status: "No devices",
  },
  {
    title: "Recovery methods",
    description:
      "Manage supported recovery methods when account services become available.",
    status: "Not configured",
  },
  {
    title: "Security activity",
    description:
      "Review account access, identity changes, and security events.",
    status: "No activity",
  },
];

function IdentityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-4.1 3.1-6.2 7-6.2s6.3 2.1 7 6.2" />
      <path d="M4 4h3M17 4h3M4 20h3M17 20h3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3 5 6v5c0 4.8 2.7 8 7 10 4.3-2 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

function PointsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M9 9.5h4.2a2 2 0 0 1 0 4H11a2 2 0 0 0 0 4h4" />
      <path d="M12 7v2.5M12 17.5V20" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function OverviewPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {identitySignals.map((signal) => (
        <article
          key={signal.label}
          className="rounded-2xl border border-border-subtle bg-background/55 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-medium">{signal.label}</p>

            <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1 text-xs text-foreground-muted">
              {signal.value}
            </span>
          </div>

          <p className="mt-4 text-xs leading-6 text-foreground-secondary">
            {signal.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function VerificationPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-background/55">
      {verificationSteps.map((step, index) => (
        <div
          key={step.title}
          className={`grid grid-cols-[auto_1fr] gap-4 px-5 py-5 ${
            index !== verificationSteps.length - 1
              ? "border-b border-border-subtle"
              : ""
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-semibold text-brand-secondary">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <p className="text-sm font-medium">{step.title}</p>

            <p className="mt-2 text-xs leading-6 text-foreground-secondary">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrustPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/[0.07] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
          <StarIcon />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Zephyon Trust Score
        </p>

        <p className="mt-4 text-5xl font-semibold tracking-[-0.05em]">—</p>

        <p className="mt-3 text-sm text-foreground-secondary">
          No score available
        </p>

        <p className="mt-5 text-xs leading-6 text-foreground-muted">
          A Trust Score will appear after eligible identity, transaction,
          settlement, and account-history signals are available.
        </p>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-background/55 p-6">
        <p className="text-sm font-semibold">Signals that may contribute</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {trustSignals.map((signal) => (
            <div
              key={signal}
              className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-glass px-4 py-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-default text-foreground-muted">
                <ShieldIcon />
              </span>

              <span className="text-sm text-foreground-secondary">
                {signal}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-foreground-muted">
          Trust is intended to reflect reliable behavior over time. It is not
          purchased and should not be treated as a guarantee.
        </p>
      </div>
    </div>
  );
}

function PointsPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/[0.07] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
          <PointsIcon />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Zephyon Points
        </p>

        <p className="mt-4 text-5xl font-semibold tracking-[-0.05em]">— ZP</p>

        <p className="mt-3 text-sm text-foreground-secondary">
          No participation history
        </p>

        <p className="mt-5 text-xs leading-6 text-foreground-muted">
          Eligible points, levels, and milestones will appear after the
          participation system becomes available.
        </p>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-background/55 p-6">
        <p className="text-sm font-semibold">
          Participation may be recognized through
        </p>

        <div className="mt-5 space-y-3">
          {pointSources.map((source, index) => (
            <div
              key={source}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-border-subtle bg-surface-glass px-4 py-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-[0.65rem] font-semibold text-brand-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="pt-1 text-sm text-foreground-secondary">
                {source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityPanel() {
  return (
    <div className="grid gap-4">
      {securityItems.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-border-subtle bg-background/55 p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{item.title}</p>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-foreground-secondary">
                {item.description}
              </p>
            </div>

            <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1.5 text-xs text-foreground-muted">
              {item.status}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function IdentityInterface() {
  const [activeTab, setActiveTab] = useState<IdentityTab>("Overview");

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
      <div className="border-b border-border-subtle px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Product interface
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Identity hub
            </h3>
          </div>

          <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1.5 text-xs text-foreground-muted">
            Account not connected
          </span>
        </div>
      </div>

      <div className="grid xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="border-b border-border-subtle bg-surface-glass p-6 xl:border-b-0 xl:border-r sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
            <IdentityIcon />
          </div>

          <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Personal identity
          </p>

          <h4 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
            Not connected
          </h4>

          <p className="mt-4 max-w-md text-sm leading-7 text-foreground-secondary">
            Sign in to view verification, connected accounts, Trust Score,
            Zephyon Points, devices, and recovery information.
          </p>

          <div className="mt-8 rounded-2xl border border-border-subtle bg-background/55 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-default text-foreground-muted">
                <ShieldIcon />
              </span>

              <p className="text-sm font-medium">
                Identity belongs to the participant
              </p>
            </div>

            <p className="mt-3 text-xs leading-6 text-foreground-muted">
              Trust and participation are presented as parts of the same
              economic identity rather than unrelated features.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/personal#personal-workspace"
              className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary px-5 py-3 text-sm font-medium text-brand-contrast transition hover:brightness-105"
            >
              Open ZephiPay
              <ArrowIcon />
            </Link>

            <Link
              href="/personal/activity"
              className="inline-flex items-center rounded-full border border-border-default px-5 py-3 text-sm font-medium transition hover:border-brand-primary/35 hover:bg-brand-primary/[0.06]"
            >
              View activity
            </Link>
          </div>
        </aside>

        <section className="p-6 sm:p-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  activeTab === tab
                    ? "border-brand-primary/35 bg-brand-primary/[0.09] text-foreground"
                    : "border-border-default bg-surface-glass text-foreground-secondary hover:border-border-strong"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-7">
            {activeTab === "Overview" && <OverviewPanel />}
            {activeTab === "Verification" && <VerificationPanel />}
            {activeTab === "Trust" && <TrustPanel />}
            {activeTab === "Points" && <PointsPanel />}
            {activeTab === "Security" && <SecurityPanel />}
          </div>
        </section>
      </div>
    </div>
  );
}
