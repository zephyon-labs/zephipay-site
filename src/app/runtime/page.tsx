import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { RuntimeFlow } from "@/components/marketing/RuntimeFlow";
import { RuntimeExplorer } from "@/components/runtime";
import { Button } from "@/components/ui/Button";

const runtimeEngines = [
  {
    number: "01",
    title: "Identity",
    description:
      "Resolves the person, account, application, merchant, or autonomous agent participating in an economic event.",
  },
  {
    number: "02",
    title: "Compliance",
    description:
      "Coordinates verification, sanctions, monitoring, jurisdiction, KYC, and KYB requirements before execution.",
  },
  {
    number: "03",
    title: "Risk",
    description:
      "Evaluates transaction context, confidence signals, limits, and conditions before approving value movement.",
  },
  {
    number: "04",
    title: "Policy",
    description:
      "Applies platform, account, merchant, organization, and agent rules consistently before settlement.",
  },
  {
    number: "05",
    title: "Trust",
    description:
      "Builds reusable confidence from verified activity, settlement reliability, account history, and receipt evidence.",
  },
  {
    number: "06",
    title: "Settlement",
    description:
      "Selects and coordinates the appropriate payment rail through a consistent runtime execution interface.",
  },
  {
    number: "07",
    title: "Telemetry",
    description:
      "Records execution stages, decisions, timing, retries, settlement references, and final outcomes.",
  },
  {
    number: "08",
    title: "Receipts",
    description:
      "Produces deterministic records that preserve what happened, why it happened, and how it was verified.",
  },
];

const runtimeGuarantees = [
  {
    title: "Policy before value moves",
    description:
      "Rules are applied before settlement rather than being reconstructed after the transaction.",
  },
  {
    title: "Deterministic execution history",
    description:
      "Every stage contributes to a consistent event timeline that can be inspected and verified.",
  },
  {
    title: "Rail-independent coordination",
    description:
      "The runtime separates payment intent and policy from the underlying settlement network.",
  },
  {
    title: "Observable outcomes",
    description:
      "Approvals, denials, retries, failures, and completions remain visible through telemetry.",
  },
];

const resilienceCapabilities = [
  {
    title: "Multiple RPC providers",
    description:
      "Runtime infrastructure can register and evaluate multiple network endpoints instead of depending on one provider.",
  },
  {
    title: "Health scoring",
    description:
      "Endpoints can be assessed using availability, latency, errors, and recent execution performance.",
  },
  {
    title: "Retry control",
    description:
      "Retryable failures follow bounded recovery rules while non-retryable failures stop cleanly.",
  },
  {
    title: "Endpoint selection",
    description:
      "The runtime can choose a healthier settlement path as infrastructure conditions change.",
  },
  {
    title: "Failure classification",
    description:
      "Infrastructure errors remain distinguishable from policy decisions, compliance denials, and settlement failures.",
  },
  {
    title: "Execution continuity",
    description:
      "Runtime state and telemetry preserve the event history even when a settlement attempt must be recovered.",
  },
];

const receiptFields = [
  "Runtime transaction ID",
  "Decision and final status",
  "Settlement rail",
  "Network transaction reference",
  "Execution timeline",
  "Policy and risk outcome",
  "Verification state",
  "Created and completed timestamps",
];

const telemetrySignals = [
  {
    label: "Execution stage",
    value: "Identity → Compliance → Risk → Policy → Settlement",
  },
  {
    label: "Runtime decision",
    value: "Approved, denied, failed, retrying, or completed",
  },
  {
    label: "Settlement reference",
    value: "Network signature or rail-specific transaction identifier",
  },
  {
    label: "Performance",
    value: "Stage duration, total duration, endpoint latency, and retries",
  },
];

const x402Stages = [
  "Agent requests a protected resource",
  "Service returns an HTTP 402 payment challenge",
  "Agent prepares and submits settlement",
  "Zephyon verifies the economic event",
  "Service returns the protected resource",
  "Runtime preserves a deterministic receipt",
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
  title: "Zephyon Runtime | ZephiPay",
  description:
    "Explore the economic runtime coordinating identity, compliance, risk, policy, settlement, telemetry, resilience, and deterministic receipts.",
};

