import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { VerifiedReceiptInterface } from "@/components/product/personal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const receiptCapabilities = [
  {
    number: "01",
    title: "Preserve the outcome",
    description:
      "Keep the transaction status, amount, participants, purpose, network, and timestamps attached to one dependable record.",
  },
  {
    number: "02",
    title: "Connect settlement evidence",
    description:
      "Associate the receipt with available transaction identifiers, network confirmation, and settlement metadata.",
  },
  {
    number: "03",
    title: "Explain how it completed",
    description:
      "Show the sequence from payment intent through Runtime evaluation, settlement, and receipt generation.",
  },
  {
    number: "04",
    title: "Make records useful later",
    description:
      "Prepare receipts for personal review, support, reconciliation, accounting, and machine-readable workflows.",
  },
];

const audiences = [
  {
    title: "For people",
    description:
      "Understand what was paid, who participated, why it happened, and whether the transaction completed.",
  },
  {
    title: "For businesses",
    description:
      "Keep stronger payment evidence for support, reconciliation, refunds, reporting, and customer records.",
  },
  {
    title: "For creators",
    description:
      "Organize tips, memberships, purchases, and supporter transactions through clear records.",
  },
  {
    title: "For intelligent agents",
    description:
      "Produce structured evidence that software can evaluate, store, reference, and act upon.",
  },
];

const evidenceLayers = [
  {
    title: "Payment context",
    description:
      "Participants, purpose, amount, asset, and timestamps explain the transaction itself.",
  },
  {
    title: "Runtime decision",
    description:
      "Identity, compliance, risk, and policy results explain why the payment was allowed to proceed.",
  },
  {
    title: "Settlement result",
    description:
      "Network references and confirmation data explain what completed on the selected rail.",
  },
  {
    title: "Preserved record",
    description:
      "The receipt ties the payment journey together in one understandable artifact.",
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

function ReceiptIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

export const metadata = {
  title: "Verified Receipts | ZephiPay",
  description:
    "Preserve payment context, Runtime decisions, settlement evidence, and transaction outcomes through ZephiPay verified receipts.",
};

export default function PersonalReceiptsPage() {
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
                Personal · Verified Receipts
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                A receipt should prove something.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Preserve payment context, Runtime decisions, settlement
                evidence, and the final transaction outcome through one
                understandable record.
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
                  href="#receipt-interface"
                  variant="outline"
                  size="lg"
                >
                  View receipt structure
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                <ReceiptIcon />
              </div>

              <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                More than confirmation
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                Evidence that remains connected.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                A ZephiPay receipt is designed to preserve not only the result,
                but also the context and system decisions that produced it.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Payment context",
                  "Runtime decision",
                  "Settlement evidence",
                  "Verifiable transaction record",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border-subtle bg-background/60 px-4 py-3 text-sm text-foreground-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="receipt-interface" className="scroll-mt-28">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              See the experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              One record for the entire payment journey.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Explore the structure of a ZephiPay receipt and the Runtime
              timeline that will populate after real authenticated activity.
            </p>
          </div>

          <VerifiedReceiptInterface />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Receipt essentials
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Preserve enough evidence to understand what happened later.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Verified receipts connect transaction context to the system and
                settlement evidence behind the payment.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {receiptCapabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {capability.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {capability.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                One receipt, many audiences
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Useful to people. Structured for systems.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The same payment record can support personal understanding,
                business operations, creator organization, and software-driven
                workflows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <article
                  key={audience.title}
                  className="rounded-[1.5rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">{audience.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {audience.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Evidence layers
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A complete record is built in layers.
              </h2>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {evidenceLayers.map((layer, index) => (
                <article
                  key={layer.title}
                  className="rounded-[1.35rem] border border-border-subtle bg-background/55 p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">{layer.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                    {layer.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-7 py-12 text-center shadow-[var(--shadow-medium)] sm:px-12 sm:py-16">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Verified payment records
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Know what happened. Preserve how it completed.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Join the ZephiPay beta and help shape payment records designed
              for trust, clarity, and intelligent commerce.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Join beta
              </Button>

              <Button href="/personal/activity" variant="outline" size="lg">
                Explore activity
              </Button>

              <Button href="/personal/wallet" variant="outline" size="lg">
                Explore wallet
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
