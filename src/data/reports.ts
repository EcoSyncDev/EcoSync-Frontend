import type { IconName } from "@/components/ui/icon";

export type ReportMetric = "energy" | "water" | "carbon" | "savings";
export type ReportValues = Record<ReportMetric, number>;
export type ReportPoint = ReportValues & { label: string };

export const reportMetrics = [
  { id: "energy", label: "Energia consumida", unit: "kWh", icon: "energy", lowerIsBetter: true },
  { id: "water", label: "Água consumida", unit: "L", icon: "water", lowerIsBetter: true },
  { id: "carbon", label: "CO₂ evitado", unit: "kg", icon: "leaf", lowerIsBetter: false },
  { id: "savings", label: "Economia estimada", unit: "R$", icon: "wallet", lowerIsBetter: false },
] as const satisfies readonly { id: ReportMetric; label: string; unit: string; icon: IconName; lowerIsBetter: boolean }[];

export const reportPeriods = [
  { id: "month", label: "Este mês" },
  { id: "quarter", label: "Últimos 3 meses" },
  { id: "semester", label: "Últimos 6 meses" },
  { id: "year", label: "Este ano" },
] as const;
export type ReportPeriod = (typeof reportPeriods)[number]["id"];

export function sumReportPoints(points: readonly ReportPoint[]): ReportValues {
  return points.reduce((sum, point) => ({ energy: sum.energy + point.energy, water: sum.water + point.water, carbon: sum.carbon + point.carbon, savings: sum.savings + point.savings }), { energy: 0, water: 0, carbon: 0, savings: 0 });
}

// Cenário fixo de setembro de 2026. Não representa medições reais nem a data do dispositivo.
const weekly: readonly ReportPoint[] = [
  { label: "1–7", energy: 60, water: 1600, carbon: 7.8, savings: 42 },
  { label: "8–14", energy: 64, water: 1650, carbon: 8.2, savings: 46 },
  { label: "15–21", energy: 66, water: 1700, carbon: 8.6, savings: 48 },
  { label: "22–30", energy: 58, water: 1470, carbon: 8.2, savings: 48.2 },
];
const monthly: readonly ReportPoint[] = [
  { label: "Jan", energy: 310, water: 7600, carbon: 23, savings: 130 },
  { label: "Fev", energy: 300, water: 7450, carbon: 24, savings: 135 },
  { label: "Mar", energy: 295, water: 7300, carbon: 25, savings: 140 },
  { label: "Abr", energy: 290, water: 7200, carbon: 26, savings: 145 },
  { label: "Mai", energy: 280, water: 7100, carbon: 27, savings: 150 },
  { label: "Jun", energy: 275, water: 7050, carbon: 28, savings: 158 },
  { label: "Jul", energy: 270, water: 7000, carbon: 28.2, savings: 160 },
  { label: "Ago", energy: 282, water: 6978, carbon: 28.5, savings: 167.45 },
  { label: "Set", ...sumReportPoints(weekly) },
];

type ReportData = {
  range: string;
  previousLabel: string;
  grouping: string;
  points: readonly ReportPoint[];
  previous: ReportValues;
  highlights: readonly string[];
};

export const reports: Record<ReportPeriod, ReportData> = {
  month: {
    range: "Setembro de 2026", previousLabel: "Agosto de 2026",
    grouping: "Totais por intervalo de dias de setembro; o último abrange 9 dias.",
    points: weekly, previous: sumReportPoints(monthly.slice(7, 8)),
    highlights: ["Meta de CO₂ na reta final: 84% de progresso.", "Setembro tem o menor consumo de energia do trimestre.", "Economia estimada acima de agosto."],
  },
  quarter: {
    range: "Julho a setembro de 2026", previousLabel: "Abril a junho de 2026",
    grouping: "Totais mensais do trimestre.", points: monthly.slice(6), previous: sumReportPoints(monthly.slice(3, 6)),
    highlights: ["Consumo de energia menor que no trimestre anterior.", "Consumo de água caiu a cada mês do trimestre.", "Economia estimada cresceu de julho a setembro."],
  },
  semester: {
    range: "Abril a setembro de 2026", previousLabel: "Outubro de 2025 a março de 2026",
    grouping: "Totais mensais do semestre.", points: monthly.slice(3), previous: { energy: 1850, water: 45800, carbon: 145, savings: 820 },
    highlights: ["Setembro tem o menor consumo de energia do semestre.", "Emissões evitadas acima do semestre anterior.", "Economia estimada acumulada supera R$ 960."],
  },
  year: {
    range: "Janeiro a setembro de 2026", previousLabel: "Janeiro a setembro de 2025",
    grouping: "Totais mensais do ano até setembro, comparados aos mesmos meses de 2025.",
    points: monthly, previous: { energy: 2900, water: 71000, carbon: 210, savings: 1180 },
    highlights: ["Energia acumulada abaixo do mesmo intervalo de 2025.", "Setembro tem o menor consumo de água do ano demonstrativo.", "Economia estimada acumulada supera R$ 1.300."],
  },
};

export function reportComparison(current: number, previous: number, lowerIsBetter: boolean) {
  const percent = previous === 0 ? null : ((current - previous) / previous) * 100;
  const improved = lowerIsBetter ? current < previous : current > previous;
  return { percent, status: current === previous ? "Sem variação" : improved ? "Melhora" : "Piora" };
}

export function formatReportValue(value: number, metric: ReportMetric): string {
  return metric === "savings"
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
    : new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value);
}
