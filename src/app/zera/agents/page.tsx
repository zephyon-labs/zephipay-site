import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";

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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const agentPillars = [
  {
    number: "01",
    title: "Authorize participation",
    description:
      "Define which agents may access supported economic capabilities, accounts, services, budgets, and workflows.",
    outcome: "Controlled access",
  },
  {
    number: "02",
    title: "Apply economic policy",
    description:
      "Evaluate intent against identity, permissions, budgets, limits, risk, compliance, and user-defined rules before value moves.",
    outcome: "Policy-aware action",
  },
  {
    number: "03",
    title: "Execute trusted payments",
    description:
      "Support qualifying agent-initiated payments, subscriptions, purchases, services, and machine-to-machine transactions.",
    outcome: "Verified execution",
  },
  {
    number: "04",
    title: "Coordinate intelligent economies",
    description:
      "Use ZERA across eligible services, access models, incentives, and economic relationships between people, businesses, software, and agents.",
    outcome: "Economic coordination",
  },
];

const agentLifecycle = [
  {
    number: "01",
    label: "Identity",
    title: "Know which agent is acting.",
    description:
      "Associate an agent with a verified owner, organization, service, account, or approved operating identity.",
    features: [
      "Agent identity",
      "Owner association",
      "Service registration",
    ],
  },
  {
    number: "02",
    label: "Permissions",
    title: "Define what the agent may do.",
    description:
      "Grant limited access to approved assets, services, transaction types, destinations, and operating environments.",
    features: [
      "Scoped authority",
      "Approved destinations",
      "Capability limits",
    ],
  },
  {
    number: "03",
    label: "Budget",
    title: "Constrain economic exposure.",
    description:
      "Set transaction, daily, recurring, category, service, or account-level spending limits before execution.",
    features: [
      "Transaction limits",
      "Recurring budgets",
      "Category controls",
    ],
  },
  {
    number: "04",
    label: "Policy",
    title: "Evaluate the intent.",
    description:
      "Apply compliance, risk, business, account, and user-defined rules to determine whether an economic action should proceed.",
    features: [
      "Policy evaluation",
      "Risk controls",
      "Compliance checks",
    ],
  },
  {
    number: "05",
    label: "Execute",
    title: "Move value through an approved rail.",
    description:
      "Route the authorized transaction through a supported payment or settlement method.",
    features: [
      "Rail selection",
      "Payment execution",
      "Service settlement",
    ],
  },
  {
    number: "06",
    label: "Verify",
    title: "Confirm the expected outcome.",
    description:
      "Validate completion, settlement state, transaction references, service response, and required confirmation conditions.",
    features: [
      "Outcome confirmation",
      "Settlement verification",
      "Service validation",
    ],
  },
  {
    number: "07",
    label: "Receipt",
    title: "Produce a trusted record.",
    description:
      "Create a deterministic record connecting intent, policy, execution, settlement, and economic context.",
    features: [
      "Verified receipt",
      "Execution context",
      "Audit trail",
    ],
  },
  {
    number: "08",
    label: "Telemetry",
    title: "Keep the action observable.",
    description:
      "Capture timing, decisions, retries, failures, policy results, settlement events, and operational signals.",
    features: [
      "Runtime events",
      "Operational history",
      "Performance signals",
    ],
  },
];

const agentModels = [
  {
    title: "Person-to-agent",
    description:
      "A person authorizes an agent to help manage approved tasks, purchases, subscriptions, records, or financial workflows.",
    features: [
      "User-defined permissions",
      "Budgeted assistance",
      "Reviewable activity",
    ],
  },
  {
    title: "Business-to-agent",
    description:
      "A business gives an agent limited authority to support invoices, procurement, reporting, treasury, or operations.",
    features: [
      "Business policies",
      "Operational limits",
      "Role-based access",
    ],
  },
  {
    title: "Agent-to-agent",
    description:
      "Two approved agents exchange value, services, data, or access through trusted machine-readable economic flows.",
    features: [
      "Machine payments",
      "Service exchange",
      "Deterministic receipts",
    ],
  },
];

const agentAdvantages = [
  {
    title: "Eligible service access",
    description:
      "Use ZERA to unlock qualifying agent services, premium capabilities, economic tools, and infrastructure access.",
  },
  {
    title: "Machine payments",
    description:
      "Support approved software-to-software payments where agents can pay for data, compute, APIs, services, or fulfillment.",
  },
  {
    title: "Agent subscriptions",
    description:
      "Enable approved recurring access to software, intelligence, data, tools, and economic services.",
  },
  {
    title: "Economic incentives",
    description:
      "Reward qualifying agent, developer, service, or ecosystem participation through defined programs.",
  },
  {
    title: "Runtime coordination",
    description:
      "Connect identity, policy, risk, execution, settlement, receipts, and telemetry through one economic coordination layer.",
  },
  {
    title: "Programmable access",
    description:
      "Use subscription, staking, permissions, credentials, or policy conditions to govern qualifying capabilities.",
  },
];

