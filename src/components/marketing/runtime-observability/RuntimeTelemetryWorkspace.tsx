"use client";

import { useEffect, useState } from "react";

type RuntimeStage = {
  id: string;
  number: string;
  title: string;
  engine: string;
  state: string;
  description: string;
  observations: string[];
};

const stages: RuntimeStage[] = [
  {
    id: "intent",
    number: "01",
    title: "Intent received",
    engine: "Orchestrator",
    state: "Observed",
    description:
      "The Runtime receives an economic request and establishes the execution context surrounding it.",
    observations: [
      "Actor and requested action identified",
      "Purpose attached to the event",
      "Execution context opened",
    ],
  },
  {
    id: "identity",
    number: "02",
    title: "Identity resolved",
    engine: "Identity Engine",
    state: "Resolved",
    description:
      "The participating person, business, application, or autonomous agent is resolved before value moves.",
    observations: [
      "Participant type established",
      "Account context resolved",
      "Identity state attached to the event",
    ],
  },
  {
    id: "policy",
    number: "03",
    title: "Policy evaluated",
    engine: "Policy Engine",
    state: "Evaluated",
    description:
      "Permissions, limits, organizational rules, and approval requirements are evaluated consistently.",
    observations: [
      "Permission scope inspected",
      "Spending rules considered",
      "Approval requirements determined",
    ],
  },
  {
    id: "risk",
    number: "04",
    title: "Risk assessed",
    engine: "Risk Engine",
    state: "Assessed",
    description:
      "Runtime signals and transaction context are assessed before the event can proceed to settlement.",
    observations: [
      "Economic context reviewed",
      "Runtime signals evaluated",
      "Decision context preserved",
    ],
  },
  {
    id: "settlement",
    number: "05",
    title: "Settlement coordinated",
    engine: "Settlement Engine",
    state: "Coordinated",
    description:
      "The Runtime selects and coordinates an appropriate payment rail after required controls are satisfied.",
    observations: [
      "Settlement rail selected",
      "Execution result attached",
      "Confirmation state monitored",
    ],
  },
  {
    id: "receipt",
    number: "06",
    title: "Receipt produced",
    engine: "Telemetry",
    state: "Recorded",
    description:
      "The completed event is represented as a deterministic settlement record for later inspection.",
    observations: [
      "Outcome preserved",
      "Verification state recorded",
      "Event history made inspectable",
    ],
  },
];

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <rect x="7" y="5" width="3" height="14" rx="1" />
      <rect x="14" y="5" width="3" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="m8 5 11 7-11 7V5Z" />
    </svg>
  );
}

export function RuntimeTelemetryWorkspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeStage = stages[activeIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % stages.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [playing]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="flex flex-col border-b border-border-subtle gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-35" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-secondary" />
            </span>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Runtime event walkthrough
            </p>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            An illustrative telemetry sequence showing how Runtime stages can
            remain observable throughout an economic event.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border-subtle bg-background-secondary/50 px-4 py-2 text-sm text-foreground transition hover:bg-background-secondary"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause walkthrough" : "Resume walkthrough"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
        <aside className="border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {stages.map((stage, index) => {
              const active = index === activeIndex;
              const completed = index < activeIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setPlaying(false);
                  }}
                  className={[
                    "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition",
                    active
                      ? "border-brand-secondary/35 bg-brand-secondary/10"
                      : "border-transparent hover:border-border-subtle hover:bg-background-secondary/55",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold transition",
                      active
                        ? "bg-brand-secondary text-white"
                        : completed
                          ? "bg-brand-secondary/15 text-brand-secondary"
                          : "bg-background-secondary text-foreground-secondary",
                    ].join(" ")}
                  >
                    {completed ? "✓" : stage.number}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {stage.title}
                    </span>

                    <span className="mt-1 block truncate text-xs text-foreground-secondary">
                      {stage.engine}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-border-subtle px-6 py-8 sm:px-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-brand-secondary/25 bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
                {activeStage.state}
              </span>

              <span className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                {activeStage.engine}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {activeStage.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-foreground-secondary">
              {activeStage.description}
            </p>
          </div>

          <div className="grid xl:grid-cols-[1fr_280px]">
            <div className="min-w-0 border-b border-border-subtle p-6 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="rounded-[1.5rem] border border-border-subtle bg-[#090b10] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                      Economic event
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      Runtime execution sequence
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Illustrative
                  </span>
                </div>

                <div className="mt-7 space-y-4">
                  {stages.map((stage, index) => {
                    const active = index === activeIndex;
                    const completed = index < activeIndex;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "flex items-center gap-4 rounded-xl border px-4 py-3 transition",
                          active
                            ? "border-brand-secondary/45 bg-brand-secondary/10"
                            : completed
                              ? "border-white/10 bg-white/[0.04]"
                              : "border-white/[0.06] bg-transparent",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-2.5 w-2.5 shrink-0 rounded-full",
                            active
                              ? "bg-brand-secondary"
                              : completed
                                ? "bg-white/45"
                                : "bg-white/15",
                          ].join(" ")}
                        />

                        <span
                          className={[
                            "flex-1 text-sm",
                            active || completed
                              ? "text-white/80"
                              : "text-white/35",
                          ].join(" ")}
                        >
                          {stage.engine}
                        </span>

                        <span
                          className={[
                            "text-xs",
                            active
                              ? "text-brand-secondary"
                              : completed
                                ? "text-white/45"
                                : "text-white/25",
                          ].join(" ")}
                        >
                          {active
                            ? activeStage.state
                            : completed
                              ? "Observed"
                              : "Waiting"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-background-secondary/40 p-5">
                <p className="text-sm font-medium text-foreground">
                  No fabricated live data
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  This interface demonstrates the telemetry model without
                  claiming production traffic, latency, volume, or network
                  health.
                </p>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Observed context
              </p>

              <div className="mt-6 space-y-5">
                {activeStage.observations.map((observation) => (
                  <div key={observation} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {observation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Telemetry principles
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Traceable",
                    "Structured",
                    "Inspectable",
                    "Verifiable",
                  ].map((principle) => (
                    <span
                      key={principle}
                      className="rounded-full border border-border-subtle bg-background-secondary/50 px-3 py-1.5 text-xs text-foreground-secondary"
                    >
                      {principle}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
