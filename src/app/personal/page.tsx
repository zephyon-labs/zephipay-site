import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { PaymentExperience } from "@/components/marketing/payment-experience";
import {
  PersonalWorkspace,
  personalWorkspaceDemo,
} from "@/components/marketing/personal-workspace";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const everydayActions = [
  {
    number: "01",
    title: "Send money",
    description:
      "Pay a friend, family member, creator, or business through one calm and familiar experience.",
  },
  {
    number: "02",
    title: "Receive",
    description:
      "Accept payments without making the sender understand wallets, rails, or settlement networks.",
  },
  {
    number: "03",
    title: "Request",
    description:
      "Create a clear payment request with the amount, purpose, recipient, and transaction context attached.",
  },
  {
    number: "04",
    title: "Verified receipts",
    description:
      "Keep a dependable record of what happened, when it happened, and how the payment completed.",
  },
];

const everydayMoments = [
  "Paying a friend back",
  "Sharing rent or household costs",
  "Sending a gift",
  "Supporting a creator",
  "Paying a local business",
  "Keeping records for later",
];

const trustDetails = [
  {
    label: "Who participated",
    value:
      "The sender and recipient remain connected to the payment record.",
  },
  {
    label: "Why it happened",
    value:
      "Purpose and transaction context stay attached instead of disappearing after settlement.",
  },
  {
    label: "What completed",
    value:
      "The result, status, timestamps, and settlement evidence remain available.",
  },
  {
    label: "What you can verify",
    value:
      "Receipts preserve a consistent record that can be reviewed later.",
  },
];

const privacyPrinciples = [
  {
    title: "Share deliberately",
    description:
      "Payment context should be useful without exposing more personal information than the transaction requires.",
  },
  {
    title: "Keep activity understandable",
    description:
      "Clear records help you understand your own payment history without turning your finances into a public feed.",
  },
  {
    title: "Security beneath the experience",
    description:
      "Identity, policy, risk, compliance, and verification are designed to work quietly under the surface.",
  },
];

const accountSignals = [
  ["Available balance", "$2,480.00"],
  ["Recent activity", "3 verified payments"],
  ["Verified receipts", "Ready when needed"],
  ["Zephyon Points", "Earned through activity"],
  ["Trust signals", "Built through reliable history"],
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
  title: "Personal | ZephiPay",
  description:
    "Send, receive, request, and understand every payment through one trusted personal payment experience.",
};

export default function PersonalPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-5xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Personal
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                Personal payments that simply make sense.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Send money, receive payments, request what you are owed, and
                keep every transaction understandable through one trusted
                experience designed to stay out of your way.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={siteConfig.betaUrl}
                  external
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Join beta
                </Button>

                <Button
                  href="#personal-workspace"
                  variant="outline"
                  size="lg"
                >
                  See how it works
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                A familiar experience
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                The complexity stays underneath.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                People should not need to understand payment rails,
                settlement infrastructure, or verification systems just to
                move money confidently.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Clear payment intent",
                  "Understandable activity history",
                  "Verified receipts",
                  "Context that remains attached",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/60 px-4 py-3"
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

      <Section id="personal-workspace" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <PersonalWorkspace {...personalWorkspaceDemo} />
          </div>
        </Container>
      </Section>

      <Section id="payment-experience" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <PaymentExperience />
          </div>
        </Container>
      </Section>

      <Section
        id="everyday-payments"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Everyday payments
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Built around the ways people already move money.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay is designed to feel familiar on day one while
                preserving more useful context behind every transaction.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {everydayActions.map((action) => (
                <article
                  key={action.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {action.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {action.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {action.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="moments" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Made for real life
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One payment experience for everyday moments.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The best payment technology should disappear into the moment
                instead of turning a simple transaction into a technical
                project.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {everydayMoments.map((moment, index) => (
                <article
                  key={moment}
                  className="rounded-[1.5rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-6 text-lg font-semibold">
                    {moment}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="trust" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Context builds trust
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  A payment should preserve more than an amount.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZephiPay does not just record that money moved. It is
                  designed to preserve the context that helps people
                  understand, verify, and trust the transaction later.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-border-default bg-background/70">
                {trustDetails.map((detail) => (
                  <article
                    key={detail.label}
                    className="grid gap-3 border-b border-border-subtle px-6 py-5 last:border-b-0 sm:grid-cols-[0.35fr_0.65fr]"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                      {detail.label}
                    </p>

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {detail.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="privacy" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Privacy without confusion
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Useful context does not require unnecessary exposure.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay is being designed around deliberate information
                sharing, clear records, and security controls that work
                quietly beneath the payment experience.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {privacyPrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">
                    {principle.title}
                  </h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="account" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                One clear account
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Your activity should remain understandable.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Balances, payment history, receipts, points, and trust signals
                belong in one calm view instead of being scattered across
                disconnected systems.
              </p>

              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                Interface values shown here are illustrative product examples,
                not live account data.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)]">
              <div className="border-b border-border-subtle px-7 py-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  Personal overview
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  Your ZephiPay
                </p>
              </div>

              {accountSignals.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-6 border-b border-border-subtle px-7 py-5 last:border-b-0"
                >
                  <span className="text-sm text-foreground-muted">
                    {label}
                  </span>

                  <span className="text-right text-sm font-medium text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid items-center gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Make payments feel effortless
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Move money without losing the story behind it.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Join the ZephiPay beta and help shape a personal payment
                experience built around simplicity, context, and trust.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Join beta
              </Button>

              <Button
                href="/business"
                variant="outline"
                size="lg"
              >
                Explore Business
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
