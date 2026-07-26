export type EconomicEventStageId =
  | "intent"
  | "identity"
  | "compliance"
  | "risk"
  | "policy"
  | "settlement"
  | "verification"
  | "receipt";

export interface EconomicEventStage {
  id: EconomicEventStageId;
  number: string;
  title: string;
  summary: string;
  explanation: string;
  importance: string;
  example: string;
  runtimeSignal: string;
}
