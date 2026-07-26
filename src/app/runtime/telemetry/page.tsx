import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { RuntimeTelemetryWorkspace } from "@/components/marketing/runtime-observability/RuntimeTelemetryWorkspace";
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

const visibilityLayers = [
  {
    title: "Execution stages",
    description:
      "Follow an economic event as it moves through identity, policy, risk, settlement, and verification.",
  },
  {
    title: "Runtime decisions",
    description:
      "Preserve structured outcomes so applications can understand why execution proceeded or stopped.",
  },
  {
    title: "Settlement history",
    description:
      "Connect orchestration and execution results to an inspectable settlement record.",
  },
];

export default function RuntimeTelemetryPage() {
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
              Runtime telemetry
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              See how economic events move.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Observe execution stages, Runtime decisions, settlement
              outcomes, and verification context through one coherent event
              history.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Telemetry turns payment infrastructure from an opaque processor
              into an inspectable economic system.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#telemetry-workspace"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore telemetry
              </Button>

              <Button href="/runtime" variant="outline" size="lg">
                Explore the Runtime
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="telemetry-workspace" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Event observability
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Follow the Runtime, stage by stage.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Select any stage or let the walkthrough advance automatically
                through the economic event.
              </p>
            </div>

            <RuntimeTelemetryWorkspace />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-6 md:grid-cols-3">
              {visibilityLayers.map((layer) => (
                <article
                  key={layer.title}
                  className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-7 backdrop-blur-xl"
                >
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">
                    {layer.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
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
          <div className="rounded-[2rem] border border-border-subtle bg-background/55 px-7 py-12 text-center backdrop-blur-xl sm:px-12">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              From observation to proof
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Every completed event should leave an inspectable record.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Settlement Records will connect Runtime execution, verification,
              and permanent economic history.
            </p>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
