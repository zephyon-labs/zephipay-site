import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const earningMethods = [
  {
    number: "01",
    title: "Tips",
    description:
      "Give supporters a simple way to recognize the work, moment, or experience that mattered to them.",
  },
  {
    number: "02",
    title: "Memberships",
    description:
      "Build dependable recurring support around exclusive access, community, or ongoing creative work.",
  },
  {
    number: "03",
    title: "Subscriptions",
    description:
      "Create recurring payment relationships for content, services, education, or audience experiences.",
  },
  {
    number: "04",
    title: "Digital products",
    description:
      "Accept payment for artwork, music, guides, templates, downloads, and other creator-owned products.",
  },
];

const supportMoments = [
  {
    type: "Monthly membership",
    amount: "+$15.00",
    detail: "Ongoing audience support",
    status: "Verified",
    timestamp: "2 hours ago",
  },
  {
    type: "Commission",
    amount: "+$250.00",
    detail: "Custom creative work",
    status: "Completed",
    timestamp: "Yesterday",
  },
  {
    type: "Digital artwork",
    amount: "+$48.00",
    detail: "Creator-owned product",
    status: "Receipt ready",
    timestamp: "3 days ago",
  },
  {
    type: "Live-stream tip",
    amount: "+$10.00",
    detail: "Audience appreciation",
    status: "Verified",
    timestamp: "A few minutes ago",
  },
];

const creatorTools = [
  "Payment links",
  "Tips and audience support",
  "Memberships and subscriptions",
  "Digital products",
  "Payout history",
  "Verified receipts",
  "Creator activity records",
  "Intelligent commerce readiness",
];

const recordDetails = [
  {
    label: "Who supported the work",
    value:
      "Support remains connected to the people, customers, or communities behind each payment.",
  },
  {
    label: "What the payment supported",
    value:
      "Memberships, commissions, products, tips, and other creator activity keep their purpose attached.",
  },
  {
    label: "What completed",
    value:
      "Status, timestamps, settlement evidence, and receipt history remain available for review.",
  },
  {
    label: "What can be understood later",
    value:
      "Useful context helps creators answer questions, manage earnings, and understand audience activity.",
  },
];

const intelligentCreatorTools = [
  {
    title: "AI storefront assistants",
    description:
      "Prepare creator storefronts for software that can answer questions, recommend products, and coordinate purchases.",
  },
  {
    title: "Intelligent subscriptions",
    description:
      "Support future membership and subscription experiences that respond to identity, access, and policy.",
  },
  {
    title: "Digital licensing",
    description:
      "Preserve useful context around licensing, usage rights, payment intent, and verified purchase records.",
  },
  {
    title: "Agent commerce",
    description:
      "Prepare for intelligent agents that can purchase creator products and services within defined controls.",
  },
];

