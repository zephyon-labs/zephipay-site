import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ZeraUtilityWorkspace } from "@/components/marketing/zera/ZeraUtilityWorkspace";
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

const utilityPillars = [
  {
    number: "01",
    title: "Reduce eligible costs",
    description:
      "Use, hold, subscribe with, or stake ZERA to access qualifying economic benefits across supported Zephyon services.",
  },
  {
    number: "02",
    title: "Earn aligned rewards",
    description:
      "Recognize verified participation, useful contributions, and sustainable ecosystem activity through structured programs.",
  },
  {
    number: "03",
    title: "Unlock more capability",
    description:
      "Access premium tools, intelligent services, expanded limits, and advanced economic workflows.",
  },
  {
    number: "04",
    title: "Coordinate economic activity",
    description:
      "Support payments, services, incentives, agents, merchants, creators, and developers through one utility layer.",
  },
];

const accessPaths = [
  {
    label: "Subscribe",
    title: "Pay for advanced access.",
    description:
      "Use supported traditional payment methods or digital assets to subscribe to qualifying premium services.",
    features: [
      "No token ownership required",
      "Predictable subscription access",
      "Designed for mainstream adoption",
    ],
  },
  {
    label: "Stake",
    title: "Commit ZERA for qualifying access.",
    description:
      "Stake ZERA to unlock eligible services, limits, tooling, or participation benefits without requiring a conventional subscription.",
    features: [
      "Purpose-driven staking",
      "Qualifying access benefits",
      "Long-term ecosystem alignment",
    ],
  },
];

const feeBenefits = [
  {
    title: "Payments and settlement",
    description:
      "Qualifying ZERA participation can reduce eligible costs connected to supported payments, settlement, and economic events.",
  },
  {
    title: "Creator services",
    description:
      "Creators may access lower eligible platform costs, advanced tools, and expanded participation capabilities.",
  },
  {
    title: "Merchant services",
    description:
      "Business can qualify for economic advantages across intelligent commerce, reconciliation, and payment operations.",
  },
  {
    title: "AI execution",
    description:
      "Authorized agents can use ZERA-linked access models for qualifying execution, services, data, and economic coordination.",
  },
  {
    title: "Developer infrastructure",
    description:
      "Builders may qualify for expanded Runtime, API, tooling, and infrastructure access through supported utility programs.",
  },
  {
    title: "Premium automation",
    description:
      "Users can unlock advanced financial intelligence, policies, reporting, and approved automation workflows.",
  },
];

const rewardSignals = [
  "Verified economic participation",
  "Successful ecosystem activity",
  "Creator and merchant adoption",
  "Developer contributions",
  "Agent-provided services",
  "Approved ecosystem education",
];

const participantServices = [
  {
    eyebrow: "People",
    title: "More value from everyday participation.",
    description:
      "Use ZephiPay without ZERA, then choose whether deeper participation makes sense for your financial life.",
    features: [
      "Eligible fee advantages",
      "Premium financial tools",
      "Participation rewards",
      "Intelligent insights",
      "Subscription or staking access",
    ],
  },
  {
    eyebrow: "Creators",
    title: "Utility built for sustainable creative work.",
    description:
      "Connect support, memberships, verified records, analytics, and intelligent services to one participation model.",
    features: [
      "Direct support and tips",
      "Creator memberships",
      "Advanced earnings analytics",
      "Eligible platform savings",
      "Community participation rewards",
    ],
  },
  {
    eyebrow: "Business",
    title: "Smarter economics for commerce.",
    description:
      "Use ZERA-linked utility to improve qualifying payment, settlement, automation, and merchant workflows.",
    features: [
      "Merchant service advantages",
      "Invoice reconciliation",
      "Customer rewards",
      "Settlement incentives",
      "Intelligent commerce tools",
    ],
  },
  {
    eyebrow: "Developers",
    title: "Infrastructure access with economic alignment.",
    description:
      "Build on the Zephyon Runtime with utility designed for applications, services, agents, and ecosystem contributors.",
    features: [
      "Runtime and API access",
      "Expanded usage tiers",
      "Developer credits",
      "Contributor rewards",
      "Application and service participation",
    ],
  },
];

const agentServices = [
  {
    number: "01",
    title: "Agent payments",
    description:
      "Support approved AI-to-AI, AI-to-business, and user-authorized agent payment flows.",
  },
  {
    number: "02",
    title: "Metered services",
    description:
      "Enable machine-readable payments for APIs, data, computation, subscriptions, and digital services.",
  },
  {
    number: "03",
    title: "Economic permissions",
    description:
      "Connect agent budgets, limits, policies, identity, risk, and compliance requirements before value moves.",
  },
  {
    number: "04",
    title: "Trusted participation",
    description:
      "Use staking, verification, and service records to support qualifying agent access and accountability.",
  },
  {
    number: "05",
    title: "Execution advantages",
    description:
      "Qualifying ZERA participation can unlock eligible execution benefits, higher limits, and advanced services.",
  },
  {
    number: "06",
    title: "Agent marketplaces",
    description:
      "Support future marketplaces where authorized agents provide and purchase useful economic services.",
  },
];

const stakingModels = [
  {
    title: "Access staking",
    description:
      "Unlock qualifying premium services, tools, limits, or infrastructure access.",
  },
  {
    title: "Service staking",
    description:
      "Support accountable participation by approved providers, applications, merchants, or agents.",
  },
  {
    title: "Ecosystem staking",
    description:
      "Align longer-term participation with qualifying programs, incentives, and future ecosystem responsibilities.",
  },
  {
    title: "Governance eligibility",
    description:
      "Support future participation in carefully scoped ecosystem proposals without replacing operational leadership.",
  },
];

