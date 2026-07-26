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

function CodeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}

const developerPillars = [
  {
    number: "01",
    title: "Build payment experiences",
    description:
      "Create supported payment flows for people, creators, businesses, applications, services, and intelligent agents.",
    outcome: "Programmable payments",
  },
  {
    number: "02",
    title: "Connect economic intelligence",
    description:
      "Use Runtime decisions, verified receipts, policy outcomes, and telemetry to build context-aware financial products.",
    outcome: "Economic context",
  },
  {
    number: "03",
    title: "Access qualifying infrastructure",
    description:
      "Use subscription or staking models to unlock eligible SDK capabilities, service tiers, tooling, and ecosystem resources.",
    outcome: "Expanded access",
  },
  {
    number: "04",
    title: "Participate in ecosystem growth",
    description:
      "Contribute integrations, applications, services, infrastructure, education, or tooling through defined ecosystem programs.",
    outcome: "Builder participation",
  },
];

const developerLifecycle = [
  {
    number: "01",
    label: "Design",
    title: "Define the economic experience.",
    description:
      "Choose the participants, payment model, assets, permissions, policies, receipts, and user experience required by the application.",
    features: [
      "Payment intent",
      "Participant roles",
      "Economic rules",
    ],
  },
  {
    number: "02",
    label: "Integrate",
    title: "Connect through supported interfaces.",
    description:
      "Use APIs, SDKs, adapters, webhooks, and developer tools to connect applications to ZephiPay and the Zephyon Runtime.",
    features: [
      "SDK integration",
      "API requests",
      "Runtime adapters",
    ],
  },
  {
    number: "03",
    label: "Evaluate",
    title: "Send intent through the Runtime.",
    description:
      "Allow identity, compliance, risk, policy, permissions, budgets, and operating context to be evaluated before settlement.",
    features: [
      "Identity context",
      "Policy evaluation",
      "Risk decisions",
    ],
  },
  {
    number: "04",
    label: "Execute",
    title: "Route approved value movement.",
    description:
      "Execute supported payments or settlement through the appropriate blockchain, banking, application, or service rail.",
    features: [
      "Payment routing",
      "Settlement execution",
      "Rail coordination",
    ],
  },
  {
    number: "05",
    label: "Verify",
    title: "Confirm the expected outcome.",
    description:
      "Validate transaction state, settlement completion, service delivery, references, and required confirmation conditions.",
    features: [
      "Settlement state",
      "Result verification",
      "Failure handling",
    ],
  },
  {
    number: "06",
    label: "Record",
    title: "Create a deterministic receipt.",
    description:
      "Connect intent, decisions, execution, settlement, context, and outcome through a trusted economic record.",
    features: [
      "Verified receipts",
      "Economic context",
      "Audit history",
    ],
  },
  {
    number: "07",
    label: "Observe",
    title: "Monitor the complete flow.",
    description:
      "Use telemetry, events, logs, retries, errors, timing, and settlement signals to understand application behavior.",
    features: [
      "Runtime telemetry",
      "Operational events",
      "Performance insight",
    ],
  },
  {
    number: "08",
    label: "Expand",
    title: "Build deeper economic capabilities.",
    description:
      "Add intelligent agents, subscriptions, merchant services, creator tools, incentives, automation, and ecosystem integrations.",
    features: [
      "Agent commerce",
      "Premium services",
      "Ecosystem integrations",
    ],
  },
];

const platformSurfaces = [
  {
    title: "Payment APIs",
    description:
      "Create, authorize, execute, confirm, and retrieve supported payment activity through structured interfaces.",
    features: [
      "Payment intent",
      "Execution status",
      "Settlement references",
    ],
  },
  {
    title: "Receipt APIs",
    description:
      "Retrieve deterministic economic records that connect intent, decisions, context, execution, and outcome.",
    features: [
      "Verified receipts",
      "Economic metadata",
      "Audit-ready history",
    ],
  },
  {
    title: "Runtime APIs",
    description:
      "Send economic intent through identity, compliance, risk, policy, orchestration, settlement, and telemetry layers.",
    features: [
      "Decision context",
      "Policy results",
      "Execution timeline",
    ],
  },
];

