import type { CreatorStudioRoute } from "./types";

export const creatorStudioRoutes: CreatorStudioRoute[] = [
  {
    label: "Dashboard",
    href: "/creators",
    description: "See the state of your creator business.",
  },
  {
    label: "Monetization",
    href: "/creators/monetization",
    description: "Configure tips, memberships, subscriptions, and products.",
  },
  {
    label: "Community",
    href: "/creators/community",
    description: "Understand the people supporting your work.",
  },
  {
    label: "Analytics",
    href: "/creators/analytics",
    description: "Explore revenue, growth, conversion, and retention.",
  },
  {
    label: "Finances",
    href: "/creators/finances",
    description: "Manage settlements, payouts, fees, and tax records.",
  },
  {
    label: "Storefront",
    href: "/creators/storefront",
    description: "Shape the public experience supporters will see.",
  },
];
