export type CreatorWorkspaceMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CreatorWorkspaceActivity = {
  id: string;
  supporter: string;
  event: string;
  context: string;
  amount: string;
  status: string;
};

export type CreatorWorkspaceRecord = {
  label: string;
  value: string;
};

export type CreatorWorkspaceProps = {
  creatorName: string;
  message: string;
  earnings: string;
  summary: string[];
  metrics: CreatorWorkspaceMetric[];
  activity: CreatorWorkspaceActivity[];
  records: CreatorWorkspaceRecord[];
};
