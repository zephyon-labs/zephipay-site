import type { Metadata } from "next";
import Link from "next/link";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security | ZephiPay",
  description:
    "See how identity, compliance, risk, policy, settlement, and verification protect every ZephiPay transaction.",
};

const trustPath = [
  {
    number: "01",
    title: "Identity",
    detail: "Participant resolved",
  },
  {
    number: "02",
    title: "Compliance",
    detail: "Requirements checked",
  },
  {
    number: "03",
    title: "Risk",
    detail: "Signals evaluated",
  },
  {
    number: "04",
    title: "Policy",
    detail: "Rules enforced",
  },
  {
    number: "05",
    title: "Settlement",
    detail: "Value transferred",
  },
  {
    number: "06",
    title: "Verification",
    detail: "Receipt preserved",
  },
];

const pillars = [
  {
    number: "01",
    title: "Identity before movement",
    body: "ZephiPay resolves the person, business, application, or autonomous agent behind an economic action before value is allowed to move.",
    outcome: "Every payment begins with a known participant.",
  },
  {
    number: "02",
    title: "Compliance in the flow",
    body: "KYC, KYB, sanctions, transaction monitoring, and jurisdictional requirements can be coordinated as part of the payment lifecycle.",
    outcome: "Requirements are evaluated before settlement—not after.",
  },
  {
    number: "03",
    title: "Risk before irreversibility",
    body: "Transaction context, behavioral signals, settlement conditions, and confidence indicators are evaluated before approval.",
    outcome: "Suspicious activity can be stopped before it becomes a loss.",
  },
  {
    number: "04",
    title: "Policy by design",
    body: "Accounts and organizations can define limits, merchant permissions, approval thresholds, and transaction rules for people and software.",
    outcome: "Every participant operates inside clearly defined boundaries.",
  },
  {
    number: "05",
    title: "Verified settlement",
    body: "The Runtime coordinates the selected payment rail and preserves the decision, execution, and settlement outcome as one continuous event.",
    outcome: "Approval and settlement remain connected.",
  },
  {
    number: "06",
    title: "Deterministic receipts",
    body: "Every completed economic event produces a structured record of what happened, why it was approved, and how it settled.",
    outcome: "Trust remains available long after money moves.",
  },
];

const receiptFields = [
  ["Payment ID", "ZPH-82A7-41E9"],
  ["Participant", "Identity verified"],
  ["Runtime decision", "Approved"],
  ["Policy result", "All rules satisfied"],
  ["Settlement", "Completed"],
  ["Receipt integrity", "Verified"],
];

