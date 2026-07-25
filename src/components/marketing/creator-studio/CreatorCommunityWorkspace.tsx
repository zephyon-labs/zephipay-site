"use client";

import { useMemo, useState } from "react";

type CommunityView =
  | "all"
  | "supporters"
  | "members"
  | "customers"
  | "returning";

type RelationshipFilter = {
  id: CommunityView;
  label: string;
  description: string;
};

const filters: RelationshipFilter[] = [
  {
    id: "all",
    label: "All relationships",
    description: "Every verified creator relationship.",
  },
  {
    id: "supporters",
    label: "Supporters",
    description: "People who have tipped or directly supported your work.",
  },
  {
    id: "members",
    label: "Members",
    description: "Active recurring community relationships.",
  },
  {
    id: "customers",
    label: "Customers",
    description: "People who have purchased products or services.",
  },
  {
    id: "returning",
    label: "Returning",
    description: "People who have supported or purchased more than once.",
  },
];

const segments = [
  {
    title: "New supporters",
    value: "—",
    detail: "First verified creator interaction.",
  },
  {
    title: "Active members",
    value: "—",
    detail: "Currently active recurring relationships.",
  },
  {
    title: "Repeat customers",
    value: "—",
    detail: "People with more than one purchase.",
  },
  {
    title: "Needs attention",
    value: "—",
    detail: "Relationships requiring follow-up or review.",
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3.7 2.6-5.6 5.5-5.6s4.8 1.9 5.5 5.6" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M15.5 14.5c2.8-.3 4.6 1.2 5 4.5" />
    </svg>
  );
}

export function CreatorCommunityWorkspace() {
  const [activeView, setActiveView] =
    useState<CommunityView>("all");
  const [query, setQuery] = useState("");

  const activeFilter = useMemo(
    () =>
      filters.find((filter) => filter.id === activeView) ??
      filters[0],
    [activeView],
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Relationship workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Understand the people behind your creator business
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Supporters, members, and customers remain connected to
              verified activity rather than being reduced to follower
              counts.
            </p>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-foreground-muted">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search relationships"
              aria-label="Search creator relationships"
              className="w-full rounded-full border border-border-default bg-background/70 py-3 pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
            />
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Community relationship filters"
        >
          {filters.map((filter) => {
            const isActive = activeView === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(filter.id)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid xl:grid-cols-[1.4fr_0.6fr]">
        <div className="border-b border-border-subtle p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {segments.map((segment) => (
              <article
                key={segment.title}
                className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4"
              >
                <p className="text-xs font-medium text-foreground-muted">
                  {segment.title}
                </p>

                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  {segment.value}
                </p>

                <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                  {segment.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="border-b border-border-subtle px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activeFilter.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-foreground-muted">
                    {activeFilter.description}
                  </p>
                </div>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  No verified records
                </span>
              </div>
            </div>

            <div className="flex min-h-[24rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <PeopleIcon />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {query.trim()
                  ? "No matching relationships"
                  : "No creator relationships yet"}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                {query.trim()
                  ? `No verified relationship records match “${query.trim()}”.`
                  : "Supporters, members, customers, and relationship history will appear after verified creator activity begins."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Verified activity
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Consent-aware
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Relationship history
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              Relationship details
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              Select a relationship
            </h3>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              A selected supporter, member, or customer will reveal
              verified history, tags, notes, permissions, and relevant
              economic context.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              ["Relationship type", "Not selected"],
              ["First activity", "—"],
              ["Last activity", "—"],
              ["Lifetime value", "—"],
              ["Communication permission", "Unknown"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-border-default bg-surface-glass p-4"
              >
                <p className="text-xs text-foreground-muted">
                  {label}
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Private notes
              </span>

              <textarea
                disabled
                rows={4}
                placeholder="Select a relationship before adding notes."
                className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground-muted outline-none disabled:cursor-not-allowed disabled:opacity-70"
              />
            </label>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-foreground">
              Relationship tags
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Member", "Customer", "Returning", "VIP"].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    disabled
                    className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted opacity-65"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            type="button"
            disabled
            className="mt-7 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
          >
            Sign in to manage community
          </button>
        </aside>
      </div>
    </section>
  );
}
