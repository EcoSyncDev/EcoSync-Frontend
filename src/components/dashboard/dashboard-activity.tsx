import { RecentActionsCard } from "@/components/dashboard/recent-actions-card";
import { SustainableGoalsCard } from "@/components/dashboard/sustainable-goals-card";
import { recentActions, sustainableGoals } from "@/data/dashboard-activity";

export function DashboardActivity() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <SustainableGoalsCard goals={sustainableGoals} />
      <RecentActionsCard actions={recentActions} />
    </div>
  );
}
