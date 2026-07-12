import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const colorSwatches = [
  { name: "Background", value: "#05070A" },
  { name: "Surface", value: "#0D141D" },
  { name: "Elevated", value: "#172434" },
  { name: "Primary", value: "#65B8FF" },
  { name: "Secondary", value: "#73E7FF" },
  { name: "Text", value: "#F4F8FC" },
  { name: "Muted", value: "#718096" },
  { name: "Success", value: "#4FD1A5" },
];

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <Section spacing="lg" className="pt-36 sm:pt-40">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              ZephiPay
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Quietly futuristic.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-foreground-secondary sm:text-2xl">
              Payments that disappear into the background so people,
              businesses, creators, and intelligent systems can focus on what
              matters.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/beta" size="lg">
                Join beta
              </Button>

              <Button href="#platform" variant="outline" size="lg">
                Explore platform
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-[0.14em] text-foreground-muted">
              <span>Individuals</span>
              <span>Creators</span>
              <span>Businesses</span>
              <span>Intelligent commerce</span>
            </div>
          </div>
        </Container>
      </Section>


      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
                Built for everyone
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Every way money moves.
              </h2>

              <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                ZephiPay adapts to how people, businesses, creators, and
                intelligent systems exchange value without exposing the
                complexity underneath.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="group rounded-3xl border border-border-subtle bg-surface-glass p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40">
                <div className="text-3xl">👤</div>

                <h3 className="mt-6 text-xl font-semibold">
                  Individuals
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  Fast peer-to-peer payments with verified receipts and a
                  familiar experience.
                </p>
              </div>

              <div className="group rounded-3xl border border-border-subtle bg-surface-glass p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40">
                <div className="text-3xl">🎥</div>

                <h3 className="mt-6 text-xl font-semibold">
                  Creators
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  Tips, subscriptions, memberships and global payouts designed
                  for modern creators.
                </p>
              </div>

              <div className="group rounded-3xl border border-border-subtle bg-surface-glass p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40">
                <div className="text-3xl">🏪</div>

                <h3 className="mt-6 text-xl font-semibold">
                  Businesses
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  Lower payment costs, deterministic receipts, and modern
                  settlement infrastructure.
                </p>
              </div>

              <div className="group rounded-3xl border border-border-subtle bg-surface-glass p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40">
                <div className="text-3xl">🤖</div>

                <h3 className="mt-6 text-xl font-semibold">
                  Intelligent Commerce
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                  Built for autonomous payments, policy-aware agents, and the
                  next generation of digital commerce.
                </p>
              </div>

            </div>
          </div>
        </Container>
      </Section>


      <Section id="platform">
        <Container>
          <div className="border-t border-border-subtle pt-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.16em] text-foreground-muted">
                Foundation
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                Color system
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {colorSwatches.map((color) => (
                <div
                  key={color.name}
                  className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[var(--shadow-soft)]"
                >
                  <div
                    className="h-28"
                    style={{ backgroundColor: color.value }}
                  />

                  <div className="p-4">
                    <p className="font-medium">{color.name}</p>

                    <p className="mt-1 font-mono text-sm text-foreground-muted">
                      {color.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.16em] text-foreground-muted">
                Components
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                Buttons
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="link">Link button</Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Processing</Button>
              <Button disabled>Disabled</Button>

              <Button
                href="https://x.com/zephipay"
                external
                size="icon"
                variant="glass"
                aria-label="Open ZephiPay on X"
              >
                X
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="border-t border-border-subtle pt-12">
            <p className="text-sm uppercase tracking-[0.16em] text-foreground-muted">
              Typography
            </p>

            <div className="mt-10 space-y-10">
              <div>
                <p className="text-sm text-foreground-muted">Display</p>

                <p className="mt-2 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                  Financial coordination,
                  <br />
                  without the friction.
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground-muted">Heading</p>

                <p className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
                  Built for people, businesses, and intelligent commerce.
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground-muted">Body</p>

                <p className="mt-2 max-w-2xl text-lg leading-8 text-foreground-secondary">
                  ZephiPay makes complex financial infrastructure feel simple,
                  while Zephyon coordinates identity, compliance, trust,
                  policy, settlement, and telemetry underneath.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
