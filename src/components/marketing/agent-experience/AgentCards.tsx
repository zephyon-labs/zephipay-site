import { agentExperienceDemo } from "./demoData";

function ResearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5M8 10.5h5M10.5 8v5" />
    </svg>
  );
}

function CodingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}

function CreatorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18M7 7.5 12 3l5 4.5M7 16.5 12 21l5-4.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AccountingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h3M14 12h2M8 16h3M14 16h2" />
    </svg>
  );
}

function ProcurementIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16v13H4zM7 7V4h10v3M8 11h8M8 15h5" />
    </svg>
  );
}

function TravelIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-6-6 18-3-8-9-4Z" />
      <path d="m12 15 4-4" />
    </svg>
  );
}

const icons = [
  <ResearchIcon key="research" />,
  <CodingIcon key="coding" />,
  <CreatorIcon key="creator" />,
  <AccountingIcon key="accounting" />,
  <ProcurementIcon key="procurement" />,
  <TravelIcon key="travel" />,
];

export function AgentCards() {
  const { capabilities } = agentExperienceDemo;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {capabilities.map((capability, index) => (
        <article
          key={capability.title}
          className="group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[var(--shadow-medium)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-brand-primary/0 blur-3xl transition duration-300 group-hover:bg-brand-primary/10"
          />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                {icons[index]}
              </span>

              <span className="rounded-full border border-border-subtle bg-surface-secondary/60 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                {capability.eyebrow}
              </span>
            </div>

            <div className="mt-9">
              <h3 className="text-xl font-semibold tracking-[-0.025em]">
                {capability.title}
              </h3>

              <p className="mt-4 leading-7 text-foreground-secondary">
                {capability.description}
              </p>
            </div>

            <div className="mt-auto pt-8">
              <div className="border-t border-border-subtle pt-5">
                <p className="text-xs font-medium tracking-[0.04em] text-brand-secondary">
                  {capability.detail}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
