import { filterGoals, goalsSummary } from "@/data/goals";
import type { Goal, GoalFilter, GoalsSummary } from "@/types/goals";

export { goalFilters } from "@/data/goals";

// Leituras síncronas de mocks; a futura integração HTTP ficará em src/lib/api/.
export function getGoals(filter: GoalFilter = "all"): readonly Goal[] {
  return filterGoals(filter);
}

export function getGoalsSummary(): GoalsSummary {
  return goalsSummary;
}
