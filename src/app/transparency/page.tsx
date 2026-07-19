import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";

const transactionJourney = [
  {
    number: "01",
    title: "Started",
    description:
      "Your transaction begins with clear details about who, what, and how much.",
  },
  {
    number: "02",
    title: "Protected",
    description:
      "ZephiPay checks the transaction before value begins moving.",
  },
  {
    number: "03",
    title: "Verified",
    description:
      "Important details and conditions are confirmed along the way.",
  },
  {
    number: "04",
    title: "Delivered",
    description:
      "You receive a clear confirmation when the transaction is completed.",
  },
  {
    number: "05",
    title: "Recorded",
    description:
      "A verified receipt preserves the transaction and its supporting context.",
  },
];

const visibilityFeatures = [
  {
    title: "Clear status",
    description:
      "See whether a transaction is pending, processing, completed, or unable to continue.",
  },
  {
    title: "Delivery confirmation",
    description:
      "Know when value reaches its intended destination instead of being left to guess.",
  },
  {
    title: "Verified receipts",
    description:
      "Access a dependable record containing the details that matter after completion.",
  },
  {
    title: "Understandable history",
    description:
      "Review past activity through clear descriptions, timestamps, amounts, and recipients.",
  },
  {
    title: "Preserved context",
    description:
      "Keep the purpose and supporting information surrounding each transaction.",
  },
  {
    title: "Visible outcomes",
    description:
      "Understand what happened even when a transaction is delayed, declined, or interrupted.",
  },
];

const audiences = [
  {
    title: "For people",
    description:
      "Send, receive, and request money with a clear view of every step.",
    href: "/personal",
    linkLabel: "Explore Personal",
  },
  {
    title: "For creators",
    description:
      "Understand incoming support, recurring activity, and completed payouts.",
    href: "/creators",
    linkLabel: "Explore Creators",
  },
  {
    title: "For businesses",
    description:
      "Keep transactions, settlement information, and payment records organized.",
    href: "/business",
    linkLabel: "Explore Business",
  },
];

export const metadata = {
  title: "Transaction Transparency | ZephiPay",
  description:
    "See how ZephiPay keeps transactions understandable from initiation and verification through delivery and verified receipts.",
};

export default function TransactionTransparencyPage() {
  return (
    <>
      <AmbientBackground />

      <Section className="pt-28">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-secondary">
            Transaction Transparency
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Every transaction tells a complete story.
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-foreground-secondary">
            ZephiPay keeps transactions understandable from the moment they
            begin through verification, delivery, and the receipt that remains
            afterward.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/personal" size="lg">
              Explore ZephiPay
            </Button>

            <Button href="/security" variant="secondary" size="lg">
              See how transactions are protected
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-secondary">
              A visible journey
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Know what is happening at every step.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Transactions should not disappear into a loading screen. ZephiPay
              keeps each stage clear, so you know what has happened and what
              comes next.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-5">
            {transactionJourney.map((step) => (
              <article
                key={step.number}
                className="min-h-64 bg-background p-7"
              >
                <p className="text-xs font-medium tracking-[0.2em] text-brand-secondary">
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
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-secondary">
                What you will always know
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
                More than a success message.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay preserves the information people and organizations
                need to understand a transaction later—not merely whether money
                moved.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {visibilityFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[1.5rem] border border-border-default bg-surface-secondary/40 p-7"
                >
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-secondary">
              Designed for everyday activity
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Clarity wherever value moves.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-[2rem] border border-border-default bg-surface-secondary/40 p-8"
              >
                <h3 className="text-2xl font-semibold">
                  {audience.title}
                </h3>

                <p className="mt-5 leading-8 text-foreground-secondary">
                  {audience.description}
                </p>

                <Link
                  href={audience.href}
                  className="mt-8 inline-flex text-sm font-medium text-brand-secondary transition hover:text-brand-primary"
                >
                  {audience.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-secondary">
              Quietly coordinated underneath
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
              The complexity stays behind the experience.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              The Zephyon Runtime coordinates protection, verification,
              settlement, and receipt creation behind every ZephiPay
              transaction. You receive the clarity without having to manage the
              machinery.
            </p>

            <div className="mt-9">
              <Button href="/runtime" variant="outline">
                Learn about the Zephyon Runtime
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Confidence begins with understanding.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
            When every transaction remains visible, understandable, and
            verifiable, moving value becomes easier to trust.
          </p>

          <div className="mt-10">
            <Button href="/security" size="lg">
              Explore ZephiPay security
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
