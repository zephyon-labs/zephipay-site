"use client";

import { useState } from "react";

type Endpoint = {
  id: string;
  method: "GET" | "POST";
  path: string;
  title: string;
  description: string;
  request: string;
  response: string;
  details: string[];
};

const endpoints: Endpoint[] = [
  {
    id: "create-intent",
    method: "POST",
    path: "/v1/intents",
    title: "Create an economic intent",
    description:
      "Describe the actor, recipient, asset, amount, purpose, and requested economic action.",
    request: `{
  "type": "agent-payment",
  "actor": {
    "type": "ai-agent",
    "id": "configured-agent"
  },
  "recipient": {
    "id": "approved-recipient"
  },
  "amount": {
    "asset": "USDC",
    "value": "<amount>"
  },
  "purpose": "Approved digital resource"
}`,
    response: `{
  "status": "created",
  "intentId": "<runtime-generated-id>",
  "requiresApproval": true
}`,
    details: [
      "Creates the economic context",
      "Does not move value by itself",
      "Can trigger policy or human approval",
    ],
  },
  {
    id: "execute-payment",
    method: "POST",
    path: "/v1/payments/execute",
    title: "Execute an approved payment",
    description:
      "Submit an intent for Runtime evaluation, orchestration, and settlement.",
    request: `{
  "intentId": "<intent-id>",
  "approvalMode": "policy-controlled"
}`,
    response: `{
  "status": "confirmed",
  "decision": "approved",
  "receiptId": "<receipt-id>"
}`,
    details: [
      "Runs Runtime controls",
      "Returns a structured decision",
      "Produces a receipt after confirmation",
    ],
  },
  {
    id: "verify-receipt",
    method: "POST",
    path: "/v1/receipts/verify",
    title: "Verify a receipt",
    description:
      "Inspect whether a settlement record is valid and connected to a confirmed execution result.",
    request: `{
  "receiptId": "<receipt-id>"
}`,
    response: `{
  "valid": true,
  "status": "confirmed",
  "network": "<settlement-network>",
  "settledAt": "<timestamp>"
}`,
    details: [
      "Machine-readable verification",
      "Connects execution to settlement",
      "Supports independent inspection",
    ],
  },
  {
    id: "get-receipt",
    method: "GET",
    path: "/v1/receipts/:receiptId",
    title: "Retrieve a settlement record",
    description:
      "Fetch the current representation of a Runtime receipt by its identifier.",
    request: `GET /v1/receipts/<receipt-id>

Authorization: Bearer <api-key>`,
    response: `{
  "receiptId": "<receipt-id>",
  "status": "confirmed",
  "intent": {
    "type": "agent-payment"
  },
  "verification": {
    "valid": true
  }
}`,
    details: [
      "Useful for records and support",
      "Designed for people and machines",
      "Exposes verification state",
    ],
  },
  {
    id: "runtime-status",
    method: "GET",
    path: "/v1/runtime/status",
    title: "Inspect Runtime availability",
    description:
      "Retrieve a structured view of the Runtime environment and available services.",
    request: `GET /v1/runtime/status

Authorization: Bearer <api-key>`,
    response: `{
  "status": "available",
  "environment": "development",
  "services": [
    "identity",
    "policy",
    "settlement",
    "receipts"
  ]
}`,
    details: [
      "Environment-aware status",
      "Supports operational checks",
      "Avoids exposing sensitive internals",
    ],
  },
];

function MethodBadge({ method }: { method: Endpoint["method"] }) {
  return (
    <span className="inline-flex min-w-12 justify-center rounded-lg border border-border-subtle bg-background-secondary/70 px-2 py-1 text-[11px] font-semibold tracking-wide text-foreground">
      {method}
    </span>
  );
}

export function RuntimeApiExplorer() {
  const [activeId, setActiveId] = useState(endpoints[0].id);
  const [view, setView] = useState<"request" | "response">("request");

  const endpoint =
    endpoints.find((item) => item.id === activeId) ?? endpoints[0];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-background/55 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="grid min-h-[700px] lg:grid-cols-[340px_1fr]">
        <aside className="border-b border-border-subtle lg:border-b-0 lg:border-r">
          <div className="border-b border-border-subtle p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Runtime endpoints
            </p>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              Select an operation to inspect its intended request and response
              structure.
            </p>
          </div>

          <div className="space-y-1 p-3">
            {endpoints.map((item) => {
              const active = item.id === endpoint.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveId(item.id);
                    setView("request");
                  }}
                  className={[
                    "flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition",
                    active
                      ? "border-brand-secondary/30 bg-brand-secondary/10"
                      : "border-transparent hover:border-border-subtle hover:bg-background-secondary/60",
                  ].join(" ")}
                >
                  <MethodBadge method={item.method} />

                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs text-foreground">
                      {item.path}
                    </span>

                    <span className="mt-2 block text-xs leading-5 text-foreground-secondary">
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-border-subtle px-6 py-7 sm:px-9">
            <div className="flex flex-wrap items-center gap-3">
              <MethodBadge method={endpoint.method} />

              <code className="text-sm text-foreground-secondary">
                {endpoint.path}
              </code>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {endpoint.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-foreground-secondary">
              {endpoint.description}
            </p>
          </div>

          <div className="grid xl:grid-cols-[1fr_260px]">
            <div className="min-w-0 border-b border-border-subtle p-5 sm:p-8 xl:border-b-0 xl:border-r">
              <div className="mb-4 inline-flex rounded-xl border border-border-subtle bg-background-secondary/45 p-1">
                {(["request", "response"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setView(item)}
                    className={[
                      "rounded-lg px-4 py-2 text-sm capitalize transition",
                      view === item
                        ? "bg-background text-foreground shadow-sm"
                        : "text-foreground-secondary hover:text-foreground",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-border-subtle bg-[#090b10]">
                <div className="border-b border-white/10 px-4 py-3">
                  <span className="font-mono text-xs text-white/45">
                    {view === "request" ? "request" : "response"}.json
                  </span>
                </div>

                <pre className="min-h-[390px] overflow-x-auto p-5 text-sm leading-7 text-white/80 sm:p-7">
                  <code>
                    {view === "request"
                      ? endpoint.request
                      : endpoint.response}
                  </code>
                </pre>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-background-secondary/40 p-5">
                <p className="text-sm font-medium text-foreground">
                  Interface preview
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  Endpoint paths and payloads shown here represent the intended
                  public API design. They are not a production API guarantee.
                </p>
              </div>
            </div>

            <aside className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                Behavior
              </p>

              <div className="mt-6 space-y-5">
                {endpoint.details.map((detail) => (
                  <div key={detail} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                    <p className="text-sm leading-6 text-foreground-secondary">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-secondary">
                  Authentication
                </p>

                <code className="mt-4 block break-all rounded-xl border border-border-subtle bg-background-secondary/50 p-3 text-xs leading-5 text-foreground-secondary">
                  Authorization: Bearer &lt;api-key&gt;
                </code>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
