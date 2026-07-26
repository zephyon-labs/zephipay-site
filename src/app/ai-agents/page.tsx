import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { AgentConsole } from "@/components/marketing/agent-workspace";
import { Button } from "@/components/ui/Button";

const gettingStartedSteps = [
  {
    number: "01",
    title: "Choose an assistant",
    description:
      "Start with a personal, shopping, business, creator, research, or custom agent.",
  },
  {
    number: "02",
    title: "Verify its identity",
    description:
      "Confirm which agent, application, or service will act on your behalf.",
  },
  {
    number: "03",
    title: "Choose permissions",
    description:
      "Decide exactly what the agent may view, prepare, request, or send.",
  },
  {
    number: "04",
    title: "Set financial limits",
    description:
      "Define daily and per-payment boundaries before any money can move.",
  },
  {
    number: "05",
    title: "Choose approval rules",
    description:
      "Require confirmation every time or allow trusted actions under policy.",
  },
  {
    number: "06",
    title: "Connect and begin",
    description:
      "Connect an account when ready, review the setup, and remain in control.",
  },
];

const controlFeatures = [
  {
    title: "Pause instantly",
    description:
      "Stop agent activity without deleting the assistant or its records.",
  },
  {
    title: "Revoke access",
    description:
      "Remove permissions or disconnect an agent whenever circumstances change.",
  },
  {
    title: "Require approval",
    description:
      "Keep a person in the loop for every payment or only for higher-risk actions.",
  },
  {
    title: "Enforce limits",
    description:
      "Apply daily, per-payment, vendor, category, and future organizational rules.",
  },
  {
    title: "Review every action",
    description:
      "Inspect requests, decisions, settlement outcomes, and runtime activity.",
  },
  {
    title: "Keep verified records",
    description:
      "Preserve deterministic receipts for completed payments and economic events.",
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
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function AIAgentsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.82fr] xl:gap-20">
            <div className="max-w-4xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                AI Agents
              </p>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.25rem] lg:leading-[0.98]">
                Put your AI to work—with you in control.
              </h1>

              <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
                Configure assistants that can help discover, prepare,
                pay, and verify.
              </p>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Choose what an agent may access, establish the limits
                it must obey, and decide when your approval is required
                before any value moves.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href="#agent-setup"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Configure an agent
                </Button>

                <Button
                  href="/ai-agents/how-it-works"
                  variant="outline"
                  size="lg"
                >
                  Learn how it works
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between gap-5 border-b border-border-subtle pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    Your AI, your rules
                  </p>
                  <p className="mt-3 text-xl font-semibold">
                    Human-controlled autonomy
                  </p>
                </div>

                <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
                  Protected
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Identity required before participation",
                  "Permissions granted individually",
                  "Spending boundaries enforced",
                  "Human approval configurable",
                  "Every completed payment recorded",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/45 px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <p className="text-sm text-foreground-secondary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-6 text-foreground-muted">
                AI agents do not bypass Zephyon safeguards. They
                operate through identity, policy, limits, verification,
                and observable runtime execution.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="agent-setup"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20 sm:pt-24">
            <AgentConsole />
          </div>
        </Container>
      </Section>

      <Section
        id="getting-started"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20 sm:pt-24">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Getting started
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                How to begin using an AI agent.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Start cautiously. Give the agent only the access it
                needs, keep approval enabled, and expand its authority
                only after you understand how it behaves.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {gettingStartedSteps.map((step) => (
                <article
                  key={step.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {step.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="control"
        className="scroll-mt-28"
      >
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                  Stay in control
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Autonomy should never mean surrendering authority.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZephiPay is designed so an AI agent remains limited,
                  observable, and reversible. You decide what it may
                  do and when it must stop.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {controlFeatures.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-[1.5rem] border border-border-subtle bg-background/65 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                        <CheckIcon />
                      </span>

                      <h3 className="font-semibold">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-foreground-secondary">
                      {feature.description}
                    </p>
                  </article>
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
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Understand the infrastructure
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                See what happens before an agent payment is approved.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Walk through identity, compliance, risk, policy,
                settlement, verification, receipts, x402, and
                real-world autonomous payment examples.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                href="/ai-agents/how-it-works"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore how it works
              </Button>

              <Button
                href="/developers"
                variant="outline"
                size="lg"
              >
                Build with Zephyon
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
