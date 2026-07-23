import type { BusinessWorkspaceData } from "./types";

export const businessWorkspaceDemo: BusinessWorkspaceData = {
  businessName: "Northstar Coffee",
  periodLabel: "Today",
  metrics: [
    {
      label: "Today's revenue",
      value: "$4,286.17",
      detail: "Across 128 verified payments",
      tone: "positive",
    },
    {
      label: "Pending settlement",
      value: "$1,192.40",
      detail: "Expected by tomorrow",
      tone: "informational",
    },
    {
      label: "Verified orders",
      value: "128",
      detail: "Every order has a receipt",
      tone: "neutral",
    },
    {
      label: "Customers today",
      value: "96",
      detail: "18 returning customers",
      tone: "attention",
    },
  ],
  activity: [
    {
      id: "activity-1",
      title: "Morning counter sales",
      description: "42 customer payments",
      amount: "+$684.52",
      timestamp: "11:42 AM",
      status: "Settled",
    },
    {
      id: "activity-2",
      title: "Cedar & Pine Catering",
      description: "Invoice ZP-1048",
      amount: "+$1,240.00",
      timestamp: "10:18 AM",
      status: "Verified",
    },
    {
      id: "activity-3",
      title: "Harbor Roasters",
      description: "Vendor payment",
      amount: "-$486.75",
      timestamp: "9:34 AM",
      status: "Scheduled",
    },
    {
      id: "activity-4",
      title: "Customer refund",
      description: "Order ZP-3841",
      amount: "-$18.45",
      timestamp: "8:57 AM",
      status: "Refunded",
    },
  ],
  quickActions: [
    {
      label: "Receive payment",
      description: "Open a checkout or present a QR code.",
      href: "/business#accept-payments",
      icon: "receive",
    },
    {
      label: "Create invoice",
      description: "Send professional payment terms.",
      href: "/business#invoices",
      icon: "invoice",
    },
    {
      label: "Payment link",
      description: "Create a shareable way to get paid.",
      href: "/business#payment-links",
      icon: "link",
    },
    {
      label: "Export report",
      description: "Prepare settlement and receipt records.",
      href: "/business#reporting",
      icon: "report",
    },
  ],
};
