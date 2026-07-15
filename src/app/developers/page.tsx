import {
  BuilderSelector,
  CodeExplorer,
  PaymentThinkingDemo,
} from "@/components/developers/DeveloperExperience";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";

const architectureStages = [
  {
    title: "Application",
    description:
      "A wallet, marketplace, merchant platform, service, or autonomous agent initiates an economic action.",
  },
  {
    title: "SDK or API",
    description:
      "The integration submits payment intent and the context required by the Runtime.",
  },
  {
    title: "Zephyon Runtime",
    description:
      "The Runtime coordinates identity, compliance, risk, policy, trust, settlement, and telemetry.",
  },
  {
    title: "Settlement adapter",
    description:
      "A rail-specific adapter translates the approved event into network execution.",
  },
  {
    title: "Deterministic receipt",
    description:
      "The final result and its execution timeline return through one consistent record.",
  },
];

const runtimeCapabilities = [
  {
    title: "Identity",
    description:
      "Resolve people, accounts, merchants, applications, and autonomous agents.",
  },
  {
    title: "Compliance",
    description:
      "Coordinate KYC, KYB, sanctions, monitoring, and jurisdiction controls.",
  },
  {
    title: "Risk",
    description:
      "Evaluate transaction context, runtime signals, confidence, and limits.",
  },
  {
    title: "Policy",
    description:
      "Apply platform, merchant, organizational, account, and agent rules.",
  },
  {
    title: "Settlement",
    description:
      "Coordinate payment rails through a consistent execution interface.",
  },
  {
    title: "Resilience",
    description:
      "Handle endpoint health, retryable errors, failover, and bounded recovery.",
  },
  {
    title: "Telemetry",
    description:
      "Observe execution stages, timing, decisions, retries, and settlement outcomes.",
  },
  {
    title: "Receipts",
    description:
      "Preserve deterministic records for verification and downstream systems.",
  },
];

const comparisonRows = [
  {
    traditional: "Single payment endpoint",
    zephyon: "Coordinated economic runtime",
  },
  {
    traditional: "Success or failure response",
    zephyon: "Decision path and execution timeline",
  },
  {
    traditional: "Provider-specific integration",
    zephyon: "Rail-independent payment intent",
  },
  {
    traditional: "Webhook event",
    zephyon: "Deterministic receipt",
  },
  {
    traditional: "Application logs",
    zephyon: "Runtime telemetry",
  },
  {
    traditional: "Settlement afterthought",
    zephyon: "Policy before value moves",
  },
];

const deliveredCapabilities = [
  "Runtime orchestration",
  "Identity, compliance, risk, and policy engines",
  "Solana Devnet settlement",
  "Deterministic receipts",
  "Execution telemetry",
  "Multi-RPC registry",
  "Retry and resilience testing",
  "x402 payment flow",
];

const activeDevelopment = [
  "Public SDK packaging",
  "Production API authentication",
  "Mainnet readiness",
  "Expanded settlement adapters",
  "Agent wallet controls",
  "Long-running infrastructure validation",
];

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

export const metadata = {
  title: "Developers | ZephiPay",
  description:
    "Build payment experiences with the Zephyon Runtime, APIs, deterministic receipts, telemetry, x402, and intelligent-commerce infrastructure.",
};

