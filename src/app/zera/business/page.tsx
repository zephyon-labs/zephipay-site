import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
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

const businessPillars = [
  {
    number: "01",
    title: "Reduce eligible costs",
    description:
      "Use qualifying ZERA utility to access lower fees, premium commerce capabilities, or more efficient participation across supported services.",
    outcome: "Greater efficiency",
  },
  {
    number: "02",
    title: "Improve cash flow visibility",
    description:
      "Connect payments, invoices, receipts, settlements, and treasury activity through one clearer operating view.",
    outcome: "Clearer operations",
  },
  {
    number: "03",
    title: "Automate financial workflows",
    description:
      "Use approved intelligent tools to organize records, reconcile payments, monitor activity, and support recurring operations.",
    outcome: "Less manual work",
  },
  {
    number: "04",
    title: "Reward valuable participation",
    description:
      "Create qualifying customer, partner, employee, or ecosystem incentives through defined and transparent programs.",
    outcome: "Aligned growth",
  },
];

const operatingStages = [
  {
    number: "01",
    label: "Accept",
    title: "Receive supported payments.",
    description:
      "Accept qualifying customer, partner, subscription, invoice, and commerce payments through supported ZephiPay experiences.",
    features: [
      "Customer payments",
      "Invoice settlement",
      "Recurring transactions",
    ],
  },
  {
    number: "02",
    label: "Verify",
    title: "Attach trusted records.",
    description:
      "Connect payment activity to deterministic receipts, useful transaction context, and verifiable settlement records.",
    features: [
      "Verified receipts",
      "Payment context",
      "Settlement confirmation",
    ],
  },
  {
    number: "03",
    label: "Organize",
    title: "Keep operations understandable.",
    description:
      "Bring revenue, expenses, invoices, settlements, and treasury activity into clearer financial workflows.",
    features: [
      "Transaction organization",
      "Invoice reconciliation",
      "Treasury visibility",
    ],
  },
  {
    number: "04",
    label: "Automate",
    title: "Apply intelligent operations.",
    description:
      "Use approved policies, alerts, categorization, reporting, and automated financial assistance to reduce repetitive work.",
    features: [
      "Policy-based workflows",
      "Operational alerts",
      "Financial automation",
    ],
  },
  {
    number: "05",
    label: "Reward",
    title: "Recognize useful participation.",
    description:
      "Support qualifying loyalty, adoption, contribution, and ecosystem programs through defined ZERA utility.",
    features: [
      "Customer incentives",
      "Partner programs",
      "Ecosystem rewards",
    ],
  },
  {
    number: "06",
    label: "Grow",
    title: "Build stronger commerce.",
    description:
      "Reinvest improved visibility, lower eligible costs, and intelligent tools into more resilient business operations.",
    features: [
      "Operational resilience",
      "Customer growth",
      "Long-term participation",
    ],
  },
];

const commerceModels = [
  {
    title: "Customer payments",
    description:
      "Support everyday purchases, service payments, deposits, and digital commerce through trusted payment experiences.",
    features: [
      "Purpose-linked payments",
      "Verified transaction records",
      "Supported digital settlement",
    ],
  },
  {
    title: "Invoices and contracts",
    description:
      "Connect invoices, payment intent, completion, and records so teams spend less time matching financial activity manually.",
    features: [
      "Invoice reconciliation",
      "Payment status visibility",
      "Business-ready records",
    ],
  },
  {
    title: "Recurring commerce",
    description:
      "Support qualifying subscriptions, memberships, retainers, recurring services, and approved automated billing models.",
    features: [
      "Recurring payment context",
      "Subscription records",
      "Customer participation history",
    ],
  },
];

