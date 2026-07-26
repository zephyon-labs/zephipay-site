"use client";

import { useEffect, useState } from "react";

type UtilityStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  examples: string[];
  outcome: string;
};

const utilityStages: UtilityStage[] = [
  {
    id: "participate",
    number: "01",
    label: "Participate",
    title: "Enter the ecosystem without being forced into a token.",
    description:
      "People, businesses, creators, developers, and AI agents can use ZephiPay without first acquiring ZERA.",
    examples: [
      "Use ZephiPay normally",
      "Complete verified activity",
      "Access supported payment experiences",
    ],
    outcome: "Open participation",
  },
  {
    id: "save",
    number: "02",
    label: "Save",
    title: "Reduce eligible ecosystem costs.",
    description:
      "ZERA can be used to lower qualifying fees and unlock more efficient participation across supported services.",
    examples: [
      "Eligible payment discounts",
      "Lower qualifying service costs",
      "Reduced friction for repeat participation",
    ],
    outcome: "Lower eligible costs",
  },
  {
    id: "earn",
    number: "03",
    label: "Earn",
    title: "Reward meaningful activity.",
    description:
      "Defined ecosystem actions can earn ZERA or ZERA-linked benefits when incentive programs are active.",
    examples: [
      "Verified participation",
      "Creator and ecosystem activity",
      "Contributor incentives",
    ],
    outcome: "Aligned rewards",
  },
  {
    id: "unlock",
    number: "04",
    label: "Unlock",
    title: "Access advanced capabilities.",
    description:
      "Holding or staking ZERA can unlock premium access, expanded capabilities, and future protocol services.",
    examples: [
      "Premium account capabilities",
      "Advanced developer access",
      "Agent and service permissions",
    ],
    outcome: "Expanded access",
  },
  {
    id: "support",
    number: "05",
    label: "Support",
    title: "Strengthen creators and the ecosystem.",
    description:
      "ZERA can support creator participation, ecosystem programs, and services that add value to the network.",
    examples: [
      "Creator support",
      "Ecosystem incentives",
      "Builder participation",
    ],
    outcome: "Ecosystem growth",
  },
  {
    id: "coordinate",
    number: "06",
    label: "Coordinate",
    title: "Power intelligent economic activity.",
    description:
      "ZERA can serve as a utility layer for software agents and applications operating through Zephyon.",
    examples: [
      "Agent service access",
      "Machine-to-machine utility",
      "Runtime-linked economic coordination",
    ],
    outcome: "Intelligent utility",
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

export function ZeraUtilityWorkspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeStage = utilityStages[activeIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % utilityStages.length);
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
              ZERA utility loop
            </p>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Explore how ZERA can turn participation into savings, access,
            rewards, and intelligent economic utility.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border-subtle bg-background-secondary/50 px-4 py-2 text-sm text-foreground transition hover:bg-background-secondary"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause utility loop" : "Resume utility loop"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {utilityStages.map((stage, index) => {
              const active = activeIndex === index;
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

                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {stage.label}
                    </span>

                    <span className="mt-1 block text-xs text-foreground-secondary">
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
                Utility {activeStage.number}
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
                      Utility movement
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      Participation through coordination
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Ecosystem model
                  </span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {utilityStages.map((stage, index) => {
                    const active = activeIndex === index;
                    const completed = index < activeIndex;

                    return (
                      <div
                        key={stage.id}
                        className={[
                          "flex items-center gap-4 rounded-xl border px-4 py-4 transition",
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

                        <span className="min-w-0">
                          <span
                            className={[
                              "block text-sm font-medium",
                              active || completed
                                ? "text-white/85"
                                : "text-white/35",
                            ].join(" ")}
                          >
                            {stage.label}
                          </span>

                          <span
                            className={[
                              "mt-1 block truncate text-xs",
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
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-background-secondary/40 p-5">
                <p className="text-sm font-medium text-foreground">
                  Optional by design
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  ZephiPay remains useful without ZERA. The token is designed
                  to make eligible participation more rewarding, capable, and
                  connected—not to block basic access.
                </p>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Examples
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
                  Utility principles
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Optional",
                    "Functional",
                    "Measurable",
                    "Ecosystem aligned",
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
