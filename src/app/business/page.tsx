import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import {
  BusinessWorkspace,
  businessWorkspaceDemo,
} from "@/components/marketing/business-workspace";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const businessCapabilities = [
  {
    number: "01",
    title: "Accept payments",
    description:
      "Create checkout, payment-link, invoice, QR, and in-person experiences through one business platform.",
  },
  {
    number: "02",
    title: "Move money",
    description:
      "Send, receive, and request payments from customers, vendors, teams, and partner businesses.",
  },
  {
    number: "03",
    title: "Settlement visibility",
    description:
      "Follow the payment from approval through settlement instead of relying on a vague success screen.",
  },
  {
    number: "04",
    title: "Verified records",
    description:
      "Preserve receipts, status, timestamps, and transaction context for operations and support.",
  },
];

const operationalRecords = [
  "Payment intent",
  "Customer or business participant",
  "Purpose and transaction context",
  "Policy and decision state",
  "Settlement reference",
  "Verification status",
  "Execution timeline",
  "Receipt history",
];

const comparisonRows = [
  {
    traditional: "Separate tools and disconnected records",
    zephipay: "One coordinated payment platform",
  },
  {
    traditional: "Manual payment reconciliation",
    zephipay: "Structured settlement and receipt context",
  },
  {
    traditional: "Basic transaction notification",
    zephipay: "Verifiable payment record",
  },
  {
    traditional: "Payment data without explanation",
    zephipay: "Context preserved with the transaction",
  },
  {
    traditional: "Built only for human checkout",
    zephipay: "Ready for people, software, and intelligent agents",
  },
];

const businessControls = [
  {
    title: "Reporting",
    description:
      "Review payment activity, settlement state, receipts, and operational history in one place.",
  },
  {
    title: "Team access",
    description:
      "Prepare for role-based access so the right people can perform the right business actions.",
  },
  {
    title: "Policy controls",
    description:
      "Apply business rules before value moves instead of reconstructing decisions afterward.",
  },
  {
    title: "Developer access",
    description:
      "Connect business workflows to Runtime APIs, receipts, telemetry, and future settlement adapters.",
  },
];

const commerceFlow = [
  "Customer or agent initiates payment",
  "Business context is attached",
  "Required controls are evaluated",
  "Settlement is coordinated",
  "The result is verified",
  "A dependable receipt is preserved",
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
  title: "Business | ZephiPay",
  description:
    "Accept payments, coordinate settlement, preserve verified records, and prepare your business for customers and AI agents.",
};

export default function BusinessPage() {
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
                Business
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                Payments that help your business move forward.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Accept payments, coordinate settlement, preserve dependable
                records, and prepare for customers, software, and AI agents
                through one trusted business platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={siteConfig.betaUrl}
                  external
                  size="lg"
                  rightIcon={<ArrowIcon />}
                >
                  Join business beta
                </Button>

                <Button
                  href="#business-workspace"
                  variant="outline"
                  size="lg"
                >
                  See how it works
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Business infrastructure
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                Every payment should support operations.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                Payments create customer questions, settlement obligations,
                reporting needs, and accounting records. ZephiPay is designed
                to preserve that context from the beginning.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Accept and move money",
                  "Track settlement",
                  "Preserve verified receipts",
                  "Prepare for AI-powered commerce",
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
        id="business-workspace"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
                Your business workspace
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                See what is moving. Know what comes next.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg">
                Track revenue, settlements, verified orders, invoices, payment
                links, vendors, and operational records from one clear workspace.
              </p>
            </div>

            <div className="mt-12">
              <BusinessWorkspace data={businessWorkspaceDemo} />
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="business-platform"
        className="scroll-mt-28"
      >
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Built for modern business
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Accept payments without losing operational clarity.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay brings customer payment experiences and the records
                behind them into one coordinated platform.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {businessCapabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="min-h-64 bg-background p-7"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {capability.number}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    {capability.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="operational-data" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Useful payment records
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Every payment can become operational context.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                A business needs more than an amount and a completion notice.
                It needs a consistent record that can support customers,
                reporting, settlement review, and future automation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {operationalRecords.map((record) => (
                <div
                  key={record}
                  className="flex items-center gap-3 rounded-2xl border border-border-default bg-surface-glass px-5 py-4 shadow-[var(--shadow-soft)]"
                >
                  <span className="text-brand-secondary">
                    <CheckIcon />
                  </span>

                  <span className="text-sm text-foreground-secondary">
                    {record}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="comparison" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Lower operational friction
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Payments should create clarity, not more cleanup.
              </h2>
            </div>

            <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-border-default">
              <div className="grid grid-cols-2 border-b border-border-subtle bg-surface-secondary/50">
                <p className="p-5 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted sm:px-7">
                  Traditional workflow
                </p>

                <p className="border-l border-border-subtle p-5 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary sm:px-7">
                  ZephiPay direction
                </p>
              </div>

              {comparisonRows.map((row) => (
                <div
                  key={row.traditional}
                  className="grid grid-cols-2 border-b border-border-subtle bg-background/70 last:border-b-0"
                >
                  <p className="p-5 text-sm leading-6 text-foreground-muted sm:px-7">
                    {row.traditional}
                  </p>

                  <p className="border-l border-border-subtle p-5 text-sm font-medium leading-6 text-foreground sm:px-7">
                    {row.zephipay}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="operations" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Business operations
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One platform for payments and the work around them.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The business experience is being designed to support teams,
                policies, reporting, settlement visibility, and developer
                integration without crowding the checkout experience.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {businessControls.map((control) => (
                <article
                  key={control.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-sm font-medium text-brand-secondary">
                    Z
                  </div>

                  <h3 className="mt-7 text-xl font-semibold">
                    {control.title}
                  </h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {control.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="ai-agents" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl lg:grid-cols-[0.78fr_1.22fr] sm:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                AI agents
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Welcome payments from people and autonomous software.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay is being built so businesses can serve customers,
                applications, and AI agents through the same trusted payment
                infrastructure—without sacrificing policy, verification, or
                operational visibility.
              </p>

              <div className="mt-8">
                <Button
                  href="/intelligent-commerce"
                  variant="outline"
                  rightIcon={<ArrowIcon />}
                >
                  Explore AI Agents
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-border-default bg-background/70">
              {commerceFlow.map((stage, index) => (
                <div
                  key={stage}
                  className="flex items-center gap-5 border-b border-border-subtle px-6 py-5 last:border-b-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm text-foreground-secondary">
                    {stage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid items-center gap-10 border-t border-border-subtle pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Move forward with confidence
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Built for businesses that expect more from payments.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Accept payments, coordinate settlement, preserve verified
                records, and prepare your business for AI-powered commerce.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<ArrowIcon />}
              >
                Join business beta
              </Button>

              <Button
                href="#business-workspace"
                variant="outline"
                size="lg"
              >
                Explore the workspace
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