export default function RuntimePage() {
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
              Zephyon Runtime
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5.25rem] lg:leading-[0.98]">
              The coordination layer beneath every payment.
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
              Identity, compliance, risk, policy, trust, settlement,
              telemetry, resilience, and verified receipts work through one
              runtime execution path.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/developers"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Build with the Runtime
              </Button>

              <Button
                href="/intelligent-commerce"
                variant="outline"
                size="lg"
              >
                Intelligent Commerce
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="execution-flow" className="scroll-mt-28">
        <Container>
          <RuntimeFlow />
        </Container>
      </Section>

      <Section id="runtime-explorer" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <RuntimeExplorer />
          </div>
        </Container>
      </Section>

      <Section id="architecture" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Runtime architecture
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Specialized engines. One coordinated decision.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Each engine owns a defined responsibility. The Runtime
                orchestrates those responsibilities into one observable
                economic event rather than scattering logic across unrelated
                services.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-4">
              {runtimeEngines.map((engine) => (
                <article
                  key={engine.number}
                  className="min-h-72 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {engine.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {engine.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {engine.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="guarantees" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl lg:grid-cols-[0.82fr_1.18fr] sm:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Runtime guarantees
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
                Infrastructure should explain itself.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                A payment system should not merely return success or failure.
                It should preserve the decision path, execution context, and
                settlement evidence surrounding the result.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {runtimeGuarantees.map((guarantee) => (
                <article
                  key={guarantee.title}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/70 p-6"
                >
                  <span className="text-brand-secondary">
                    <CheckIcon />
                  </span>

                  <h3 className="mt-5 font-semibold">
                    {guarantee.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                    {guarantee.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="resilience" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Runtime resilience
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Designed for infrastructure that can fail.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Networks degrade. Providers time out. Endpoints return
                  incomplete responses. Zephyon treats those conditions as
                  expected infrastructure realities rather than exceptional
                  surprises.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {resilienceCapabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="text-lg font-semibold">
                      {capability.title}
                    </h3>

                    <p className="mt-4 leading-7 text-foreground-secondary">
                      {capability.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="devnet-proof" className="scroll-mt-28">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)]">
            <div className="grid gap-10 border-b border-border-subtle p-8 lg:grid-cols-[0.82fr_1.18fr] sm:p-12">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Solana Devnet evidence
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
                  The Runtime has coordinated a real settlement.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Zephyon has executed a payment through the Runtime,
                  orchestrated its decision path, submitted settlement to
                  Solana Devnet, and recorded the resulting execution
                  timeline.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  ["Runtime status", "Completed"],
                  ["Runtime decision", "Approved"],
                  ["Settlement rail", "Solana"],
                  ["Network", "Devnet"],
                  ["Settlement evidence", "Recorded"],
                  ["Execution timeline", "Preserved"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-6 rounded-2xl border border-border-subtle bg-background/70 px-5 py-4"
                  >
                    <span className="text-sm text-foreground-muted">
                      {label}
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-5 sm:px-12">
              <p className="text-xs leading-6 text-foreground-muted">
                Devnet activity represents development and infrastructure
                validation only. It does not represent production funds,
                public mainnet volume, or commercial availability.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="telemetry" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 border-t border-border-subtle pt-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Runtime telemetry
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Every execution produces an observable history.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Telemetry records more than transaction volume. It explains
                how the Runtime moved through identity, policy, infrastructure,
                settlement, and verification.
              </p>

              <div className="mt-8">
                <Button
                  href="/telemetry"
                  variant="outline"
                  rightIcon={<ArrowIcon />}
                >
                  Explore telemetry
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background">
              {telemetrySignals.map((signal) => (
                <article
                  key={signal.label}
                  className="grid gap-3 border-b border-border-subtle px-7 py-6 last:border-b-0 sm:grid-cols-[0.38fr_0.62fr]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                    {signal.label}
                  </p>

                  <p className="text-sm leading-6 text-foreground-secondary">
                    {signal.value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="receipts" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Deterministic receipts
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  The payment record should be as trustworthy as the payment.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  A Zephyon receipt preserves the economic event surrounding
                  settlement so people, businesses, applications, and agents
                  can inspect the same consistent record.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {receiptFields.map((field) => (
                  <div
                    key={field}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/70 px-5 py-4"
                  >
                    <span className="text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <span className="text-sm text-foreground-secondary">
                      {field}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Button
                href="/security/verified-receipts"
                variant="outline"
                rightIcon={<ArrowIcon />}
              >
                Explore verified receipts
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="x402" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  x402 execution
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  A payment can become part of the request.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Zephyon supports an x402 path in which an agent receives a
                  payment challenge, settles through Solana, receives a
                  deterministic receipt, and verifies the completed event.
                </p>

                <div className="mt-8">
                  <Button
                    href="/intelligent-commerce/x402"
                    rightIcon={<ArrowIcon />}
                  >
                    Explore x402
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background">
                {x402Stages.map((stage, index) => (
                  <div
                    key={stage}
                    className="flex items-center gap-5 border-b border-border-subtle px-6 py-5 last:border-b-0"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm text-foreground-secondary">
                      {stage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
                Integrate the runtime instead of rebuilding payment
                coordination from scratch.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Start with runtime APIs, settlement orchestration, receipts,
                telemetry, and intelligent-commerce infrastructure.
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
                href="/intelligent-commerce"
                variant="outline"
                size="lg"
              >
                Intelligent Commerce
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
