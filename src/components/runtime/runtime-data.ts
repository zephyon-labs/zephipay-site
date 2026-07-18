export type RuntimeStage = {
  id: string;
  number: string;
  title: string;
  description: string;
  result: string;
};

export const runtimeStages: RuntimeStage[] = [
  {
    id: "identity",
    number: "01",
    title: "Identity",
    description:
      "Resolve the person, business, application, or autonomous agent participating in the event.",
    result: "Participants resolved",
  },
  {
    id: "compliance",
    number: "02",
    title: "Compliance",
    description:
      "Evaluate verification, sanctions, jurisdiction, KYC, and KYB requirements.",
    result: "Requirements satisfied",
  },
  {
    id: "risk",
    number: "03",
    title: "Risk",
    description:
      "Assess transaction context, account history, limits, and confidence signals.",
    result: "Risk within policy",
  },
  {
    id: "policy",
    number: "04",
    title: "Policy",
    description:
      "Apply platform, organization, merchant, account, and agent rules before settlement.",
    result: "Execution approved",
  },
  {
    id: "trust",
    number: "05",
    title: "Trust",
    description:
      "Incorporate verified activity, reliability, and prior receipt evidence.",
    result: "Trust signals recorded",
  },
  {
    id: "settlement",
    number: "06",
    title: "Settlement",
    description:
      "Select and coordinate the appropriate payment rail through one execution interface.",
    result: "Settlement completed",
  },
  {
    id: "telemetry",
    number: "07",
    title: "Telemetry",
    description:
      "Preserve engine decisions, timing, retries, settlement references, and outcomes.",
    result: "Execution recorded",
  },
  {
    id: "receipt",
    number: "08",
    title: "Receipt",
    description:
      "Produce a deterministic record of what happened, why it happened, and how it was verified.",
    result: "Receipt verified",
  },
];
