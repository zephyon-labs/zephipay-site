import type { AgentExperienceData } from "./types";

export const agentExperienceDemo: AgentExperienceData = {
  workflow: {
    agentName: "Research Agent",
    task: "Acquire verified market data",
    amount: "$24.00",
    providers: [
      {
        name: "MarketStream",
        detail: "$32.00 · 18 ms response",
      },
      {
        name: "Alpha Data",
        detail: "$24.00 · verified source",
        selected: true,
      },
      {
        name: "Quant Labs",
        detail: "$28.00 · 31 ms response",
      },
    ],
    steps: [
      {
        label: "Searching providers",
        detail: "Three compatible data sources discovered.",
        status: "complete",
      },
      {
        label: "Selecting best option",
        detail: "Balanced price, source quality, and response time.",
        status: "complete",
      },
      {
        label: "Authorizing payment",
        detail: "Policy limit confirmed before value moves.",
        status: "complete",
      },
      {
        label: "Settlement complete",
        detail: "$24.00 settled through the selected payment rail.",
        status: "verified",
      },
      {
        label: "Receipt verified",
        detail: "Deterministic settlement record preserved.",
        status: "verified",
      },
      {
        label: "Continuing analysis",
        detail: "Purchased data returned to the active workflow.",
        status: "active",
      },
    ],
  },
  capabilities: [
    {
      eyebrow: "Research",
      title: "Research Agent",
      description:
        "Purchase datasets, reports, and premium information without interrupting the workflow.",
      detail: "Discover · compare · purchase",
    },
    {
      eyebrow: "Development",
      title: "Coding Agent",
      description:
        "Pay for APIs, compute, testing infrastructure, and specialized development tools.",
      detail: "APIs · compute · tooling",
    },
    {
      eyebrow: "Creative",
      title: "Creator Agent",
      description:
        "License assets, compensate collaborators, and coordinate revenue-generating work.",
      detail: "Licensing · payouts · revenue",
    },
    {
      eyebrow: "Finance",
      title: "Accounting Agent",
      description:
        "Pay approved invoices and reconcile verified receipts against business records.",
      detail: "Invoices · receipts · reconciliation",
    },
    {
      eyebrow: "Operations",
      title: "Procurement Agent",
      description:
        "Purchase inventory and services while respecting organizational limits and policies.",
      detail: "Inventory · vendors · policy",
    },
    {
      eyebrow: "Travel",
      title: "Travel Agent",
      description:
        "Coordinate flights, lodging, transportation, and itinerary-related payments.",
      detail: "Flights · lodging · transport",
    },
  ],
};
