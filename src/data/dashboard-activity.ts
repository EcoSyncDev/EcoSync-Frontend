import type { IconName } from "@/components/ui/icon";

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

// Metas e atividades ilustrativas, sem persistência ou dados reais.
export const sustainableGoals: readonly SustainableGoal[] = [
  {
    id: "energy",
    title: "Reduzir consumo de energia",
    description: "Reduzir 15% do consumo no mês.",
    progress: 72,
    status: "Em andamento",
  },
  {
    id: "water",
    title: "Economizar água",
    description: "Economizar 1.000 L no mês.",
    progress: 58,
    status: "Em andamento",
  },
  {
    id: "carbon",
    title: "Reduzir emissões de CO₂",
    description: "Evitar a emissão de 40 kg no mês.",
    progress: 84,
    status: "Na reta final",
  },
];

export const recentActions: readonly RecentAction[] = [
  {
    id: "energy-goal-updated",
    title: "Meta de energia atualizada",
    category: "Metas · Energia",
    timestamp: "Hoje, 14:30",
    icon: "energy",
  },
  {
    id: "water-consumption-recorded",
    title: "Consumo de água registrado",
    category: "Monitoramento · Água",
    timestamp: "Hoje, 09:15",
    icon: "water",
  },
  {
    id: "monthly-report-generated",
    title: "Relatório mensal gerado",
    category: "Relatórios · Resumo mensal",
    timestamp: "Ontem, 18:40",
    icon: "report",
  },
  {
    id: "carbon-goal-created",
    title: "Nova meta de CO₂ criada",
    category: "Metas · Emissões",
    timestamp: "Ontem, 10:20",
    icon: "leaf",
  },
];
