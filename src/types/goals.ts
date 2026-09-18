import type { SustainableGoal } from "@/types/dashboard";
import type { IconName } from "@/types/ui";

export type Goal = SustainableGoal & {
  category: string;
  icon: IconName;
  currentProgress: string;
  period: string;
  completed: boolean;
};

export type GoalFilter = "all" | "active" | "completed";

export type GoalsSummary = {
  active: number;
  completed: number;
  average: number;
  best: string;
};