const businessAdvantages = [
  {
    title: "Eligible fee reductions",
    description:
      "Qualifying ZERA participation can reduce supported processing, service, or premium-feature costs.",
  },
  {
    title: "Premium commerce access",
    description:
      "Unlock qualifying reporting, automation, customer, treasury, and operational capabilities.",
  },
  {
    title: "Treasury intelligence",
    description:
      "Understand balances, settlements, obligations, and economic activity through clearer operating views.",
  },
  {
    title: "Invoice automation",
    description:
      "Connect invoices to completed payments and reduce the need for repetitive manual reconciliation.",
  },
  {
    title: "Customer rewards",
    description:
      "Create defined loyalty, participation, adoption, and ecosystem programs around useful activity.",
  },
  {
    title: "AI-assisted operations",
    description:
      "Use approved intelligent services to categorize, summarize, monitor, and support financial workflows.",
  },
];

const treasuryCapabilities = [
  "Settlement visibility",
  "Revenue and expense context",
  "Treasury balance monitoring",
  "Invoice and payment matching",
  "Recurring obligation tracking",
  "Verified financial records",
];

const accessOptions = [
  {
    label: "Subscribe",
    title: "Pay for qualifying business capabilities.",
    description:
      "Use supported traditional payments or digital assets to access advanced commerce tools without holding ZERA.",
    features: [
      "No token requirement",
      "Predictable service access",
      "Mainstream payment options",
    ],
  },
  {
    label: "Stake",
    title: "Commit ZERA for eligible access.",
    description:
      "Stake ZERA to unlock qualifying platform capabilities, economic advantages, or expanded business participation.",
    features: [
      "Purpose-driven staking",
      "Qualifying platform access",
      "Long-term ecosystem alignment",
    ],
  },
];

const intelligentOperations = [
  {
    title: "Payment monitoring",
    description:
      "Surface unusual activity, incomplete settlement, payment changes, or business events that may require review.",
  },
  {
    title: "Receipt organization",
    description:
      "Categorize verified records by customer, purpose, location, project, department, or reporting need.",
  },
  {
    title: "Invoice reconciliation",
    description:
      "Match approved invoices to completed payments and update supported records with less manual work.",
  },
  {
    title: "Natural-language insights",
    description:
      "Ask questions about revenue, payment activity, unpaid invoices, expenses, or settlement trends.",
  },
  {
    title: "Policy-based workflows",
    description:
      "Apply business-defined rules to alerts, approvals, limits, categorization, and supported automated actions.",
  },
  {
    title: "Operational reporting",
    description:
      "Turn verified economic activity into clearer summaries for internal planning and review.",
  },
];

const rewardPrograms = [
  {
    title: "Customer loyalty",
    description:
      "Recognize qualifying purchases, recurring participation, referrals, or long-term customer activity.",
  },
  {
    title: "Merchant adoption",
    description:
      "Support defined programs for businesses that adopt useful payment, receipt, or commerce capabilities.",
  },
  {
    title: "Partner participation",
    description:
      "Reward qualifying integrations, distribution, services, or ecosystem contributions through published programs.",
  },
  {
    title: "Employee recognition",
    description:
      "Support approved internal programs tied to useful contributions, milestones, or operational participation.",
  },
];

const businessControls = [
  {
    title: "Business-defined permissions",
    description:
      "Organizations choose which users, systems, services, and agents may access supported financial capabilities.",
  },
  {
    title: "Policy-aware activity",
    description:
      "Payments and workflows can be evaluated against business rules before value moves.",
  },
  {
    title: "Verified operating context",
    description:
      "Transactions can carry useful invoice, customer, project, department, or commercial context.",
  },
  {
    title: "Responsible automation",
    description:
      "Approved automation should remain observable, limited, reviewable, and aligned with defined permissions.",
  },
];

