import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AccountAwareBetaCta } from "@/components/auth/AccountAwareBetaCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SettingsInterface } from "@/components/product/personal";
import { Button } from "@/components/ui/Button";

const settingsAreas = [
  {
    number: "01",
    title: "Personal preferences",
    description:
      "Control visual atmosphere, language, region, currency, and timestamp behavior.",
  },
  {
    number: "02",
    title: "Notification control",
    description:
      "Choose which payment, receipt, identity, and product events deserve your attention.",
  },
  {
    number: "03",
    title: "Accessible by design",
    description:
      "Adjust motion, contrast, text size, and assistive interface behavior.",
  },
  {
    number: "04",
    title: "Future connectivity",
    description:
      "Manage connected applications and preview eligible Labs capabilities.",
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
  title: "Personal Settings | ZephiPay",
  description:
    "Customize ZephiPay preferences, notifications, accessibility, connected applications, and experimental features.",
};

export default function PersonalSettingsPage() {
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
              Personal · Settings
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
              Make ZephiPay work your way.
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
              Configure preferences, notifications, accessibility, connected
              applications, and future product experiments from one calm
              interface.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <AccountAwareBetaCta
                size="lg"
                rightIcon={<ArrowIcon />}
              />

              <Button href="#settings-interface" variant="outline" size="lg">
                Open settings
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="settings-interface" className="scroll-mt-28">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Settings experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Useful controls, not a list of promises.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Explore the same kinds of controls that will eventually manage
              an authenticated ZephiPay experience.
            </p>
          </div>

          <SettingsInterface />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Personal control
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The product should adapt without becoming complicated.
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {settingsAreas.map((area) => (
                <article
                  key={area.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {area.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">{area.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {area.description}
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
              Personal experience
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Your preferences should belong to you.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Join the ZephiPay beta and help shape a financial experience
              designed around clarity, control, and individual choice.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <AccountAwareBetaCta
                size="lg"
                rightIcon={<ArrowIcon />}
              />

              <Button href="/personal/identity" variant="outline" size="lg">
                Explore identity
              </Button>

              <Button href="/personal/wallet" variant="outline" size="lg">
                Explore wallet
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
