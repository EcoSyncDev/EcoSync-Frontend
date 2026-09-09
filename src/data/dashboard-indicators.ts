import type { IndicatorCardProps } from "@/components/dashboard/indicator-card";

// Valores ilustrativos do mês atual, sem conexão com o backend.
export const dashboardIndicators = [
  {
    id: "energy",
    title: "Energia",
    value: "248 kWh",
    description: "Energia consumida no mês atual.",
    icon: "energy",
    comparison: "12% abaixo do mês anterior",
    trend: "down",
  },
  {
    id: "water",
    title: "Água",
    value: "6.420 L",
    description: "Água consumida no mês atual.",
    icon: "water",
    comparison: "8% abaixo do mês anterior",
    trend: "down",
  },
  {
    id: "carbon",
    title: "CO₂ evitado",
    value: "32,8 kg",
    description: "Emissões de CO₂ evitadas no mês atual.",
    icon: "leaf",
    comparison: "15% a mais evitado que no mês anterior",
    trend: "up",
  },
  {
    id: "savings",
    title: "Economia estimada",
    value: "R$ 184,20",
    description: "Economia gerada no mês atual.",
    icon: "wallet",
    comparison: "10% acima do mês anterior",
    trend: "up",
  },
] satisfies (IndicatorCardProps & { id: string })[];