export default function ZeraBusinessPage() {
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
              ZERA for business
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem] lg:leading-[0.98]">
              Smarter economics for modern commerce.
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-foreground sm:text-2xl">
              Reduce eligible costs, improve financial visibility, unlock
              intelligent operations, and strengthen customer participation.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZERA gives qualifying businesses another way to access advanced
              ZephiPay capabilities without making token ownership a
              requirement for core commerce.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#business-operations"
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Explore business utility
              </Button>

              <Button href="/business" variant="outline" size="lg">
                View business platform
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
                Accessible commerce
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Run the business without requiring ZERA.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Business should be able to accept supported payments,
                organize records, manage commerce, and use core ZephiPay
                services without first purchasing a token.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Optional by design
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Accept supported payments without owning ZERA.",
                  "Use verified records and commerce tools through ZephiPay.",
                  "Choose subscription or staking for qualifying premium access.",
                  "Participate in ZERA programs only when they create business value.",
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

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Core business utility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Four ways ZERA strengthens commercial participation.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {businessPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="group min-h-[18rem] rounded-[1.9rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors hover:bg-surface-secondary"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                      {pillar.number}
                    </p>

                    <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1 text-xs text-foreground-secondary">
                      {pillar.outcome}
                    </span>
                  </div>

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

      <Section
        id="business-operations"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Business operating loop
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Follow commerce from payment to intelligent operations.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZERA utility can support the wider business lifecycle, not only
                the moment a customer pays.
              </p>
            </div>

            <div className="mt-14 overflow-hidden rounded-[2.25rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
              <div className="grid gap-px bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
                {operatingStages.map((stage) => (
                  <article
                    key={stage.number}
                    className="min-h-[22rem] bg-background p-7 transition-colors hover:bg-surface-secondary"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold tracking-[0.16em] text-brand-secondary">
                        {stage.number}
                      </span>

                      <span className="rounded-full border border-border-subtle bg-background-secondary/50 px-3 py-1 text-xs text-foreground-secondary">
                        {stage.label}
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">
                      {stage.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                      {stage.description}
                    </p>

                    <div className="mt-8 grid gap-3">
                      {stage.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
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
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Commerce models
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Support more than a checkout button.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Modern businesses operate through purchases, invoices,
                services, recurring relationships, and interconnected financial
                workflows.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {commerceModels.map((model) => (
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
                Business advantages
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Utility that extends across operations.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZERA can connect qualifying economic benefits to payments,
                commerce, treasury activity, customer relationships, and
                intelligent services.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
              {businessAdvantages.map((advantage) => (
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
                Treasury visibility
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Understand how value moves through the business.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Business need more than transaction totals. They need useful
                context around settlement, obligations, revenue, expenses,
                invoices, and available funds.
              </p>

              <p className="mt-5 text-sm leading-7 text-foreground-muted">
                Treasury tools would support visibility and organization. They
                would not replace professional accounting, legal, tax, or
                financial guidance.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {treasuryCapabilities.map((capability, index) => (
                <article
                  key={capability}
                  className="rounded-[1.5rem] border border-border-subtle bg-background/50 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-secondary">
                    0{index + 1}
                  </p>

                  <p className="mt-5 font-medium">{capability}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="business-access" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Subscribe or stake
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Choose how to access advanced business capabilities.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Business can select the access model that best fits their
                operating needs, financial preferences, and desired level of
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
                  Intelligent operations
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Turn verified activity into useful assistance.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Approved intelligent services can help businesses understand
                  economic activity, reduce repetitive work, and respond to
                  changing conditions with clearer context.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {intelligentOperations.map((operation) => (
                  <article
                    key={operation.title}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {operation.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {operation.description}
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
                  Rewards and loyalty
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Reward activity that strengthens commerce.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  ZERA programs can support defined customer, merchant, partner,
                  and contributor incentives without turning every interaction
                  into speculation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {rewardPrograms.map((program) => (
                  <article
                    key={program.title}
                    className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {program.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {program.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-8 max-w-4xl text-sm leading-7 text-foreground-muted">
              Reward programs would depend on published eligibility,
              verification, availability, anti-abuse controls, and applicable
              requirements. Rewards are not guaranteed earnings.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Business control
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Intelligence without surrendering authority.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Business should remain in control of permissions, policies,
                  financial workflows, automation, and the systems allowed to
                  act on their behalf.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {businessControls.map((control) => (
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
                Intelligent commerce
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Move value. Understand operations. Grow intelligently.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Explore the broader ZephiPay business platform or continue
                through the ZERA utility ecosystem.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button
                  href="/business"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Explore business platform
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
