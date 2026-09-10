import type { IconName } from "@/types/ui";

export type DashboardIndicator = {
  title: string;
  value: string;
  description: string;
  icon: IconName;
  comparison: string;
  trend: "up" | "down";
};

export type EnvironmentalImpact = {
  progress: number;
  label: string;
  carbonAvoided: string;
  waterSaved: string;
  comparison: string;
};

export type EnergyConsumptionPoint = { day: string; kwh: number };

export type SustainableGoal = {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
};

export type RecentAction = {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  icon: IconName;
};

export type DashboardOverview = {
  energyConsumption: readonly EnergyConsumptionPoint[];
  environmentalImpact: EnvironmentalImpact;
};

export type DashboardActivity = {
  recentActions: readonly RecentAction[];
  sustainableGoals: readonly SustainableGoal[];
};
