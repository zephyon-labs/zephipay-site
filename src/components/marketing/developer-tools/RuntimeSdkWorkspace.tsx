"use client";

import { useState } from "react";

type SdkStep = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  code: string;
  notes: string[];
};

const sdkSteps: SdkStep[] = [
  {
    id: "install",
    number: "01",
    label: "Install",
    title: "Add the Runtime client.",
    description:
      "Start with a typed client designed to connect applications and autonomous agents to the Zephyon Runtime.",
    code: `npm install @zephyon/runtime

# Package availability will follow
# the public SDK release.`,
    notes: [
      "Typed TypeScript interface",
      "Server-side integration",
      "Runtime authentication",
    ],
  },
  {
    id: "initialize",
    number: "02",
    label: "Initialize",
    title: "Create a Runtime connection.",
    description:
      "Configure the environment and provide credentials through secure server-side variables.",
    code: `import { ZephyonRuntime } from "@zephyon/runtime";

const runtime = new ZephyonRuntime({
  environment: "development",
  apiKey: process.env.ZEPHYON_API_KEY,
});`,
    notes: [
      "Keep credentials server-side",
      "Separate development and production",
      "Use explicit runtime environments",
    ],
  },
  {
    id: "intent",
    number: "03",
    label: "Create intent",
    title: "Describe the economic action.",
    description:
      "An intent defines who is acting, what they are attempting to do, and the policy context surrounding the request.",
    code: `const intent = await runtime.intents.create({
  type: "agent-payment",
  actor: {
    type: "ai-agent",
    id: agentId,
  },
  recipient: {
    id: recipientId,
  },
  amount: {
    asset: "USDC",
    value: amount,
  },
  purpose: "Purchase an approved digital resource",
});`,
    notes: [
      "Identity remains explicit",
      "Purpose travels with the request",
      "Policy is evaluated before settlement",
    ],
  },
  {
    id: "execute",
    number: "04",
    label: "Execute",
    title: "Submit the intent to the Runtime.",
    description:
      "The Runtime coordinates identity, permissions, compliance, risk, policy, settlement, and verification.",
    code: `const result = await runtime.payments.execute({
  intentId: intent.id,
  approvalMode: "policy-controlled",
});

if (!result.approved) {
  // Handle the Runtime decision.
}`,
    notes: [
      "Execution is policy-controlled",
      "Declined requests remain inspectable",
      "Settlement does not bypass authorization",
    ],
  },
  {
    id: "verify",
    number: "05",
    label: "Verify",
    title: "Verify the settlement record.",
    description:
      "Applications can inspect the resulting receipt instead of relying only on a success message.",
    code: `const receipt = await runtime.receipts.verify({
  receiptId: result.receiptId,
});

console.log({
  status: receipt.status,
  network: receipt.network,
  settledAt: receipt.settledAt,
});`,
    notes: [
      "Machine-readable verification",
      "Deterministic settlement history",
      "Receipts for people and software",
    ],
  },
];

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="8" y="8" width="10" height="10" rx="2" />
      <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function RuntimeSdkWorkspace() {
  const [activeId, setActiveId] = useState(sdkSteps[0].id);
  const [copied, setCopied] = useState(false);

  const activeStep =
    sdkSteps.find((step) => step.id === activeId) ?? sdkSteps[0];

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activeStep.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="grid min-h-[660px] lg:grid-cols-[0.38fr_0.62fr]">
        <aside className="border-b border-border-subtle p-5 lg:border-b-0 lg:border-r lg:p-7">
          <div className="mb-7 px-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Integration path
            </p>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              Move from installation to a verifiable economic event.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {sdkSteps.map((step) => {
              const active = step.id === activeStep.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveId(step.id);
                    setCopied(false);
                  }}
                  className={[
                    "group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition",
                    active
                      ? "border-brand-secondary/30 bg-brand-secondary/10"
                      : "border-transparent hover:border-border-subtle hover:bg-background-secondary/60",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold",
                      active
                        ? "bg-brand-secondary text-white"
                        : "bg-background-secondary text-foreground-secondary",
                    ].join(" ")}
                  >
                    {step.number}
                  </span>

                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {step.label}
                    </span>

                    <span className="mt-1 block text-xs text-foreground-secondary">
                      {step.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-border-subtle px-6 py-7 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              {activeStep.number} · {activeStep.label}
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {activeStep.title}
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-secondary">
              {activeStep.description}
            </p>
          </div>

          <div className="grid flex-1 xl:grid-cols-[1fr_240px]">
            <div className="min-w-0 border-b border-border-subtle p-5 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="overflow-hidden rounded-2xl border border-border-subtle bg-[#090b10]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />

                    <span className="ml-2 text-xs text-white/45">
                      runtime.ts
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <CopyIcon />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <pre className="min-h-[340px] overflow-x-auto p-5 text-sm leading-7 text-white/80 sm:p-7">
                  <code>{activeStep.code}</code>
                </pre>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-background-secondary/40 p-5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-secondary" />
                  </span>

                  <p className="text-sm font-medium text-foreground">
                    Developer preview
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  This workspace demonstrates the intended SDK experience. It
                  does not execute a live payment from the browser.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                What this establishes
              </p>

              <div className="mt-6 space-y-5">
                {activeStep.notes.map((note) => (
                  <div key={note} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                    <p className="text-sm leading-6 text-foreground-secondary">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Runtime stages
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Identity",
                    "Compliance",
                    "Risk",
                    "Policy",
                    "Settlement",
                    "Receipt",
                  ].map((stage) => (
                    <span
                      key={stage}
                      className="rounded-full border border-border-subtle bg-background-secondary/50 px-3 py-1.5 text-xs text-foreground-secondary"
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
