import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ZeraPersonalJourney } from "@/components/marketing/zera/ZeraPersonalJourney";
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

const personalBenefits = [
  {
    number: "01",
    title: "Everyday access",
    description:
      "Use ZephiPay for supported personal payment experiences without requiring ZERA ownership.",
  },
  {
    number: "02",
    title: "Optional advantages",
    description:
      "Choose ZERA when eligible savings, rewards, staking, or premium access provide meaningful value.",
  },
  {
    number: "03",
    title: "Intelligent participation",
    description:
      "Connect personal assistants and automated services to controlled economic utility through Zephyon.",
  },
];

export default function ZeraPersonalPage() {
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
              ZERA for personal use
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Participate your way.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Use ZephiPay normally, then choose ZERA when it helps you save,
              earn, unlock, or access more.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA is an optional utility layer designed to deepen personal
              participation without standing between you and basic payment
              access.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#personal-journey"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore personal utility
              </Button>

              <Button href="/personal" variant="outline" size="lg">
                Explore ZephiPay Personal
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="personal-journey" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Participation journey
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Start with payments. Add utility when it matters.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Let the journey advance automatically or select any stage to
                inspect how personal participation can expand.
              </p>
            </div>

            <ZeraPersonalJourney />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-6 md:grid-cols-3">
              {personalBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.75rem] border border-border-subtle bg-background/45 p-7 backdrop-blur-xl"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                    {benefit.number}
                  </p>

                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
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
              Explore deeper utility
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              See the full ZERA utility model.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Explore how savings, rewards, staking, creator support, and
              intelligent services connect across the ecosystem.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                href="/zera/utility"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore ZERA utility
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