const developerAdvantages = [
  {
    title: "Eligible SDK access",
    description:
      "Unlock qualifying advanced client capabilities, integrations, modules, or service tiers through supported access models.",
  },
  {
    title: "Premium infrastructure",
    description:
      "Access qualifying hosted services, enhanced limits, developer tooling, analytics, and operational capabilities.",
  },
  {
    title: "Agent economic tools",
    description:
      "Build approved agent payments, budgets, subscriptions, x402 services, machine commerce, and economic automation.",
  },
  {
    title: "Builder incentives",
    description:
      "Participate in defined grants, integrations, contribution, adoption, or ecosystem development programs.",
  },
  {
    title: "Protocol fee utility",
    description:
      "Use ZERA across eligible infrastructure, services, platform access, and developer participation models.",
  },
  {
    title: "Ecosystem distribution",
    description:
      "Connect applications and services to a wider network of people, businesses, creators, agents, and economic tools.",
  },
];

const runtimeModules = [
  {
    title: "Identity",
    description:
      "Represent users, businesses, services, applications, and agents through approved participation context.",
  },
  {
    title: "Compliance",
    description:
      "Apply supported verification, sanctions, monitoring, and jurisdictional requirements where applicable.",
  },
  {
    title: "Risk",
    description:
      "Evaluate transaction context, behavior, limits, destination, history, and operating conditions.",
  },
  {
    title: "Policy",
    description:
      "Apply explicit platform, user, business, account, service, and protocol rules before execution.",
  },
  {
    title: "Settlement",
    description:
      "Coordinate approved payments across supported digital, banking, blockchain, and service rails.",
  },
  {
    title: "Telemetry",
    description:
      "Capture decisions, events, timing, retries, failures, settlement, and operational state.",
  },
];

const builderModels = [
  {
    title: "Consumer applications",
    description:
      "Build payment, wallet, receipt, budgeting, subscription, transfer, and financial organization experiences.",
    features: [
      "Personal payments",
      "Verified activity",
      "Intelligent assistance",
    ],
  },
  {
    title: "Business platforms",
    description:
      "Connect invoices, commerce, treasury, reporting, settlement, customer rewards, and operational workflows.",
    features: [
      "Merchant payments",
      "Invoice reconciliation",
      "Business automation",
    ],
  },
  {
    title: "Agent services",
    description:
      "Create policy-controlled software that can purchase, subscribe, settle, verify, and coordinate economic activity.",
    features: [
      "Machine payments",
      "Agent subscriptions",
      "x402 services",
    ],
  },
];

const codeExample = `import { ZephiPayClient } from "@zephipay/sdk";

const zephipay = new ZephiPayClient({
  environment: "sandbox",
});

const payment = await zephipay.payments.create({
  recipient: "merchant_123",
  amount: {
    value: "24.00",
    asset: "USDC",
  },
  purpose: "software-service",
});

const result = await zephipay.payments.execute(payment.id);

console.log(result.status);
console.log(result.receiptId);`;

const receiptFields = [
  "Payment intent",
  "Participants",
  "Asset and amount",
  "Purpose and context",
  "Runtime decision",
  "Settlement reference",
  "Completion state",
  "Verified timestamp",
];

const trustCapabilities = [
  {
    title: "Verified participation",
    description:
      "Build experiences around participants, services, merchants, agents, or accounts with supported identity context.",
  },
  {
    title: "Transaction history",
    description:
      "Use successful activity, verified receipts, account longevity, and settlement behavior as trust signals.",
  },
  {
    title: "Policy-aware access",
    description:
      "Adjust limits, services, workflows, and permissions according to approved policy and trust conditions.",
  },
  {
    title: "Reliable settlement",
    description:
      "Recognize consistent execution, confirmation, fulfillment, and economic behavior over time.",
  },
];

