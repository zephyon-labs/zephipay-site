export type AgentWorkflowStatus =
  | "searching"
  | "complete"
  | "active"
  | "verified";

export interface AgentProvider {
  name: string;
  detail: string;
  selected?: boolean;
}

export interface AgentWorkflowStep {
  label: string;
  detail: string;
  status: AgentWorkflowStatus;
}

export interface AgentWorkflowData {
  agentName: string;
  task: string;
  amount: string;
  providers: AgentProvider[];
  steps: AgentWorkflowStep[];
}

export interface AgentCapability {
  title: string;
  description: string;
  detail: string;
  eyebrow: string;
}

export interface AgentExperienceData {
  workflow: AgentWorkflowData;
  capabilities: AgentCapability[];
}