const feeFlow = [
  {
    step: "01",
    title: "Economic activity",
    description:
      "A supported payment, service, API call, agent action, subscription, or commercial workflow occurs.",
  },
  {
    step: "02",
    title: "Eligible protocol value",
    description:
      "Qualifying fees or utility demand are connected to real ecosystem usage rather than artificial activity.",
  },
  {
    step: "03",
    title: "Economic routing",
    description:
      "Defined mechanisms can route value toward operations, rewards, treasury, liquidity, or approved token sinks.",
  },
  {
    step: "04",
    title: "Ecosystem reinforcement",
    description:
      "Usage supports continued development, participation, services, and long-term protocol resilience.",
  },
];

export default function ZeraUtilityPage() {
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
              ZERA utility
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Utility designed around real economic participation.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Save on eligible costs, earn aligned rewards, unlock advanced
              capabilities, support creators, strengthen commerce, and power
              intelligent economic services.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA deepens participation across ZephiPay and the wider Zephyon
              ecosystem without making basic access dependent on token
              ownership.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#utility-workspace"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore utility
              </Button>

              <Button href="#access" variant="outline" size="lg">
                Subscribe or stake
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
                Access first
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                ZephiPay works without requiring ZERA.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                People and businesses should be able to use core ZephiPay
                services without first purchasing a token. ZERA exists to
                deepen utility, improve qualifying economics, and unlock more
                capability.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Optional by design
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Use core ZephiPay services without ZERA.",
                  "Choose ZERA when its benefits match your needs.",
                  "Access qualifying services through subscription or staking.",
                  "Participate without being forced into token ownership.",
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

      <Section id="utility-workspace" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Utility loop
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Watch participation become utility.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Let the loop advance automatically or select a stage to inspect
                how ZERA can support different forms of participation.
              </p>
            </div>

            <ZeraUtilityWorkspace />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Core utility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Four ways ZERA strengthens participation.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {utilityPillars.map((pillar) => (
                <article
                  key={pillar.title}
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

      <Section id="access" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Subscribe or stake
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Two paths to advanced capability.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Access should remain flexible. Users can pay for qualifying
                premium services directly or commit ZERA through supported
                staking models.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {accessPaths.map((path) => (
                <article
                  key={path.label}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {path.label}
                  </p>

                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                    {path.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {path.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {path.features.map((feature) => (
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
                Eligible economic advantages
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Better economics across the ecosystem.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZERA can connect qualifying benefits to genuine platform usage
                across payments, creators, commerce, agents, automation, and
                infrastructure.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {feeBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="min-h-[15rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {benefit.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
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
          <div className="grid gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Aligned rewards
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Reward useful participation, not empty activity.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Incentive programs should recognize verifiable contributions
                that improve ecosystem activity, adoption, reliability, and
                long-term value.
              </p>

              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                Reward eligibility, amounts, and availability would depend on
                defined programs, anti-abuse controls, and applicable
                requirements.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {rewardSignals.map((signal, index) => (
                <article
                  key={signal}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    0{index + 1}
                  </p>

                  <p className="mt-5 font-medium">{signal}</p>
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
                Participation services
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One utility layer. Different economic needs.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZERA connects people, creators, businesses, developers, and
                intelligent services without forcing every participant into
                the same experience.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {participantServices.map((service) => (
                <article
                  key={service.eyebrow}
                  className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {service.eyebrow}
                  </p>

                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                    {service.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {service.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {service.features.map((feature) => (
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
                  AI-agent utility
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Economic infrastructure for intelligent agents.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZERA can support authorized agents as they pay, provide
                  services, access data, use APIs, coordinate budgets, and
                  participate in machine-readable economic systems.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {agentServices.map((service) => (
                  <article
                    key={service.number}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                      {service.number}
                    </p>

                    <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {service.description}
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
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Purpose-driven staking
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Stake for a reason.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Staking should unlock, support, or secure something useful.
                  It is not presented as passive yield without an economic
                  purpose.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stakingModels.map((model) => (
                  <article
                    key={model.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {model.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {model.description}
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
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Protocol utility flow
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Connect token demand to real ecosystem usage.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The long-term model is designed around economic activity
                flowing through useful services—not manufactured volume or
                speculation alone.
              </p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-4">
              {feeFlow.map((item) => (
                <article
                  key={item.step}
                  className="relative rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {item.step}
                  </p>

                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-4xl text-sm leading-7 text-foreground-muted">
              Specific fee routing, conversion, treasury, reward, liquidity,
              buyback, or burn mechanisms will require defined protocol rules,
              economic validation, and applicable legal review before launch.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Future governance
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Participation without surrendering operational responsibility.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Future governance may support carefully scoped ecosystem
                proposals, grants, initiatives, and participation programs.
                Compliance, security, risk, and core operational decisions
                should remain professionally managed.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Potential scope
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Ecosystem grant programs",
                  "Community initiatives",
                  "Selected treasury programs",
                  "Protocol improvement proposals",
                  "Utility parameter recommendations",
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
                The ZERA economy
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Utility built for an expanding economic network.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore the fixed supply and allocation model designed to
                support participation, infrastructure, liquidity, resilience,
                and long-term ecosystem development.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/zera/tokenomics"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore tokenomics
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
