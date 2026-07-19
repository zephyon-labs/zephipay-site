import Link from "next/link";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const metrics = [
  { label: "Runtime Status", value: "Healthy" },
  { label: "Average Decision", value: "0.42 ms" },
  { label: "Verified Receipts", value: "12,847" },
  { label: "Settlement Success", value: "99.99%" },
  { label: "Runtime Availability", value: "99.99%" },
  { label: "RPC Health", value: "Excellent" },
];

const events = [
  "Identity Verified",
  "Compliance Passed",
  "Risk Approved",
  "Policy Applied",
  "Treasury Recorded",
  "Settlement Confirmed",
  "Receipt Generated",
  "Verification Complete",
];

export default function TelemetryPage() {
  return (
    <>
      <AmbientBackground />

      <Section className="pt-28">
        <Container className="max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-secondary">
            Zephyon Telemetry
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
            Observe every payment with confidence.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground-secondary">
            Telemetry provides visibility into the Zephyon Runtime, helping
            people, businesses, and developers understand how intelligent
            payments move through the platform.
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
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-border-default bg-surface-secondary/40 p-8"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-foreground-muted">
                  {metric.label}
                </p>

                <p className="mt-4 text-3xl font-semibold">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <h2 className="text-3xl font-semibold">
            Runtime Event Timeline
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {events.map((event) => (
              <div
                key={event}
                className="rounded-2xl border border-border-default bg-surface-secondary/40 p-5 text-center"
              >
                {event}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-border-default bg-surface-secondary/40 p-10">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Why Telemetry Matters
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Payments should be understandable.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Traditional payment systems often hide what happens after you click
              send. Zephyon Telemetry makes the Runtime observable, providing
              insight into verification, settlement, and the health of the
              payment lifecycle.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">
            Transparency builds trust.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
            Zephyon doesn't simply process payments. It preserves the context
            that makes every transaction understandable and verifiable.
          </p>

          <div className="mt-10">
            <Link
              href="/runtime"
              className="text-brand-secondary transition hover:text-brand-primary"
            >
              Continue exploring the Runtime →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