const permissionControls = [
  "Approved transaction types",
  "Per-transaction limits",
  "Daily and recurring budgets",
  "Approved assets and rails",
  "Destination allowlists",
  "Service-specific permissions",
  "Human approval thresholds",
  "Emergency pause controls",
];

const runtimeLayers = [
  {
    title: "Identity",
    description:
      "Establish who or what is participating and which verified entity stands behind the action.",
  },
  {
    title: "Compliance",
    description:
      "Apply supported regulatory, sanctions, monitoring, and participation requirements where applicable.",
  },
  {
    title: "Risk",
    description:
      "Evaluate signals, context, limits, history, destination, and transaction conditions before execution.",
  },
  {
    title: "Policy",
    description:
      "Apply explicit rules created by users, businesses, platforms, services, and the protocol.",
  },
  {
    title: "Settlement",
    description:
      "Coordinate approved value movement through supported payment and blockchain rails.",
  },
  {
    title: "Telemetry",
    description:
      "Record decisions, timing, retries, outcomes, errors, and system events for observability.",
  },
];

const paymentModels = [
  {
    eyebrow: "x402",
    title: "Pay for machine-readable services.",
    description:
      "Agents can receive a payment requirement, satisfy supported conditions, and continue to an approved service or resource.",
    examples: [
      "Paid API access",
      "Data retrieval",
      "Compute services",
      "Premium content",
    ],
  },
  {
    eyebrow: "Agent subscriptions",
    title: "Maintain approved recurring access.",
    description:
      "Agents can manage qualifying subscriptions for tools, software, intelligence, infrastructure, and ongoing services.",
    examples: [
      "Software access",
      "Intelligence services",
      "Operational tools",
      "Recurring data",
    ],
  },
  {
    eyebrow: "Machine commerce",
    title: "Exchange value between systems.",
    description:
      "Approved agents can buy, sell, request, deliver, and settle machine-readable services under defined policies.",
    examples: [
      "Agent-to-agent services",
      "Automated procurement",
      "Digital fulfillment",
      "Usage-based settlement",
    ],
  },
];

const accessOptions = [
  {
    label: "Subscribe",
    title: "Pay for qualifying intelligent services.",
    description:
      "Access supported agent capabilities through recurring or usage-based payment without requiring ZERA ownership.",
    features: [
      "No token requirement",
      "Predictable service access",
      "Usage-based options",
    ],
  },
  {
    label: "Stake",
    title: "Commit ZERA for eligible agent access.",
    description:
      "Stake ZERA to unlock qualifying infrastructure, advanced capabilities, service tiers, or participation benefits.",
    features: [
      "Purpose-driven staking",
      "Qualifying agent capabilities",
      "Long-term ecosystem alignment",
    ],
  },
];

const coordinationExamples = [
  {
    title: "Autonomous procurement",
    description:
      "An approved business agent compares qualifying suppliers, applies spending policy, purchases a service, and records the result.",
  },
  {
    title: "Usage-based software",
    description:
      "An application pays only for the data, compute, model access, or infrastructure it actually consumes.",
  },
  {
    title: "Creator assistance",
    description:
      "A creator-authorized agent organizes revenue, tracks obligations, manages approved tools, and purchases qualifying services.",
  },
  {
    title: "Treasury operations",
    description:
      "A business agent monitors balances and obligations, proposes approved actions, and executes only within defined controls.",
  },
];

const trustPrinciples = [
  {
    title: "Bounded authority",
    description:
      "Agents should receive only the permissions necessary for their approved responsibilities.",
  },
  {
    title: "Observable decisions",
    description:
      "Economic actions should produce clear policy, execution, settlement, and receipt records.",
  },
  {
    title: "Human control",
    description:
      "People and organizations retain the ability to approve, pause, revoke, limit, or review agent activity.",
  },
  {
    title: "No invisible autonomy",
    description:
      "High-impact financial actions should not disappear inside unreviewable software behavior.",
  },
];

