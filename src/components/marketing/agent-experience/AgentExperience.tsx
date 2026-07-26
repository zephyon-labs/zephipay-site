import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AgentEconomicLoop } from "@/components/marketing/agent-learning";
import { AgentCards } from "./AgentCards";

export function AgentExperience() {
  return (
    <Section id="agent-workflows" className="scroll-mt-28">
      <Container>
        <div className="border-t border-border-subtle pt-20 sm:pt-24">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Real-world AI workflows
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Give intelligent systems useful economic capabilities.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              Agents can move beyond recommendations and complete real work:
              purchasing resources, paying approved obligations, verifying
              execution, and preserving the records people and systems need.
            </p>
          </div>

          <div className="mt-12 sm:mt-14">
            <AgentEconomicLoop />
          </div>

          <div className="mt-14 sm:mt-16">
            <AgentCards />
          </div>
        </div>
      </Container>
    </Section>
  );
}
