"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DocumentationItem = {
  title: string;
  description: string;
  href?: string;
  category: "Start" | "Build" | "Understand" | "Operate";
  status?: "Available" | "Preview";
  tags: string[];
};

const documentationItems: DocumentationItem[] = [
  {
    title: "Getting started",
    description:
      "Understand the Zephyon development model, Runtime lifecycle, and recommended integration path.",
    href: "/developers",
    category: "Start",
    status: "Available",
    tags: ["Overview", "Architecture"],
  },
  {
    title: "Runtime SDK",
    description:
      "Walk through installation, initialization, economic intents, execution, and receipt verification.",
    href: "/developers/runtime-sdk",
    category: "Build",
    status: "Available",
    tags: ["TypeScript", "SDK"],
  },
  {
    title: "Runtime APIs",
    description:
      "Inspect the intended request and response structure for Runtime operations.",
    href: "/developers/api",
    category: "Build",
    status: "Available",
    tags: ["REST", "API"],
  },
  {
    title: "AI agent payments",
    description:
      "Learn how identity, permissions, policy, settlement, and receipts coordinate autonomous activity.",
    href: "/ai-agents/how-it-works",
    category: "Understand",
    status: "Available",
    tags: ["Agents", "Payments"],
  },
  {
    title: "Zephyon Runtime",
    description:
      "Explore the orchestration layer responsible for economic policy and execution.",
    href: "/runtime",
    category: "Understand",
    status: "Available",
    tags: ["Runtime", "Engines"],
  },
  {
    title: "Runtime telemetry",
    description:
      "Inspect how execution stages, decisions, and outcomes can remain visible across the Runtime.",
    href: "/runtime/telemetry",
    category: "Operate",
    status: "Available",
    tags: ["Telemetry", "Observability"],
  },
  {
    title: "Settlement records",
    description:
      "Understand the structure and verification lifecycle of deterministic settlement records.",
    href: "/runtime/settlement-records",
    category: "Operate",
    status: "Available",
    tags: ["Receipts", "Verification"],
  },
  {
    title: "Security architecture",
    description:
      "Review the security principles surrounding identity, policy, permissions, and protected execution.",
    href: "/security",
    category: "Understand",
    status: "Available",
    tags: ["Security", "Policy"],
  },
];

const categories = [
  "All",
  "Start",
  "Build",
  "Understand",
  "Operate",
] as const;

type CategoryFilter = (typeof categories)[number];

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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function DocumentationHub() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return documentationItems.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="border-b border-border-subtle p-6 sm:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Documentation library
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Find the correct path for understanding, building, and operating
              with the Zephyon Runtime.
            </p>
          </div>

          <label className="flex w-full items-center gap-3 rounded-2xl border border-border-subtle bg-background-secondary/45 px-4 py-3 xl:max-w-sm">
            <span className="text-foreground-secondary">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documentation"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-secondary"
            />
          </label>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  active
                    ? "border-brand-secondary/35 bg-brand-secondary/10 text-foreground"
                    : "border-border-subtle text-foreground-secondary hover:bg-background-secondary/60 hover:text-foreground",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-px bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => {
          const content = (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-border-subtle bg-background-secondary/50 px-3 py-1 text-xs text-foreground-secondary">
                  {item.category}
                </span>

                <span
                  className={[
                    "text-xs font-medium",
                    item.status === "Available"
                      ? "text-brand-secondary"
                      : "text-foreground-secondary",
                  ].join(" ")}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-foreground-secondary">
                {item.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-background-secondary/65 px-2.5 py-1 text-xs text-foreground-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                {item.href ? "Open documentation" : "Documentation in progress"}
                {item.href ? <ArrowIcon /> : null}
              </div>
            </>
          );

          if (!item.href) {
            return (
              <article
                key={item.title}
                className="flex min-h-[340px] flex-col bg-background/95 p-7 opacity-75 sm:p-8"
              >
                {content}
              </article>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex min-h-[340px] flex-col bg-background/95 p-7 transition hover:bg-background-secondary/80 sm:p-8"
            >
              {content}
            </Link>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="text-lg font-medium text-foreground">
            No documentation matched that search.
          </p>

          <p className="mt-3 text-sm text-foreground-secondary">
            Try a broader term or select another category.
          </p>
        </div>
      ) : null}
    </div>
  );
}
