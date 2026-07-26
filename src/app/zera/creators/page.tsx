import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ZeraCreatorLoop } from "@/components/marketing/zera/ZeraCreatorLoop";
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const creatorUtilityPillars = [
  {
    number: "01",
    title: "Receive direct support",
    description:
      "Accept qualifying tips, payments, memberships, and audience contributions through supported ZephiPay experiences.",
  },
  {
    number: "02",
    title: "Organize creator income",
    description:
      "Connect verified receipts, transaction history, and structured records to one understandable financial view.",
  },
  {
    number: "03",
    title: "Unlock advanced tools",
    description:
      "Subscribe or stake ZERA to access qualifying analytics, audience tools, automation, and intelligent services.",
  },
  {
    number: "04",
    title: "Earn aligned rewards",
    description:
      "Recognize meaningful creator participation through defined, transparent, and abuse-resistant ecosystem programs.",
  },
];

const supportModels = [
  {
    title: "Tips and contributions",
    description:
      "Let audiences support individual moments, releases, performances, lessons, streams, or community work.",
    features: [
      "Flexible support amounts",
      "Verified payment records",
      "Audience-facing payment experiences",
    ],
  },
  {
    title: "Recurring memberships",
    description:
      "Support qualifying subscription and membership models for ongoing creator-audience relationships.",
    features: [
      "Recurring supporter access",
      "Creator-defined participation",
      "Clear membership records",
    ],
  },
  {
    title: "Products and services",
    description:
      "Receive payment for digital products, commissions, instruction, consulting, access, or creative services.",
    features: [
      "Purpose-linked payments",
      "Business-ready records",
      "Supported fulfillment workflows",
    ],
  },
];

const creatorAdvantages = [
  {
    title: "Eligible platform savings",
    description:
      "Qualifying ZERA participation can reduce eligible creator service, payment, or premium-tool costs.",
  },
  {
    title: "Advanced analytics",
    description:
      "Access deeper insight into earnings, supporter activity, recurring participation, and creator performance.",
  },
  {
    title: "Audience intelligence",
    description:
      "Understand support patterns and community activity without reducing audiences to fragmented processor data.",
  },
  {
    title: "Financial automation",
    description:
      "Use supported tools for categorization, reporting, goals, notifications, and creator-business organization.",
  },
  {
    title: "Expanded creator access",
    description:
      "Unlock qualifying account features, participation limits, integrations, and intelligent services.",
  },
  {
    title: "Ecosystem recognition",
    description:
      "Participate in defined creator programs that reward useful contributions, adoption, and community growth.",
  },
];

const recordsFeatures = [
  "Verified payment receipts",
  "Creator income history",
  "Tips and membership records",
  "Purpose and source context",
  "Searchable activity",
  "Tax-ready organization",
];

const accessOptions = [
  {
    label: "Subscribe",
    title: "Pay for premium creator capabilities.",
    description:
      "Use supported traditional payment methods or digital assets to access qualifying creator tools without holding ZERA.",
    features: [
      "Mainstream payment access",
      "Predictable service plans",
      "No token requirement",
    ],
  },
  {
    label: "Stake",
    title: "Commit ZERA for qualifying access.",
    description:
      "Stake ZERA to unlock eligible creator services, expanded features, or participation benefits.",
    features: [
      "Purpose-driven staking",
      "Qualifying creator access",
      "Long-term ecosystem alignment",
    ],
  },
];

const rewardSignals = [
  {
    title: "Verified creator activity",
    description:
      "Recognize legitimate economic participation supported by verifiable records.",
  },
  {
    title: "Audience growth",
    description:
      "Support defined programs that reward sustainable participation rather than empty engagement.",
  },
  {
    title: "Ecosystem contribution",
    description:
      "Recognize creators who educate, build, collaborate, or expand useful ecosystem activity.",
  },
  {
    title: "Community value",
    description:
      "Support meaningful creator-led communities through transparent program requirements.",
  },
];

const creatorControls = [
  {
    title: "Creator-owned participation",
    description:
      "Creators maintain control over the work, services, communities, and experiences they choose to offer.",
  },
  {
    title: "Clear supporter context",
    description:
      "Payments can carry useful purpose, membership, campaign, or support context for better organization.",
  },
  {
    title: "Defined access rules",
    description:
      "Creators decide how qualifying memberships, services, benefits, and audience access are structured.",
  },
  {
    title: "Responsible reward design",
    description:
      "Programs should include eligibility requirements, anti-abuse controls, and transparent terms.",
  },
];