export default function ZeraAgentsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="max-w-5xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              ZERA for AI agents
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Economic infrastructure for intelligent agents.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Give trusted agents access to approved payments, budgets,
              subscriptions, services, automation, and machine-to-machine
              commerce.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA can support qualifying agent access and economic
              participation while the Zephyon Runtime coordinates identity,
              permissions, policy, settlement, receipts, and telemetry.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#agent-lifecycle"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore agent economics
              </Button>

              <Button href="/ai-agents" variant="outline" size="lg">
                View AI agent platform
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Controlled intelligence
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Agents should act with authority—not unlimited freedom.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Useful agent commerce begins with clearly defined identity,
                permissions, budgets, policies, destinations, and approval
                requirements.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Trust before autonomy
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Agents operate under approved identities and owners.",
                  "Budgets and permissions limit economic exposure.",
                  "Policies evaluate actions before value moves.",
                  "Receipts and telemetry keep activity reviewable.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-4"
                  >
                    <span className="mt-0.5 text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Core agent utility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Four ways ZERA supports intelligent economies.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {agentPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="group min-h-[18rem] rounded-[1.9rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors hover:bg-surface-secondary"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                      {pillar.number}
                    </p>

                    <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1 text-xs text-foreground-secondary">
                      {pillar.outcome}
                    </span>
                  </div>

                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">
                    {pillar.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {pillar.description}
                  </p>

                  <div className="mt-8 h-px w-12 bg-brand-primary/50 transition-all duration-300 group-hover:w-24" />
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="agent-lifecycle" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Trusted agent lifecycle
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From identity to observable economic action.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Agent payments should move through a complete decision and
                verification path instead of jumping directly from instruction
                to settlement.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2.25rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-4">
              {agentLifecycle.map((stage) => (
                <article
                  key={stage.number}
                  className="min-h-[24rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                      {stage.number}
                    </span>

                    <span className="rounded-full border border-border-subtle bg-background-secondary/50 px-3 py-1 text-xs text-foreground-secondary">
                      {stage.label}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">
                    {stage.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {stage.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {stage.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Participation models
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Intelligence can serve people, businesses, and other systems.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {agentModels.map((model) => (
                <article
                  key={model.title}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                    {model.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {model.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {model.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                      >
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Agent advantages
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Utility built for programmable participation.
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {agentAdvantages.map((advantage) => (
                <article
                  key={advantage.title}
                  className="min-h-[15rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {advantage.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {advantage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Budgets and permissions
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Define the boundary before the agent acts.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Agent authority should be explicit, narrow, and adjustable.
                Access can be constrained by value, time, destination, service,
                category, asset, or required human approval.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {permissionControls.map((control, index) => (
                <article
                  key={control}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-5 font-medium">{control}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute right-[-6rem] top-[-8rem] h-80 w-80 rounded-full bg-brand-primary/10 blur-[90px]" />

            <div className="relative">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Zephyon Runtime
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  The coordination layer beneath intelligent payments.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  The Runtime evaluates economic intent before settlement and
                  connects the controls required for trusted agent
                  participation.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {runtimeLayers.map((layer) => (
                  <article
                    key={layer.title}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {layer.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {layer.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-10">
                <Button
                  href="/runtime"
                  variant="outline"
                  rightIcon={<ArrowIcon />}
                >
                  Explore the Runtime
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Machine payments
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Let software pay for software.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Approved agents can participate in machine-readable commerce
                through policy-controlled payments, recurring access, and
                deterministic records.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {paymentModels.map((model) => (
                <article
                  key={model.eyebrow}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {model.eyebrow}
                  </p>

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                    {model.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {model.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {model.examples.map((example) => (
                      <div
                        key={example}
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                      >
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="agent-access" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Subscribe or stake
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Choose how intelligent services are accessed.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {accessOptions.map((option) => (
                <article
                  key={option.label}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {option.label}
                  </p>

                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                    {option.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {option.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {option.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                      >
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Economic coordination
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Agents become useful when systems can coordinate safely.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Zephyon can connect approved agents, services, businesses,
                  people, payments, policies, and receipts within one
                  observable economic environment.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {coordinationExamples.map((example) => (
                  <article
                    key={example.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {example.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {example.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Agent trust
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Intelligence should remain accountable.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Agent participation should expand useful capability while
                  preserving human authority, bounded access, observability, and
                  intervention.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustPrinciples.map((principle) => (
                  <article
                    key={principle.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {principle.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {principle.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass px-7 py-14 text-center shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-x-[15%] top-0 h-40 rounded-full bg-brand-primary/10 blur-[70px]" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Intelligent economy
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Give agents capability without giving up control.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore the broader AI agent platform or continue through the
                ZERA utility ecosystem.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/ai-agents"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore AI agents
                </Button>

                <Button href="/zera/utility" variant="outline" size="lg">
                  Return to ZERA utility
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
