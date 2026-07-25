import {
  CreatorEmptyState,
  CreatorMetricGrid,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

const metrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified creator revenue for the selected period.",
  },
  {
    label: "Conversion",
    value: "—",
    detail: "Visitors who completed a support action or purchase.",
  },
  {
    label: "Retention",
    value: "—",
    detail: "Recurring supporters who remained active.",
  },
  {
    label: "Average support",
    value: "—",
    detail: "Average verified payment across creator activity.",
  },
];

export const metadata = {
  title: "Creator Analytics | ZephiPay",
  description:
    "Explore creator revenue, conversion, retention, growth, and product performance.",
};

export default function CreatorAnalyticsPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Analytics"
      description="Turn verified economic activity into understandable signals about revenue, growth, and community health."
    >
      <CreatorMetricGrid metrics={metrics} />

      <div className="mt-6">
        <CreatorEmptyState
          eyebrow="Analytics"
          title="Not enough activity to calculate trends"
          description="Charts and comparisons will appear after verified tips, memberships, subscriptions, or product purchases are available."
        />
      </div>
    </CreatorStudioPageShell>
  );
}
