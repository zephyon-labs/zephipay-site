import {
  CreatorEmptyState,
  CreatorMetricGrid,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

const metrics = [
  {
    label: "Available",
    value: "$0.00",
    detail: "Funds currently available for withdrawal.",
  },
  {
    label: "Pending",
    value: "$0.00",
    detail: "Payments still completing settlement.",
  },
  {
    label: "Next payout",
    value: "Not scheduled",
    detail: "Payout timing will appear after setup.",
  },
  {
    label: "Fees",
    value: "$0.00",
    detail: "Clear platform and settlement costs.",
  },
];

export const metadata = {
  title: "Creator Finances | ZephiPay",
  description:
    "Manage creator balances, settlements, payouts, fees, and tax-ready records.",
};

export default function CreatorFinancesPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Finances"
      description="Review balances, settlement activity, payouts, fees, and records through one financial workspace."
    >
      <CreatorMetricGrid metrics={metrics} />

      <div className="mt-6">
        <CreatorEmptyState
          eyebrow="Payout setup"
          title="No payout method connected"
          description="Creators will connect an eligible bank account or supported settlement destination before withdrawing funds."
          actionLabel="View creator dashboard"
          actionHref="/creators"
        />
      </div>
    </CreatorStudioPageShell>
  );
}
