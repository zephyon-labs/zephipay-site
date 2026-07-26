import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ZeraTokenomicsExplorer } from "@/components/marketing/zera/ZeraTokenomicsExplorer";
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

const supplyPrinciples = [
  {
    number: "01",
    title: "Fixed supply",
    description:
      "ZERA has a defined maximum supply of 200,000,000 tokens, with no future minting planned.",
  },
  {
    number: "02",
    title: "Transparent allocation",
    description:
      "The full supply is assigned across six clearly defined economic categories.",
  },
  {
    number: "03",
    title: "Long-term alignment",
    description:
      "Treasury, ecosystem, utility, liquidity, team, and reserve allocations serve distinct protocol responsibilities.",
  },
  {
    number: "04",
    title: "Utility-driven economics",
    description:
      "Token demand is intended to grow from useful services, participation, access, and economic activity.",
  },
];

const allocationSummary = [
  {
    label: "Treasury",
    percentage: "30%",
    amount: "60M",
  },
  {
    label: "Ecosystem",
    percentage: "20%",
    amount: "40M",
  },
  {
    label: "Utility",
    percentage: "15%",
    amount: "30M",
  },
  {
    label: "Liquidity",
    percentage: "15%",
    amount: "30M",
  },
  {
    label: "Team",
    percentage: "15%",
    amount: "30M",
  },
  {
    label: "Reserve",
    percentage: "5%",
    amount: "10M",
  },
];

const economicResponsibilities = [
  {
    title: "Build and operate",
    description:
      "Treasury resources support protocol development, infrastructure, operations, security, and long-term resilience.",
  },
  {
    title: "Expand participation",
    description:
      "Ecosystem resources support builders, integrations, creators, users, merchants, and aligned growth programs.",
  },
  {
    title: "Activate utility",
    description:
      "Utility resources support qualifying rewards, access programs, staking models, and intelligent economic services.",
  },
  {
    title: "Support market access",
    description:
      "Liquidity resources help establish the infrastructure needed for healthy ecosystem participation.",
  },
  {
    title: "Align contributors",
    description:
      "Team resources align long-term builders and operators responsible for advancing the protocol.",
  },
  {
    title: "Preserve flexibility",
    description:
      "Reserve resources support carefully governed future needs, resilience, and strategic protocol requirements.",
  },
];

export default function ZeraTokenomicsPage() {
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
              ZERA tokenomics
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              A fixed economic foundation.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              200 million ZERA. Fully defined across treasury, ecosystem,
              utility, liquidity, team, and reserve.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              The allocation model is designed to support protocol operations,
              ecosystem participation, useful services, market access,
              long-term contributors, and strategic resilience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#allocation-explorer"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore allocation
              </Button>

              <Button href="/zera/utility" variant="outline" size="lg">
                Explore utility
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 border-t border-border-subtle pt-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-10">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Maximum supply
              </p>

              <p className="mt-8 text-6xl font-semibold tracking-[-0.065em] sm:text-7xl">
                200M
              </p>

              <p className="mt-4 text-xl font-medium">ZERA</p>

              <p className="mt-8 max-w-xl text-lg leading-8 text-foreground-secondary">
                The protocol is designed around a defined maximum supply of
                200,000,000 ZERA.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                  Future minting
                </p>

                <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                  None planned
                </p>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  The supply model does not rely on future inflation to expand
                  the token allocation.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                  Allocation
                </p>

                <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                  100% defined
                </p>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  Every token is assigned to a stated economic category and
                  protocol purpose.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">
                  Economic direction
                </p>

                <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                  Utility before speculation
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-foreground-secondary">
                  ZERA is intended to gain relevance through useful services,
                  participation, access, staking, commerce, developers, and
                  intelligent agents.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="allocation-explorer" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Interactive allocation
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Explore how the supply is structured.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Select an allocation to inspect its percentage, token amount,
                purpose, and intended economic uses.
              </p>
            </div>

            <ZeraTokenomicsExplorer />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Allocation summary
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Six categories. One complete supply.
              </h2>
            </div>

            <div className="mt-14 overflow-hidden rounded-[2rem] border border-border-default">
              {allocationSummary.map((allocation, index) => (
                <div
                  key={allocation.label}
                  className={`grid grid-cols-[1fr_auto] items-center gap-6 bg-background/55 px-6 py-6 backdrop-blur-xl sm:grid-cols-[1fr_0.5fr_0.5fr] sm:px-8 ${
                    index !== allocationSummary.length - 1
                      ? "border-b border-border-subtle"
                      : ""
                  }`}
                >
                  <p className="font-medium">{allocation.label}</p>

                  <p className="hidden text-sm text-foreground-secondary sm:block">
                    {allocation.amount} ZERA
                  </p>

                  <p className="text-right text-xl font-semibold tracking-[-0.03em]">
                    {allocation.percentage}
                  </p>
                </div>
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
                Economic responsibilities
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Every allocation has a job.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The categories are structured around distinct responsibilities
                needed to build, operate, expand, and protect the ecosystem.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {economicResponsibilities.map((responsibility) => (
                <article
                  key={responsibility.title}
                  className="min-h-[16rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {responsibility.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {responsibility.description}
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
                Supply principles
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Defined for clarity and accountability.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The token model establishes a clear foundation while leaving
                vesting schedules, custody controls, release conditions, and
                program mechanics to be formally documented before launch.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supplyPrinciples.map((principle) => (
                <article
                  key={principle.number}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {principle.number}
                  </p>

                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">
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
          <div className="grid gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Release discipline
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Allocation does not mean immediate circulation.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Token allocation defines economic ownership and purpose.
                Circulating supply will depend on launch conditions, vesting,
                liquidity deployment, incentive programs, treasury controls,
                and documented release schedules.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Before launch
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Vesting schedules",
                  "Treasury custody controls",
                  "Liquidity deployment plan",
                  "Circulating supply schedule",
                  "Program release conditions",
                  "Public economic documentation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                  >
                    <span className="text-brand-secondary">
                      <CheckIcon />
                    </span>

                    <span className="text-sm text-foreground-secondary">
                      {item}
                    </span>
                  </div>
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
                Beyond allocation
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                See what ZERA is designed to do.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore how ZERA can support eligible economic advantages,
                rewards, staking, creators, businesses, developers, and
                intelligent agents.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/zera/utility"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore utility
                </Button>

                <Button href="/zera" variant="outline" size="lg">
                  Return to ZERA overview
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
