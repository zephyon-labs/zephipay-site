export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Personal",
    href: "/#personal",
  },
  {
    label: "Creators",
    href: "/#creators",
  },
  {
    label: "Business",
    href: "/#business",
  },
  {
    label: "Security",
    href: "/#security",
  },
];

export const utilityNavigation: NavigationItem[] = [
  {
    label: "Platform",
    href: "/#platform",
  },
  {
    label: "Design system",
    href: "/design",
  },
];
