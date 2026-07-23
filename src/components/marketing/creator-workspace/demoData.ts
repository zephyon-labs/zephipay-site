import type { CreatorWorkspaceProps } from "./types";

export const creatorWorkspaceDemo: CreatorWorkspaceProps = {
  creatorName: "Maya",
  message: "12 people supported your work today.",
  earnings: "+$428.00",
  summary: [
    "3 new members",
    "2 digital purchases",
    "7 tips",
  ],
  metrics: [
    {
      label: "Active members",
      value: "128",
      detail: "12 joined this month",
    },
    {
      label: "Pending payout",
      value: "$312.40",
      detail: "Scheduled for Friday",
    },
    {
      label: "Verified records",
      value: "12",
      detail: "All activity reconciled",
    },
  ],
  activity: [
    {
      id: "activity-1",
      supporter: "Avery K.",
      event: "Monthly membership",
      context: "Joined the Studio Circle membership.",
      amount: "+$15.00",
      status: "Verified",
    },
    {
      id: "activity-2",
      supporter: "Jordan M.",
      event: "Creator tip",
      context: "Supported your latest video release.",
      amount: "+$25.00",
      status: "Verified",
    },
    {
      id: "activity-3",
      supporter: "Taylor R.",
      event: "Digital purchase",
      context: "Purchased the Neon Horizons collection.",
      amount: "+$18.00",
      status: "Verified",
    },
  ],
  records: [
    {
      label: "Gross earnings",
      value: "$428.00",
    },
    {
      label: "Settlement status",
      value: "Reconciled",
    },
    {
      label: "Next payout",
      value: "Friday · $312.40",
    },
  ],
};
