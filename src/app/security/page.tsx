import Link from "next/link";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const pillars = [
  {
    title: "Identity",
    body: "Verify who is participating before value moves.",
  },
  {
    title: "Compliance",
    body: "Coordinate AML, sanctions, and policy requirements automatically.",
  },
  {
    title: "Risk",
    body: "Evaluate transactions before they become irreversible.",
  },
  {
    title: "Policy",
    body: "Apply intelligent rules based on context instead of guesswork.",
  },
  {
    title: "Verification",
    body: "Produce deterministic receipts that can be trusted later.",
  },
  {
    title: "Transparency",
    body: "Maintain an auditable history from approval through settlement.",
  },
];

const audiences = [
  {
    title: "People",
    body: "Confident everyday payments without additional complexity.",
  },
  {
    title: "Businesses",
    body: "Policy-driven commerce with stronger operational visibility.",
  },
  {
    title: "AI",
    body: "Machine-readable trust designed for autonomous economic activity.",
  },
];

export default function SecurityPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section className="pt-28">
        <Container className="max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-secondary">
            Security
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
            Security that works before payments happen.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground-secondary">
            Identity, compliance, policy, risk, verification, and transparency
            quietly coordinate every transaction before value ever moves.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button href="/runtime">
              Explore Runtime
            </Button>

            <Button href="/transparency" variant="secondary">
              Transaction Transparency
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <h2 className="text-3xl font-semibold">
            Every payment follows the same trusted path.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-7 text-center">
            {[
              "Identity",
              "Compliance",
              "Risk",
              "Policy",
              "Approval",
              "Settlement",
              "Verified Receipt",
            ].map((step) => (
              <div
                key={step}
                className="rounded-2xl border border-border-default bg-surface-secondary/40 p-5"
              >
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-border-default bg-surface-secondary/40 p-7"
              >
                <h3 className="text-xl font-semibold">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-border-default bg-surface-secondary/40 p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-secondary">
              Verified Receipt
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Trust doesn&apos;t disappear after payment.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Timestamp",
                "Payment ID",
                "Runtime Decision",
                "Settlement Status",
                "Verification",
                "Receipt Integrity",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border-subtle px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
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
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">
            Trust is part of every payment.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
            Security isn&apos;t something added afterward. It is built into every
            decision the Zephyon Runtime makes before money moves.
          </p>

          <div className="mt-10">
            <Link
              href="/runtime"
              className="text-brand-secondary transition hover:text-brand-primary"
            >
              Explore the Zephyon Runtime →
            </Link>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
