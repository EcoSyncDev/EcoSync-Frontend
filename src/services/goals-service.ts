import { filterGoals, goalsSummary, type Goal, type GoalFilter } from "@/data/goals";

export { goalFilters } from "@/data/goals";
export type { Goal, GoalFilter } from "@/data/goals";

export function getGoals(filter: GoalFilter = "all"): readonly Goal[] {
  return filterGoals(filter);
}

export function getGoalsSummary(): typeof goalsSummary {
  return goalsSummary;
}