const audiences = [
  {
    label: "For people",
    title: "Protection without added friction.",
    body: "Send, receive, and pay through a familiar experience while identity, policy, risk, and verification operate quietly underneath.",
    details: ["Clear payment status", "Persistent receipts", "Trusted participants"],
  },
  {
    label: "For businesses",
    title: "Control every economic action.",
    body: "Define how funds may move, strengthen operational oversight, and preserve a complete record from authorization through settlement.",
    details: ["Policy enforcement", "Audit-ready history", "Operational visibility"],
  },
  {
    label: "For AI agents",
    title: "Machine-readable trust.",
    body: "Give autonomous systems spending boundaries, verified counterparties, structured approvals, and receipts they can process programmatically.",
    details: ["Budget controls", "Merchant permissions", "Deterministic verification"],
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    >
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section className="pb-20 pt-28 sm:pt-32 lg:pb-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-secondary">
                Security
              </p>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Trust begins before money moves.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground-secondary sm:text-xl">
                ZephiPay coordinates identity, compliance, risk, policy,
                settlement, and verification as one continuous economic event.
                Security is not added after a transaction. It shapes every
                decision before it happens.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/runtime">Explore Runtime</Button>

                <Button href="/transparency" variant="secondary">
                  Transaction Transparency
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-foreground-secondary">
                {[
                  "Identity-aware",
                  "Policy-driven",
                  "Receipt-verified",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-brand-secondary">
                      <CheckIcon />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-10 rounded-full bg-brand-primary/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-border-default bg-surface-secondary/55 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-7">
                <div className="flex items-center justify-between border-b border-border-subtle pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-secondary">
                      Runtime protection
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      Transaction evaluation
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-primary/50 px-3 py-1.5 text-xs text-brand-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
                    Protected
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-primary/35 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                        Economic event
                      </p>
                      <p className="mt-2 text-xl font-semibold">$248.00 USDC</p>
                    </div>

                    <div className="text-right text-sm">
                      <p className="text-foreground-secondary">Status</p>
                      <p className="mt-1 font-medium text-brand-secondary">
                        Approved
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ["Identity resolved", "Verified"],
                    ["Compliance requirements", "Passed"],
                    ["Risk evaluation", "Low risk"],
                    ["Account policy", "Satisfied"],
                    ["Settlement readiness", "Confirmed"],
                  ].map(([label, status]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-border-subtle px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10 text-brand-secondary">
                          <CheckIcon />
                        </span>
                        <span className="text-sm">{label}</span>
                      </div>

                      <span className="text-xs text-foreground-secondary">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                      Decision
                    </p>
                    <p className="mt-1 font-medium">
                      Cleared for settlement
                    </p>
                  </div>

                  <span className="text-brand-secondary">
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="trusted-path" className="scroll-mt-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
              The trusted path
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Every payment follows the same protected sequence.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Each stage produces context for the next. No isolated checks. No
              disconnected approval systems. One coordinated path from
              participant identity to verified receipt.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-border-default lg:block" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {trustPath.map((step) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border-default bg-surface-secondary/45 p-5 backdrop-blur-sm"
                >
                  <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-brand-primary/30 bg-surface-primary text-xs font-medium text-brand-secondary">
                    {step.number}
                  </div>

                  <h3 className="mt-5 font-semibold">{step.title}</h3>

                  <p className="mt-2 text-xs leading-5 text-foreground-secondary">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="security-pillars" className="scroll-mt-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
              Security architecture
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Protection at every layer of the transaction.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              ZephiPay does more than transport value. It evaluates the full
              context surrounding an economic action and preserves the outcome
              as trusted evidence.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group rounded-3xl border border-border-default bg-surface-secondary/40 p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:bg-surface-secondary/55"
              >
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-brand-secondary">
                  {pillar.number}
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  {pillar.body}
                </p>

                <div className="mt-7 border-t border-border-subtle pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-secondary">
                    Why it matters
                  </p>

                  <p className="mt-3 text-sm leading-6">{pillar.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="verified-receipt" className="scroll-mt-28">
        <Container>
          <div className="overflow-hidden rounded-[2.25rem] border border-border-default bg-surface-secondary/45 backdrop-blur-xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-8 sm:p-10 lg:p-14">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
                  Deterministic receipts
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
                  Trust does not disappear after payment.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  A ZephiPay receipt preserves the transaction decision,
                  settlement result, and verification state as one structured
                  record.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Understand what happened",
                    "Confirm why it was approved",
                    "Verify how it settled",
                    "Preserve evidence for later",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-brand-secondary">
                        <CheckIcon />
                      </span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border-default bg-surface-primary/25 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="rounded-3xl border border-border-default bg-surface-secondary/70 p-6 shadow-xl shadow-black/5">
                  <div className="flex items-start justify-between border-b border-border-subtle pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-foreground-secondary">
                        Verified receipt
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        ZephiPay transaction
                      </p>
                    </div>

                    <div className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
                      Verified
                    </div>
                  </div>

                  <div className="mt-4 divide-y divide-border-subtle">
                    {receiptFields.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-6 py-4"
                      >
                        <span className="text-sm text-foreground-secondary">
                          {label}
                        </span>

                        <span className="text-right text-sm font-medium">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl border border-border-subtle bg-surface-primary/30 px-4 py-3 text-xs">
                    <span className="text-foreground-secondary">
                      Receipt hash
                    </span>
                    <span className="font-mono">7f2a...91c4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="security-for-everyone" className="scroll-mt-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
              One trust layer
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Built for every economic participant.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              People, organizations, and autonomous systems need different
              controls—but they all benefit from the same trusted payment
              foundation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {audiences.map((item) => (
              <article
                key={item.label}
                className="rounded-3xl border border-border-default bg-surface-secondary/40 p-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                  {item.label}
                </p>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-foreground-secondary">
                  {item.body}
                </p>

                <div className="mt-7 space-y-3 border-t border-border-subtle pt-6">
                  {item.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="text-brand-secondary">
                        <CheckIcon />
                      </span>
                      {detail}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border-default bg-surface-secondary/50 px-7 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-16">
            <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
                Zephyon Runtime
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Trust is part of every payment.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Security is not a final checkpoint. It is built into every
                identity decision, policy evaluation, settlement action, and
                verified receipt.
              </p>

              <div className="mt-9">
                <Button href="/runtime">Explore the Zephyon Runtime</Button>
              </div>

              <div className="mt-7">
                <Link
                  href="/transparency"
                  className="text-sm text-brand-secondary transition hover:text-brand-primary"
                >
                  See how transaction transparency works →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
