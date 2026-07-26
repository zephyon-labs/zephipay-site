"use client";

import { useMemo, useState } from "react";

import { cn } from "@/utils/cn";

import type {
  EconomicEventStage,
  EconomicEventStageId,
} from "./types";

const stages: EconomicEventStage[] = [
  {
    id: "intent",
    number: "01",
    title: "Intent",
    summary:
      "A person, business, application, or AI agent requests an economic action.",
    explanation:
      "The Runtime receives a clear description of what the participant wants to do, who should receive value, how much is involved, and why the action is being requested.",
    importance:
      "A precise intent gives every later engine the context it needs to evaluate the payment consistently.",
    example:
      "A research agent requests permission to purchase a verified market-data report for $24.",
    runtimeSignal:
      "Economic action received",
  },
  {
    id: "identity",
    number: "02",
    title: "Identity",
    summary:
      "The Runtime resolves who or what is participating before value moves.",
    explanation:
      "Zephyon identifies the human, business, application, wallet, or autonomous agent behind the request and confirms that the participant is recognized.",
    importance:
      "A payment system cannot apply meaningful permissions, accountability, or policy when it does not know who is acting.",
    example:
      "The Runtime confirms that the request came from the approved Research Agent connected to the user’s account.",
    runtimeSignal:
      "Participant resolved",
  },
  {
    id: "compliance",
    number: "03",
    title: "Compliance",
    summary:
      "Required account, jurisdiction, sanctions, and transaction controls are applied.",
    explanation:
      "The Runtime coordinates the compliance requirements relevant to the participants, asset, jurisdiction, and transaction context.",
    importance:
      "Autonomous systems must follow the same financial safeguards as people and businesses rather than operating outside them.",
    example:
      "The payment is checked against account status, jurisdiction rules, sanctions controls, and transaction-monitoring requirements.",
    runtimeSignal:
      "Controls satisfied",
  },
  {
    id: "risk",
    number: "04",
    title: "Risk",
    summary:
      "Transaction context and runtime signals are evaluated before approval.",
    explanation:
      "The Risk Engine examines the amount, recipient, historical behavior, settlement conditions, and other available signals for anything unusual.",
    importance:
      "Even a permitted action may need additional review when its context differs from established behavior.",
    example:
      "A routine $24 data purchase appears consistent with the agent’s purpose and previous approved activity.",
    runtimeSignal:
      "Risk acceptable",
  },
  {
    id: "policy",
    number: "05",
    title: "Policy",
    summary:
      "Account, platform, merchant, and organizational rules are enforced.",
    explanation:
      "The Policy Engine compares the requested action with the permissions, spending limits, approval rules, vendor restrictions, and other boundaries attached to the agent.",
    importance:
      "Policy turns human intent into enforceable rules that remain active even when the agent operates autonomously.",
    example:
      "The payment is below the agent’s $25 per-payment limit and the selected provider is permitted.",
    runtimeSignal:
      "Policy approved",
  },
  {
    id: "settlement",
    number: "06",
    title: "Settlement",
    summary:
      "The appropriate payment rail is selected and coordinated through the Runtime.",
    explanation:
      "After approval, Zephyon prepares and executes the payment through the available settlement rail while preserving the economic-event context.",
    importance:
      "Settlement should be coordinated only after identity, controls, risk, and policy have all reached an acceptable decision.",
    example:
      "The Runtime sends the approved $24 payment through the configured Solana settlement path.",
    runtimeSignal:
      "Value transferred",
  },
  {
    id: "verification",
    number: "07",
    title: "Verification",
    summary:
      "Execution results are confirmed and attached to the economic event.",
    explanation:
      "The Runtime verifies that settlement completed, records the transaction reference, and confirms the final execution state.",
    importance:
      "A submitted transaction is not the same as a verified outcome. The system needs evidence that the requested action actually completed.",
    example:
      "The settlement signature is confirmed and connected to the original research-agent request.",
    runtimeSignal:
      "Settlement confirmed",
  },
  {
    id: "receipt",
    number: "08",
    title: "Receipt",
    summary:
      "A deterministic record preserves what happened and when.",
    explanation:
      "Zephyon produces a structured receipt containing the intent, participants, decisions, settlement result, timing, and verification state.",
    importance:
      "People and software need a durable record they can inspect, reconcile, and independently verify later.",
    example:
      "The agent receives the purchased report while the user receives a verified record of the complete $24 economic event.",
    runtimeSignal:
      "Record preserved",
  },
];

function ArrowIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        "h-4 w-4",
        direction === "left" && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function EconomicEventExplorer() {
  const [activeStageId, setActiveStageId] =
    useState<EconomicEventStageId>("intent");

  const activeIndex = useMemo(
    () =>
      stages.findIndex(
        (stage) => stage.id === activeStageId,
      ),
    [activeStageId],
  );

  const activeStage = stages[activeIndex] ?? stages[0];

  const progress =
    ((activeIndex + 1) / stages.length) * 100;

  function goToStage(index: number) {
    const stage = stages[index];

    if (stage) {
      setActiveStageId(stage.id);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div className="border-b border-border-subtle bg-background/70 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Interactive Runtime walkthrough
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Follow the complete economic event
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Select a stage or move step by step from the original
              request to a verified receipt.
            </p>
          </div>

          <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
            Stage {activeIndex + 1} of {stages.length}
          </span>
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-border-subtle">
          <div
            className="h-full rounded-full bg-brand-secondary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
        <div className="border-b border-border-subtle bg-background/45 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div
            role="tablist"
            aria-label="Economic event stages"
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
          >
            {stages.map((stage, index) => {
              const active = stage.id === activeStageId;
              const completed = index < activeIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() =>
                    setActiveStageId(stage.id)
                  }
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border p-4 text-left",
                    "transition-all duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-primary/45",
                    active
                      ? "border-brand-primary/45 bg-brand-primary/10"
                      : "border-border-subtle bg-background/40 hover:border-border-default",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold",
                      active
                        ? "border-brand-primary/35 bg-brand-primary/15 text-brand-secondary"
                        : completed
                          ? "border-brand-primary/20 bg-brand-primary/[0.07] text-brand-secondary"
                          : "border-border-default bg-surface-secondary text-foreground-muted",
                    )}
                  >
                    {completed ? (
                      <CheckIcon />
                    ) : (
                      stage.number
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {stage.title}
                    </span>

                    <span className="mt-1 block truncate text-xs text-foreground-muted">
                      {stage.runtimeSignal}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          className="relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                  {activeStage.number} · {activeStage.runtimeSignal}
                </p>

                <h4 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {activeStage.title}
                </h4>
              </div>

              <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
                Zephyon Runtime
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-xl font-medium leading-8 text-foreground">
              {activeStage.summary}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.5rem] border border-border-subtle bg-background/55 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  What happens
                </p>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  {activeStage.explanation}
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-border-subtle bg-background/55 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  Why it matters
                </p>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  {activeStage.importance}
                </p>
              </article>
            </div>

            <article className="mt-4 rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.07] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                Plain-English example
              </p>

              <p className="mt-4 text-base leading-7 text-foreground-secondary">
                {activeStage.example}
              </p>
            </article>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() =>
                  goToStage(activeIndex - 1)
                }
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-5",
                  "text-sm font-medium transition-colors",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-primary/45",
                  activeIndex === 0
                    ? "cursor-not-allowed border-border-subtle text-foreground-muted opacity-45"
                    : "border-border-default text-foreground-secondary hover:text-foreground",
                )}
              >
                <ArrowIcon direction="left" />
                Previous
              </button>

              <p className="text-xs text-foreground-muted">
                {activeStage.title} ·{" "}
                {activeIndex + 1}/{stages.length}
              </p>

              <button
                type="button"
                disabled={
                  activeIndex === stages.length - 1
                }
                onClick={() =>
                  goToStage(activeIndex + 1)
                }
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-5",
                  "text-sm font-semibold transition-all",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-primary/45",
                  activeIndex === stages.length - 1
                    ? "cursor-not-allowed border border-brand-primary/20 bg-brand-primary/[0.07] text-brand-secondary opacity-70"
                    : "bg-foreground text-background hover:opacity-90",
                )}
              >
                {activeIndex === stages.length - 1
                  ? "Walkthrough complete"
                  : "Next stage"}

                {activeIndex < stages.length - 1 ? (
                  <ArrowIcon direction="right" />
                ) : (
                  <CheckIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
