"use client";

import Link from "next/link";
import { useState } from "react";

const filters = ["All", "Payments", "Requests", "Transfers"];

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 18V8M10 18V4M16 18v-7M22 18H2" />
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

export function ActivityInterfacePreview() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
      <div className="border-b border-border-subtle px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Product interface
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Personal activity
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-primary/25 bg-brand-primary/[0.08] px-3 py-1.5 text-xs font-medium text-brand-secondary">
              Solana Devnet
            </span>

            <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1.5 text-xs text-foreground-secondary">
              Test funds only
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-border-subtle p-6 lg:border-b-0 lg:border-r sm:p-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "border-brand-primary/35 bg-brand-primary/[0.09] text-foreground"
                    : "border-border-default bg-surface-glass text-foreground-secondary hover:border-border-strong"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-6 flex min-h-96 items-center justify-center rounded-2xl border border-dashed border-border-default bg-surface-glass px-6 py-12 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                <ActivityIcon />
              </div>

              <h4 className="mt-6 text-xl font-semibold">
                No {activeFilter.toLowerCase()} activity yet
              </h4>

              <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                Real account events will appear here after authentication and
                supported payment activity.
              </p>

              <Link
                href="/personal#personal-workspace"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary px-6 py-3 text-sm font-medium text-brand-contrast transition hover:brightness-105"
              >
                Move money
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        <aside className="bg-surface-glass p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Activity details
          </p>

          <h4 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
            Select an activity record
          </h4>

          <p className="mt-3 text-sm leading-7 text-foreground-secondary">
            Status, amount, participants, purpose, timestamps, settlement
            evidence, and receipt details will appear here.
          </p>

          <div className="mt-7 overflow-hidden rounded-2xl border border-border-subtle bg-background/55">
            {[
              ["Status", "—"],
              ["Amount", "—"],
              ["Purpose", "—"],
              ["Time", "—"],
              ["Receipt", "—"],
            ].map(([label, value], index, array) => (
              <div
                key={label}
                className={`grid grid-cols-[0.35fr_0.65fr] gap-3 px-5 py-4 ${
                  index !== array.length - 1
                    ? "border-b border-border-subtle"
                    : ""
                }`}
              >
                <span className="text-sm text-foreground-muted">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-full border border-border-default bg-surface-elevated px-5 py-3 text-sm font-medium text-foreground-muted opacity-70"
          >
            View verified record
          </button>

          <a
            href="https://beta.zephipay.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-brand-secondary hover:text-brand-primary"
          >
            Open ZephiPay
            <ArrowIcon />
          </a>
        </aside>
      </div>
    </div>
  );
}
