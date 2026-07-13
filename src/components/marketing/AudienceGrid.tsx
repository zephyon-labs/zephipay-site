"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";

type AudienceId =
  | "personal"
  | "creators"
  | "business"
  | "intelligent-commerce";

type Audience = {
  id: AudienceId;
  title: string;
  description: string;
  details: string[];
  icon: ReactNode;
};

const audiences: Audience[] = [
  {
    id: "personal",
    title: "Individuals",
    description:
      "Fast peer-to-peer payments with verified receipts and a familiar experience.",
    details: [
      "Send and receive payments",
      "Fund your ZephiPay balance",
      "Track verified payment history",
      "Use names, usernames, email, phone, or wallets",
    ],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6" />
      </svg>
    ),
  },
  {
    id: "creators",
    title: "Creators",
    description:
      "Tips, memberships, subscriptions, and global payouts for modern creators.",
    details: [
      "Receive direct audience support",
      "Offer memberships and subscriptions",
      "Sell digital products and services",
      "Track creator payment activity",
    ],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="m10 9 5 3-5 3V9Z" />
      </svg>
    ),
  },
  {
    id: "business",
    title: "Businesses",
    description:
      "Modern payment acceptance, deterministic receipts, and flexible settlement.",
    details: [
      "Accept customer payments",
      "Generate verified receipts",
      "Review settlement activity",
      "Prepare for invoices, QR payments, and merchant tools",
    ],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 10h16v10H4V10Z" />
        <path d="m3 10 2-6h14l2 6" />
        <path d="M8 14v6M16 14v6" />
      </svg>
    ),
  },
  {
    id: "intelligent-commerce",
    title: "Intelligent Commerce",
    description:
      "Policy-aware payments for software agents and autonomous digital services.",
    details: [
      "Agent-to-agent payments",
      "Machine-readable payment policies",
      "x402-compatible payment experiences",
      "Observable and verifiable settlement",
    ],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect x="5" y="6" width="14" height="12" rx="3" />
        <path d="M9 11h.01M15 11h.01M9 15h6M12 3v3" />
      </svg>
    ),
  },
];

export function AudienceGrid() {
  const [expandedId, setExpandedId] =
    useState<AudienceId | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {audiences.map((audience) => {
        const isExpanded = expandedId === audience.id;
        const detailsId = `${audience.id}-details`;

        return (
          <article
            key={audience.id}
            id={audience.id}
            className={cn(
              "group scroll-mt-32 rounded-3xl",
              "border border-border-subtle",
              "bg-surface-glass p-7",
              "shadow-[var(--shadow-soft)]",
              "backdrop-blur-xl",
              "transition-all duration-300",
              "hover:-translate-y-1",
              "hover:border-border-strong",
              "hover:shadow-[var(--shadow-medium)]",
            )}
          >
            <div
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center",
                "rounded-2xl border border-border-default",
                "bg-surface-secondary text-brand-primary",
                "transition-all duration-300",
                "group-hover:border-border-strong",
                "group-hover:shadow-[0_8px_24px_var(--glow-primary)]",
              )}
            >
              {audience.icon}
            </div>

            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">
              {audience.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-foreground-secondary">
              {audience.description}
            </p>

            <div
              id={detailsId}
              className={cn(
                "grid transition-[grid-template-rows,opacity,margin] duration-300",
                isExpanded
                  ? "mt-5 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="space-y-3 border-t border-border-subtle pt-5">
                  {audience.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm leading-6 text-foreground-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={() =>
                setExpandedId((current) =>
                  current === audience.id
                    ? null
                    : audience.id,
                )
              }
              className={cn(
                "mt-6 inline-flex items-center gap-2",
                "rounded-full text-sm font-medium",
                "text-brand-primary",
                "transition-colors duration-200",
                "hover:text-brand-primary-hover",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
                "focus-visible:ring-offset-4",
                "focus-visible:ring-offset-background",
              )}
            >
              {isExpanded ? "Show less" : "Explore"}
              <span
                aria-hidden="true"
                className={cn(
                  "transition-transform duration-200",
                  isExpanded ? "rotate-90" : "translate-x-0.5",
                )}
              >
                →
              </span>
            </button>
          </article>
        );
      })}
    </div>
  );
}
