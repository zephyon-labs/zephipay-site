import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { WalletInterfacePreview } from "@/components/product/personal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const walletCapabilities = [
  {
    number: "01",
    title: "See what is available",
    description:
      "Review connected balances and understand what can be used before beginning a payment.",
  },
  {
    number: "02",
    title: "Connect payment methods",
    description:
      "Prepare to connect supported bank accounts, cards, digital assets, and other funding sources.",
  },
  {
    number: "03",
    title: "Move between balances",
    description:
      "Transfer value between your own connected accounts and supported ZephiPay balances.",
  },
  {
    number: "04",
    title: "Keep activity connected",
    description:
      "Payments, transfers, receipts, and account changes remain tied to a clear history.",
  },
];

const supportedDirections = [
  {
    title: "USDC",
    description:
      "A stable digital dollar for supported payments, transfers, and settlement.",
    status: "Devnet active",
  },
  {
    title: "SOL",
    description:
      "The native Solana asset used for network activity and supported wallet operations.",
    status: "Planned interface",
  },
  {
    title: "ZERA",
    description:
      "The Zephyon ecosystem token for utility, participation, access, and future rewards.",
    status: "Coming later",
  },
  {
    title: "Connected money",
    description:
      "Bank accounts and supported payment methods will extend the wallet beyond digital assets.",
    status: "Integration roadmap",
  },
];

const walletPrinciples = [
  {
    title: "Clear before clever",
    description:
      "A wallet should make balances, destinations, and payment consequences understandable before value moves.",
  },
  {
    title: "Useful context",
    description:
      "Every action should preserve enough information to explain what happened without overwhelming the user.",
  },
  {
    title: "Security underneath",
    description:
      "Identity, policy, risk, compliance, and verification should work quietly beneath the experience.",
  },
];

const walletFlow = [
  "Connect a supported account or wallet",
  "Review available balances",
  "Choose where value should move",
  "Confirm the amount and purpose",
  "ZephiPay coordinates the payment",
  "A verified record is preserved",
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

function WalletIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M4 8h13.5A2.5 2.5 0 0 1 20 10.5v4A2.5 2.5 0 0 1 17.5 17H4" />
      <path d="M16.5 12h.01" />
    </svg>
  );
}

export const metadata = {
  title: "Wallet | ZephiPay",
  description:
    "Connect balances, manage supported assets, move money, and keep every wallet action understandable through ZephiPay.",
};

export default function PersonalWalletPage() {
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
                Personal · Wallet
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                One clear place for the money you use.
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
                Connect supported accounts, understand your available
                balances, move value confidently, and preserve a dependable
                record of every wallet action.
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

                <Button
                  href="/personal#personal-workspace"
                  variant="outline"
                  size="lg"
                >
                  Move money
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                <WalletIcon />
              </div>

              <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Your ZephiPay wallet
              </p>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                More than a balance.
              </p>

              <p className="mt-5 leading-7 text-foreground-secondary">
                A useful wallet should show what is available, where it came
                from, where it can go, and what happened after it moved.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Connected balances",
                  "Supported assets",
                  "Payment methods",
                  "Verified wallet activity",
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
        id="wallet-interface"
        className="scroll-mt-28"
      >
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              See the experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A wallet designed to feel immediately familiar.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Explore how balances, assets, connected accounts, quick actions,
              and recent activity come together inside ZephiPay.
            </p>
          </div>

          <WalletInterfacePreview />
        </Container>
      </Section>

      <Section id="wallet-capabilities" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Wallet essentials
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Built to make every balance understandable.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay brings the accounts, assets, and records behind your
                payments into one calm personal experience.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
              {walletCapabilities.map((capability) => (
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

      <Section id="wallet-assets" className="scroll-mt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Connected value
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Designed for the assets and accounts people actually use.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                The wallet begins with supported digital assets and expands
                toward connected payment methods without forcing users to
                manage separate financial experiences.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportedDirections.map((asset) => (
                <article
                  key={asset.title}
                  className="rounded-[1.5rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold">{asset.title}</h3>

                    <span className="rounded-full border border-brand-primary/20 bg-brand-primary/[0.08] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-brand-secondary">
                      {asset.status}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                    {asset.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="wallet-flow" className="scroll-mt-28">
        <Container>
          <div className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                How it works
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The wallet stays simple. The coordination happens underneath.
              </h2>
            </div>

            <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {walletFlow.map((step, index) => (
                <li
                  key={step}
                  className="rounded-[1.35rem] border border-border-subtle bg-background/55 p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-medium text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="wallet-principles" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                Wallet principles
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Confidence should come from clarity.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {walletPrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">{principle.title}</h3>

                  <p className="mt-4 leading-7 text-foreground-secondary">
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
          <div className="rounded-[2rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-7 py-12 text-center shadow-[var(--shadow-medium)] sm:px-12 sm:py-16">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
              Personal payments
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Bring your balances into one understandable experience.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
              Join the ZephiPay beta and help shape a wallet designed for
              people, businesses, creators, and intelligent agents.
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

              <Button href="/personal" variant="outline" size="lg">
                Explore Personal
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
