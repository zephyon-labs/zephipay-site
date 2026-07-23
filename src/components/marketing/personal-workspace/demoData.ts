import { PersonalWorkspaceProps } from "./types";

export const personalWorkspaceDemo: PersonalWorkspaceProps = {
  summary: [
    {
      title: "Available Today",
      value: "$2,418.63",
      subtitle: "Ready whenever you are",
    },
    {
      title: "Pending Requests",
      value: "2",
      subtitle: "$38.40 awaiting response",
    },
    {
      title: "Verified Receipts",
      value: "247",
      subtitle: "Every payment organized",
    },
  ],

  activity: [
    {
      title: "Breakfast",
      merchant: "The Daily Grind",
      amount: "$6.25",
      status: "Verified Receipt",
      timestamp: "Today • 8:12 AM",
    },
    {
      title: "Dinner Split",
      merchant: "Waiting on 2 friends",
      status: "Request Pending",
      timestamp: "Yesterday",
    },
    {
      title: "Birthday Gift",
      merchant: "Delivered",
      amount: "$50.00",
      status: "Receipt Available",
      timestamp: "Jul 20",
    },
  ],

  actions: [
    {
      label: "Send",
      href: "#",
    },
    {
      label: "Request",
      href: "#",
    },
    {
      label: "Receipts",
      href: "#",
    },
  ],
};
