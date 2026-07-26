import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SettlementRecordWorkspace } from "@/components/marketing/runtime-observability/SettlementRecordWorkspace";
import { Button } from "@/components/ui/Button";

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

const recordBenefits = [
  {
    title: "More than confirmation",
    description:
      "A settlement record preserves the event surrounding value movement instead of returning only a success message.",
  },
  {
    title: "Readable by machines",
    description:
      "Applications and autonomous agents can inspect structured outcomes and verification state consistently.",
  },
  {
    title: "Understandable by people",
    description:
      "Support teams, businesses, and users can follow what happened without decoding raw infrastructure.",
  },
];

export default function SettlementRecordsPage() {
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
              Settlement records
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Every economic event should leave proof.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Connect intent, authorization, Runtime decisions, settlement,
              verification, and receipts through one inspectable record.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              A payment should not disappear behind a generic confirmation
              screen. Its economic history should remain understandable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#record-workspace"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Follow the record
              </Button>

              <Button
                href="/runtime/telemetry"
                variant="outline"
                size="lg"
              >
                Explore Runtime telemetry
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="record-workspace" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                From intent to proof
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Watch the economic event become a record.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Let the lifecycle advance automatically or select any stage to
                inspect what becomes part of the final receipt.
              </p>
            </div>

            <SettlementRecordWorkspace />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-6 md:grid-cols-3">
              {recordBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-7 backdrop-blur-xl"
                >
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">
                    {benefit.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-border-subtle bg-background/55 px-7 py-12 text-center backdrop-blur-xl sm:px-12">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Economic infrastructure
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Payments are the beginning.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Zephyon turns value movement into a coordinated, verifiable
              economic event.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/runtime"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore Zephyon Runtime
              </Button>

              <Button
                href="/developers/documentation"
                variant="outline"
                size="lg"
              >
                Browse documentation
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
