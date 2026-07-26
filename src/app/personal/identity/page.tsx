import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { IdentityInterface } from "@/components/product/personal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const identityLayers = [
  {
    number: "01",
    title: "Verification",
    description:
      "Confirm the participant information required for supported financial activity.",
  },
  {
    number: "02",
    title: "Connections",
    description:
      "Associate supported wallets, accounts, devices, and recovery methods with one participant profile.",
  },
  {
    number: "03",
    title: "Trust",
    description:
      "Reflect reliable behavior through eligible identity, transaction, receipt, and settlement signals.",
  },
  {
    number: "04",
    title: "Participation",
    description:
      "Recognize eligible ecosystem activity through Zephyon Points and future milestones.",
  },
];

const participantTypes = [
  {
    title: "People",
    description:
      "Connect personal verification, accounts, transaction history, trust, and participation.",
  },
  {
    title: "Business",
    description:
      "Establish a verified operating identity for commerce, settlement, reporting, and policy.",
  },
  {
    title: "Creators",
    description:
      "Connect creator activity, supporter transactions, earnings records, and reputation.",
  },
  {
    title: "Intelligent agents",
    description:
      "Associate ownership, permissions, capabilities, execution history, and trust with an agent identity.",
  },
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

export const metadata = {
  title: "Personal Identity | ZephiPay",
  description:
    "Manage personal verification, connected accounts, Trust Score, Zephyon Points, security, and recovery through the ZephiPay Identity Hub.",
};

export default function PersonalIdentityPage() {
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
              Personal · Identity
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
              More than verification. Your economic identity.
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
              Bring verification, connected accounts, trust, participation,
              security, and recovery into one coherent participant profile.
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

              <Button href="#identity-interface" variant="outline" size="lg">
                Explore identity
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="identity-interface" className="scroll-mt-28">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Identity experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              See the participant as a complete profile.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Trust Score and Zephyon Points live inside Identity because both
              describe how a participant is recognized within the ecosystem.
            </p>
          </div>

          <IdentityInterface />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Identity layers
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One identity, built from several kinds of evidence.
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {identityLayers.map((layer) => (
                <article
                  key={layer.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {layer.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">{layer.title}</h3>

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
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Participant identity
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The model extends beyond personal accounts.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Zephyon can apply the same identity foundation to people,
                businesses, creators, and intelligent agents while preserving
                the signals relevant to each participant type.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {participantTypes.map((participant) => (
                <article
                  key={participant.title}
                  className="rounded-[1.5rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">
                    {participant.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {participant.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-7 py-12 text-center shadow-[var(--shadow-medium)] sm:px-12 sm:py-16">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Trusted participation
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Verify who participates. Recognize how they participate.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Join the ZephiPay beta and help shape an identity model designed
              for people, businesses, creators, and intelligent agents.
            </p>

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

              <Button href="/personal/receipts" variant="outline" size="lg">
                Explore receipts
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
