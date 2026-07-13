import { AudienceGrid } from "@/components/marketing/AudienceGrid";
import { NetworkMetrics } from "@/components/marketing/NetworkMetrics";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <Section
        spacing="lg"
        className="relative overflow-hidden pt-40 sm:pt-44"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute right-[-12rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--glow-primary),transparent_68%)] opacity-70 blur-3xl" />
          <div className="absolute bottom-[-20rem] left-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--glow-secondary),transparent_70%)] opacity-60 blur-3xl" />
        </div>

        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Modern payments, without the noise
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[5.6rem] lg:leading-[0.98]">
              Quietly futuristic.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
              Payments that disappear into the background so people,
              creators, businesses, and intelligent systems can focus on what
              matters.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href={siteConfig.betaUrl}
                external
                size="lg"
                rightIcon={<span aria-hidden="true">→</span>}
              >
                Join beta
              </Button>

              <Button
                href="#platform"
                variant="outline"
                size="lg"
              >
                Explore ZephiPay
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-[0.14em] text-foreground-muted">
              <a href="#personal" className="transition-colors hover:text-foreground">
                Individuals
              </a>
              <a href="#creators" className="transition-colors hover:text-foreground">
                Creators
              </a>
              <a href="#business" className="transition-colors hover:text-foreground">
                Businesses
              </a>
              <a
                href="#intelligent-commerce"
                className="transition-colors hover:text-foreground"
              >
                Intelligent commerce
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="network"
        spacing="none"
        className="scroll-mt-28 pb-16 sm:pb-24"
      >
        <Container>
          <NetworkMetrics />
        </Container>
      </Section>

      <Section id="platform" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Built for every way value moves
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                One experience. Different needs.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Choose the experience that fits you. Each card reveals the
                capabilities ZephiPay is being built to support.
              </p>
            </div>

            <div className="mt-12">
              <AudienceGrid />
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="security"
        spacing="lg"
        className="scroll-mt-28"
      >
        <Container>
          <div className="grid gap-10 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-2xl md:grid-cols-[1.1fr_0.9fr] md:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Security without the spectacle
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                The complexity stays underneath.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-secondary">
                ZephiPay presents a simple payment experience while Zephyon
                coordinates identity, compliance, risk, policy, trust,
                settlement, telemetry, and verified receipts behind the
                scenes.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Identity checks",
                "Compliance policy",
                "Risk evaluation",
                "Trust signals",
                "Settlement monitoring",
                "Verified receipts",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border-subtle bg-surface-secondary p-4 text-sm text-foreground-secondary"
                >
                  <span className="mr-2 text-success">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