export default function DevelopersPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-5xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                For builders
              </p>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5.4rem] lg:leading-[0.98]">
                Infrastructure for programmable commerce.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Build payments for people, businesses, applications, and
                intelligent agents through one coordinated economic runtime.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href="#builder-selector"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Start building
                </Button>

                <Button
                  href="/runtime"
                  variant="outline"
                  size="lg"
                >
                  Explore Runtime
                </Button>

                <Button
                  href="https://github.com/zephyon-labs"
                  external
                  variant="ghost"
                  size="lg"
                >
                  GitHub
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                One execution model
              </p>

              <div className="mt-6 grid gap-4">
                {[
                  ["People", "Familiar payment experiences"],
                  ["Businesses", "Policy and operational control"],
                  ["Applications", "Runtime APIs and receipts"],
                  ["Agents", "Autonomous, governed commerce"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-[1.35rem] border border-border-subtle bg-background/60 p-5"
                  >
                    <p className="font-medium text-foreground">
                      {title}
                    </p>

                    <p className="mt-2 text-sm text-foreground-secondary">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="builder-selector"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Start with your use case
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Choose what you are building.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The Runtime stays consistent while the capabilities,
                controls, and economic flow adapt to your product.
              </p>
            </div>

            <div className="mt-12">
              <BuilderSelector />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="architecture" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 border-t border-border-subtle pt-20 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Integration architecture
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Submit intent. Let the Runtime coordinate execution.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Your application should not need to rebuild identity,
                compliance, risk, policy, settlement, retries, telemetry, and
                receipt generation for every new payment rail.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background">
              {architectureStages.map((stage, index) => (
                <article
                  key={stage.title}
                  className="grid gap-5 border-b border-border-subtle p-6 last:border-b-0 sm:grid-cols-[auto_1fr] sm:p-7"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-semibold">
                      {stage.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                      {stage.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="code" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Developer interface
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One payment intent. Multiple integration paths.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The public SDK surface is still being finalized, but the
                intended developer model is direct: submit economic intent,
                receive a coordinated result, and preserve the receipt.
              </p>
            </div>

            <CodeExplorer />
          </div>
        </Container>
      </Section>

      <Section id="capabilities" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Runtime capabilities
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Payment infrastructure should be composable.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Use the full runtime path or integrate the capabilities your
                product needs as the public SDK and API surface expands.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {runtimeCapabilities.map((capability) => (
                <article
                  key={capability.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-sm font-medium text-brand-secondary">
                    Z
                  </div>

                  <h3 className="mt-7 text-xl font-semibold">
                    {capability.title}
                  </h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="watch-payment-think" className="scroll-mt-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Runtime execution
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Watch a payment think.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              A Zephyon payment is not blindly forwarded to a network. The
              Runtime coordinates a controlled decision path before value
              moves and preserves the result afterward.
            </p>
          </div>

          <div className="mt-12">
            <PaymentThinkingDemo />
          </div>
        </Container>
      </Section>

      <Section id="comparison" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Why a Runtime
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                More than another payment endpoint.
              </h2>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2rem] border border-border-default">
              <div className="grid grid-cols-2 border-b border-border-subtle bg-surface-secondary/50">
                <p className="p-5 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted sm:px-7">
                  Traditional integration
                </p>

                <p className="border-l border-border-subtle p-5 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary sm:px-7">
                  Zephyon Runtime
                </p>
              </div>

              {comparisonRows.map((row) => (
                <div
                  key={row.traditional}
                  className="grid grid-cols-2 border-b border-border-subtle bg-background last:border-b-0"
                >
                  <p className="p-5 text-sm leading-6 text-foreground-muted sm:px-7">
                    {row.traditional}
                  </p>

                  <p className="border-l border-border-subtle p-5 text-sm font-medium leading-6 text-foreground sm:px-7">
                    {row.zephyon}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="status" className="scroll-mt-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Delivered
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                Working infrastructure
              </h2>

              <div className="mt-8 grid gap-3">
                {deliveredCapabilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border-subtle bg-background/60 px-5 py-4 text-sm text-foreground-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.18em] text-foreground-muted">
                Active development
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                The road to production
              </h2>

              <div className="mt-8 grid gap-3">
                {activeDevelopment.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border-subtle bg-background/60 px-5 py-4 text-sm text-foreground-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid items-center gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Build with Zephyon
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Build economic coordination into your application.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Explore the Runtime, follow development on GitHub, and prepare
                for the public SDK and API surface.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                href="/runtime"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore Runtime
              </Button>

              <Button
                href="https://github.com/zephyon-labs"
                external
                variant="outline"
                size="lg"
              >
                GitHub
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
