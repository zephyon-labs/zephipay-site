import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { DocumentationHub } from "@/components/marketing/developer-tools/DocumentationHub";
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

const paths = [
  {
    number: "01",
    title: "Understand",
    description:
      "Learn how the Runtime coordinates identity, policy, risk, settlement, and verification.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Explore SDK and API patterns for integrating economic intelligence into software.",
  },
  {
    number: "03",
    title: "Operate",
    description:
      "Inspect telemetry, decisions, receipts, and settlement records after execution.",
  },
];

export default function DocumentationPage() {
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
              Developer documentation
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Find your path through the Runtime.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Understand the architecture, explore integration patterns, and
              follow economic events from intent to verified receipt.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              One documentation hub for applications, autonomous agents, and
              the infrastructure coordinating them.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#documentation-library"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Browse documentation
              </Button>

              <Button
                href="/developers/runtime-sdk"
                variant="outline"
                size="lg"
              >
                Explore Runtime SDK
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="documentation-library" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <DocumentationHub />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-6 md:grid-cols-3">
              {paths.map((path) => (
                <article
                  key={path.title}
                  className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-7 backdrop-blur-xl"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                    {path.number}
                  </p>

                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                    {path.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {path.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
