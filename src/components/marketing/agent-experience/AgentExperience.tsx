import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AgentCards } from "./AgentCards";

function FlowArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

const economicFlow = [
  "Discover",
  "Decide",
  "Authorize",
  "Pay",
  "Verify",
];

export function AgentExperience() {
  return (
    <Section id="agent-workflows" className="scroll-mt-28">
      <Container>
        <div className="border-t border-border-subtle pt-20 sm:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Real-world AI workflows
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Give intelligent systems useful economic capabilities.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                Agents can move beyond recommendations and complete real work:
                purchasing resources, paying approved obligations, verifying
                execution, and preserving the records people and systems need.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Agent economic loop
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {economicFlow.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2"
                  >
                    <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
                      {step}
                    </span>

                    {index < economicFlow.length - 1 ? (
                      <span className="text-foreground-muted">
                        <FlowArrow />
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-6 text-foreground-muted">
                Every step remains visible, policy-aware, and connected to a
                verifiable economic record.
              </p>
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            <AgentCards />
          </div>
        </div>
      </Container>
    </Section>
  );
}
