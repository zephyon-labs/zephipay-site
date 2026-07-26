"use client";

import { useEffect, useState } from "react";

type CreatorStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  outcome: string;
  capabilities: string[];
};

const creatorStages: CreatorStage[] = [
  {
    id: "create",
    number: "01",
    label: "Create",
    title: "Build work worth supporting.",
    description:
      "Creators publish, perform, teach, design, develop, or serve their communities through their own creative practice.",
    outcome: "Creative activity",
    capabilities: [
      "Independent creative work",
      "Audience-facing experiences",
      "Creator-owned participation",
    ],
  },
  {
    id: "receive",
    number: "02",
    label: "Receive support",
    title: "Accept direct support from your audience.",
    description:
      "ZephiPay can help creators receive tips, payments, subscriptions, and other supported forms of audience participation.",
    outcome: "Direct support",
    capabilities: [
      "Tips and contributions",
      "Supported subscriptions",
      "Verified payment records",
    ],
  },
  {
    id: "organize",
    number: "03",
    label: "Organize",
    title: "Keep creator income understandable.",
    description:
      "Verified receipts and activity history can help creators organize revenue without relying on fragmented processor records.",
    outcome: "Clear records",
    capabilities: [
      "Verified receipt history",
      "Income organization",
      "Tax-ready record structure",
    ],
  },
  {
    id: "unlock",
    number: "04",
    label: "Unlock tools",
    title: "Access expanded creator capabilities.",
    description:
      "ZERA utility or staking can unlock qualifying creator tools, services, and premium account capabilities.",
    outcome: "Expanded capability",
    capabilities: [
      "Premium creator tools",
      "Advanced audience features",
      "Intelligent service access",
    ],
  },
  {
    id: "reward",
    number: "05",
    label: "Earn rewards",
    title: "Recognize meaningful creator participation.",
    description:
      "Eligible creator activity can qualify for ZERA rewards or ecosystem benefits through defined participation programs.",
    outcome: "Aligned rewards",
    capabilities: [
      "Creator participation programs",
      "Ecosystem incentives",
      "Contributor recognition",
    ],
  },
  {
    id: "grow",
    number: "06",
    label: "Grow",
    title: "Strengthen the creator economy.",
    description:
      "Creators can reinvest access, rewards, tools, and audience support into stronger communities and sustainable businesses.",
    outcome: "Sustainable growth",
    capabilities: [
      "Stronger audience relationships",
      "Expanded creator operations",
      "Long-term ecosystem participation",
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

export function ZeraCreatorLoop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeStage = creatorStages[activeIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % creatorStages.length);
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
              Creator growth loop
            </p>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Follow how direct support, clear records, expanded tools, and
            aligned rewards can strengthen creator participation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border-subtle bg-background-secondary/50 px-4 py-2 text-sm text-foreground transition hover:bg-background-secondary"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause creator loop" : "Resume creator loop"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {creatorStages.map((stage, index) => {
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
                Creator stage {activeStage.number}
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
                      Creator economy
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      Support through sustainable growth
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Ecosystem model
                  </span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {creatorStages.map((stage, index) => {
                    const active = index === activeIndex;
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
                  Creator support should remain direct.
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  ZERA can add utility, rewards, and access around creator
                  participation without replacing ordinary payments or forcing
                  audiences to hold a token.
                </p>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Creator capabilities
              </p>

              <div className="mt-6 space-y-5">
                {activeStage.capabilities.map((capability) => (
                  <div key={capability} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {capability}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Creator principles
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Direct support",
                    "Creator owned",
                    "Optional utility",
                    "Long-term growth",
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
