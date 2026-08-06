import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { RuntimeApiExplorer } from "@/components/marketing/developer-tools/RuntimeApiExplorer";
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

const principles = [
  {
    number: "01",
    title: "Economic context",
    description:
      "Requests describe the participant, purpose, asset, recipient, and intended action, not only an amount.",
  },
  {
    number: "02",
    title: "Structured decisions",
    description:
      "Applications receive explicit Runtime outcomes that can be inspected and handled consistently.",
  },
  {
    number: "03",
    title: "Verifiable completion",
    description:
      "Settlement results can produce deterministic receipts rather than disappearing behind a generic success state.",
  },
];

export default function RuntimeApiPage() {
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
              Runtime APIs
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Coordinate economic events through one API.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Create intents, execute approved payments, verify receipts, and
              inspect Runtime outcomes through structured interfaces.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Explore the intended API architecture without relying on
              fabricated live responses.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#api-explorer"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Open API explorer
              </Button>

              <Button
                href="/developers/runtime-sdk"
                variant="outline"
                size="lg"
              >
                View Runtime SDK
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="api-explorer" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                API explorer
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Inspect the shape of the Runtime.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Move through the intended endpoints and compare request and
                response structures from one workspace.
              </p>
            </div>

            <RuntimeApiExplorer />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-7 backdrop-blur-xl"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                    {principle.number}
                  </p>

                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {principle.description}
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
              Developer path
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Prefer a typed integration?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Walk through the same Runtime lifecycle through the SDK
              workspace.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                href="/developers/runtime-sdk"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore Runtime SDK
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
