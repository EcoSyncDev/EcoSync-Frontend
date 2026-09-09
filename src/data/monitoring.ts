export const monitoringPeriods = [
  { id: "7d", label: "7 dias" },
  { id: "30d", label: "30 dias" },
  { id: "3m", label: "3 meses" },
  { id: "12m", label: "12 meses" },
] as const;

export type MonitoringPeriod = (typeof monitoringPeriods)[number]["id"];
export type ConsumptionPoint = { label: string; energy: number; water: number };
type MonitoringData = {
  days: number;
  grouping: string;
  points: readonly ConsumptionPoint[];
  energyReduction: number;
  waterReduction: number;
  carbonAvoided: number;
  savings: number;
};

// Cenários independentes e ilustrativos. Totais e médias são calculados a partir
// dos pontos, para que os resumos correspondam ao histórico selecionado.
export const monitoringData: Record<MonitoringPeriod, MonitoringData> = {
  "7d": {
    days: 7,
    grouping: "Totais diários · Dias da semana",
    points: [
      { label: "Seg", energy: 8, water: 210 },
      { label: "Ter", energy: 9, water: 240 },
      { label: "Qua", energy: 7, water: 190 },
      { label: "Qui", energy: 10, water: 260 },
      { label: "Sex", energy: 8, water: 220 },
      { label: "Sáb", energy: 7, water: 180 },
      { label: "Dom", energy: 7, water: 200 },
    ],
    energyReduction: 9, waterReduction: 6, carbonAvoided: 7.4, savings: 42.3,
  },
  "30d": {
    days: 30,
    grouping: "Totais a cada 5 dias · Dias do período",
    points: [
      { label: "1–5", energy: 38, water: 1020 },
      { label: "6–10", energy: 42, water: 1100 },
      { label: "11–15", energy: 40, water: 980 },
      { label: "16–20", energy: 45, water: 1160 },
      { label: "21–25", energy: 39, water: 1050 },
      { label: "26–30", energy: 44, water: 1110 },
    ],
    energyReduction: 12, waterReduction: 8, carbonAvoided: 32.8, savings: 184.2,
  },
  "3m": {
    days: 90,
    grouping: "Totais mensais · Cenário de 90 dias",
    points: [
      { label: "Mês 1", energy: 270, water: 6900 },
      { label: "Mês 2", energy: 260, water: 6700 },
      { label: "Mês 3", energy: 248, water: 6420 },
    ],
    energyReduction: 10, waterReduction: 7, carbonAvoided: 102.9, savings: 548.6,
  },
  "12m": {
    days: 365,
    grouping: "Totais bimestrais · Meses do período (365 dias)",
    points: [
      { label: "1–2", energy: 610, water: 15500 },
      { label: "3–4", energy: 590, water: 14900 },
      { label: "5–6", energy: 570, water: 14500 },
      { label: "7–8", energy: 550, water: 14000 },
      { label: "9–10", energy: 530, water: 13600 },
      { label: "11–12", energy: 508, water: 13120 },
    ],
    energyReduction: 14, waterReduction: 11, carbonAvoided: 444.1, savings: 2290.8,
  },
};
