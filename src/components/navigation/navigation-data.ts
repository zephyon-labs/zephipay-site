export type NavigationLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavigationGroup = {
  heading: string;
  links: NavigationLink[];
};

export type NavigationSection = {
  label: string;
  href: string;
  eyebrow: string;
  tagline: string;
  supportingText: string;
  groups: NavigationGroup[];
};

export const navigationSections: NavigationSection[] = [
  {
    label: "Personal",
    href: "/personal",
    eyebrow: "Personal",
    tagline: "Modern payments made simple.",
    supportingText:
      "Send, request, transfer, and manage money through one calm experience.",
    groups: [
      {
        heading: "Move money",
        links: [
          {
            label: "Move money",
            href: "/personal#personal-workspace",
            description:
              "Send, request, or transfer through one experience.",
          },
        ],
      },
      {
        heading: "Manage",
        links: [
          {
            label: "Activity",
            href: "/personal/activity",
            description: "Review your real payment history.",
          },
          {
            label: "Verified receipts",
            href: "/personal/receipts",
            description: "Access trusted payment records.",
          },
        ],
      },
      {
        heading: "Account",
        links: [
          {
            label: "Wallet",
            href: "/personal/wallet",
            description:
              "Connect balances, assets, and payment methods.",
          },
          {
            label: "Identity",
            href: "/personal/identity",
            description:
              "Manage verification, trust, points, and security.",
          },
          {
            label: "Settings",
            href: "/personal/settings",
            description:
              "Customize preferences, notifications, and accessibility.",
          },

        ],
      },
    ],
  },
  {
    label: "Creators",
    href: "/creators",
    eyebrow: "Creators",
    tagline: "Run your creator business with confidence.",
    supportingText:
      "Manage supporters, memberships, products, payouts, analytics, and your public storefront through one connected creator workspace.",
    groups: [
      {
        heading: "Creator Studio",
        links: [
          {
            label: "Dashboard",
            href: "/creators",
            description: "Your creator command center.",
          },
          {
            label: "Monetization",
            href: "/creators/monetization",
            description:
              "Tips, memberships, subscriptions, and products.",
          },
        ],
      },
      {
        heading: "Growth",
        links: [
          {
            label: "Community",
            href: "/creators/community",
            description:
              "Understand the people supporting your work.",
          },
          {
            label: "Analytics",
            href: "/creators/analytics",
            description:
              "Revenue, growth, and performance insights.",
          },
        ],
      },
      {
        heading: "Business",
        links: [
          {
            label: "Finances",
            href: "/creators/finances",
            description:
              "Balances, payouts, fees, and tax-ready records.",
          },
          {
            label: "Storefront",
            href: "/creators/storefront",
            description:
              "Preview the public experience for supporters.",
          },
        ],
      },
    ],
  },
  {
    label: "Business",
    href: "/business",
    eyebrow: "Business",
    tagline: "Built for modern commerce.",
    supportingText:
      "Accept payments, manage operations, and move value without unnecessary complexity.",
    groups: [
      {
        heading: "Business workspace",
        links: [
          {
            label: "Dashboard",
            href: "/business",
            description:
              "See revenue, payments, settlement, and operational priorities.",
          },
          {
            label: "Payments",
            href: "/business/payments",
            description:
              "Accept, send, request, refund, and track payments.",
          },
          {
            label: "Customers",
            href: "/business/customers",
            description:
              "Manage customer relationships and payment history.",
          },
        ],
      },
      {
        heading: "Sell",
        links: [
          {
            label: "Invoices",
            href: "/business/invoices",
            description:
              "Create, send, track, and reconcile invoices.",
          },
          {
            label: "Checkout",
            href: "/business/checkout",
            description:
              "Configure links, QR, hosted, and embedded checkout.",
          },
        ],
      },
      {
        heading: "Operate",
        links: [
          {
            label: "Analytics",
            href: "/business/analytics",
            description:
              "Understand revenue, conversion, and customer behavior.",
          },
          {
            label: "Finances",
            href: "/business/finances",
            description:
              "Review settlement, balances, fees, and financial records.",
          },
        ],
      },
    ],
  },
  {
    label: "AI Agents",
    href: "/ai-agents",
    eyebrow: "AI Agents",
    tagline: "Economic infrastructure for software.",
    supportingText:
      "Give intelligent systems the ability to transact, verify, and coordinate value.",
    groups: [
      {
        heading: "Autonomous payments",
        links: [
          {
            label: "Agent wallets",
            href: "/ai-agents",
            description: "Purpose-built wallets for software agents.",
          },
          {
            label: "AI-to-AI payments",
            href: "/ai-agents",
            description: "Enable autonomous economic exchange.",
          },
          {
            label: "x402 payments",
            href: "/ai-agents",
            description: "Pay for digital resources through HTTP.",
            badge: "Live",
          },
        ],
      },
      {
        heading: "Develop",
        links: [
          {
            label: "Runtime SDK",
            href: "/developers/runtime-sdk",
            description: "Integrate Zephyon payment orchestration.",
          },
          {
            label: "APIs",
            href: "/developers/api",
            description: "Build payment capabilities into software.",
          },
          {
            label: "Documentation",
            href: "/developers/docs",
            description: "Explore implementation guidance.",
          },
        ],
      },
      {
        heading: "Observe",
        links: [
          {
            label: "Zephyon Runtime",
            href: "/runtime",
            description: "Discover the infrastructure underneath.",
          },
          {
            label: "Runtime telemetry",
            href: "/security/runtime-telemetry",
            description: "Observe verified runtime activity.",
          },
          {
            label: "Settlement records",
            href: "/settlement",
            description: "Inspect deterministic payment records.",
          },
        ],
      },
    ],
  },
  {
    label: "ZERA",
    eyebrow: "The ZERA ecosystem",
    tagline: "Utility designed around real participation.",
    supportingText:
      "Explore how ZERA reduces eligible costs, rewards activity, unlocks premium capabilities, and supports AI agents.",
    href: "/zera",
    groups: [
      {
        heading: "Discover",
        links: [
          {
            label: "ZERA overview",
            href: "/zera",
            description:
              "Understand why ZERA exists and how it supports the ecosystem.",
          },
          {
            label: "Utility",
            href: "/zera#utility",
            description:
              "Explore saving, rewards, staking, creator tools, and AI utility.",
          },
          {
            label: "Tokenomics",
            href: "/zera#tokenomics",
            description:
              "Review the fixed supply and ecosystem allocation.",
          },
        ],
      },
      {
        heading: "Participation",
        links: [
          {
            label: "Personal",
            href: "/personal",
            description:
              "Benefits designed for everyday participation.",
          },
          {
            label: "Creators",
            href: "/creators",
            description:
              "Creator rewards, premium access, and financial organization.",
          },
          {
            label: "Businesses",
            href: "/business",
            description:
              "Commerce benefits and Subscription-or-Stake access.",
          },
        ],
      },
      {
        heading: "Intelligent economy",
        links: [
          {
            label: "AI Agents",
            href: "/ai-agents",
            description:
              "Explore payments designed for people, software, and AI.",
          },
          {
            label: "Zephyon Runtime",
            href: "/runtime",
            description:
              "See the coordination layer beneath intelligent transactions.",
          },
          {
            label: "Developers",
            href: "/developers",
            description:
              "Build applications and agentic services on Zephyon.",
          },
        ],
      },
    ],
  },
  {
    label: "Security",
    href: "/security",
    eyebrow: "Security",
    tagline: "Security built into every payment.",
    supportingText:
      "Identity, policy, risk, compliance, and verification work quietly beneath the experience.",
    groups: [
      {
        heading: "Trust",
        links: [
          {
            label: "Identity Protection",
            href: "/security/identity-protection",
            description: "Protect accounts, access, devices, and recovery.",
          },
          {
            label: "Compliance",
            href: "/security/compliance",
            description: "Coordinate responsible payment activity.",
          },
          {
            label: "Policy engine",
            href: "/security/policy",
            description: "Apply rules before value moves.",
          },
        ],
      },
      {
        heading: "Transparency",
        links: [
          {
            label: "Verified receipts",
            href: "/security/verified-receipts",
            description: "Preserve trustworthy payment evidence.",
          },
          {
            label: "Runtime telemetry",
            href: "/security/runtime-telemetry",
            description: "Observe Runtime activity, health, and resilience.",
          },
        ],
      },
      {
        heading: "Resources",
        links: [
          {
            label: "Security center",
            href: "/security/security-center",
            description: "Review ZephiPay security practices.",
          },
          {
            label: "Privacy",
            href: "/privacy",
            description: "Understand how information is handled.",
          },
          {
            label: "Terms",
            href: "/terms",
            description: "Review platform terms and conditions.",
          },
        ],
      },
    ],
  },
];
