"use client";

import { useState } from "react";

type Allocation = {
  id: string;
  label: string;
  percentage: number;
  amount: string;
  purpose: string;
  uses: string[];
};

const allocations: Allocation[] = [
  {
    id: "treasury",
    label: "Treasury",
    percentage: 30,
    amount: "60,000,000 ZERA",
    purpose:
      "Support protocol operations, long-term development, infrastructure, and ecosystem stability.",
    uses: [
      "Protocol operations",
      "Infrastructure and security",
      "Long-term strategic development",
    ],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    percentage: 20,
    amount: "40,000,000 ZERA",
    purpose:
      "Expand participation through builders, integrations, creators, users, and aligned ecosystem programs.",
    uses: [
      "Ecosystem incentives",
      "Builder and integration programs",
      "Participation initiatives",
    ],
  },
  {
    id: "utility",
    label: "Utility",
    percentage: 15,
    amount: "30,000,000 ZERA",
    purpose:
      "Support rewards, access, fee-related utility, staking programs, and intelligent economic services.",
    uses: [
      "Utility rewards",
      "Access and staking programs",
      "Eligible participation benefits",
    ],
  },
  {
    id: "liquidity",
    label: "Liquidity",
    percentage: 15,
    amount: "30,000,000 ZERA",
    purpose:
      "Support healthy market access and the liquidity infrastructure required for ecosystem participation.",
    uses: [
      "Liquidity provisioning",
      "Market access",
      "Exchange and ecosystem support",
    ],
  },
  {
    id: "team",
    label: "Team",
    percentage: 15,
    amount: "30,000,000 ZERA",
    purpose:
      "Align long-term contributors responsible for building, operating, and advancing the protocol.",
    uses: [
      "Core team allocation",
      "Long-term contributor alignment",
      "Vested protocol development",
    ],
  },
  {
    id: "reserve",
    label: "Reserve",
    percentage: 5,
    amount: "10,000,000 ZERA",
    purpose:
      "Preserve strategic flexibility for future protocol needs, resilience, and carefully governed expansion.",
    uses: [
      "Strategic reserve",
      "Protocol resilience",
      "Future governed requirements",
    ],
  },
];

function AllocationBar({
  allocation,
  active,
  onSelect,
}: {
  allocation: Allocation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full rounded-2xl border p-4 text-left transition",
        active
          ? "border-brand-secondary/35 bg-brand-secondary/10"
          : "border-border-subtle bg-background-secondary/30 hover:bg-background-secondary/60",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">
          {allocation.label}
        </span>

        <span
          className={[
            "text-sm font-semibold",
            active ? "text-brand-secondary" : "text-foreground-secondary",
          ].join(" ")}
        >
          {allocation.percentage}%
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background-secondary">
        <div
          className={[
            "h-full rounded-full transition-all duration-500",
            active ? "bg-brand-secondary" : "bg-foreground-secondary/30",
          ].join(" ")}
          style={{ width: `${allocation.percentage * 3.15}%` }}
        />
      </div>
    </button>
  );
}

export function ZeraTokenomicsExplorer() {
  const [activeId, setActiveId] = useState(allocations[0].id);

  const activeAllocation =
    allocations.find((allocation) => allocation.id === activeId) ??
    allocations[0];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="border-b border-border-subtle p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Fixed supply
            </p>

            <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              200,000,000 ZERA
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-secondary">
              The ZERA supply is capped. No future minting is planned beyond
              the fixed maximum supply.
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-background-secondary/40 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
              Maximum supply
            </p>

            <p className="mt-2 text-lg font-semibold text-foreground">
              200 million
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
        <aside className="border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-3">
            {allocations.map((allocation) => (
              <AllocationBar
                key={allocation.id}
                allocation={allocation}
                active={allocation.id === activeAllocation.id}
                onSelect={() => setActiveId(allocation.id)}
              />
            ))}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-border-subtle px-6 py-8 sm:px-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-brand-secondary/25 bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
                {activeAllocation.percentage}% allocation
              </span>

              <span className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                {activeAllocation.amount}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {activeAllocation.label}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-foreground-secondary">
              {activeAllocation.purpose}
            </p>
          </div>

          <div className="grid xl:grid-cols-[1fr_280px]">
            <div className="min-w-0 border-b border-border-subtle p-6 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="rounded-[1.5rem] border border-border-subtle bg-[#090b10] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                      Supply allocation
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      200,000,000 ZERA
                    </p>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    Fixed cap
                  </span>
                </div>

                <div className="mt-7 space-y-4">
                  {allocations.map((allocation) => {
                    const active = allocation.id === activeAllocation.id;

                    return (
                      <button
                        key={allocation.id}
                        type="button"
                        onClick={() => setActiveId(allocation.id)}
                        className="grid w-full grid-cols-[100px_1fr_44px] items-center gap-4 text-left"
                      >
                        <span
                          className={[
                            "truncate text-xs",
                            active ? "text-white/90" : "text-white/45",
                          ].join(" ")}
                        >
                          {allocation.label}
                        </span>

                        <span className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                          <span
                            className={[
                              "block h-full rounded-full transition-all duration-500",
                              active
                                ? "bg-brand-secondary"
                                : "bg-white/20",
                            ].join(" ")}
                            style={{
                              width: `${allocation.percentage * 3.15}%`,
                            }}
                          />
                        </span>

                        <span
                          className={[
                            "text-right text-xs font-medium",
                            active
                              ? "text-brand-secondary"
                              : "text-white/40",
                          ].join(" ")}
                        >
                          {allocation.percentage}%
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/45">Allocated supply</span>
                    <span className="font-medium text-white/75">100%</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border-subtle bg-background-secondary/40 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground-secondary">
                    Supply
                  </p>

                  <p className="mt-3 text-sm font-medium text-foreground">
                    Fixed
                  </p>
                </div>

                <div className="rounded-2xl border border-border-subtle bg-background-secondary/40 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground-secondary">
                    Future minting
                  </p>

                  <p className="mt-3 text-sm font-medium text-foreground">
                    None planned
                  </p>
                </div>

                <div className="rounded-2xl border border-border-subtle bg-background-secondary/40 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-foreground-secondary">
                    Allocation
                  </p>

                  <p className="mt-3 text-sm font-medium text-foreground">
                    100% defined
                  </p>
                </div>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Intended uses
              </p>

              <div className="mt-6 space-y-5">
                {activeAllocation.uses.map((use) => (
                  <div key={use} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {use}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Economic principles
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Fixed supply",
                    "Long-term alignment",
                    "Utility driven",
                    "Transparent allocation",
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
