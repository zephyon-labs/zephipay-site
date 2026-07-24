import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ActivityInterfacePreview } from "@/components/product/personal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const activityCapabilities = [
  {
    number: "01",
    title: "See every movement",
    description:
      "Review payments, requests, transfers, funding, and meaningful account events through one history.",
  },
  {
    number: "02",
    title: "Understand the purpose",
    description:
      "Keep participants, transaction intent, timestamps, and status connected to the activity.",
  },
  {
    number: "03",
    title: "Follow the outcome",
    description:
      "Know whether an action completed, remains pending, was declined, or needs attention.",
  },
  {
    number: "04",
    title: "Open the evidence",
    description:
      "Move from activity into its verified receipt and settlement details without losing context.",
  },
];

const recordDetails = [
  ["Status", "Completed, pending, declined, refunded, or cancelled"],
  ["Participants", "Who sent, requested, received, or coordinated value"],
  ["Amount", "The value and asset associated with the activity"],
  ["Purpose", "Why the payment or account action occurred"],
  ["Time", "When the activity began, changed, and completed"],
  ["Evidence", "Receipt and settlement details when available"],
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

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 18V8M10 18V4M16 18v-7M22 18H2" />
    </svg>
  );
}

export const metadata = {
  title: "Activity | ZephiPay",
  description:
    "Review payments, requests, transfers, funding, and verified transaction history through ZephiPay.",
};

export default function PersonalActivityPage() {
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
                Personal · Activity
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                Your payment history should explain itself.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Review payments, requests, transfers, and account events
                through one clear history where status, purpose, participants,
                and verification remain connected.
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
                  href="#activity-interface"
                  variant="outline"
                  size="lg"
                >
                  View interface
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                <ActivityIcon />
              </div>

              <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Activity that stays useful
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                More than a transaction list.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                ZephiPay activity shows what happened, why it happened, who
                participated, and what evidence remains.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Clear transaction status",
                  "Purpose and participants",
                  "Connected verified receipts",
                  "Searchable payment history",
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

      <Section id="activity-interface" className="scroll-mt-28">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              See the experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Activity designed for understanding, not reconstruction.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Filter the preview, select an activity record, and see how
              transaction context remains connected to its outcome.
            </p>
          </div>

          <ActivityInterfacePreview />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Activity essentials
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Understand every action without piecing it together yourself.
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {activityCapabilities.map((capability) => (
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
          <div className="grid gap-12 rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] lg:grid-cols-[0.8fr_1.2fr] sm:p-10 lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Inside every record
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The details that make activity dependable.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Each record preserves enough context to remain useful today
                and verifiable later.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-border-default bg-background/55">
              {recordDetails.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid gap-2 px-6 py-5 sm:grid-cols-[0.35fr_0.65fr] ${
                    index !== recordDetails.length - 1
                      ? "border-b border-border-subtle"
                      : ""
                  }`}
                >
                  <p className="font-medium">{label}</p>
                  <p className="text-sm leading-7 text-foreground-secondary">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-7 py-12 text-center shadow-[var(--shadow-medium)] sm:px-12 sm:py-16">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Personal activity
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Keep every payment understandable from intent to receipt.
            </h2>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Join beta
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
