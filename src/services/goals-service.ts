import { filterGoals, goalsSummary } from "@/data/goals";
import type { Goal, GoalFilter, GoalsSummary } from "@/types/goals";

export { goalFilters } from "@/data/goals";

export function getGoals(filter: GoalFilter = "all"): readonly Goal[] {
  return filterGoals(filter);
}

export function getGoalsSummary(): GoalsSummary {
  return goalsSummary;
}
