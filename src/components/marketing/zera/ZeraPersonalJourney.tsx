"use client";

import { useEffect, useState } from "react";

type PersonalStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  outcome: string;
  examples: string[];
  requirement: string;
};

const personalStages: PersonalStage[] = [
  {
    id: "use",
    number: "01",
    label: "Use ZephiPay",
    title: "Start with the payment experience itself.",
    description:
      "Send, request, transfer, and manage money through ZephiPay without needing to acquire ZERA first.",
    outcome: "Open access",
    examples: [
      "Send supported assets",
      "Request payments",
      "Manage verified receipts",
    ],
    requirement: "ZERA not required",
  },
  {
    id: "participate",
    number: "02",
    label: "Participate",
    title: "Build meaningful ecosystem activity.",
    description:
      "Verified activity can establish a stronger participation history across supported Zephyon experiences.",
    outcome: "Established participation",
    examples: [
      "Complete verified transactions",
      "Maintain consistent account activity",
      "Use supported ecosystem services",
    ],
    requirement: "Participation based",
  },
  {
    id: "earn",
    number: "03",
    label: "Earn",
    title: "Receive aligned ecosystem benefits.",
    description:
      "Eligible activity can qualify for ZERA rewards or related benefits when defined incentive programs are active.",
    outcome: "Aligned rewards",
    examples: [
      "Participation incentives",
      "Defined ecosystem campaigns",
      "Verified activity rewards",
    ],
    requirement: "Program dependent",
  },
  {
    id: "save",
    number: "04",
    label: "Save",
    title: "Reduce eligible costs.",
    description:
      "Using ZERA can lower qualifying fees or service costs across supported parts of the ecosystem.",
    outcome: "Lower eligible costs",
    examples: [
      "Qualifying payment discounts",
      "Reduced supported service costs",
      "More efficient repeat participation",
    ],
    requirement: "ZERA utility",
  },
  {
    id: "unlock",
    number: "05",
    label: "Unlock",
    title: "Access expanded capabilities.",
    description:
      "Holding, using, or staking ZERA can unlock premium features and additional ecosystem access.",
    outcome: "Expanded access",
    examples: [
      "Premium account capabilities",
      "Advanced intelligent services",
      "Future participation tiers",
    ],
    requirement: "Utility or staking",
  },
  {
    id: "coordinate",
    number: "06",
    label: "Coordinate",
    title: "Use intelligent economic services.",
    description:
      "ZERA can support personal AI assistants and applications operating under defined permissions and spending rules.",
    outcome: "Intelligent utility",
    examples: [
      "Agent service access",
      "Policy-controlled purchasing",
      "Runtime-linked automation",
    ],
    requirement: "Permission controlled",
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

export function ZeraPersonalJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeStage = personalStages[activeIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % personalStages.length);
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
              Personal participation journey
            </p>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Follow how everyday use can expand into rewards, savings, access,
            and intelligent services.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border-subtle bg-background-secondary/50 px-4 py-2 text-sm text-foreground transition hover:bg-background-secondary"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause journey" : "Resume journey"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {personalStages.map((stage, index) => {
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
                      {stage.outcome}
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
                {activeStage.outcome}
              </span>

              <span className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                {activeStage.requirement}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {activeStage.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-foreground-secondary">
              {activeStage.description}
            </p>
          </div>

          <div className="grid xl:grid-cols-[1fr_290px]">
            <div className="min-w-0 border-b border-border-subtle p-6 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="rounded-[1.5rem] border border-border-subtle bg-[#090b10] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                      Personal utility
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      Access before token ownership
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Illustrative
                  </span>
                </div>

                <div className="mt-7 space-y-3">
                  {personalStages.map((stage, index) => {
                    const active = index === activeIndex;
                    const completed = index < activeIndex;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "flex items-center gap-4 rounded-xl border px-4 py-3.5 transition",
                          active
                            ? "border-brand-secondary/45 bg-brand-secondary/10"
                            : completed
                              ? "border-white/10 bg-white/[0.04]"
                              : "border-white/[0.06] bg-transparent",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px]",
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
                            ? stage.outcome
                            : completed
                              ? "Established"
                              : "Available"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-background-secondary/40 p-5">
                <p className="text-sm font-medium text-foreground">
                  Use first. Choose ZERA when it adds value.
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  Personal payments remain accessible without ZERA. Token
                  utility is designed to improve eligible participation rather
                  than create a barrier to entry.
                </p>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Practical examples
              </p>

              <div className="mt-6 space-y-5">
                {activeStage.examples.map((example) => (
                  <div key={example} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {example}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Personal principles
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Optional",
                    "Accessible",
                    "Permissioned",
                    "Utility driven",
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