const agentCapabilities = [
  "Agent identity and ownership",
  "Scoped economic permissions",
  "Transaction and recurring budgets",
  "Policy-controlled execution",
  "x402 payment flows",
  "Machine-readable receipts",
  "Agent subscriptions",
  "Runtime telemetry",
];

const accessOptions = [
  {
    label: "Subscribe",
    title: "Pay for qualifying developer capabilities.",
    description:
      "Access supported infrastructure, service tiers, tooling, analytics, and advanced features without holding ZERA.",
    features: [
      "No token requirement",
      "Predictable developer access",
      "Usage or plan-based pricing",
    ],
  },
  {
    label: "Stake",
    title: "Commit ZERA for eligible platform access.",
    description:
      "Stake ZERA to unlock qualifying infrastructure, expanded limits, advanced capabilities, or ecosystem participation.",
    features: [
      "Purpose-driven staking",
      "Qualifying developer access",
      "Long-term ecosystem alignment",
    ],
  },
];

const ecosystemContributions = [
  {
    title: "Applications",
    description:
      "Build products that improve how people, creators, businesses, and agents interact with value.",
  },
  {
    title: "Integrations",
    description:
      "Connect wallets, payment rails, accounting systems, commerce platforms, services, and infrastructure.",
  },
  {
    title: "Developer tooling",
    description:
      "Create libraries, adapters, dashboards, testing environments, observability tools, or workflow components.",
  },
  {
    title: "Economic services",
    description:
      "Provide data, automation, intelligence, settlement, identity, risk, compliance, or machine-readable services.",
  },
  {
    title: "Education",
    description:
      "Help developers understand payment architecture, Runtime workflows, agent commerce, and protocol integration.",
  },
  {
    title: "Protocol contribution",
    description:
      "Contribute code, research, standards, testing, documentation, security, or ecosystem infrastructure.",
  },
];

const developerPrinciples = [
  {
    title: "Composable by design",
    description:
      "Developers should be able to adopt the capabilities they need without rebuilding the entire economic stack.",
  },
  {
    title: "Observable execution",
    description:
      "Payments, policy decisions, settlement, retries, errors, and receipts should remain understandable.",
  },
  {
    title: "Explicit permissions",
    description:
      "Applications and agents should operate through defined scopes, limits, owners, policies, and approval paths.",
  },
  {
    title: "Open participation",
    description:
      "Core integration should remain accessible while ZERA offers optional paths to qualifying advanced capabilities.",
  },
];

