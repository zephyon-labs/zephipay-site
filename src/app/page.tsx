import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { AudienceGrid } from "@/components/marketing/AudienceGrid";
import { NetworkMetrics } from "@/components/marketing/NetworkMetrics";
import { RuntimeFlow } from "@/components/marketing/RuntimeFlow";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

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

        <Container className="relative z-10">
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

      <Section
        id="runtime"
        className="scroll-mt-28"
      >
        <Container>
          <RuntimeFlow />
        </Container>
      </Section>

      <Section id="platform" className="scroll-mt-28">
        <Container>
          <div className="border-t border-border-subtle pt-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Built for every way value moves
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Built for everyone.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                Personal payments, creator commerce, business tools, and
                intelligent systems—one calm experience with different ways
                to move value.
              </p>
            </div>

            <div className="mt-12">
              <AudienceGrid />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="why-zephipay">
        <Container>
          <div className="border-t border-border-subtle pt-20">

            <div className="mx-auto max-w-4xl text-center">

              <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                WHY ZEPHIPAY
              </p>

              <h2 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Modern payments.
                <br />
                Without the complexity.
              </h2>

              <p className="mt-6 text-xl text-brand-primary font-medium">
                Built for tomorrow. Useful today.
              </p>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-foreground-secondary">
                People shouldn&apos;t have to think about payment rails,
                wallets, settlement networks, compliance, or infrastructure.
                ZephiPay brings modern payments into one familiar experience
                while the Zephyon Runtime quietly coordinates everything
                beneath the surface.
              </p>

            </div>

            <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {[
                {
                  title: "Fast",
                  body:
                    "Payments should feel immediate, whether you're paying a friend, creator, or business."
                },
                {
                  title: "Verifiable",
                  body:
                    "Every payment leaves behind a deterministic receipt that can be independently verified."
                },
                {
                  title: "Connected",
                  body:
                    "Traditional banking, blockchain settlement, and future payment rails belong behind one familiar experience."
                },
                {
                  title: "Future Ready",
                  body:
                    "Designed for people today. Ready for intelligent commerce tomorrow."
                }
              ].map((item)=>(
                <div
                  key={item.title}
                  className="rounded-3xl border border-border-subtle bg-surface-glass p-8 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-7 text-foreground-secondary">
                    {item.body}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-24 rounded-[2rem] border border-border-default bg-surface-glass p-12 text-center shadow-[var(--shadow-medium)]">

              <p className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Every payment becomes
                <br />
                a trusted economic event.
              </p>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-foreground-secondary">
                Identity. Policy. Compliance. Settlement.
                Verification. Observability.
                Coordinated quietly through the Zephyon Runtime.
              </p>

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
      <SiteFooter />
    </main>
  );
}
