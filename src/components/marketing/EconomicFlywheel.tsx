import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const stages = [
  {
    title: "People Participate",
    color: "bg-sky-500",
    description:
      "Consumers, creators, businesses, and AI use ZephiPay for real economic activity.",
  },
  {
    title: "Payments Flow",
    color: "bg-cyan-500",
    description:
      "Every transaction is processed through the Zephyon Runtime with deterministic receipts.",
  },
  {
    title: "Protocol Revenue",
    color: "bg-blue-500",
    description:
      "Eligible platform activity contributes to sustainable protocol revenue.",
  },
  {
    title: "Treasury Grows",
    color: "bg-amber-500",
    description:
      "Resources are allocated to ecosystem growth, resilience, and long-term development.",
  },
  {
    title: "ZERA Utility Expands",
    color: "bg-violet-500",
    description:
      "More services, rewards, premium capabilities, and intelligent features become available.",
  },
  {
    title: "Participation Increases",
    color: "bg-emerald-500",
    description:
      "Improved utility encourages more meaningful participation, strengthening the ecosystem.",
  },
];

export function EconomicFlywheel() {
  return (
    <Section>
      <Container>

        <div className="border-t border-border-subtle pt-20">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Economic Flywheel
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A self-reinforcing ecosystem.
            </h2>

            <p className="mt-6 text-lg leading-8 text-foreground-secondary">
              Every meaningful interaction strengthens ZephiPay. As participation
              grows, the ecosystem gains more resources to improve the platform,
              expand utility, and reward continued participation.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {stages.map((stage, index) => (

              <article
                key={stage.title}
                className="group rounded-[2rem] border border-border-default bg-surface-glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40"
              >

                <div className="flex items-center gap-4">

                  <div className={`h-3 w-3 rounded-full ${stage.color}`} />

                  <span className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                  {stage.title}
                </h3>

                <p className="mt-4 leading-7 text-foreground-secondary">
                  {stage.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </Container>
    </Section>
  );
}
