"use client";

import { useEffect, useState } from "react";

type RecordStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  state: string;
  description: string;
  fields: {
    label: string;
    value: string;
  }[];
};

const stages: RecordStage[] = [
  {
    id: "intent",
    number: "01",
    label: "Intent",
    title: "The economic action is described.",
    state: "Created",
    description:
      "The Runtime receives a structured request defining who is acting, what they intend to do, and why.",
    fields: [
      {
        label: "Actor",
        value: "Resolved participant",
      },
      {
        label: "Action",
        value: "Economic request",
      },
      {
        label: "Purpose",
        value: "Attached to event",
      },
    ],
  },
  {
    id: "authorization",
    number: "02",
    label: "Authorization",
    title: "Permission to proceed is established.",
    state: "Authorized",
    description:
      "Identity, permissions, limits, and approval requirements are evaluated before settlement begins.",
    fields: [
      {
        label: "Identity",
        value: "Resolved",
      },
      {
        label: "Permissions",
        value: "Evaluated",
      },
      {
        label: "Approval",
        value: "Policy controlled",
      },
    ],
  },
  {
    id: "decision",
    number: "03",
    label: "Runtime decision",
    title: "The Runtime records its decision.",
    state: "Approved",
    description:
      "Compliance, risk, policy, and execution context are coordinated into a structured outcome.",
    fields: [
      {
        label: "Compliance",
        value: "Evaluated",
      },
      {
        label: "Risk",
        value: "Assessed",
      },
      {
        label: "Policy",
        value: "Satisfied",
      },
    ],
  },
  {
    id: "settlement",
    number: "04",
    label: "Settlement",
    title: "Value movement is coordinated.",
    state: "Confirmed",
    description:
      "The appropriate settlement rail executes the approved action and returns a confirmation result.",
    fields: [
      {
        label: "Rail",
        value: "Selected by Runtime",
      },
      {
        label: "Execution",
        value: "Confirmed",
      },
      {
        label: "Network",
        value: "Recorded at settlement",
      },
    ],
  },
  {
    id: "verification",
    number: "05",
    label: "Verification",
    title: "The execution result is verified.",
    state: "Verified",
    description:
      "Settlement evidence is attached to the event so applications can inspect what completed.",
    fields: [
      {
        label: "Result",
        value: "Confirmed",
      },
      {
        label: "Evidence",
        value: "Attached",
      },
      {
        label: "Integrity",
        value: "Inspectable",
      },
    ],
  },
  {
    id: "receipt",
    number: "06",
    label: "Settlement record",
    title: "The economic event becomes a receipt.",
    state: "Recorded",
    description:
      "The final record preserves the event lifecycle, Runtime decision, settlement result, and verification state.",
    fields: [
      {
        label: "Receipt",
        value: "Runtime generated",
      },
      {
        label: "Status",
        value: "Confirmed",
      },
      {
        label: "History",
        value: "Preserved",
      },
    ],
  },
];

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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function SettlementRecordWorkspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeStage = stages[activeIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current === stages.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 2800);

    return () => window.clearInterval(interval);
  }, [playing]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="flex flex-col gap-5 border-b border-border-subtle p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-35" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-secondary" />
            </span>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Settlement lifecycle
            </p>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Follow an illustrative economic event as it becomes a deterministic
            settlement record.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border-subtle bg-background-secondary/50 px-4 py-2 text-sm text-foreground transition hover:bg-background-secondary"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause lifecycle" : "Resume lifecycle"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
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
                    {completed ? <CheckIcon /> : stage.number}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {stage.label}
                    </span>

                    <span className="mt-1 block truncate text-xs text-foreground-secondary">
                      {stage.state}
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
                Stage {activeStage.number}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {activeStage.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-foreground-secondary">
              {activeStage.description}
            </p>
          </div>

          <div className="grid xl:grid-cols-[1fr_300px]">
            <div className="min-w-0 border-b border-border-subtle p-6 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="rounded-[1.5rem] border border-border-subtle bg-[#090b10] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                      Settlement record
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      Economic event lifecycle
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Illustrative
                  </span>
                </div>

                <div className="mt-7 space-y-3">
                  {stages.map((stage, index) => {
                    const active = index === activeIndex;
                    const completed = index < activeIndex;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "relative flex items-center gap-4 rounded-xl border px-4 py-3.5 transition",
                          active
                            ? "border-brand-secondary/45 bg-brand-secondary/10"
                            : completed
                              ? "border-white/10 bg-white/[0.04]"
                              : "border-white/[0.06] bg-transparent",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px]",
                            active
                              ? "border-brand-secondary bg-brand-secondary text-white"
                              : completed
                                ? "border-white/20 bg-white/10 text-white/70"
                                : "border-white/10 text-white/25",
                          ].join(" ")}
                        >
                          {completed ? <CheckIcon /> : stage.number}
                        </span>

                        <span
                          className={[
                            "flex-1 text-sm",
                            active || completed
                              ? "text-white/80"
                              : "text-white/35",
                          ].join(" ")}
                        >
                          {stage.label}
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
                            ? stage.state
                            : completed
                              ? "Recorded"
                              : "Waiting"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {activeStage.fields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-2xl border border-border-subtle bg-background-secondary/40 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-foreground-secondary">
                      {field.label}
                    </p>

                    <p className="mt-3 text-sm font-medium text-foreground">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Record structure
              </p>

              <div className="mt-6 space-y-5">
                {[
                  "Economic intent",
                  "Participant context",
                  "Runtime decision",
                  "Settlement result",
                  "Verification state",
                  "Event history",
                ].map((item, index) => {
                  const available = index <= activeIndex;

                  return (
                    <div key={item} className="flex items-center gap-3">
                      <span
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                          available
                            ? "border-brand-secondary/35 bg-brand-secondary/10 text-brand-secondary"
                            : "border-border-subtle text-foreground-secondary",
                        ].join(" ")}
                      >
                        {available ? <CheckIcon /> : null}
                      </span>

                      <p
                        className={[
                          "text-sm",
                          available
                            ? "text-foreground"
                            : "text-foreground-secondary",
                        ].join(" ")}
                      >
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Designed to be
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Deterministic",
                    "Inspectable",
                    "Verifiable",
                    "Portable",
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
