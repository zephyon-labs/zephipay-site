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
      "Send, receive, request, and manage money through one calm experience.",
    groups: [
      {
        heading: "Move money",
        links: [
          {
            label: "Send",
            href: "/personal/send",
            description: "Pay people securely.",
          },
          {
            label: "Receive",
            href: "/personal/receive",
            description: "Accept payments with ease.",
          },
          {
            label: "Request",
            href: "/personal/request",
            description: "Create a clear payment request.",
          },
        ],
      },
      {
        heading: "Manage",
        links: [
          {
            label: "Wallet",
            href: "/personal/wallet",
            description: "See balances and payment methods.",
          },
          {
            label: "Activity",
            href: "/personal/activity",
            description: "Review your payment history.",
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
            label: "Settings",
            href: "/personal/settings",
            description: "Manage your account preferences.",
          },
          {
            label: "Security",
            href: "/security",
            description: "Protect your identity and payments.",
          },
        ],
      },
    ],
  },
  {
    label: "Creators",
    href: "/creators",
    eyebrow: "Creators",
    tagline: "Build around the work people value.",
    supportingText:
      "Accept support, manage earnings, and grow direct relationships with your audience.",
    groups: [
      {
        heading: "Earn",
        links: [
          {
            label: "Tips",
            href: "/creators/tips",
            description: "Accept direct audience support.",
          },
          {
            label: "Memberships",
            href: "/creators/memberships",
            description: "Build recurring communities.",
          },
          {
            label: "Subscriptions",
            href: "/creators/subscriptions",
            description: "Create dependable recurring revenue.",
          },
        ],
      },
      {
        heading: "Move money",
        links: [
          {
            label: "Send",
            href: "/creators/send",
            description: "Pay collaborators and partners.",
          },
          {
            label: "Receive",
            href: "/creators/receive",
            description: "Accept payments from anywhere.",
          },
          {
            label: "Withdraw",
            href: "/creators/withdraw",
            description: "Move earnings when you need them.",
          },
        ],
      },
      {
        heading: "Creator tools",
        links: [
          {
            label: "Analytics",
            href: "/creators/analytics",
            description: "Understand your payment activity.",
          },
          {
            label: "Audience",
            href: "/creators/audience",
            description: "See who supports your work.",
          },
          {
            label: "Payout history",
            href: "/creators/payouts",
            description: "Track every completed payout.",
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
        heading: "Accept payments",
        links: [
          {
            label: "Point of sale",
            href: "/business/pos",
            description: "Accept payments in person.",
          },
          {
            label: "Payment links",
            href: "/business/payment-links",
            description: "Get paid through a simple link.",
          },
          {
            label: "Invoices",
            href: "/business/invoices",
            description: "Send and track professional invoices.",
          },
        ],
      },
      {
        heading: "Move money",
        links: [
          {
            label: "Send",
            href: "/business/send",
            description: "Pay vendors, teams, and partners.",
          },
          {
            label: "Receive",
            href: "/business/receive",
            description: "Accept customer and partner payments.",
          },
          {
            label: "Request",
            href: "/business/request",
            description: "Request payment with clear terms.",
          },
        ],
      },
      {
        heading: "Operations",
        links: [
          {
            label: "Settlement",
            href: "/business/settlement",
            description: "Follow funds through settlement.",
          },
          {
            label: "Reporting",
            href: "/business/reporting",
            description: "Review business payment performance.",
          },
          {
            label: "Team access",
            href: "/business/team",
            description: "Manage roles and permissions.",
          },
        ],
      },
    ],
  },
  {
    label: "Intelligent Commerce",
    href: "/intelligent-commerce",
    eyebrow: "Intelligent commerce",
    tagline: "Economic infrastructure for software.",
    supportingText:
      "Give intelligent systems the ability to transact, verify, and coordinate value.",
    groups: [
      {
        heading: "Autonomous payments",
        links: [
          {
            label: "Agent wallets",
            href: "/intelligent-commerce/agent-wallets",
            description: "Purpose-built wallets for software agents.",
          },
          {
            label: "AI-to-AI payments",
            href: "/intelligent-commerce/ai-payments",
            description: "Enable autonomous economic exchange.",
          },
          {
            label: "x402 payments",
            href: "/intelligent-commerce/x402",
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
            href: "/telemetry",
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
            label: "Identity",
            href: "/security/identity",
            description: "Protect people and account access.",
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
            href: "/telemetry",
            description: "Observe system activity and health.",
          },
        ],
      },
      {
        heading: "Resources",
        links: [
          {
            label: "Security center",
            href: "/security",
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
