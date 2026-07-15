"use client";

import {
  useEffect,
  useState,
} from "react";

import { cn } from "@/utils/cn";

type BuilderType =
  | "consumer"
  | "merchant"
  | "creator"
  | "agent"
  | "marketplace"
  | "embedded";

type CodeLanguage =
  | "typescript"
  | "python"
  | "rust"
  | "curl";

const builderOptions: {
  id: BuilderType;
  label: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  flow: string[];
}[] = [
  {
    id: "consumer",
    label: "Consumer wallet",
    eyebrow: "People",
    description:
      "Build familiar payment experiences while Zephyon coordinates policy, settlement, receipts, and telemetry underneath.",
    capabilities: [
      "Wallet integration",
      "Identity resolution",
      "Send and receive",
      "Verified receipts",
      "Activity history",
      "Settlement abstraction",
    ],
    flow: [
      "User intent",
      "Identity",
      "Policy",
      "Settlement",
      "Verified receipt",
    ],
  },
  {
    id: "merchant",
    label: "Merchant platform",
    eyebrow: "Commerce",
    description:
      "Accept payments, coordinate settlement, preserve records, and expose reliable operational visibility.",
    capabilities: [
      "Payment requests",
      "Invoices",
      "Merchant policy",
      "Settlement reporting",
      "Team permissions",
      "Receipt verification",
    ],
    flow: [
      "Checkout",
      "Compliance",
      "Risk",
      "Merchant policy",
      "Settlement",
      "Reporting",
    ],
  },
  {
    id: "creator",
    label: "Creator economy",
    eyebrow: "Audience",
    description:
      "Support tips, memberships, subscriptions, payouts, and direct audience commerce through one payment layer.",
    capabilities: [
      "Tips",
      "Memberships",
      "Subscriptions",
      "Creator payouts",
      "Audience records",
      "Revenue telemetry",
    ],
    flow: [
      "Audience payment",
      "Creator identity",
      "Policy",
      "Settlement",
      "Creator receipt",
    ],
  },
  {
    id: "agent",
    label: "AI agent",
    eyebrow: "Autonomous",
    description:
      "Give intelligent software controlled access to wallets, x402 settlement, policy, verification, and deterministic receipts.",
    capabilities: [
      "Agent wallets",
      "x402 payments",
      "Spending limits",
      "Runtime policy",
      "Autonomous settlement",
      "Machine-readable receipts",
    ],
    flow: [
      "Resource request",
      "HTTP 402",
      "Agent policy",
      "Settlement",
      "Verification",
      "Continue task",
    ],
  },
  {
    id: "marketplace",
    label: "Autonomous marketplace",
    eyebrow: "Coordination",
    description:
      "Coordinate economic activity between people, applications, services, and agents without losing observability.",
    capabilities: [
      "Participant identity",
      "Marketplace policy",
      "Multi-party settlement",
      "Agent transactions",
      "Receipt trails",
      "Runtime telemetry",
    ],
    flow: [
      "Economic intent",
      "Participant resolution",
      "Marketplace policy",
      "Settlement",
      "Receipt graph",
    ],
  },
  {
    id: "embedded",
    label: "Embedded finance",
    eyebrow: "Infrastructure",
    description:
      "Add coordinated payment capabilities to an existing product without rebuilding every control and settlement layer.",
    capabilities: [
      "Runtime APIs",
      "Payment orchestration",
      "Compliance hooks",
      "Policy controls",
      "Settlement adapters",
      "Telemetry events",
    ],
    flow: [
      "Application",
      "Zephyon API",
      "Runtime engines",
      "Settlement rail",
      "Application receipt",
    ],
  },
];

const codeExamples: Record<
  CodeLanguage,
  {
    label: string;
    code: string;
  }
> = {
  typescript: {
    label: "TypeScript",
    code: `import { ZephyonClient } from "@zephyon/runtime";

const zephyon = new ZephyonClient({
  environment: "devnet",
});

const payment = await zephyon.payments.create({
  amount: "25.00",
  currency: "USDC",
  recipient: "merchant_zephi",
  purpose: "business",
});

console.log(payment.receipt);
console.log(payment.timeline);`,
  },
  python: {
    label: "Python",
    code: `from zephyon import ZephyonClient

zephyon = ZephyonClient(
    environment="devnet"
)

payment = zephyon.payments.create(
    amount="25.00",
    currency="USDC",
    recipient="merchant_zephi",
    purpose="business",
)

print(payment.receipt)
print(payment.timeline)`,
  },
  rust: {
    label: "Rust",
    code: `use zephyon_runtime::{
    PaymentRequest,
    ZephyonClient,
};

let client = ZephyonClient::devnet();

let payment = client
    .create_payment(PaymentRequest {
        amount: "25.00".into(),
        currency: "USDC".into(),
        recipient: "merchant_zephi".into(),
        purpose: "business".into(),
    })
    .await?;

println!("{:?}", payment.receipt);`,
  },
  curl: {
    label: "cURL",
    code: `curl --request POST \\
  --url https://api.zephipay.com/v1/payments \\
  --header "Authorization: Bearer $ZEPHYON_API_KEY" \\
  --header "Content-Type: application/json" \\
  --data '{
    "amount": "25.00",
    "currency": "USDC",
    "recipient": "merchant_zephi",
    "purpose": "business"
  }'`,
  },
};

