import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";

const economicEventStages = [
  {
    number: "01",
    title: "Intent",
    description:
      "A person, business, application, or autonomous agent initiates an economic action.",
  },
  {
    number: "02",
    title: "Identity",
    description:
      "The runtime resolves who or what is participating before value moves.",
  },
  {
    number: "03",
    title: "Compliance",
    description:
      "Required account, jurisdiction, sanctions, and transaction controls are applied.",
  },
  {
    number: "04",
    title: "Risk",
    description:
      "Transaction context and runtime signals are evaluated before approval.",
  },
  {
    number: "05",
    title: "Policy",
    description:
      "Platform, merchant, organization, and payment rules are enforced consistently.",
  },
  {
    number: "06",
    title: "Settlement",
    description:
      "The appropriate payment rail is selected and coordinated through the runtime.",
  },
  {
    number: "07",
    title: "Verification",
    description:
      "Execution results are confirmed and attached to the economic event.",
  },
  {
    number: "08",
    title: "Receipt",
    description:
      "A deterministic settlement record preserves what happened and when.",
  },
];

const runtimeEngines = [
  {
    title: "Identity Engine",
    description:
      "Resolves the participant, account, application, or autonomous agent behind an economic action.",
  },
  {
    title: "Compliance Engine",
    description:
      "Coordinates KYC, KYB, sanctions, monitoring, and transaction requirements before settlement.",
  },
  {
    title: "Risk Engine",
    description:
      "Evaluates payment context, runtime signals, and transaction confidence before approval.",
  },
  {
    title: "Policy Engine",
    description:
      "Applies platform, merchant, account, and organizational rules consistently before value moves.",
  },
  {
    title: "Settlement Engine",
    description:
      "Coordinates blockchain and future traditional payment rails through one runtime interface.",
  },
  {
    title: "Telemetry",
    description:
      "Records execution stages, timing, outcomes, and deterministic settlement history.",
  },
];

const commerceCapabilities = [
  {
    title: "Agent wallets",
    description:
      "Purpose-built payment accounts for software agents, services, and autonomous systems.",
  },
  {
    title: "AI-to-AI payments",
    description:
      "Enable intelligent systems to exchange value under defined limits, policies, and permissions.",
  },
  {
    title: "x402 payments",
    description:
      "Let software pay for protected digital resources through standards-based HTTP payment flows.",
  },
  {
    title: "Runtime APIs",
    description:
      "Integrate payment orchestration, verification, receipts, and telemetry into applications.",
  },
  {
    title: "Deterministic receipts",
    description:
      "Produce consistent settlement records that people and machines can independently inspect.",
  },
  {
    title: "Autonomous transactions",
    description:
      "Coordinate machine-initiated economic activity without surrendering policy or observability.",
  },
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export const metadata = {
  title: "Intelligent Commerce | ZephiPay",
  description:
    "Economic infrastructure for people, businesses, applications, and intelligent systems—powered by the Zephyon Runtime.",
};

export default function IntelligentCommercePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-4xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Intelligent commerce
              </p>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5.25rem] lg:leading-[0.98]">
                Payments that understand what they&apos;re doing.
              </h1>

              <p className="mt-8 max-w-3xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                ZephiPay gives people, businesses, applications, and
                intelligent systems one coordinated way to move value—while
                the Zephyon Runtime handles identity, policy, compliance,
                risk, settlement, verification, and receipts underneath.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href="/runtime"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore the Runtime
                </Button>

                <Button
                  href="/developers"
                  variant="outline"
                  size="lg"
                >
                  Build with ZephiPay
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                One economic layer
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                Humans and software should not need separate payment worlds.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                ZephiPay is being designed so a person, merchant, developer,
                or autonomous agent can participate through the same trusted
                economic infrastructure.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Policy before settlement",
                  "Verification after execution",
                  "Receipts for every participant",
                  "Observability across the full runtime",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-secondary/50 px-4 py-3"
                  >
                    <span className="text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <span className="text-sm text-foreground-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="economic-event" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                The economic event
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A payment is more than value moving from one place to another.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Traditional processors focus on the transfer. Zephyon
                coordinates the full event surrounding it—before, during, and
                after settlement.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {economicEventStages.map((stage) => (
                <article
                  key={stage.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {stage.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {stage.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {stage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="participants" className="scroll-mt-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Human commerce
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                Built for people and the businesses they create.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Individuals, creators, merchants, and teams can interact
                through a familiar payment experience without needing to
                understand the infrastructure underneath.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Individuals",
                  "Creators",
                  "Businesses",
                  "Merchants",
                  "Teams",
                  "Developers",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm text-foreground-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Machine commerce
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                Ready for software that can participate economically.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Intelligent systems need wallets, policies, limits,
                settlement, verification, and receipts—not merely access to a
                payment endpoint.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "AI agents",
                  "Applications",
                  "MCP servers",
                  "Automation",
                  "APIs",
                  "Autonomous services",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm text-foreground-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section id="runtime-engines" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Zephyon Runtime
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Simple on the surface. Coordinated underneath.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The runtime separates critical payment responsibilities into
                purpose-built engines while coordinating them through one
                execution path.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {runtimeEngines.map((engine) => (
                <article
                  key={engine.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-sm font-medium text-brand-secondary">
                    Z
                  </div>

                  <h3 className="mt-7 text-xl font-semibold">
                    {engine.title}
                  </h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {engine.description}
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
                See how the Runtime works
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="autonomous-commerce" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Autonomous commerce
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Software can transact without becoming ungovernable.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZephiPay is designed to let intelligent systems pay,
                  receive, verify, and coordinate economic activity while
                  preserving policy, limits, identity, and observability.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {commerceCapabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="rounded-[1.5rem] border border-border-subtle bg-background/70 p-6"
                  >
                    <h3 className="font-semibold">
                      {capability.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                      {capability.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="x402" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                x402 settlement
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Payments built into the request itself.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Zephyon already supports an x402 payment path that can
                challenge a request, coordinate settlement through Solana,
                create a deterministic receipt, and expose a verification
                route for the completed event.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="/intelligent-commerce/x402"
                  rightIcon={<ArrowIcon />}
                >
                  Explore x402
                </Button>

                <Button
                  href="/developers/api"
                  variant="outline"
                >
                  View APIs
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
              {[
                "Agent requests protected resource",
                "Server returns payment challenge",
                "Agent settles through Zephyon",
                "Runtime verifies settlement",
                "Resource and receipt are returned",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-5 border-b border-border-subtle px-6 py-5 last:border-b-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm text-foreground-secondary">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="receipts" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 text-center shadow-[var(--shadow-medium)] sm:p-12">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Deterministic records
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Every completed payment leaves behind evidence.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Zephyon receipts preserve the payment result, runtime decision,
              settlement reference, execution timeline, and verification
              state—creating records that people and software can trust.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href="/security/verified-receipts"
                rightIcon={<ArrowIcon />}
              >
                Explore verified receipts
              </Button>

              <Button
                href="/telemetry"
                variant="outline"
              >
                View runtime telemetry
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid items-center gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Build the next economy
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Give your application a trusted way to participate in
                commerce.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Start with APIs and runtime infrastructure designed for
                people today and intelligent systems tomorrow.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                href="/developers"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore developers
              </Button>

              <Button
                href="/runtime"
                variant="outline"
                size="lg"
              >
                View Runtime
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
