export interface PersonalSummaryCard {
  title: string;
  value: string;
  subtitle: string;
}

export interface PersonalActivity {
  title: string;
  merchant?: string;
  amount?: string;
  status: string;
  timestamp: string;
}

export interface QuickAction {
  label: string;
  href: string;
}

export interface PersonalWorkspaceProps {
  summary: PersonalSummaryCard[];
  activity: PersonalActivity[];
  actions: QuickAction[];
}
