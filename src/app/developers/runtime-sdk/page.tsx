import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { RuntimeSdkWorkspace } from "@/components/marketing/developer-tools/RuntimeSdkWorkspace";
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

const capabilities = [
  {
    title: "Typed economic intents",
    description:
      "Describe participants, value, purpose, and execution context through a consistent application interface.",
  },
  {
    title: "Runtime decisions",
    description:
      "Receive structured approval, denial, verification, and settlement outcomes instead of opaque processor responses.",
  },
  {
    title: "Deterministic receipts",
    description:
      "Give applications and autonomous systems an inspectable record of what happened after execution.",
  },
];

export default function RuntimeSdkPage() {
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
              Runtime SDK
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Build economic intelligence into software.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Connect applications and AI agents to identity, policy,
              settlement, verification, and receipts through one Runtime
              interface.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Explore the intended developer workflow before the public SDK is
              released.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#sdk-workspace"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore the SDK
              </Button>

              <Button href="/developers/api" variant="outline" size="lg">
                View Runtime APIs
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="sdk-workspace" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Developer workspace
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From intent to verified receipt.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Follow the core integration path and inspect how the Runtime
                can fit into a server-side application.
              </p>
            </div>

            <RuntimeSdkWorkspace />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  One interface
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Built for more than transfers.
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {capabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-6 backdrop-blur-xl"
                  >
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">
                      {capability.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {capability.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-border-subtle bg-background/55 px-7 py-12 text-center backdrop-blur-xl sm:px-12">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Continue building
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Inspect the Runtime at the API level.
            </h2>

            <div className="mt-8 flex justify-center">
              <Button
                href="/developers/api"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore Runtime APIs
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
