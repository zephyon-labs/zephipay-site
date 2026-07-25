import type { Metadata } from "next";

import {
  SecurityDashboardWorkspace,
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Security | ZephiPay",
  description:
    "Review identity protection, compliance, policy, verified receipts, Runtime telemetry, and platform security practices.",
};

export default function SecurityPage() {
  return (
    <SecurityStudioPageShell
      title="Security"
      description="Protect people, businesses, and autonomous systems through coordinated identity, compliance, policy, Runtime visibility, and verifiable records."
    >
      <SecurityDashboardWorkspace />
    </SecurityStudioPageShell>
  );
}
