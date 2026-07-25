export type CreatorStudioRoute = {
  label: string;
  href: string;
  description: string;
};

export type CreatorMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CreatorEmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};