export default function ZeraCreatorsPage() {
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
              ZERA for creators
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Better economics for independent creation.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Receive direct support, organize income, unlock advanced tools,
              reduce eligible costs, and strengthen long-term creator
              participation.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA is designed to support creators without making token
              ownership a requirement for using the core ZephiPay creator
              experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#creator-loop"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore creator utility
              </Button>

              <Button href="/creators" variant="outline" size="lg">
                View creator platform
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator-first access
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Create and get paid without requiring ZERA.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Core creator participation should remain accessible. ZERA adds
                optional economic advantages, premium access, staking paths,
                and ecosystem rewards when those benefits match a creator&apos;s
                needs.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Optional by design
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Receive supported payments without owning ZERA.",
                  "Use verified records and creator tools through ZephiPay.",
                  "Choose subscription or staking for qualifying premium access.",
                  "Participate in ZERA programs only when they create value.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-4"
                  >
                    <span className="mt-0.5 text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <p className="text-sm leading-6 text-foreground-secondary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="creator-loop" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator growth loop
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Follow support from creation to sustainable growth.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Explore how direct support, verified records, expanded
                capabilities, and aligned rewards can reinforce a creator&apos;s
                work over time.
              </p>
            </div>

            <ZeraCreatorLoop />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Core creator utility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Four ways ZERA strengthens creator economics.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {creatorUtilityPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="group min-h-[18rem] rounded-[1.9rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors hover:bg-surface-secondary"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                    {pillar.number}
                  </p>

                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">
                    {pillar.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {pillar.description}
                  </p>

                  <div className="mt-8 h-px w-12 bg-brand-primary/50 transition-all duration-300 group-hover:w-24" />
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Audience support
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                More ways for audiences to support meaningful work.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Creator payments should adapt to the relationship between the
                creator, the work, and the people choosing to support it.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {supportModels.map((model) => (
                <article
                  key={model.title}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                    {model.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {model.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {model.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                      >
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator advantages
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Utility beyond receiving payment.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZERA can connect qualifying economic benefits to the broader
                work of running, understanding, and growing a creator business.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {creatorAdvantages.map((advantage) => (
                <article
                  key={advantage.title}
                  className="min-h-[15rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {advantage.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {advantage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Verified records
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Creator income should be understandable.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Instead of stitching together screenshots, processor exports,
                and disconnected statements, creators can organize supported
                economic activity through verified payment records.
              </p>

              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                Tax-ready organization helps creators prepare records and
                categories. It does not replace professional tax guidance or
                guarantee filing treatment.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {recordsFeatures.map((feature, index) => (
                <article
                  key={feature}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    0{index + 1}
                  </p>

                  <p className="mt-5 font-medium">{feature}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="creator-access" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Subscribe or stake
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Choose how to access advanced creator tools.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Creators should be able to select the access model that best
                fits their business, financial preferences, and level of
                ecosystem participation.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {accessOptions.map((option) => (
                <article
                  key={option.label}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {option.label}
                  </p>

                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                    {option.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {option.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {option.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                      >
                        <span className="text-brand-secondary">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-foreground-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute right-[-6rem] top-[-8rem] h-80 w-80 rounded-full bg-brand-primary/10 blur-[90px]" />

            <div className="relative">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Creator rewards
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Recognize genuine creator participation.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Reward programs should reinforce useful activity, meaningful
                  communities, ecosystem contribution, and long-term creator
                  value—not manufactured engagement.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2">
                {rewardSignals.map((signal) => (
                  <article
                    key={signal.title}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {signal.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {signal.description}
                    </p>
                  </article>
                ))}
              </div>

              <p className="mt-8 max-w-4xl text-sm leading-7 text-foreground-muted">
                Reward programs would depend on published eligibility,
                verification, availability, anti-abuse controls, and applicable
                requirements. Rewards are not guaranteed earnings.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Creator control
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Tools that strengthen independence.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZERA utility should improve creator capabilities without
                  taking ownership of the creator&apos;s identity, audience,
                  work, or business decisions.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {creatorControls.map((control) => (
                  <article
                    key={control.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {control.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {control.description}
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
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass px-7 py-14 text-center shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-x-[15%] top-0 h-40 rounded-full bg-brand-primary/10 blur-[70px]" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator economy
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Build the work. Understand the economics.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore the broader ZephiPay creator experience or continue
                through the ZERA utility system.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/creators"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore creator platform
                </Button>

                <Button href="/zera/utility" variant="outline" size="lg">
                  Return to ZERA utility
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
