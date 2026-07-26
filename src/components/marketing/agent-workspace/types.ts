export type AgentPresetId =
  | "personal"
  | "shopping"
  | "business"
  | "creator"
  | "research"
  | "custom";

export type AgentPermissionId =
  | "view-balance"
  | "view-receipts"
  | "view-subscriptions"
  | "create-payment-drafts"
  | "request-payments"
  | "send-payments"
  | "modify-limits";

export type AgentApprovalMode =
  | "always"
  | "above-limit"
  | "policy";

export interface AgentPreset {
  id: AgentPresetId;
  name: string;
  description: string;
  initials: string;
  suggestedPermissions: AgentPermissionId[];
  suggestedDailyLimit: number;
  suggestedPaymentLimit: number;
}

export interface AgentPermission {
  id: AgentPermissionId;
  label: string;
  description: string;
  elevated?: boolean;
}