const privacyPrinciples = [
  {
    title: "Share intentionally",
    description:
      "Creator payments should preserve useful context without exposing more personal information than the transaction requires.",
  },
  {
    title: "Protect the person behind the work",
    description:
      "A public creator identity should not require unnecessary exposure of private financial or personal details.",
  },
  {
    title: "Build trust through records",
    description:
      "Clear receipts and understandable payment history can strengthen trust without turning creator earnings into a public feed.",
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export const metadata = {
  title: "Creators | ZephiPay",
  description:
    "Accept tips, memberships, subscriptions, digital purchases, and audience support through one trusted creator payment platform.",
};

export default function CreatorsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-5xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Creators
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                Create what matters. We will help with the rest.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Accept tips, memberships, subscriptions, digital purchases,
                and audience support through one trusted platform designed to
                preserve every transaction with clarity and context.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={siteConfig.betaUrl}
                  external
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Join creator beta
                </Button>

                <Button
                  href="#creator-earnings"
                  variant="outline"
                  size="lg"
                >
                  Explore creator tools
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Built for creators
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                Support should feel connected to the work.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                Creator earnings represent people choosing to support an idea,
                product, community, or body of work. ZephiPay is designed to
                preserve that meaning.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Supported by your audience",
                  "Flexible ways to earn",
                  "Verified earnings records",
                  "Ready for what comes next",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/60 px-4 py-3"
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

      <Section
        id="creator-earnings"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator earnings
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Built around the ways creators are supported.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Give audiences clear, flexible ways to support the work they
                value without forcing creators into a traditional business
                model.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {earningMethods.map((method) => (
                <article
                  key={method.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {method.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {method.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {method.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="support-moments" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Supported by people
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Every payment tells part of your story.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Creator income is not one generic transaction stream. It is a
                collection of memberships, purchases, commissions, tips, and
                meaningful moments of support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportMoments.map((moment) => (
                <article
                  key={`${moment.type}-${moment.amount}`}
                  className="zephipay-creator-support-card rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {moment.type}
                      </p>

                      <p className="mt-2 text-sm text-foreground-muted">
                        {moment.detail}
                      </p>
                    </div>

                    <span className="rounded-full border border-border-subtle bg-background/60 px-3 py-1 text-xs text-brand-secondary">
                      {moment.status}
                    </span>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <p className="zephipay-creator-support-amount text-3xl font-semibold tracking-[-0.04em]">
                      {moment.amount}
                    </p>

                    <p className="text-xs text-foreground-muted">
                      {moment.timestamp}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="creator-records" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] sm:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Verified earnings records
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Keep more than an amount and a date.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay is designed to preserve the useful context behind
                creator earnings so payments remain understandable after they
                complete.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-border-default bg-border-subtle md:grid-cols-2">
              {recordDetails.map((detail) => (
                <article
                  key={detail.label}
                  className="bg-background p-7 sm:p-8"
                >
                  <h3 className="text-lg font-semibold">
                    {detail.label}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {detail.value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="creator-toolkit" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator toolkit
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One platform for earning, understanding, and growing.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Creator tools should work together instead of scattering
                payments, memberships, receipts, and audience activity across
                disconnected services.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {creatorTools.map((tool) => (
                <div
                  key={tool}
                  className="flex items-center gap-3 rounded-2xl border border-border-default bg-surface-glass px-5 py-4 shadow-[var(--shadow-soft)]"
                >
                  <span className="text-brand-secondary">
                    <CheckIcon />
                  </span>

                  <span className="text-sm text-foreground-secondary">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="intelligent-creation" className="scroll-mt-28">
        <Container>
          <div className="border-y border-border-subtle py-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Intelligent creation
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Built for creators and the tools they use.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Creative commerce is expanding beyond traditional storefronts.
                ZephiPay is being designed for a future where creators, buyers,
                software, and intelligent agents can participate through one
                trusted transaction environment.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {intelligentCreatorTools.map((tool, index) => (
                <article
                  key={tool.title}
                  data-accent={index}
                  className="zephipay-creator-intelligence-card rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">
                    {tool.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {tool.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Button
                href="/intelligent-commerce"
                variant="outline"
                rightIcon={<ArrowIcon />}
              >
                Explore intelligent commerce
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="creator-privacy" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Creator privacy
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Protect the person behind the work.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Public creative work should not require unnecessary exposure
                of private identity, financial information, or personal
                activity.
              </p>
            </div>

            <div className="grid gap-4">
              {privacyPrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">
                    {principle.title}
                  </h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="zephipay-creator-final-cta rounded-[2rem] border border-border-default bg-surface-glass px-7 py-14 text-center shadow-[var(--shadow-medium)] sm:px-12 sm:py-20">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Create with confidence
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Your audience already believes in your work.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Let every payment reflect that same trust through a creator
              platform designed for clarity, connection, and what comes next.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Join creator beta
              </Button>

              <Button
                href="/intelligent-commerce"
                variant="outline"
                size="lg"
              >
                Explore intelligent commerce
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
