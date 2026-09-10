import { recentActions, sustainableGoals } from "@/data/dashboard-activity";
import { dashboardIndicators } from "@/data/dashboard-indicators";
import { energyConsumption, environmentalImpact } from "@/data/dashboard-overview";

export type { RecentAction, SustainableGoal } from "@/data/dashboard-activity";

export function getDashboardIndicators(): typeof dashboardIndicators {
  return dashboardIndicators;
}

export function getDashboardOverview(): {
  energyConsumption: typeof energyConsumption;
  environmentalImpact: typeof environmentalImpact;
} {
  return { energyConsumption, environmentalImpact };
}

export function getDashboardActivity(): {
  recentActions: typeof recentActions;
  sustainableGoals: typeof sustainableGoals;
} {
  return { recentActions, sustainableGoals };
}