export default function ZeraDevelopersPage() {
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
              ZERA for developers
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Build the next generation of economic software.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Connect payments, verified receipts, policy, intelligent agents,
              settlement, and economic coordination through one programmable
              platform.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA can unlock qualifying developer capabilities, infrastructure
              access, builder participation, and advanced services without
              making token ownership a requirement for core integration.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#developer-platform"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore developer utility
              </Button>

              <Button href="/developers" variant="outline" size="lg">
                View developer platform
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
                Open integration
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Start building without requiring ZERA.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Core development access should remain approachable. Builders
                can integrate supported payments, Runtime flows, receipts, and
                platform capabilities before deciding whether deeper ZERA
                participation creates value.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Optional by design
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Build core integrations without owning ZERA.",
                  "Use supported APIs, SDKs, receipts, and Runtime services.",
                  "Choose subscription or staking for qualifying advanced access.",
                  "Participate in builder programs only when they create value.",
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
                Core developer utility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Four ways ZERA supports builders.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {developerPillars.map((pillar) => (
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

      <Section id="developer-platform" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Developer lifecycle
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From application design to observable settlement.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Build around the complete economic lifecycle instead of treating
                payment as an isolated API call.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2.25rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-4">
              {developerLifecycle.map((stage) => (
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
                Platform interfaces
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Build through clear economic surfaces.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Applications can connect to the capabilities they need while
                preserving a consistent model for intent, decisions,
                settlement, records, and observability.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {platformSurfaces.map((surface) => (
                <article
                  key={surface.title}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-secondary/25 bg-brand-secondary/10 text-brand-secondary">
                    <CodeIcon />
                  </div>

                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.035em]">
                    {surface.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {surface.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {surface.features.map((feature) => (
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
                Developer advantages
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Utility beyond basic API access.
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {developerAdvantages.map((advantage) => (
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
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute right-[-6rem] top-[-8rem] h-80 w-80 rounded-full bg-brand-primary/10 blur-[90px]" />

            <div className="relative">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Zephyon Runtime
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Build on an economic coordination layer.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  The Runtime connects the decision systems required to evaluate
                  economic intent before value moves and observe what happens
                  afterward.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {runtimeModules.map((module) => (
                  <article
                    key={module.title}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {module.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {module.description}
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
                Builder models
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Build for people, businesses, and intelligent agents.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {builderModels.map((model) => (
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
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Developer experience
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A familiar path into programmable payments.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The developer experience should make intent, execution,
                settlement, and receipts understandable without hiding the
                economic controls underneath them.
              </p>

              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                This example represents the intended SDK direction and may
                change as production interfaces and package names are finalized.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border-default bg-[#07101f] shadow-[var(--shadow-medium)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>

                <span className="text-xs uppercase tracking-[0.16em] text-white/45">
                  TypeScript
                </span>
              </div>

              <pre className="overflow-x-auto p-6 text-sm leading-7 text-white/80 sm:p-8">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Verified receipts
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Build around a trusted economic record.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                A payment receipt should explain more than the movement of an
                asset. It should connect the original intent, participants,
                decisions, context, execution, settlement, and outcome.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {receiptFields.map((field, index) => (
                <article
                  key={field}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-5 font-medium">{field}</p>
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
                  Trust-aware applications
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Build experiences that respond to reliable activity.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Supported trust signals can help applications make more
                  informed decisions about limits, access, priority, services,
                  and economic participation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustCapabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {capability.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {capability.description}
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
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Agent development
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Give software approved economic capability.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Developers can build trusted agents that purchase services,
                manage subscriptions, execute approved payments, coordinate
                workflows, and produce observable economic records.
              </p>

              <div className="mt-8">
                <Button
                  href="/zera/agents"
                  variant="outline"
                  rightIcon={<ArrowIcon />}
                >
                  Explore ZERA for agents
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {agentCapabilities.map((capability, index) => (
                <article
                  key={capability}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-5 font-medium">{capability}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="developer-access" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Subscribe or stake
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Choose how to access advanced developer capabilities.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Builders can choose the access model that fits their product,
                infrastructure needs, operating model, and desired level of
                ecosystem participation.
              </p>
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
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Ecosystem contribution
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Expand what the economic platform can do.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Developers can strengthen the ecosystem through products,
                integrations, tooling, services, education, infrastructure, and
                protocol contribution.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {ecosystemContributions.map((contribution) => (
                <article
                  key={contribution.title}
                  className="min-h-[15rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {contribution.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {contribution.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-4xl text-sm leading-7 text-foreground-muted">
              Grants, rewards, incentives, infrastructure access, and builder
              programs would depend on published availability, eligibility,
              verification, contribution requirements, and anti-abuse controls.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Developer principles
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Powerful infrastructure should remain understandable.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Developers should be able to compose useful economic
                  capabilities without sacrificing permissions, observability,
                  user control, or clarity.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {developerPrinciples.map((principle) => (
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
                Build on Zephyon
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Turn economic intent into trusted software.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore the broader developer platform or continue through the
                complete ZERA utility ecosystem.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/developers"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore developer platform
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