const thinkingStages = [
  {
    title: "Payment request",
    detail: "Economic intent received.",
  },
  {
    title: "Identity resolved",
    detail: "Participants and account context established.",
  },
  {
    title: "Compliance approved",
    detail: "Required controls completed.",
  },
  {
    title: "Risk acceptable",
    detail: "Runtime signals remain within policy.",
  },
  {
    title: "Policy satisfied",
    detail: "Payment rules permit execution.",
  },
  {
    title: "Settlement selected",
    detail: "The Runtime chooses the appropriate rail.",
  },
  {
    title: "Transaction submitted",
    detail: "Settlement moves to the network adapter.",
  },
  {
    title: "Receipt generated",
    detail: "Execution evidence is preserved.",
  },
  {
    title: "Verified",
    detail: "The economic event reaches completion.",
  },
];

export function BuilderSelector() {
  const [selectedId, setSelectedId] =
    useState<BuilderType>("agent");

  const selected =
    builderOptions.find(
      (option) => option.id === selectedId,
    ) ?? builderOptions[0];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div className="border-b border-border-subtle p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
          Choose what you are building
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {builderOptions.map((option) => {
            const active = option.id === selectedId;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(option.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm",
                  "transition-all duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-primary/45",
                  active
                    ? "zephipay-selected-control"
                    : "zephipay-control-hint border-border-default bg-background/55 text-foreground-secondary hover:border-brand-primary/35 hover:bg-surface-elevated hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-border-subtle p-7 lg:border-b-0 lg:border-r sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            {selected.eyebrow}
          </p>

          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
            {selected.label}
          </h3>

          <p className="mt-5 leading-7 text-foreground-secondary">
            {selected.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {selected.flow.map((stage, index) => (
              <div
                key={stage}
                className="flex items-center gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm text-foreground-secondary">
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Recommended capabilities
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {selected.capabilities.map((capability) => (
              <div
                key={capability}
                className="zephipay-interactive-surface rounded-[1.35rem] border border-border-default bg-background/60 p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-primary/10 text-xs text-brand-secondary">
                  Z
                </div>

                <p className="mt-5 font-medium text-foreground">
                  {capability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CodeExplorer() {
  const [language, setLanguage] =
    useState<CodeLanguage>("typescript");

  const activeExample = codeExamples[language];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-[#05070a] shadow-[var(--shadow-medium)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex flex-wrap gap-1">
          {(
            Object.entries(codeExamples) as [
              CodeLanguage,
              (typeof codeExamples)[CodeLanguage],
            ][]
          ).map(([key, example]) => (
            <button
              key={key}
              type="button"
              aria-pressed={language === key}
              onClick={() => setLanguage(key)}
              className={cn(
                "rounded-full px-3 py-2 text-xs",
                "transition-colors duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
                language === key
                  ? "border border-[#65b8ff]/45 bg-[#65b8ff]/15 text-white shadow-[0_0_20px_rgba(101,184,255,0.12)]"
                  : "border border-transparent text-[#8392a3] hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              {example.label}
            </button>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.16em] text-[#617083]">
          Runtime payment example
        </p>
      </div>

      <pre className="overflow-x-auto p-6 text-sm leading-7 text-[#b9d7eb] sm:p-8">
        <code>{activeExample.code}</code>
      </pre>

      <div className="border-t border-white/10 px-6 py-4 sm:px-8">
        <p className="text-xs leading-6 text-[#718093]">
          Illustrative developer interface. Package names and public
          production endpoints will be finalized before general
          availability.
        </p>
      </div>
    </div>
  );
}

export function PaymentThinkingDemo() {
  const [activeStage, setActiveStage] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStage((current) => {
        const nextStage = current + 1;
        const finalStage = thinkingStages.length - 1;

        if (nextStage >= finalStage) {
          setRunning(false);
          return finalStage;
        }

        return nextStage;
      });
    }, 650);

    return () => window.clearTimeout(timer);
  }, [running]);

  function start() {
    setActiveStage(0);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setActiveStage(-1);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border-subtle p-6 sm:px-8">
        <div>
          <p className="text-sm font-medium text-foreground">
            Runtime execution demonstration
          </p>

          <p className="mt-1 text-sm text-foreground-muted">
            Watch the Runtime coordinate a payment decision.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={start}
            disabled={running}
            className={cn(
              "rounded-full border border-brand-primary/30",
              "bg-brand-primary px-4 py-2 text-sm font-medium text-brand-contrast",
              "transition-all duration-200",
              "hover:-translate-y-0.5",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            {running ? "Thinking…" : "Run payment"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm text-foreground-secondary transition-all hover:border-brand-primary/30 hover:bg-surface-elevated hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-px bg-border-subtle md:grid-cols-3">
        {thinkingStages.map((stage, index) => {
          const completed = index <= activeStage;
          const current = index === activeStage;

          return (
            <article
              key={stage.title}
              className={cn(
                "min-h-44 bg-background p-6",
                "transition-colors duration-300",
                current && "bg-brand-primary/[0.075]",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border",
                  "text-xs font-medium transition-all duration-300",
                  completed
                    ? "border-brand-primary/45 bg-brand-primary text-brand-contrast shadow-[0_6px_20px_var(--glow-primary)]"
                    : "border-border-default bg-surface-secondary text-foreground-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3
                className={cn(
                  "mt-6 font-semibold transition-colors duration-300",
                  completed
                    ? "text-foreground"
                    : "text-foreground-secondary",
                )}
              >
                {stage.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground-muted">
                {stage.detail}
              </p>
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle px-6 py-4 sm:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
          {activeStage < 0
            ? "Awaiting payment"
            : activeStage === thinkingStages.length - 1
              ? "Economic event verified"
              : "Runtime execution in progress"}
        </p>

        <p className="text-xs text-foreground-muted">
          Demonstration only
        </p>
      </div>
    </div>
  );
}
