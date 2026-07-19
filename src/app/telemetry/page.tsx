import Link from "next/link";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const journey = [
  "You Send",
  "Protected",
  "Verified",
  "Delivered",
  "Receipt Ready",
];

const transparency = [
  {
    title: "Payment Status",
    body: "Know exactly where every transaction is from start to finish.",
  },
  {
    title: "Delivery Confirmation",
    body: "Receive confirmation when your transaction reaches its destination.",
  },
  {
    title: "Verified Receipts",
    body: "Access trusted receipts whenever you need them.",
  },
  {
    title: "Transaction History",
    body: "Review completed activity with clear context and timestamps.",
  },
  {
    title: "Payment Details",
    body: "See amounts, recipients, memos, and supporting information in one place.",
  },
  {
    title: "Transparency",
    body: "Understand what happened during every transaction—not just the outcome.",
  },
];

const audiences = [
  {
    title: "Personal",
    body: "Confident everyday payments with complete visibility.",
  },
  {
    title: "Business",
    body: "Clear records that help teams stay informed and organized.",
  },
  {
    title: "Intelligent Commerce",
    body: "Reliable transaction visibility for people, software, and AI.",
  },
];

export default function TransactionTransparencyPage() {
  return (
    <>
      <AmbientBackground />

      <Section className="pt-28">
        <Container className="max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-secondary">
            Transaction Transparency
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
            Every transaction tells a complete story.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground-secondary">
            ZephiPay keeps every transaction transparent—from authorization
            and verification to settlement and permanent receipts—so you always
            understand what happened, not just that it happened.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button href="/runtime">
              Explore Runtime
            </Button>

            <Button href="/security" variant="secondary">
              Security
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <h2 className="text-center text-3xl font-semibold">
            Every transaction follows a trusted path.
          </h2>

          <div className="mt-12 flex flex-col items-center gap-4">
            {journey.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center"
              >
                <div className="w-64 rounded-2xl border border-border-default bg-surface-secondary/40 px-6 py-5 text-center">
                  {step}
                </div>

                {index < journey.length - 1 && (
                  <div className="h-8 w-px bg-border-default" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transparency.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border-default bg-surface-secondary/40 p-8"
              >
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-foreground-secondary">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border-default bg-surface-secondary/40 p-8"
              >
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-foreground-secondary">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-border-default bg-surface-secondary/40 p-10">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Powered by the Zephyon Runtime
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Confidence built into every transaction.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Behind every ZephiPay transaction is the Zephyon Runtime,
              coordinating verification, protection, settlement, and trusted
              receipts before value reaches its destination.
            </p>

            <div className="mt-8">
              <Link
                href="/runtime"
                className="text-brand-secondary transition hover:text-brand-primary"
              >
                Learn about the Zephyon Runtime →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">
            Transparency builds confidence.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
            When every transaction is understandable and every receipt can be
            trusted, moving money becomes a more confident experience.
          </p>
        </Container>
      </Section>
    </>
  );
}
