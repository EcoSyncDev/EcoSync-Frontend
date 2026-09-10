import { sustainableGoals } from "@/data/dashboard-activity";
import type { Goal, GoalFilter, GoalsSummary } from "@/types/goals";

const details: Record<string, Pick<Goal, "category" | "icon" | "currentProgress">> = {
  energy: { category: "Energia", icon: "energy", currentProgress: "Redução de 10,8% de uma meta de 15%" },
  water: { category: "Água", icon: "water", currentProgress: "580 L de 1.000 L economizados" },
  carbon: { category: "CO₂", icon: "leaf", currentProgress: "33,6 kg de 40 kg evitados" },
};

// Reutiliza as metas demonstrativas do Dashboard, sem modificar seus dados.
export const goals: readonly Goal[] = [
  ...sustainableGoals.map((goal) => ({
    ...goal,
    ...details[goal.id],
    period: "Prazo: final do mês atual",
    completed: false,
  })),
  {
    id: "previous-energy",
    title: "Reduzir consumo de energia no mês anterior",
    description: "Reduzir 10% do consumo no mês anterior.",
    progress: 100,
    status: "Concluída",
    category: "Energia",
    icon: "energy",
    currentProgress: "Redução de 10% de uma meta de 10%",
    period: "Concluída no mês anterior",
    completed: true,
  },
];

export const goalFilters = [
  { id: "all", label: "Todas" },
  { id: "active", label: "Em andamento" },
  { id: "completed", label: "Concluídas" },
] as const satisfies readonly { id: GoalFilter; label: string }[];

export function filterGoals(filter: GoalFilter): readonly Goal[] {
  return goals.filter((goal) => filter === "all" || (filter === "completed" ? goal.completed : !goal.completed));
}

const activeGoals = filterGoals("active");
export const goalsSummary: GoalsSummary = {
  active: activeGoals.length,
  completed: goals.length - activeGoals.length,
  average: Math.round(activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length),
  best: activeGoals.reduce((best, goal) => goal.progress > best.progress ? goal : best).category,
};
