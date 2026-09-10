import { recentActions, sustainableGoals } from "@/data/dashboard-activity";
import { dashboardIndicators } from "@/data/dashboard-indicators";
import { energyConsumption, environmentalImpact } from "@/data/dashboard-overview";
import type { DashboardActivity, DashboardIndicator, DashboardOverview } from "@/types/dashboard";

// Leituras síncronas de mocks; a futura integração HTTP ficará em src/lib/api/.
export function getDashboardIndicators(): readonly (DashboardIndicator & { id: string })[] {
  return dashboardIndicators;
}

export function getDashboardOverview(): DashboardOverview {
  return { energyConsumption, environmentalImpact };
}

export function getDashboardActivity(): DashboardActivity {
  return { recentActions, sustainableGoals };
}
