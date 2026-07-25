import {
  CreatorEmptyState,
  CreatorMetricGrid,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

const metrics = [
  {
    label: "Supporters",
    value: "—",
    detail: "People who have supported your work.",
  },
  {
    label: "Members",
    value: "—",
    detail: "Active recurring relationships.",
  },
  {
    label: "Customers",
    value: "—",
    detail: "People who have purchased your products.",
  },
  {
    label: "Returning",
    value: "—",
    detail: "Supporters who returned over time.",
  },
];

export const metadata = {
  title: "Creator Community | ZephiPay",
  description:
    "Understand supporters, members, customers, and creator relationships.",
};

export default function CreatorCommunityPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Community"
      description="Understand the people behind your support without turning meaningful relationships into a noisy follower count."
    >
      <CreatorMetricGrid metrics={metrics} />

      <div className="mt-6">
        <CreatorEmptyState
          eyebrow="Community"
          title="No supporter relationships yet"
          description="Supporters, members, customers, and relationship history will appear after a creator account begins receiving verified activity."
        />
      </div>
    </CreatorStudioPageShell>
  );
}
