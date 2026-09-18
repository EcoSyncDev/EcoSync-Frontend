export type MonitoringPeriod = "7d" | "30d" | "3m" | "12m";

export type ConsumptionPoint = { label: string; energy: number; water: number };

export type MonitoringData = {
  days: number;
  grouping: string;
  points: readonly ConsumptionPoint[];
  energyReduction: number;
  waterReduction: number;
  carbonAvoided: number;
  savings: number;
};
