import { RecentActionsCard } from "@/components/dashboard/recent-actions-card";
import { SustainableGoalsCard } from "@/components/dashboard/sustainable-goals-card";
import { getDashboardActivity } from "@/services/dashboard-service";

export function DashboardActivity() {
  const { recentActions, sustainableGoals } = getDashboardActivity();
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <SustainableGoalsCard goals={sustainableGoals} />
      <RecentActionsCard actions={recentActions} />
    </div>
  );
}
