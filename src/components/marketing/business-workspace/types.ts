export type BusinessMetricTone =
  | "positive"
  | "informational"
  | "neutral"
  | "attention";

export interface BusinessMetric {
  label: string;
  value: string;
  detail: string;
  tone: BusinessMetricTone;
}

export type BusinessActivityStatus =
  | "Settled"
  | "Verified"
  | "Pending"
  | "Scheduled"
  | "Refunded";

export interface BusinessActivity {
  id: string;
  title: string;
  description: string;
  amount: string;
  timestamp: string;
  status: BusinessActivityStatus;
}

export interface BusinessQuickAction {
  label: string;
  description: string;
  href: string;
  icon: "receive" | "invoice" | "link" | "report";
}

export interface BusinessWorkspaceData {
  businessName: string;
  periodLabel: string;
  metrics: BusinessMetric[];
  activity: BusinessActivity[];
  quickActions: BusinessQuickAction[];
}
